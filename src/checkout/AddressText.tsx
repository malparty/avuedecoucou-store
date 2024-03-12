import { useLocale, useTranslations } from 'next-intl';
import { COUNTRIES } from '@/components/CountrySelector/countries';

interface AddressTextProps {
  address: string,
  building: string,
  city: string,
  postalCode: string,
  province: string,
  country: string,
}
export default function AddressText({
  address,
  building,
  city,
  postalCode,
  province,
  country}: AddressTextProps
) {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const countries = COUNTRIES[locale as 'en' | 'fr' | 'de'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div>{t('form.fields.building')}: {building}</div>
        <div>{t('form.fields.address')}: {address}</div>
        <div>{t('form.fields.city')}: {city}</div>
      </div>
      <div className="space-y-4">
        <div>{t('form.fields.postalCode')}: {postalCode}</div>
        <div>{t('form.fields.province')}: {province}</div>
        <div>{t('form.fields.country')}: {countries.find(c => c.value === country)?.title}</div>
      </div>
    </div>
  );
}
