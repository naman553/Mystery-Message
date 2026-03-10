import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT ?? "587");
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const mailFrom = process.env.MAIL_FROM ?? smtpUser;

export function getMailerConfigError() {
  const missingVars = [
    !smtpHost && "SMTP_HOST",
    !smtpPort && "SMTP_PORT",
    !smtpUser && "SMTP_USER",
    !smtpPass && "SMTP_PASS",
    !mailFrom && "MAIL_FROM or SMTP_USER",
  ].filter(Boolean);

  if (missingVars.length === 0) {
    return null;
  }

  return `Missing mail configuration: ${missingVars.join(", ")}`;
}

const configError = getMailerConfigError();
if (configError) {
  console.warn(configError);
}

export const mailer = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
});
