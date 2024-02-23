import { CustomerInfo, CustomerInfoParams } from '@/checkout/order/customerInfo';
import { sendMail } from '@/utility/emails';
import { render } from '@react-email/render';
import { NextRequest } from 'next/server';
import OrderConfirmationTemplate from '../../../../emails/OrderConfirmationTemplate';
import { CartItemProps } from '@/checkout/cart/models/CartTypes';
import { CartItem } from '@/checkout/cart/models/CartItem';
import { Cart } from '@/checkout/cart/models/Cart';

export interface OrderApiBodyParams { customerInfoData: CustomerInfoParams, items: CartItemProps[]};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { customerInfoData, items }: OrderApiBodyParams = body;

  const customerInfo = new CustomerInfo(customerInfoData);

  customerInfo.validate();

  if(customerInfo.errors.length > 0)
    return Response.json({data: {success: false, customerInfo: customerInfo}}, {status: 422});

  customerInfo.validate();

  if(customerInfo.errors.length > 0) {
    return Response.json({data: {success: false, customerInfo: customerInfo}}, {status: 422});
  }
  const cart = new Cart(items.map(i => (new CartItem(i))));

  console.log('HERRRERERERERER');
  console.log('MAIL TO:', customerInfo.email);
  console.log('MAIL BCC:', process.env.NODEMAILER_EMAIL_TO);
  // Send order placement email.
  await sendMail({
    to: customerInfo.email,
    bcc: process.env.NODEMAILER_EMAIL_TO || '',
    subject: 'Votre commande de photos sur A Vue De Coucou',
    html: render(OrderConfirmationTemplate(customerInfo, cart)),
  });
  return Response.json({data: {success: true, customerInfo: customerInfo}}, {status: 200});
}
