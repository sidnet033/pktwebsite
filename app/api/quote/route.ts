import nodemailer from "nodemailer";
import { COUNTRIES } from "@/lib/countries";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const clean = (s: unknown, max: number) => String(s ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

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

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || mobile.replace(/\D/g, "").length < 8 || requirement.length < 10 || !(COUNTRIES as readonly string[]).includes(country)) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const text = `Name: ${name}\nCompany: ${company || "-"}\nEmail: ${email}\nMobile: ${mobile}\nCountry: ${country}\n\nRequirement:\n${requirement}\n`;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, QUOTE_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Nothing is stored or logged: without a mail login the enquiry cannot be delivered.
    console.error("[quote] SMTP not configured; enquiry not delivered");
    return Response.json({ error: "mail not configured" }, { status: 503 });
  }

  try {
    const port = Number(SMTP_PORT) || 465;
    const t = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await t.sendMail({
      from: `"${SITE.name} website" <${SMTP_USER}>`,
      to: QUOTE_TO || SITE.email,
      replyTo: `"${name}" <${email}>`,
      subject: `Website enquiry from ${name}${company ? ` (${company})` : ""}, ${country}`,
      text,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[quote] send failed", err);
    return Response.json({ error: "send failed" }, { status: 502 });
  }
}
