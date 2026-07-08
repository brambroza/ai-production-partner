"use client";

import { useState } from "react";
import { ui } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const inquiryTypeValues = [
  "free-assessment",
  "readiness-review",
  "security-audit",
  "deployment",
  "support",
  "other",
] as const;

type InquiryType = (typeof inquiryTypeValues)[number];

/** Contact form that sends inquiries through the API with a mailto fallback. */
export default function ContactForm({
  defaultType,
  locale = "en",
}: {
  defaultType?: string;
  locale?: Locale;
}) {
  const dict = ui(locale).form;
  const inquiryTypes: { value: InquiryType; label: string }[] = [
    { value: "free-assessment", label: dict.types.freeAssessment },
    { value: "readiness-review", label: dict.types.readinessReview },
    { value: "security-audit", label: dict.types.securityAudit },
    { value: "deployment", label: dict.types.deployment },
    { value: "support", label: dict.types.support },
    { value: "other", label: dict.types.other },
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState(
    inquiryTypeValues.some((value) => value === defaultType)
      ? (defaultType as InquiryType)
      : "free-assessment",
  );
  const [builtWith, setBuiltWith] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const typeLabel =
    inquiryTypes.find((option) => option.value === type)?.label ?? type;

  function emailBody(typeLabel: string) {
    return [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Company: ${company.trim() || "-"}`,
      `Inquiry: ${typeLabel}`,
      `Inquiry value: ${type}`,
      `App built with: ${builtWith.trim() || "-"}`,
      "",
      message.trim(),
    ].join("\n");
  }

  function mailtoHref(typeLabel: string) {
    const subject = `[${typeLabel}] ${company.trim() || name.trim() || "Website inquiry"}`;
    const body = emailBody(typeLabel);

    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          type,
          typeLabel,
          builtWith,
          message,
          locale,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          result.error ??
            (locale === "th"
              ? "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่หรือส่งอีเมลโดยตรง"
              : "Message could not be sent. Please try again or email us directly."),
        );
        return;
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        locale === "th"
          ? "เชื่อมต่อระบบส่งข้อความไม่ได้ กรุณาส่งอีเมลโดยตรง"
          : "Could not reach the message service. Please email us directly.",
      );
      return;
    }

    setStatus("sent");
    setName("");
    setEmail("");
    setCompany("");
    setBuiltWith("");
    setMessage("");
  }

  const inputClass =
    "w-full rounded-md border border-ink-600 bg-ink-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-accent-400 focus:outline-none";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">
            {dict.name}
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
            {locale === "th" ? "อีเมลสำหรับติดต่อกลับ" : "Reply email"}
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">
            {dict.company}
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
          {dict.needWhat}
        </span>
        <select
          value={type}
          onChange={(event) => setType(event.target.value as InquiryType)}
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
          {dict.builtWith}
        </span>
        <input
          type="text"
          value={builtWith}
          onChange={(event) => setBuiltWith(event.target.value)}
          placeholder={dict.builtWithPlaceholder}
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-300">
          {dict.situation}
        </span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={dict.situationPlaceholder}
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-accent-500 px-6 py-3.5 font-semibold text-ink-950 transition-colors hover:bg-accent-400 sm:w-auto"
      >
        {status === "sending"
          ? locale === "th"
            ? "กำลังส่ง..."
            : "Sending..."
          : dict.send}
      </button>
      {status === "sent" && (
        <p className="text-sm font-medium text-accent-300">
          {locale === "th"
            ? "ส่งข้อความแล้ว เราจะตอบกลับทางอีเมลภายใน 1 วันทำการ"
            : "Message sent. We will reply by email within one business day."}
        </p>
      )}
      {status === "error" && (
        <div
          role="alert"
          className="space-y-3 rounded-md border border-red-400/30 bg-red-950/30 p-4"
        >
          <p className="text-sm font-medium text-red-200">{errorMessage}</p>
          <a
            href={mailtoHref(typeLabel)}
            className="inline-flex w-full items-center justify-center rounded-md border border-accent-400 px-4 py-2.5 text-sm font-semibold text-accent-200 transition-colors hover:bg-accent-400 hover:text-ink-950 sm:w-auto"
          >
            {locale === "th" ? "เปิดอีเมลพร้อมข้อความนี้" : "Open email with this message"}
          </a>
        </div>
      )}
      <p className="text-sm text-slate-500">
        {locale === "th"
          ? "ข้อความจะถูกส่งถึงทีมงานโดยตรง หรือเขียนถึงเราได้ที่"
          : "Your message is sent directly to our team, or write to us at"}{" "}
        <a href={`mailto:${site.email}`} className="text-accent-300 hover:underline">
          {site.email}
        </a>
        . {dict.mailtoNote2}
      </p>
    </form>
  );
}
