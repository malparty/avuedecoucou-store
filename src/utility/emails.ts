'use server';

import { createTransport } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

type EmailPayload = {
  to: string
  bcc: string
  subject: string
  html: string
}

export async function sendMail(data: EmailPayload) {
  const transporter = createTransport({
    service: 'gmail',
    port: 465,
    auth: {
      user: process.env.NODEMAILER_EMAIL_FROM,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const mailOptions :Options = {
    from: process.env.NODEMAILER_EMAIL_FROM,
    to: data.to,
    bcc: data.bcc,
    subject: data.subject,
    html: data.html,
  };

  const sendMail = () => {
    return new Promise(resolve => {

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error('CANNOT SEND Email', info);

          return resolve(false);
        } else {
          return resolve(true);
        }
      });
    });
  };

  await sendMail();
}