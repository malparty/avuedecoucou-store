import { Cart } from '@/checkout/cart/models/Cart';
import { FORMATS } from '@/checkout/data';
import { CustomerInfo } from '@/checkout/order/customerInfo';
import { BASE_URL } from '@/site/config';
import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { getTranslations } from 'next-intl/server';

export default async function OrderConfirmationTemplate(customerInfo: CustomerInfo, cart: Cart, locale: string) {
  const t = await getTranslations({locale: locale, namespace: 'confirm_email'});
  const now = new Date();

  return (
    <Html>
      <Head />
      <Preview>{t('order_received')}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row>
              <Column>
                <Img
                  src={`${BASE_URL}/img/assets/logo_txt.png`}
                  width="217"
                  height="42"
                  alt="Logo A Vue de Coucou"
                />
              </Column>
              <Column align="right" style={tableCell}>
                <Text style={heading}>{t('order_placed')}</Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Text style={cupomText}>
              {t('order_received')}
              <br />
              {t('next_step')}
            </Text>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>{t('name')}</Text>
                      <Text style={informationTableValue}>
                        {customerInfo.lastName} {customerInfo.firstName}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>{t('date')}</Text>
                      <Text style={informationTableValue}>
                        {now.getDate()}/{now.getMonth()}/{now.getFullYear()}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>{t('email')}</Text>
                      <Link
                        style={{
                          ...informationTableValue,
                          color: '#15c',
                          textDecoration: 'underline',
                        }}
                      >
                        {customerInfo.email}
                      </Link>
                    </Column>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>{t('phone')}</Text>
                      <Link
                        style={{
                          ...informationTableValue,
                          color: '#15c',
                          textDecoration: 'underline',
                        }}
                      >
                        {customerInfo.phone}
                      </Link>
                    </Column>
                  </Row>
                </Section>
              </Column>
              <Column style={informationTableColumn} colSpan={2}>
                <Row>
                  <Text style={informationTableLabel}>
                    {customerInfo.useSameAddress ? t('address_shipping_and_invoice') : t('address_shipping')}
                  </Text>
                  {(customerInfo.shippingFirstName || customerInfo.shippingLastName) &&
                    (<Text style={informationTableValue}>
                      {customerInfo.shippingFirstName} {customerInfo.shippingLastName}
                    </Text>
                    )}
                  <Text style={informationTableValue}>{customerInfo.shippingBuilding}</Text>
                  <Text style={informationTableValue}>{customerInfo.shippingAddress}</Text>
                  <Text style={informationTableValue}>
                    {[customerInfo.shippingCity, customerInfo.shippingPostalCode].join(' - ')}
                  </Text>
                  <Text style={informationTableValue}>
                    {[customerInfo.shippingProvince, customerInfo.shippingCountry].filter(x => x).join(' - ')}
                  </Text>
                </Row>
                { !customerInfo.useSameAddress &&
                  <Row>
                    <Text style={informationTableLabel}>
                      {t('address_invoice')}
                    </Text>
                    {(customerInfo.invoiceFirstName || customerInfo.invoiceLastName) &&
                      (<Text style={informationTableValue}>
                        {customerInfo.invoiceFirstName} {customerInfo.invoiceLastName}
                      </Text>
                      )}
                    <Text style={informationTableValue}>{customerInfo.invoiceBuilding}</Text>
                    <Text style={informationTableValue}>{customerInfo.invoiceAddress}</Text>
                    <Text style={informationTableValue}>
                      {[customerInfo.invoiceCity, customerInfo.invoicePostalCode].join(' - ')}
                    </Text>
                    <Text style={informationTableValue}>
                      {[customerInfo.invoiceProvince, customerInfo.invoiceCountry].filter(x => x).join(' - ')}
                    </Text>
                  </Row>
                }
              </Column>
            </Row>
          </Section>
          <Section style={productTitleTable}>
            <Text style={productsTitle}>{t('photos')}</Text>
          </Section>
          <Section>
            {cart.getItems().map((item, index) => (
              <Row key={index}>
                <Column style={{ width: '64px' }}>
                  <Img
                    src={`${BASE_URL}/${item.photoUrl}`}
                    width="64"
                    height="64"
                    alt={`Photo: ${item.photoTitle}`}
                    style={productIcon}
                  />
                </Column>
                <Column style={{ paddingLeft: '22px' }}>
                  <Text style={productTitle}>{item.photoTitle}</Text>
                  <Text style={productDescription}>{FORMATS[item.formatKey]} {item.support}</Text>
                  <Text style={productDescription}>
                    {item.quantity} x {item.unitPrice()}EUR
                  </Text>
                  <Link
                    href={`${BASE_URL}/photo/${item.photoId}`}
                    style={productLink}
                  >
                    {t('see_item')}
                  </Link>
                </Column>

                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>{item.totalPrice()}EUR</Text>
                </Column>
              </Row>
            ))}
          </Section>
          <Hr style={productPriceLine} />
          <Section align="right">
            <Row>
              <Column style={tableCell} align="right">
                <Text style={productPriceTotal}>TOTAL</Text>
              </Column>
              <Column style={productPriceVerticalLine}></Column>
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceLarge}>{cart.totalPrice()}EUR</Text>
              </Column>
            </Row>
          </Section>
          <Text style={footerText}>
            {t('shipping')}<br />
            {t('payment')}<br />
            {t('tax')}
          </Text>
          <Text style={footerCopyright}>
            Copyright © { now.getFullYear() } A Vue de Coucou. <br />{' '}
            <Link href="https://avuedecoucou.com/">{t('rights')}</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: '#ffffff',
};

const resetText = {
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '660px',
  maxWidth: '100%',
};

const tableCell = { display: 'table-cell' };

const heading = {
  fontSize: '28px',
  fontWeight: '300',
  color: '#888888',
};

const cupomText = {
  textAlign: 'center' as const,
  margin: '36px 0 40px 0',
  fontSize: '14px',
  fontWeight: '500',
  color: '#111111',
};

const informationTable = {
  borderCollapse: 'collapse' as const,
  borderSpacing: '0px',
  color: 'rgb(51,51,51)',
  backgroundColor: 'rgb(250,250,250)',
  borderRadius: '3px',
  fontSize: '12px',
};

const informationTableRow = {
  height: '46px',
};

const informationTableColumn = {
  paddingLeft: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '0px 1px 1px 0px',
  height: '44px',
};

const informationTableLabel = {
  ...resetText,
  color: 'rgb(102,102,102)',
  fontSize: '10px',
};

const informationTableValue = {
  fontSize: '12px',
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: '30px 0 15px 0',
  height: '24px',
};

const productsTitle = {
  background: '#fafafa',
  paddingLeft: '10px',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
};

const productIcon = {
  margin: '0 0 0 20px',
  borderRadius: '14px',
  border: '1px solid rgba(128,128,128,0.2)',
};

const productTitle = { fontSize: '12px', fontWeight: '600', ...resetText };

const productDescription = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  ...resetText,
};

const productLink = {
  fontSize: '12px',
  color: 'rgb(0,112,201)',
  textDecoration: 'none',
};

const productPriceTotal = {
  margin: '0',
  color: 'rgb(102,102,102)',
  fontSize: '10px',
  fontWeight: '600',
  padding: '0px 30px 0px 0px',
  textAlign: 'right' as const,
};

const productPrice = {
  fontSize: '12px',
  fontWeight: '600',
  margin: '0',
};

const productPriceLarge = {
  margin: '0px 20px 0px 0px',
  fontSize: '16px',
  fontWeight: '600',
  whiteSpace: 'nowrap' as const,
  textAlign: 'right' as const,
};

const productPriceWrapper = {
  display: 'table-cell',
  padding: '0px 20px 0px 0px',
  width: '100px',
  verticalAlign: 'top',
};

const productPriceLine = { margin: '30px 0 0 0' };

const productPriceVerticalLine = {
  height: '48px',
  borderLeft: '1px solid',
  borderColor: 'rgb(238,238,238)',
};

const productPriceLargeWrapper = { display: 'table-cell', width: '90px' };

const footerText = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  margin: '0',
  lineHeight: 'auto',
  marginBottom: '16px',
};

const footerCopyright = {
  margin: '25px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
};
