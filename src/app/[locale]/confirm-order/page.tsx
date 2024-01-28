import { render } from '@react-email/render';
import OrderConfirmationTemplate from '@/../emails/OrderConfirmationTemplate';
import { sendMail } from '@/utility/emails';

export default async function SendEmailPage() {
  await sendMail({
    to: 'xavv1m@gmail.com',
    subject: 'Welcome to A vue de coucou.com!',
    html: render(OrderConfirmationTemplate()),
  });

  return <h1>Email sent!</h1>;
}
