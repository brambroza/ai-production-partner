import { NextResponse } from "next/server";
import { site } from "@/lib/site";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  type?: string;
  typeLabel?: string;
  builtWith?: string;
  message?: string;
  locale?: string;
};

const resendEndpoint = "https://api.resend.com/emails";

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as ContactPayload | null;

  const name = text(payload?.name);
  const email = text(payload?.email);
  const company = text(payload?.company);
  const type = text(payload?.type);
  const typeLabel = text(payload?.typeLabel) || type || "Website inquiry";
  const builtWith = text(payload?.builtWith);
  const message = text(payload?.message);
  const locale = payload?.locale === "th" ? "th" : "en";

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json(
      {
        error:
          locale === "th"
            ? "กรุณากรอกชื่อ อีเมล และรายละเอียดให้ถูกต้อง"
            : "Please provide a valid name, email, and message.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "AI Production Partner <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          locale === "th"
            ? "ยังไม่ได้ตั้งค่า RESEND_API_KEY บน server"
            : "RESEND_API_KEY is not configured on the server.",
      },
      { status: 500 },
    );
  }

  const subject = `[${typeLabel}] ${company || name}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "-"}`,
    `Inquiry: ${typeLabel}`,
    `Inquiry value: ${type || "-"}`,
    `App built with: ${builtWith || "-"}`,
    "",
    message,
  ];

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject,
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Contact email failed", detail);
    return NextResponse.json(
      {
        error:
          locale === "th"
            ? "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่หรือส่งอีเมลโดยตรง"
            : "Message could not be sent. Please try again or email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
