import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL!;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      dateStyle: "full",
      timeStyle: "short",
    });

    // 1️⃣ Notify owner
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      subject: `📩 New message from ${name}`,
      html: `
        <div style="font-family: monospace; max-width: 560px; margin: 0 auto; border: 2px solid #1a1a1a; padding: 32px; background: #faf9f6;">
          <h2 style="font-size: 18px; margin: 0 0 24px; border-bottom: 1px dashed #ccc; padding-bottom: 12px;">
            📩 New Contact Form Message
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px;">Name</td>
              <td style="padding: 8px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #2d6a4f;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Sent at</td>
              <td style="padding: 8px 0;">${timestamp}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; background: #f0ede8; padding: 16px; border-left: 3px solid #2d6a4f;">
            <p style="font-size: 12px; color: #666; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            — Sent from abdullahalmaksud.com
          </p>
        </div>
      `,
    });

    // 2️⃣ Auto-reply to sender
    await resend.emails.send({
      from: "Abdullah Al Maksud <onboarding@resend.dev>",
      to: email,
      subject: "Got your message — Abdullah Al Maksud",
      html: `
        <div style="font-family: monospace; max-width: 560px; margin: 0 auto; border: 2px solid #1a1a1a; padding: 32px; background: #faf9f6;">
          <h2 style="font-size: 18px; margin: 0 0 8px;">Hey ${name} 👋</h2>
          <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 24px;">
            Thanks for reaching out! I've received your message and will get back to you within 24 hours.
          </p>
          <div style="background: #f0ede8; padding: 16px; border-left: 3px solid #e07f3a;">
            <p style="font-size: 12px; color: #666; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">Your message</p>
            <p style="margin: 0; font-size: 13px; line-height: 1.7; color: #555; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 14px; line-height: 1.7;">
            Talk soon,<br/>
            <strong>Abdullah Al Maksud</strong><br/>
            <span style="color: #2d6a4f; font-size: 13px;">Programmer · Writer · Designer</span>
          </p>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            — abdullahalmaksud.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] Email send error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
