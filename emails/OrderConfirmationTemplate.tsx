import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';
import { CustomerInfo } from '@/checkout/order/customerInfo';
import { Cart } from '@/checkout/cart/models/Cart';

export default function OrderConfirmationTemplate(customerInfo: CustomerInfo, cart: Cart) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={paragraphBold}>Votre commande de photos sur A Vue De Coucou a bien été reçue!</Text>
          <Text style={paragraph}>Nous vous contacterons sous 5 jours ouvrés pour le paiement.</Text>
          <Text style={heading}>Vos coordonnées:</Text>
          <Text style={paragraph}>Nom, Prénom: {customerInfo.lastName}, {customerInfo.firstName}</Text>
          <Text style={paragraph}>Téléphone: {customerInfo.phone}</Text>
          <Text style={paragraph}>Email: {customerInfo.email}</Text>
          <Container style={container}>
            <Text style={heading2}>Shipping{customerInfo.useSameAddress && ' and Invoice'} Address:</Text>
            <Text style={paragraph}>{customerInfo.shippingBuilding}</Text>
            <Text style={paragraph}>{customerInfo.shippingAddress}</Text>
            <Text style={paragraph}>{customerInfo.shippingPostalCode} – {customerInfo.shippingCity}</Text>
            <Text style={paragraph}>{customerInfo.shippingProvince} / {customerInfo.shippingCountry}</Text>
          </Container>

          { !customerInfo.useSameAddress &&
            <Container style={container}>
              <Text style={heading2}>Invoice Address:</Text>
              <Text style={paragraph}>{customerInfo.invoiceBuilding}</Text>
              <Text style={paragraph}>{customerInfo.invoiceAddress}</Text>
              <Text style={paragraph}>{customerInfo.invoicePostalCode} – {customerInfo.invoiceCity}</Text>
              <Text style={paragraph}>{customerInfo.invoiceProvince} / {customerInfo.invoiceCountry}</Text>
            </Container>
          }
          <Text style={heading}>Votre commande:</Text>
          <Text style={paragraph}>Total: {cart.totalPrice()}</Text>
          <Text style={paragraph}>Photos:</Text>
          {cart.getItems().map((item, index) => (
            <Container key={index} style={container}>
              <Text style={paragraph}>{item.photoTitle} ({item.formatKey} / {item.support})</Text>
              <Text style={paragraph}>{item.quantity}x{item.unitPrice()}EUR</Text>
              <Text style={paragraph}>{item.totalPrice()}EUR</Text>
            </Container>
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