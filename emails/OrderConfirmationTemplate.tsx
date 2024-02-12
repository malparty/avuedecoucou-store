import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';
import { CustomerInfo } from '@/checkout/order/customerInfo';
import { Cart } from '@/checkout/cart/Cart';

export default function OrderConfirmationTemplate(customerInfo: CustomerInfo, cart: Cart) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Votre commande de photos sur A Vue De Coucou a bien été reçue!</Text>
          <Text style={paragraph}>Nous vous contacterons sous 5 jours ouvrés pour le paiement.</Text>
          <Text style={heading}>Vos coordonnées:</Text>
          <Text style={paragraph}>Nom, Prénom: {customerInfo.lastName}, {customerInfo.firstName}</Text>
          <Text style={paragraph}>Téléphone: {customerInfo.phone}</Text>
          <Text style={paragraph}>Email: {customerInfo.email}</Text>
          <Text style={paragraph}>Address:</Text>
          <Text style={paragraph}>{customerInfo.building}</Text>
          <Text style={paragraph}>{customerInfo.address}</Text>
          <Text style={paragraph}>{customerInfo.postalCode} – {customerInfo.city}</Text>
          <Text style={paragraph}>{customerInfo.province} / {customerInfo.country}</Text>
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
  width: '580px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
};