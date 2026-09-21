import nodemailer from "nodemailer";

export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
}

const DEFAULT_SUPPORT_EMAIL = "neha38982425@gmail.com";

// Sanitize string to prevent email header injection
function sanitizeHeader(input: string): string {
  return input.replace(/[\r\n]+/g, " ").trim();
}

// Escape HTML special characters for safe email rendering
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getTransporter() {
  const host = process.env.MAIL_HOST || process.env.SMTP_HOST;
  const port = parseInt(process.env.MAIL_PORT || process.env.SMTP_PORT || "587", 10);
  const user = process.env.MAIL_USERNAME || process.env.SMTP_USER || process.env.MAIL_USER;
  const pass = process.env.MAIL_PASSWORD || process.env.SMTP_PASS || process.env.MAIL_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
    });
  }

  // Fallback for development/testing when SMTP is not configured
  return null;
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const supportEmail = process.env.SUPPORT_EMAIL || DEFAULT_SUPPORT_EMAIL;
  const mailFrom = process.env.MAIL_FROM || `lovebite.com Support <support@lovebite.com>`;

  const cleanName = sanitizeHeader(payload.name);
  const cleanEmail = sanitizeHeader(payload.email);
  const timestamp = new Date().toUTCString();

  const subject = `[Contact Support] New Message from ${cleanName}`;

  const textBody = `New Contact Support Message

Name: ${cleanName}
Email: ${cleanEmail}

Message:
${payload.message.trim()}

Submitted At:
${timestamp}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f8; margin: 0; padding: 24px; color: #333333; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
    .header { background: #8B0000; color: #ffffff; padding: 20px 24px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .content { padding: 24px; }
    .field-row { margin-bottom: 16px; }
    .label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #666666; margin-bottom: 4px; }
    .value { font-size: 15px; color: #1a1a1a; }
    .message-box { background: #f9f9fb; border-left: 4px solid #c41e3a; padding: 14px 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
    .footer { background: #f7f7f8; border-top: 1px solid #eeeeee; padding: 14px 24px; font-size: 12px; color: #888888; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Support Message</h1>
    </div>
    <div class="content">
      <div class="field-row">
        <div class="label">Sender Name</div>
        <div class="value">${escapeHtml(cleanName)}</div>
      </div>
      <div class="field-row">
        <div class="label">Sender Email</div>
        <div class="value"><a href="mailto:${escapeHtml(cleanEmail)}" style="color: #c41e3a;">${escapeHtml(cleanEmail)}</a></div>
      </div>
      <div class="field-row">
        <div class="label">Message Content</div>
        <div class="message-box">${escapeHtml(payload.message.trim())}</div>
      </div>
      <div class="field-row">
        <div class="label">Submitted At</div>
        <div class="value">${escapeHtml(timestamp)}</div>
      </div>
    </div>
    <div class="footer">
      This inquiry was submitted via the lovebite.com Contact Support form and addressed to ${escapeHtml(supportEmail)}.
    </div>
  </div>
</body>
</html>
`.trim();

  const transporter = getTransporter();

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: mailFrom,
        to: supportEmail,
        replyTo: cleanEmail,
        subject: subject,
        text: textBody,
        html: htmlBody,
      });
      console.log(`[Email Sent] Message ID: ${info.messageId} to ${supportEmail}`);
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      console.error("[Email Error] Failed to send via SMTP:", err);
      return { success: false, error: err.message || "Failed to deliver email" };
    }
  }

  // Development simulation / logging when SMTP credentials are not yet configured
  console.log("==================================================");
  console.log(" [DEV EMAIL LOGGER] (SMTP credentials not configured)");
  console.log(` TO: ${supportEmail}`);
  console.log(` FROM: ${mailFrom}`);
  console.log(` REPLY-TO: ${cleanEmail}`);
  console.log(` SUBJECT: ${subject}`);
  console.log("--------------------------------------------------");
  console.log(textBody);
  console.log("==================================================");

  return { success: true, messageId: "dev-simulated-" + Date.now() };
}
