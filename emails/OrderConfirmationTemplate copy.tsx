import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';
import { CustomerInfo } from '@/checkout/order/customerInfo';
import { Cart } from '@/checkout/cart/models/Cart';
import { getTranslations } from 'next-intl/server';

export default async function OrderConfirmationTemplate(customerInfo: CustomerInfo, cart: Cart, locale: string) {
  const t = await getTranslations({locale: locale, namespace: 'confirm_email'});
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={paragraphBold}>{t('order_received')}</Text>
          <Text style={paragraph}>{t('next_step')}</Text>
          <Text style={heading}>{t('contact_info')} </Text>
          <Text style={paragraph}>{t('name')}: {customerInfo.lastName} {customerInfo.firstName}</Text>
          <Text style={paragraph}>{t('phone')}: {customerInfo.phone}</Text>
          <Text style={paragraph}>{t('email')}: {customerInfo.email}</Text>
          <Container style={container}>
            <Text style={heading2}>
              {customerInfo.useSameAddress ? t('address_shipping_and_invoice') : t('address_shipping')}
            </Text>
            <Text style={paragraph}>{customerInfo.shippingBuilding}</Text>
            <Text style={paragraph}>{customerInfo.shippingAddress}</Text>
            <Text style={paragraph}>{customerInfo.shippingPostalCode} – {customerInfo.shippingCity}</Text>
            <Text style={paragraph}>{customerInfo.shippingProvince} / {customerInfo.shippingCountry}</Text>
          </Container>

          { !customerInfo.useSameAddress &&
            <Container style={container}>
              <Text style={heading2}>{t('address_invoice')}</Text>
              <Text style={paragraph}>
                {customerInfo.invoiceBuilding}<br />
                {customerInfo.invoiceAddress}<br />
                {[customerInfo.invoicePostalCode, customerInfo.invoiceCity].filter(x => x).join(' - ')}<br />
                {[customerInfo.invoiceProvince, customerInfo.invoiceCountry].filter(x => x).join(' - ')}
              </Text>
            </Container>
          }
          <Text style={heading}>{t('your_order')}: </Text>
          <Text style={heading2}>{t('total')}: {cart.totalPrice()}</Text>
          <Text style={heading2}>{t('photos')}: </Text>
          {cart.getItems().map((item, index) => (
            <Text style={paragraph} key={index}>
              {item.photoTitle} ({item.formatKey} / {item.support})<br />
              {item.quantity} x {item.unitPrice()} = {item.totalPrice()}EUR
            </Text>
          ))}
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '720px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const heading2 = {
  fontSize: '24px',
  lineHeight: '1.2',
  fontWeight: '700',
  color: '#484848',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
};

const paragraphBold = {
  fontSize: '18px',
  fontWeight: 'bold',
  lineHeight: '1.4',
  color: '#484848',
};