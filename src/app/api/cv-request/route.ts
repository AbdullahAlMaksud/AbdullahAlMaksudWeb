import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL!;
const CV_DOWNLOAD_URL = process.env.CV_DOWNLOAD_URL!;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "Unknown";

    const timestamp = new Date().toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 1️⃣ Send CV link to requester
    await resend.emails.send({
      from: "Abdullah Al Maksud <onboarding@resend.dev>",
      to: email,
      subject: "📄 Your CV from Abdullah Al Maksud",
      html: `
        <div style="font-family: monospace; max-width: 560px; margin: 0 auto; border: 2px solid #1a1a1a; padding: 32px; background: #faf9f6;">
          <div style="border-bottom: 1px dashed #ccc; padding-bottom: 16px; margin-bottom: 24px;">
            <p style="font-size: 12px; color: #888; margin: 0; text-transform: uppercase; letter-spacing: 2px;">ABDULLAH AL MAKSUD</p>
            <h2 style="font-size: 20px; margin: 4px 0 0;">Here's my CV 📄</h2>
          </div>
          <p style="font-size: 14px; line-height: 1.8; color: #444; margin: 0 0 24px;">
            Thanks for your interest! You can download my CV using the link below.
            The link is available anytime — feel free to share it.
          </p>
          <a
            href="${CV_DOWNLOAD_URL}"
            style="display: inline-block; background: #2d6a4f; color: #faf9f6; text-decoration: none; padding: 14px 28px; font-size: 13px; letter-spacing: 1px; font-weight: bold; border: 2px solid #1a3327;"
          >
            ↓ DOWNLOAD CV
          </a>
          <p style="margin-top: 32px; font-size: 14px; line-height: 1.7;">
            If you'd like to work together or just want to say hi, feel free to reply to this email.<br/><br/>
            Cheers,<br/>
            <strong>Abdullah Al Maksud</strong><br/>
            <span style="color: #2d6a4f; font-size: 13px;">Programmer · Writer · Designer</span>
          </p>
          <p style="margin-top: 24px; font-size: 12px; color: #999; border-top: 1px dashed #ddd; padding-top: 16px;">
            — <a href="https://abdullahalmaksud.com" style="color: #999;">abdullahalmaksud.com</a>
          </p>
        </div>
      `,
    });

    // 2️⃣ Notify owner
    await resend.emails.send({
      from: "Portfolio CV <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      subject: `📥 CV Requested by ${email}`,
      html: `
        <div style="font-family: monospace; max-width: 560px; margin: 0 auto; border: 2px solid #1a1a1a; padding: 32px; background: #faf9f6;">
          <h2 style="font-size: 18px; margin: 0 0 24px; border-bottom: 1px dashed #ccc; padding-bottom: 12px;">
            📥 New CV Download Request
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 130px;">Requester Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #2d6a4f; font-weight: bold;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Requested at</td>
              <td style="padding: 8px 0;">${timestamp}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">IP Address</td>
              <td style="padding: 8px 0; font-size: 13px; color: #888;">${ip}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Link Sent</td>
              <td style="padding: 8px 0;">
                <a href="${CV_DOWNLOAD_URL}" style="color: #2d6a4f; word-break: break-all;">${CV_DOWNLOAD_URL}</a>
              </td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 13px; color: #999;">
            CV link has been automatically sent to the requester.
          </p>
          <p style="font-size: 12px; color: #bbb;">
            — abdullahalmaksud.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[cv-request] Email send error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
