import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

type EmailPayload = {
  to: string
  subject: string
  html: string
}

export async function sendMail(data: EmailPayload) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const mailOptions :Mail.Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log('Email Sent', info);
      return true;
    }
  });
}