/**
 * Heuristic Production Readiness scoring engine.
 * Works entirely client-side from a repository file listing (GitHub tree or
 * ZIP entries) plus optional file contents for secret scanning. Signals are
 * honest heuristics — the report says what was checked and what wasn't.
 */

export type ScoreInput = {
  /** All repo-relative file paths, lowercase not required. */
  paths: string[];
  /** Contents of selected small text files, keyed by path (ZIP mode only). */
  contents?: Map<string, string>;
};

export type CheckResult = {
  id: string;
  category: string;
  label: string;
  passed: boolean;
  weight: number;
  advice: string;
};

export type ScoreReport = {
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  verdict: string;
  checks: CheckResult[];
  categories: { name: string; score: number; max: number }[];
  secretFindings: string[];
  scannedFiles: number;
};

const SECRET_PATTERNS: { name: string; pattern: RegExp }[] = [
  { name: "AWS access key", pattern: /AKIA[0-9A-Z]{16}/ },
  { name: "Private key block", pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: "Stripe live key", pattern: /sk_live_[0-9a-zA-Z]{20,}/ },
  { name: "OpenAI-style key", pattern: /sk-[a-zA-Z0-9_-]{32,}/ },
  { name: "Google API key", pattern: /AIza[0-9A-Za-z\-_]{35}/ },
  { name: "Slack token", pattern: /xox[baprs]-[0-9a-zA-Z-]{10,}/ },
  { name: "GitHub token", pattern: /gh[pousr]_[A-Za-z0-9]{36,}/ },
  {
    name: "Hardcoded password/secret assignment",
    pattern: /(?:password|passwd|secret|api[_-]?key)\s*[:=]\s*["'][^"'\s]{8,}["']/i,
  },
  {
    name: "Database connection string with credentials",
    pattern: /(?:postgres|postgresql|mysql|mongodb(?:\+srv)?):\/\/\w+:[^@\s"']+@/i,
  },
];

/** True if any path matches the given predicate. */
function has(paths: string[], predicate: (path: string) => boolean): boolean {
  return paths.some(predicate);
}

/** Runs all readiness checks against the repository listing. */
export function scoreRepository(input: ScoreInput): ScoreReport {
  const paths = input.paths.map((path) => path.replace(/^\/+/, ""));
  const lower = paths.map((path) => path.toLowerCase());
  const contents = input.contents ?? new Map<string, string>();

  const packageJson = [...contents.entries()].find(([path]) =>
    /(^|\/)package\.json$/i.test(path),
  )?.[1];

  /* --- Secret scan over provided text contents --- */
  const secretFindings: string[] = [];
  for (const [path, text] of contents) {
    // .env.example and lockfiles produce noise, not leaks.
    if (/\.env\.(example|sample|template)$|lock/i.test(path)) continue;
    for (const { name, pattern } of SECRET_PATTERNS) {
      if (pattern.test(text)) {
        secretFindings.push(`${name} in ${path}`);
      }
    }
  }

  const committedEnv = has(lower, (path) =>
    /(^|\/)\.env(\.(local|production|prod|dev|development|staging))?$/.test(path),
  );

  const checks: CheckResult[] = [
    {
      id: "no-committed-env",
      category: "Security",
      label: "No .env file committed to the repository",
      passed: !committedEnv,
      weight: 15,
      advice:
        "A committed .env file means credentials live in git history. Remove it, rotate every value it held, and add .env to .gitignore.",
    },
    {
      id: "no-secrets-detected",
      category: "Security",
      label: "No hardcoded secrets detected in scanned files",
      passed: secretFindings.length === 0,
      weight: 20,
      advice:
        "Potential credentials were found in source files. Rotate them immediately — a committed secret is a leaked secret — and move configuration to environment variables.",
    },
    {
      id: "gitignore",
      category: "Security",
      label: ".gitignore present",
      passed: has(lower, (path) => /(^|\/)\.gitignore$/.test(path)),
      weight: 3,
      advice:
        "Without .gitignore, env files, build output, and local artifacts drift into version control.",
    },
    {
      id: "env-example",
      category: "Security",
      label: "Environment template (.env.example) documented",
      passed: has(lower, (path) => /\.env\.(example|sample|template)$/.test(path)),
      weight: 4,
      advice:
        "An .env.example documents required configuration without exposing values — the marker of deliberate config management.",
    },
    {
      id: "lockfile",
      category: "Delivery",
      label: "Dependency lockfile present",
      passed: has(lower, (path) =>
        /(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb?|poetry\.lock|uv\.lock|pipfile\.lock|go\.sum|cargo\.lock|packages\.lock\.json|composer\.lock)$/.test(
          path,
        ),
      ),
      weight: 6,
      advice:
        "Without a lockfile, every install can resolve different dependency versions — builds aren't reproducible and supply-chain risk is unbounded.",
    },
    {
      id: "ci",
      category: "Delivery",
      label: "CI pipeline configured",
      passed: has(lower, (path) =>
        /(^|\/)\.github\/workflows\/.+\.ya?ml$|(^|\/)\.gitlab-ci\.ya?ml$|(^|\/)bitbucket-pipelines\.ya?ml$|(^|\/)\.circleci\//.test(
          path,
        ),
      ),
      weight: 12,
      advice:
        "No CI config found — deployments are likely manual and untested. A minimal build-test-deploy pipeline prevents most self-inflicted outages.",
    },
    {
      id: "tests",
      category: "Delivery",
      label: "Automated tests present",
      passed: has(lower, (path) =>
        /(^|\/)(tests?|__tests__|spec|e2e|cypress|playwright)\/|\.(test|spec)\.[jt]sx?$|_test\.(go|py)$|tests?\.py$/.test(
          path,
        ),
      ),
      weight: 10,
      advice:
        "No test files detected. For AI-generated codebases especially, tests are the safety net that makes continued fast iteration safe.",
    },
    {
      id: "dockerfile",
      category: "Infrastructure",
      label: "Dockerfile present",
      passed: has(lower, (path) => /(^|\/)dockerfile(\..+)?$/.test(path)),
      weight: 8,
      advice:
        "No Dockerfile found — the app likely depends on hand-configured hosting. Containerization makes environments reproducible and portable.",
    },
    {
      id: "compose-or-orchestration",
      category: "Infrastructure",
      label: "Container orchestration config (compose/k8s) present",
      passed: has(lower, (path) =>
        /(^|\/)(docker-)?compose(\..+)?\.ya?ml$|(^|\/)(k8s|kubernetes|charts?|manifests)\//.test(
          path,
        ),
      ),
      weight: 4,
      advice:
        "No compose or Kubernetes manifests found — multi-service topology (app + database + cache) is probably undocumented.",
    },
    {
      id: "iac",
      category: "Infrastructure",
      label: "Infrastructure as code present",
      passed: has(lower, (path) =>
        /\.tf$|(^|\/)(terraform|pulumi|cdk|infra(structure)?)\//.test(path),
      ),
      weight: 6,
      advice:
        "No Terraform/Pulumi/CDK found. If infrastructure was built by clicking a console, it can't be reproduced after a failure or audited for security.",
    },
    {
      id: "migrations",
      category: "Infrastructure",
      label: "Database migrations managed",
      passed: has(lower, (path) =>
        /(^|\/)(migrations?|alembic|prisma\/migrations)\//.test(path),
      ),
      weight: 5,
      advice:
        "No migration directory found — schema changes are likely applied by hand, the most common cause of deployment disasters.",
    },
    {
      id: "error-tracking",
      category: "Observability",
      label: "Error tracking dependency detected",
      passed:
        packageJson !== undefined
          ? /@sentry\/|rollbar|bugsnag|honeybadger/i.test(packageJson)
          : has(lower, (path) => /sentry\.(client|server|edge)\.config\.[jt]s$/.test(path)),
      weight: 7,
      advice:
        "No error tracking (Sentry or similar) detected. Without it, production exceptions vanish silently and outages are discovered by customers.",
    },
    {
      id: "readme",
      category: "Documentation",
      label: "README present",
      passed: has(lower, (path) => /(^|\/)readme\.(md|txt|rst)$/.test(path)),
      weight: 4,
      advice:
        "No README found — the project can't be understood or run by anyone new without archaeology.",
    },
    {
      id: "docs",
      category: "Documentation",
      label: "Operational docs or runbooks present",
      passed: has(lower, (path) =>
        /(^|\/)(docs?|runbooks?|documentation)\/|deploy(ment)?\.md$|operations?\.md$/.test(path),
      ),
      weight: 4,
      advice:
        "No docs directory or runbooks found. Deployment and incident knowledge probably lives in one person's head (or chat history).",
    },
  ];

  const totalWeight = checks.reduce((sum, check) => sum + check.weight, 0);
  const earned = checks.reduce(
    (sum, check) => sum + (check.passed ? check.weight : 0),
    0,
  );
  const score = Math.round((earned / totalWeight) * 100);

  const grade =
    score >= 85 ? "A" : score >= 70 ? "B" : score >= 50 ? "C" : score >= 30 ? "D" : "F";

  const verdict =
    grade === "A"
      ? "Strong production signals. The remaining gaps are worth closing, but the foundation is deliberate."
      : grade === "B"
        ? "Better than most — a solid base with meaningful gaps that would surface under incident conditions."
        : grade === "C"
          ? "Typical for an AI-built app: features exist, the production layer is partial. Prioritize the failed critical checks before real users arrive."
          : grade === "D"
            ? "Significant production gaps. This app works, but it isn't ready to be trusted with customers or their data yet."
            : "Prototype-stage across the board. Every failed check here is a launch risk — the good news is the path forward is well-defined.";

  const categoryNames = [...new Set(checks.map((check) => check.category))];
  const categories = categoryNames.map((name) => {
    const relevant = checks.filter((check) => check.category === name);
    return {
      name,
      score: relevant.reduce((sum, check) => sum + (check.passed ? check.weight : 0), 0),
      max: relevant.reduce((sum, check) => sum + check.weight, 0),
    };
  });

  return {
    score,
    grade,
    verdict,
    checks,
    categories,
    secretFindings,
    scannedFiles: paths.length,
  };
}

/** Text file extensions worth scanning for secrets in ZIP mode. */
export function isScannableTextFile(path: string): boolean {
  return /\.(js|jsx|ts|tsx|mjs|cjs|py|rb|go|cs|java|php|json|ya?ml|toml|ini|env|cfg|conf|sh|tf|sql|prisma|txt|md)$/i.test(
    path,
  );
}
