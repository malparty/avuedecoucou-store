import FieldSetWithStatus from '@/components/FieldSetWithStatus';
import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import CountrySelector from '@/components/CountrySelector';
import { COUNTRIES } from '@/components/CountrySelector/countries';
import { SelectMenuOption } from '@/components/CountrySelector/types';
import { CustomerInfo } from './order/customerInfo';

interface AddressFieldProps {
  customerInfo?: CustomerInfo
  prefix: string

  address: string,
  building: string,
  city: string,
  postalCode: string,
  province: string,
  country: string,

  setAddress: (value: string) => void,
  setBuilding: (value: string) => void,
  setCity: (value: string) => void,
  setPostalCode: (value: string) => void,
  setProvince: (value: string) => void,
  setCountry: (value: string) => void
}
export default function AddressField({
  customerInfo,
  prefix,
  address, setAddress,
  building, setBuilding,
  city, setCity,
  postalCode, setPostalCode,
  province, setProvince,
  country, setCountry}: AddressFieldProps
) {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const countries = COUNTRIES[locale as 'en' | 'fr' | 'de'];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <FieldSetWithStatus
          id={`${prefix}Building`}
          label={t('form.fields.building')}
          type="text"
          value={building}
          onChange={setBuilding}
          error={customerInfo?.fieldErrorMessage(`${prefix}Building`, t)}
        />

        <FieldSetWithStatus
          id={`${prefix}Address`}
          required
          label={t('form.fields.address')}
          type="text"
          value={address}
          onChange={setAddress}
          error={customerInfo?.fieldErrorMessage(`${prefix}Address`, t)}
        />

        <FieldSetWithStatus
          id={`${prefix}City`}
          required
          label={t('form.fields.city')}
          type="text"
          value={city}
          onChange={setCity}
          error={customerInfo?.fieldErrorMessage(`${prefix}City`, t)}
        />
      </div>

      <div className="space-y-4">
        <FieldSetWithStatus
          id={`${prefix}PostalCode`}
          required
          label={t('form.fields.postalCode')}
          type="text"
          value={postalCode}
          onChange={setPostalCode}
          error={customerInfo?.fieldErrorMessage(`${prefix}PostalCode`, t)}
        />

        <FieldSetWithStatus
          id={`${prefix}Province`}
          label={t('form.fields.province')}
          type="text"
          value={province}
          onChange={setProvince}
          error={customerInfo?.fieldErrorMessage(`${prefix}Province`, t)}
        />

        <CountrySelector
          id={`${prefix}Countries`}
          countries={countries}
          required
          label={t('form.fields.country')}
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onChange={(val) => setCountry(val)}
          error={customerInfo?.fieldErrorMessage(`${prefix}Countries`, t)}
          // We use this type assertion because we are always sure this find will return a value
          // but need to let TS know since it could technically return null
          selectedValue={
                  countries.find((option: SelectMenuOption) => option.value === country) as SelectMenuOption
          }
        />
      </div>
    </div>
  );
}
