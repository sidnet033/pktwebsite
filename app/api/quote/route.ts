import nodemailer from "nodemailer";
import { COUNTRIES } from "@/lib/countries";
import { SITE, TOPICS } from "@/lib/site";

export const runtime = "nodejs";

const clean = (s: unknown, max: number) => String(s ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

function hint(e: { code?: string; responseCode?: number; response?: string }) {
  const r = e.response ?? "";
  if (e.code === "EAUTH") return "Meaning: Google refused the sender's email or app password. Check SMTP_USER is exactly the account that created the app password, 2-Step Verification is on for it, and redeploy after saving SMTP_PASS.";
  if (e.code === "ECONNECTION" || e.code === "ETIMEDOUT" || e.code === "ESOCKET") return "Meaning: could not reach the mail server. Check SMTP_HOST (smtp.gmail.com) and SMTP_PORT (465).";
  if (e.responseCode === 550 || /not (authorized|allowed)|rejected/i.test(r)) return "Meaning: login worked but Google refused the recipient. Check the group's 'Who can post' setting allows the sender account.";
  return "Meaning: see the mail server message above.";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success.
  if (body.website) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const mobile = clean(body.mobile, 40);
  const company = clean(body.company, 160);
  const country = clean(body.country, 80);
  const requirement = String(body.requirement ?? "").trim().slice(0, 4000);
  const topic = clean(body.topic, 80);

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || mobile.replace(/\D/g, "").length < 8 || requirement.length < 10 || !(COUNTRIES as readonly string[]).includes(country) || (topic && !(TOPICS as readonly string[]).includes(topic))) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const text = `${topic ? `Topic: ${topic}\n` : ""}Name: ${name}\nCompany: ${company || "-"}\nEmail: ${email}\nMobile: ${mobile}\nCountry: ${country}\n\nRequirement:\n${requirement}\n`;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, QUOTE_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Nothing is stored or logged: without a mail login the enquiry cannot be delivered.
    console.error("[quote] SMTP not configured; enquiry not delivered");
    return Response.json({ error: "mail not configured" }, { status: 503 });
  }

  // Tidy values pasted into Vercel: stray spaces/newlines. Google app passwords contain no spaces.
  const user = SMTP_USER.trim();
  const pass = SMTP_PASS.replace(/\s+/g, "");

  try {
    const port = Number(SMTP_PORT) || 465;
    const t = nodemailer.createTransport({ host: SMTP_HOST.trim(), port, secure: port === 465, auth: { user, pass } });
    await t.sendMail({
      from: `"${SITE.name} website" <${user}>`,
      to: (QUOTE_TO || SITE.email).trim(),
      replyTo: `"${name}" <${email}>`,
      subject: "Enquiry from PKT Website",
      text,
    });
    return Response.json({ ok: true });
  } catch (err) {
    const e = err as { code?: string; responseCode?: number; response?: string; message?: string };
    console.error("[quote] send failed", err);
    // Technical detail is shown on test (preview) sites only, never to real visitors.
    const detail =
      process.env.VERCEL_ENV === "production"
        ? undefined
        : [
            `Mail server said: ${e.responseCode ?? ""} ${(e.response ?? e.message ?? "unknown error").replace(/\s+/g, " ").slice(0, 220)}`,
            `Sender login used: ${user} (password length seen: ${pass.length}; a Google app password is 16)`,
            hint(e),
          ].join("\n");
    return Response.json({ error: "send failed", detail }, { status: 502 });
  }
}
