'use client';

import { useEffect, useState } from 'react';
import { FORMAT_KEYS, PRICES, SUPPORTS } from '../data';
import FormatButton from './FormatButton';
import SupportButton from './SupportButton';
import AddButton from '../AddButton';
import { useTranslations } from 'next-intl';
import SideInfo from '../SideInfo';

export default function FormatsPicker({photoTitle}: {photoTitle: string}) {
  const [currentFormatKey, setCurrentFormatKey] = useState(FORMAT_KEYS[0]);
  const [currentSupport, setCurrentSupport] = useState(SUPPORTS[0]);
  const [price, setPrice] = useState(0);
  const t = useTranslations('checkout');

  useEffect(()=>{
    setPrice(PRICES[currentSupport][currentFormatKey]);
  }, [currentFormatKey, currentSupport]);

  return (
    <div>
      <div className='text-3xl'>Format</div>
      <div className='flex flex-wrap mb-4'>
        {FORMAT_KEYS.map((formatKey) => (
          <FormatButton onClick={() => { return setCurrentFormatKey(formatKey);}}
            key={formatKey}
            isSelected={currentFormatKey === formatKey}
            formatKey={formatKey} />
        ))}
      </div>
      <div className='text-3xl'>Support</div>
      <div className='flex flex-wrap mb-4'>
        {SUPPORTS.map((support) => (
          <SupportButton onClick={() => { return setCurrentSupport(support);}}
            key={support}
            isSelected={currentSupport === support}
            support={support} />
        ))}
      </div>
      <div className='flex my-4 gap-1'>
        <div className='text-3xl mr-1'>Prix</div>
        <div className='text-3xl font-bold'>{price} EUR</div>
      </div>
      <AddButton title={t('add_cart')}
        formatKey={currentFormatKey}
        support={currentSupport}
        photoTitle={photoTitle}
        quantity={1}
      />
      <SideInfo />
    </div>
  );
}
