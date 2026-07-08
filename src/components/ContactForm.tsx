"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const inquiryTypes = [
  { value: "free-assessment", label: "Book a Free Production Assessment" },
  { value: "readiness-review", label: "Request a Production Readiness Review" },
  { value: "security-audit", label: "AI Security Audit" },
  { value: "deployment", label: "Deployment / Migration" },
  { value: "support", label: "Ongoing Production Support" },
  { value: "other", label: "Something else" },
];

/**
 * Contact form that composes a structured email via the visitor's mail
 * client (mailto:) — a static site needs no backend, and the inquiry
 * lands in the inbox pre-formatted.
 */
export default function ContactForm({ defaultType }: { defaultType?: string }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState(
    inquiryTypes.some((option) => option.value === defaultType)
      ? (defaultType as string)
      : "free-assessment",
  );
  const [builtWith, setBuiltWith] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const typeLabel =
      inquiryTypes.find((option) => option.value === type)?.label ?? type;
    const subject = `[${typeLabel}] ${company || name || "Website inquiry"}`;
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Inquiry: ${typeLabel}`,
      `App built with: ${builtWith}`,
      "",
      message,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "w-full rounded-md border border-ink-600 bg-ink-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-accent-400 focus:outline-none";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">
            Your name
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">
            Company (optional)
          </span>
          <input
            type="text"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            autoComplete="organization"
            className={inputClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-300">
          What do you need?
        </span>
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className={inputClass}
        >
          {inquiryTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-300">
          What was the app built with? (optional)
        </span>
        <input
          type="text"
          value={builtWith}
          onChange={(event) => setBuiltWith(event.target.value)}
          placeholder="e.g. Cursor + Next.js + Supabase, currently on Replit"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-300">
          Tell us about your situation
        </span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="What you built, where it runs today, and what's worrying you."
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-md bg-accent-500 px-6 py-3.5 font-semibold text-ink-950 transition-colors hover:bg-accent-400 sm:w-auto"
      >
        Send inquiry
      </button>
      <p className="text-sm text-slate-500">
        Opens your email client with the message pre-filled — or write to us
        directly at{" "}
        <a href={`mailto:${site.email}`} className="text-accent-300 hover:underline">
          {site.email}
        </a>
        . Response within one business day. NDA available.
      </p>
    </form>
  );
}
