'use client';

import FieldSetWithStatus from '@/components/FieldSetWithStatus';
import InfoBlock from '@/components/InfoBlock';
import SubmitButtonWithStatus from '@/components/SubmitButtonWithStatus';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import ErrorNote from '@/components/ErrorNote';
import { useTranslations } from 'next-intl';
import CountrySelector from '@/components/CountrySelector';
import { COUNTRIES } from '@/components/CountrySelector/countries';
import { SelectMenuOption } from '@/components/CountrySelector/types';

export default function CheckOutForm() {
  const t = useTranslations('checkout');

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

  const [response, action] = useFormState(() => {
    alert('Bonnnnsoiiiiiirreeuh');
  }, undefined);

  const myRef = React.createRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    emailRef.current?.focus();
  }, []);

  const isFormValid =
    email.length > 0 && firstName.length > 0 && lastName.length > 0 && phone.length > 0 && address.length > 0;

  return (
    <InfoBlock>
      <form action={action}>
        <div className="space-y-8">
          {response === undefined && <ErrorNote>{t('form.invalid_fields')}</ErrorNote>}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <FieldSetWithStatus
                id="email"
                required
                inputRef={emailRef}
                label={t('form.fields.email')}
                type="email"
                value={email}
                onChange={setEmail}
              />
              <FieldSetWithStatus
                id="firstName"
                required
                label={t('form.fields.firstName')}
                type="text"
                value={firstName}
                onChange={setFirstName}
              />
              <FieldSetWithStatus
                id="lastName"
                required
                label={t('form.fields.lastName')}
                type="text"
                value={lastName}
                onChange={setLastName}
              />
              <FieldSetWithStatus
                id="phone"
                required
                label={t('form.fields.phone')}
                type="text"
                value={phone}
                onChange={setPhone}
              />
              <div className="pt-4">
                <SubmitButtonWithStatus disabled={!isFormValid}>Placer la commande</SubmitButtonWithStatus>
              </div>
            </div>
            <div className="space-y-4">
              <FieldSetWithStatus
                id="building"
                label={t('form.fields.building')}
                type="text"
                value={building}
                onChange={setBuilding}
              />
              <FieldSetWithStatus
                id="address"
                required
                label={t('form.fields.address')}
                type="text"
                value={address}
                onChange={setAddress}
              />
              <FieldSetWithStatus
                id="city"
                required
                label={t('form.fields.city')}
                type="text"
                value={city}
                onChange={setCity}
              />
              <FieldSetWithStatus
                id="postal_code"
                required
                label={t('form.fields.postal_code')}
                type="text"
                value={postalCode}
                onChange={setPostalCode}
              />
              <FieldSetWithStatus
                id="province"
                label={t('form.fields.province')}
                type="text"
                value={province}
                onChange={setProvince}
              />
              <CountrySelector
                id={'countries'}
                required
                label={t('form.fields.country')}
                open={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                onChange={(val) => setCountry(val)}
                // We use this type assertion because we are always sure this find will return a value but need to let TS know since it could technically return null
                selectedValue={COUNTRIES.find((option) => option.value === country) as SelectMenuOption}
              />
            </div>
          </div>
          <InfoBlock>
            Après le placement de votre commande, nous vous contacterons sous 2 jours ouvrés avec les informations pour
            procéder au paiement.
          </InfoBlock>
        </div>
      </form>
    </InfoBlock>
  );
}
