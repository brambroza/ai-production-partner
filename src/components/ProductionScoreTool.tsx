"use client";

import Link from "next/link";
import { useState } from "react";
import {
  isScannableTextFile,
  scoreRepository,
  type ScoreReport,
} from "@/lib/production-score";
import { site } from "@/lib/site";

const MAX_ZIP_BYTES = 100 * 1024 * 1024;
const MAX_SCAN_FILE_BYTES = 300 * 1024;
const MAX_SCANNED_FILES = 400;

type AnalysisState =
  | { status: "idle" }
  | { status: "working"; message: string }
  | { status: "done"; report: ScoreReport; source: string }
  | { status: "error"; message: string };

/** Parses "owner/repo" out of a GitHub URL or shorthand. */
function parseGithubRepo(value: string): { owner: string; repo: string } | null {
  const cleaned = value.trim().replace(/\.git$/, "").replace(/\/+$/, "");
  const urlMatch = cleaned.match(
    /(?:github\.com[/:])([\w.-]+)\/([\w.-]+)/i,
  );
  if (urlMatch) return { owner: urlMatch[1], repo: urlMatch[2] };
  const shorthand = cleaned.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (shorthand) return { owner: shorthand[1], repo: shorthand[2] };
  return null;
}

/**
 * Free AI Production Score tool. Analysis runs entirely in the browser:
 * ZIP files are unpacked locally (JSZip) and never uploaded anywhere;
 * GitHub mode reads the public file tree via the GitHub API.
 */
export default function ProductionScoreTool() {
  const [state, setState] = useState<AnalysisState>({ status: "idle" });
  const [repoUrl, setRepoUrl] = useState("");

  async function analyzeZip(file: File) {
    if (file.size > MAX_ZIP_BYTES) {
      setState({
        status: "error",
        message: "ZIP is larger than 100 MB. Remove node_modules/build output and try again.",
      });
      return;
    }
    setState({ status: "working", message: "Reading ZIP locally (nothing is uploaded)…" });
    try {
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(file);
      const paths: string[] = [];
      const contents = new Map<string, string>();
      const entries = Object.values(zip.files).filter((entry) => !entry.dir);

      for (const entry of entries) {
        // Skip vendored/build noise so signals reflect the actual project.
        if (/(^|\/)(node_modules|\.next|dist|build|vendor|\.git)\//.test(entry.name)) continue;
        paths.push(entry.name);
      }

      setState({ status: "working", message: "Scanning source files for exposed secrets…" });
      const scannable = paths
        .filter(isScannableTextFile)
        .slice(0, MAX_SCANNED_FILES);
      for (const path of scannable) {
        const entry = zip.file(path);
        if (!entry) continue;
        const blob = await entry.async("blob");
        if (blob.size > MAX_SCAN_FILE_BYTES) continue;
        contents.set(path, await blob.text());
      }

      if (paths.length === 0) {
        setState({ status: "error", message: "The ZIP contained no project files." });
        return;
      }
      setState({
        status: "done",
        report: scoreRepository({ paths, contents }),
        source: file.name,
      });
    } catch {
      setState({
        status: "error",
        message: "Couldn't read that file as a ZIP archive. Export your project as .zip and retry.",
      });
    }
  }

  async function analyzeGithub() {
    const parsed = parseGithubRepo(repoUrl);
    if (!parsed) {
      setState({
        status: "error",
        message: "Enter a GitHub repository URL like https://github.com/owner/repo (public repos only).",
      });
      return;
    }
    setState({ status: "working", message: `Fetching ${parsed.owner}/${parsed.repo} file tree from GitHub…` });
    try {
      const repoResponse = await fetch(
        `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
      );
      if (repoResponse.status === 404) {
        setState({
          status: "error",
          message: "Repository not found — it may be private. Use the ZIP option for private code (analysis stays in your browser).",
        });
        return;
      }
      if (repoResponse.status === 403) {
        setState({
          status: "error",
          message: "GitHub API rate limit reached. Wait a few minutes, or use the ZIP option.",
        });
        return;
      }
      if (!repoResponse.ok) throw new Error(String(repoResponse.status));
      const repoInfo: { default_branch: string } = await repoResponse.json();

      const treeResponse = await fetch(
        `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/git/trees/${repoInfo.default_branch}?recursive=1`,
      );
      if (!treeResponse.ok) throw new Error(String(treeResponse.status));
      const tree: { tree: { path: string; type: string }[] } =
        await treeResponse.json();
      const paths = tree.tree
        .filter((node) => node.type === "blob")
        .map((node) => node.path);

      // Pull package.json so the error-tracking check has content to inspect.
      const contents = new Map<string, string>();
      if (paths.includes("package.json")) {
        const pkgResponse = await fetch(
          `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${repoInfo.default_branch}/package.json`,
        );
        if (pkgResponse.ok) contents.set("package.json", await pkgResponse.text());
      }

      setState({
        status: "done",
        report: scoreRepository({ paths, contents }),
        source: `${parsed.owner}/${parsed.repo}`,
      });
    } catch {
      setState({
        status: "error",
        message: "Couldn't reach the GitHub API. Check the URL and your connection, or use the ZIP option.",
      });
    }
  }

  return (
    <div>
      {/* Input panel */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-ink-700/60 bg-ink-900 p-6">
          <h2 className="font-semibold text-white">Option 1 — GitHub repository</h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-400">
            Public repositories only. We read the file listing via the GitHub
            API; no code is stored.
          </p>
          <form
            className="mt-4 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              void analyzeGithub();
            }}
          >
            <label className="flex-1">
              <span className="sr-only">GitHub repository URL</span>
              <input
                type="text"
                value={repoUrl}
                onChange={(event) => setRepoUrl(event.target.value)}
                placeholder="https://github.com/owner/repo"
                className="w-full rounded-md border border-ink-600 bg-ink-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-accent-400 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={state.status === "working"}
              className="rounded-md bg-accent-500 px-5 py-3 font-semibold text-ink-950 transition-colors hover:bg-accent-400 disabled:opacity-50"
            >
              Analyze
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-ink-700/60 bg-ink-900 p-6">
          <h2 className="font-semibold text-white">Option 2 — Upload a ZIP</h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-400">
            Works for private code: the archive is analyzed{" "}
            <strong className="text-slate-200">entirely in your browser</strong>{" "}
            and never uploaded to any server.
          </p>
          <label className="mt-4 block cursor-pointer rounded-md border border-dashed border-ink-600 bg-ink-950 px-4 py-6 text-center text-sm text-slate-300 transition-colors hover:border-accent-400">
            <span className="font-semibold text-accent-300">Choose a .zip file</span>{" "}
            (max 100 MB — exclude node_modules)
            <input
              type="file"
              accept=".zip,application/zip"
              className="sr-only"
              disabled={state.status === "working"}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void analyzeZip(file);
                event.target.value = "";
              }}
            />
          </label>
        </div>
      </div>

      {/* Status */}
      <div aria-live="polite" className="mt-8">
        {state.status === "working" && (
          <p className="rounded-xl border border-ink-700/60 bg-ink-900 p-6 text-slate-300">
            <span aria-hidden="true" className="mr-2 inline-block animate-pulse text-accent-400">●</span>
            {state.message}
          </p>
        )}
        {state.status === "error" && (
          <p className="rounded-xl border border-red-400/40 bg-red-950/30 p-6 text-red-200">
            {state.message}
          </p>
        )}

        {/* Report */}
        {state.status === "done" && (
          <div className="space-y-8">
            <div className="rounded-xl border border-ink-700/60 bg-ink-900 p-8 text-center">
              <p className="text-sm uppercase tracking-widest text-slate-400">
                Production Readiness Score — {state.source}
              </p>
              <p className="mt-4 text-6xl font-bold text-white">
                {state.report.score}
                <span className="text-3xl text-slate-500">/100</span>
              </p>
              <p className="mt-2 text-2xl font-bold text-accent-400">
                Grade {state.report.grade}
              </p>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
                {state.report.verdict}
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Based on {state.report.checks.length} static signals across{" "}
                {state.report.scannedFiles} files. A heuristic scan — not a
                substitute for the full 40+ checkpoint expert assessment.
              </p>
            </div>

            {state.report.secretFindings.length > 0 && (
              <div className="rounded-xl border border-red-400/40 bg-red-950/30 p-6">
                <h3 className="font-semibold text-red-200">
                  ⚠ Possible exposed secrets ({state.report.secretFindings.length})
                </h3>
                <ul className="mt-3 space-y-1 font-mono text-sm text-red-200/90">
                  {state.report.secretFindings.slice(0, 10).map((finding) => (
                    <li key={finding}>{finding}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-red-200/80">
                  Treat these as leaked: rotate the credentials now, then move
                  them to environment variables. (This analysis ran locally —
                  we have not seen or stored these values.)
                </p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {state.report.categories.map((category) => (
                <div
                  key={category.name}
                  className="rounded-xl border border-ink-700/60 bg-ink-900 p-4 text-center"
                >
                  <p className="text-sm text-slate-400">{category.name}</p>
                  <p className="mt-1 text-xl font-bold text-white">
                    {category.score}
                    <span className="text-sm text-slate-500">/{category.max}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-ink-700/60">
              <ul className="divide-y divide-ink-700/60">
                {state.report.checks.map((check) => (
                  <li key={check.id} className="bg-ink-900 px-6 py-4">
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className={check.passed ? "text-accent-400" : "text-red-400"}
                      >
                        {check.passed ? "✓" : "✗"}
                      </span>
                      <div>
                        <p className="font-medium text-white">
                          {check.label}{" "}
                          <span className="text-xs text-slate-500">
                            ({check.category} · {check.weight} pts)
                          </span>
                        </p>
                        {!check.passed && (
                          <p className="mt-1 text-sm leading-6 text-slate-400">
                            {check.advice}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-accent-600/40 bg-ink-900 p-8 text-center">
              <h3 className="text-2xl font-bold text-white">
                Want the real assessment behind this score?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-300">
                This tool reads static signals. Our engineers review your
                actual code, architecture, and infrastructure across 40+
                checkpoints — with a prioritized findings report in 48 hours,
                free.
              </p>
              <Link
                href={site.primaryCta.href}
                className="mt-6 inline-block rounded-md bg-accent-500 px-8 py-4 font-semibold text-ink-950 transition-colors hover:bg-accent-400"
              >
                {site.primaryCta.label}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
