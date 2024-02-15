'use client';

import FieldSetWithStatus from '@/components/FieldSetWithStatus';
import InfoBlock from '@/components/InfoBlock';
import SubmitButtonWithStatus from '@/components/SubmitButtonWithStatus';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import ErrorNote from '@/components/ErrorNote';
import { useLocale, useTranslations } from 'next-intl';
import CountrySelector from '@/components/CountrySelector';
import { COUNTRIES } from '@/components/CountrySelector/countries';
import { SelectMenuOption } from '@/components/CountrySelector/types';
import { CustomerInfo } from './order/customerInfo';
import { OrderApiBodyParams } from '@/app/api/order/route';
import { CartClient } from './cart/models/CartClient';
import { useAppState } from '@/state';
import { Link } from '@/navigation';

export default function CheckOutForm() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const countries = COUNTRIES[locale as 'en' | 'fr' | 'de'];

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [building, setBuilding] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('FR');

  const [isOpen, setIsOpen] = useState(false);
  const {cartCount} = useAppState();

  const currentCustomerInfo = () => new CustomerInfo({
    address,
    city,
    country,
    email,
    firstName,
    lastName,
    phone,
    postalCode,
    building,
    province,
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
    };
    const body = JSON.stringify(bodyObject);

    const resp = await fetch('/api/order', {
      method: 'POST',
      body: body,
    });

    if(resp.status !== 200) {
      return {success: false, customerInfo: customerInfo};
    }

    localStorage.setItem('LastConfirmedOrder', body);

    return alert('TODO: redirect to order confirmation page');
  };

  const [formState, formAction] = useFormState(submitCheckoutForm, {
    success: true,
    customerInfo: currentCustomerInfo(),
  });

  const firstNameRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  if(!cartCount || cartCount === 0){
    return (
      <InfoBlock>
        <div>{t('form.no_item_yet')}</div>
        <Link className="font-bold" href="/">{t('form.explore_and_start')}</Link>
      </InfoBlock>);
  }

  return (
    <InfoBlock>
      <form action={formAction}>
        <div className="space-y-8">
          {formState?.success === false && <ErrorNote>{t('form.invalid_fields')}</ErrorNote>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
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
            <div className="space-y-4">
              <FieldSetWithStatus
                id="building"
                label={t('form.fields.building')}
                type="text"
                value={building}
                onChange={setBuilding}
                error={formState?.customerInfo?.fieldErrorMessage('building', t)}
              />
              <FieldSetWithStatus
                id="address"
                required
                label={t('form.fields.address')}
                type="text"
                value={address}
                onChange={setAddress}
                error={formState?.customerInfo?.fieldErrorMessage('address', t)}
              />
              <FieldSetWithStatus
                id="city"
                required
                label={t('form.fields.city')}
                type="text"
                value={city}
                onChange={setCity}
                error={formState?.customerInfo?.fieldErrorMessage('city', t)}
              />
              <FieldSetWithStatus
                id="postalCode"
                required
                label={t('form.fields.postalCode')}
                type="text"
                value={postalCode}
                onChange={setPostalCode}
                error={formState?.customerInfo?.fieldErrorMessage('postalCode', t)}
              />
              <FieldSetWithStatus
                id="province"
                label={t('form.fields.province')}
                type="text"
                value={province}
                onChange={setProvince}
                error={formState?.customerInfo?.fieldErrorMessage('province', t)}
              />
              <CountrySelector
                id={'countries'}
                countries={countries}
                required
                label={t('form.fields.country')}
                open={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                onChange={(val) => setCountry(val)}
                error={formState?.customerInfo?.fieldErrorMessage('countries', t)}
                // We use this type assertion because we are always sure this find will return a value
                // but need to let TS know since it could technically return null
                selectedValue={
                  countries.find((option: SelectMenuOption) => option.value === country) as SelectMenuOption
                }
              />
            </div>
          </div>
          <div className="pt-4">
            <SubmitButtonWithStatus className="min-w-full">
              {t('form.order')}
            </SubmitButtonWithStatus>
          </div>
          <InfoBlock>{t('form.bottom_instructions')}</InfoBlock>
        </div>
      </form>
    </InfoBlock>
  );
}
