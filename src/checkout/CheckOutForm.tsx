'use client';

import FieldSetWithStatus from '@/components/FieldSetWithStatus';
import InfoBlock from '@/components/InfoBlock';
import SubmitButtonWithStatus from '@/components/SubmitButtonWithStatus';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import ErrorNote from '@/components/ErrorNote';
import { useLocale, useTranslations } from 'next-intl';
import { CustomerInfo } from './order/customerInfo';
import { OrderApiBodyParams } from '@/app/api/order/route';
import { CartClient } from './cart/models/CartClient';
import { useAppState } from '@/state';
import { Link, useRouter } from '@/navigation';
import AddressField from './AddressField';
import { CART_ITEMS_KEY, LAST_ORDER_KEY } from './cart/models/constants';

export default function CheckOutForm() {
  const t = useTranslations('checkout');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  // Shipping address
  const [shippingFirstName, setShippingFirstName] = useState('');
  const [shippingLastName, setShippingLastName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingBuilding, setShippingBuilding] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [shippingProvince, setShippingProvince] = useState('');
  const [shippingCountry, setShippingCountry] = useState('FR');
  // Invoice address
  const [invoiceFirstName, setInvoiceFirstName] = useState('');
  const [invoiceLastName, setInvoiceLastName] = useState('');
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [invoiceAddress, setInvoiceAddress] = useState('');
  const [invoiceBuilding, setInvoiceBuilding] = useState('');
  const [invoiceCity, setInvoiceCity] = useState('');
  const [invoicePostalCode, setInvoicePostalCode] = useState('');
  const [invoiceProvince, setInvoiceProvince] = useState('');
  const [invoiceCountry, setInvoiceCountry] = useState('FR');

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const {setCartCount, cartCount} = useAppState();

  const currentCustomerInfo = () => new CustomerInfo({
    firstName,
    lastName,
    email,
    phone,
    shippingFirstName,
    shippingLastName,
    shippingAddress,
    shippingBuilding,
    shippingCity,
    shippingPostalCode,
    shippingProvince,
    shippingCountry,
    invoiceFirstName,
    invoiceLastName,
    invoiceAddress,
    invoiceCity,
    invoiceCountry,
    invoicePostalCode,
    invoiceBuilding,
    invoiceProvince,
    useSameAddress,
  });


  const submitCheckoutForm = async () => {
    const customerInfo = currentCustomerInfo();

    customerInfo.validate();
    if(customerInfo.errors.length > 0) {
      return {success: false, customerInfo: customerInfo};
    }

    const bodyObject :OrderApiBodyParams = {
      customerInfoData: customerInfo,
      items: new CartClient().getItems(),
      locale: locale,
    };
    const body = JSON.stringify(bodyObject);

    const resp = await fetch('/api/order', {
      method: 'POST',
      body: body,
    });

    if(resp.status !== 200) {
      return {success: false, customerInfo: customerInfo};
    }

    localStorage.setItem(LAST_ORDER_KEY, body);
    localStorage.removeItem(CART_ITEMS_KEY);

    if(setCartCount) setCartCount(0);

    return router.push('/confirmation');
  };

  const [formState, formAction] = useFormState(submitCheckoutForm, {
    success: true,
    customerInfo: currentCustomerInfo(),
  });

  const firstNameRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  if(!isClient) {
    return (
      <InfoBlock>
        {t('loading')}
      </InfoBlock>);
  }

  if(!cartCount || cartCount === 0){
    return (
      <InfoBlock>
        <div>{t('form.no_item_yet')}</div>
        <Link className="font-bold" href="/">{t('form.explore_and_start')}</Link>
      </InfoBlock>);
  }

  return (
    <InfoBlock>
      <form action={formAction} data-testid="checkout-form">
        <div className="space-y-8">
          {formState?.success === false && <ErrorNote>{t('form.invalid_fields')}</ErrorNote>}
          <div className="text-3xl font-bold">{t('form.title_contact')}</div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldSetWithStatus
                id="firstName"
                inputRef={firstNameRef}
                required
                label={t('form.fields.firstName')}
                type="text"
                value={firstName}
                onChange={setFirstName}
                error={formState?.customerInfo?.fieldErrorMessage('firstName', t)}
              />
              <FieldSetWithStatus
                id="lastName"
                required
                label={t('form.fields.lastName')}
                type="text"
                value={lastName}
                onChange={setLastName}
                error={formState?.customerInfo?.fieldErrorMessage('lastName', t)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldSetWithStatus
                id="email"
                required
                label={t('form.fields.email')}
                type="email"
                value={email}
                onChange={setEmail}
                error={formState?.customerInfo?.fieldErrorMessage('email', t)}
              />
              <FieldSetWithStatus
                id="phone"
                required
                label={t('form.fields.phone')}
                type="tel"
                value={phone}
                onChange={setPhone}
                error={formState?.customerInfo?.fieldErrorMessage('phone', t)}
              />
            </div>
          </div>

          <div  className="text-3xl font-bold">{t('form.title_shipping_address')}</div>
          <AddressField customerInfo={formState?.customerInfo}
            prefix="shipping"
            firstName={shippingFirstName} setFirstName={setShippingFirstName}
            lastName={shippingLastName} setLastName={setShippingLastName}
            address={shippingAddress} setAddress={setShippingAddress}
            building={shippingBuilding} setBuilding={setShippingBuilding}
            city={shippingCity} setCity={setShippingCity}
            postalCode={shippingPostalCode} setPostalCode={setShippingPostalCode}
            province={shippingProvince} setProvince={setShippingProvince}
            country={shippingCountry} setCountry={setShippingCountry}/>

          <div className="flex justify-between">
            <div  className="text-3xl font-bold">{t('form.title_invoice_address')}</div>
            <FieldSetWithStatus
              id="UseSameAddress"
              label={t('form.invoice_address_same')}
              type="checkbox"
              value={useSameAddress ? 'true' : 'false'}
              onChange={() => setUseSameAddress(!useSameAddress)}
            />
          </div>

          { !useSameAddress && <AddressField customerInfo={formState?.customerInfo}
            prefix="invoice"
            firstName={invoiceFirstName} setFirstName={setInvoiceFirstName}
            lastName={invoiceLastName} setLastName={setInvoiceLastName}
            address={invoiceAddress} setAddress={setInvoiceAddress}
            building={invoiceBuilding} setBuilding={setInvoiceBuilding}
            city={invoiceCity} setCity={setInvoiceCity}
            postalCode={invoicePostalCode} setPostalCode={setInvoicePostalCode}
            province={invoiceProvince} setProvince={setInvoiceProvince}
            country={invoiceCountry} setCountry={setInvoiceCountry}/>
          }
          <div className="pt-4">
            <SubmitButtonWithStatus className="min-w-full font-bold">
              {t('form.order')}
            </SubmitButtonWithStatus>
          </div>
          <InfoBlock>{t('form.bottom_instructions')}</InfoBlock>
        </div>
      </form>
    </InfoBlock>
  );
}
