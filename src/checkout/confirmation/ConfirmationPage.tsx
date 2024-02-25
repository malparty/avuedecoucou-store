'use client';

import InfoBlock from '@/components/InfoBlock';
import SuccessNote from '@/components/SuccessNote';
import { useTranslations } from 'next-intl';
import { CustomerInfoParams } from '../order/customerInfo';
import AddressText from '../AddressText';
import FieldSetWithStatus from '@/components/FieldSetWithStatus';
import { Link } from '@/navigation';

export default function ConfirmationPage() {
  const t = useTranslations('checkout');

  const lastConfirmedOrder = localStorage.getItem('LastConfirmedOrder');
  if(!lastConfirmedOrder) {
    return <div>
      <div>{t('confirm.no_order_yet')}</div>
      <Link href="/" title={t('confirm.no_order_yet')}>{t('form.explore_and_start')}</Link>
    </div>;
  }

  const {
    customerInfoData,
  }: {customerInfoData: CustomerInfoParams} = JSON.parse(lastConfirmedOrder ?? '');
  console.log(customerInfoData);

  return (
    <InfoBlock>
      <div className="space-y-8">
        <SuccessNote>{t('confirm.success')}</SuccessNote>
        <div className="text-3xl font-bold">{t('form.title_contact')}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>{t('form.fields.firstName')}: {customerInfoData.firstName}</div>
            <div>{t('form.fields.lastName')}: {customerInfoData.lastName}</div>
          </div>

          <div className="space-y-4">
            <div>{t('form.fields.email')}: {customerInfoData.email}</div>
            <div>{t('form.fields.phone')}: {customerInfoData.phone}</div>
          </div>
        </div>

        <div  className="text-3xl font-bold">{t('form.title_shipping_address')}</div>
        <AddressText
          address={customerInfoData.shippingAddress}
          building={customerInfoData.shippingBuilding ?? ''}
          city={customerInfoData.shippingCity}
          postalCode={customerInfoData.shippingPostalCode}
          province={customerInfoData.shippingProvince ?? ''}
          country={customerInfoData.shippingCountry} />

        <div className="flex justify-between">
          <div  className="text-3xl font-bold">{t('form.title_invoice_address')}</div>
          <FieldSetWithStatus
            id="UseSameAddress"
            label={t('form.invoice_address_same')}
            type="checkbox"
            value={customerInfoData.useSameAddress ? 'true' : 'false'}
            readOnly
          />
        </div>

        { !customerInfoData.useSameAddress && <AddressText
          address={customerInfoData.invoiceAddress}
          building={customerInfoData.invoiceBuilding ?? ''}
          city={customerInfoData.invoiceCity}
          postalCode={customerInfoData.invoicePostalCode}
          province={customerInfoData.invoiceProvince ?? ''}
          country={customerInfoData.invoiceCountry} />
        }

        <InfoBlock>{t('form.bottom_instructions')}</InfoBlock>
      </div>
    </InfoBlock>
  );
}
