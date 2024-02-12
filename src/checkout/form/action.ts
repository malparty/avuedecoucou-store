'use server';

import { Cart } from '../cart/Cart';
import { CustomerInfo } from '../order/customerInfo';
import { render } from '@react-email/render';
import OrderConfirmationTemplate from '@/../emails/OrderConfirmationTemplate';
import { sendMail } from '@/utility/emails';

const submitCheckoutForm = async(customerInfo: CustomerInfo, cart: Cart) => {
  customerInfo.validate();

  if(customerInfo.errors.length > 0) {
    return undefined;
  }

  // Send order placement email.
  await sendMail({
    to: customerInfo.email,
    bcc: process.env.NODEMAILER_EMAIL_TO || '',
    subject: 'Votre commande de photos sur A Vue De Coucou',
    html: render(OrderConfirmationTemplate(customerInfo, cart)),
  });

  // If success, send confirmation email

  return customerInfo;
};

export { submitCheckoutForm };