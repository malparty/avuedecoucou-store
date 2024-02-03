import { render } from '@react-email/render';
import OrderConfirmationTemplate from '@/../emails/OrderConfirmationTemplate';
import { sendMail } from '@/utility/emails';

export default async function SendEmailPage() {
  await sendMail({
    to: process.env.NODEMAILER_EMAIL_TO || '',
    subject: 'Welcome to A vue de coucou.com!',
    html: render(OrderConfirmationTemplate()),
  });

  return <h1>Email sent!</h1>;
}
