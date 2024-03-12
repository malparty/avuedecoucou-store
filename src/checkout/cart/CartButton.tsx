'use client';

import { FaCartShopping } from 'react-icons/fa6';
import IconPathButton from '@/components/IconPathButton';
import { useTranslations } from 'next-intl';
import { useAppState } from '@/state';
import { useEffect, useState } from 'react';

export default function CartButton({
  path,
  prefetch,
  shouldScroll,
}: {
  path: string;
  prefetch?: boolean;
  shouldScroll?: boolean;
}) {
  const {cartCount} = useAppState();
  const t = useTranslations('cart');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const numberItems = isClient ? ` (${cartCount})` : '';
  const title = `${t('cart_button')}${numberItems}`;

  return (
    <div className="mt-1 pt-2">
      <IconPathButton
        {...{
          path,
          title: title,
          icon: (
            <FaCartShopping
              size={34}
              className={'text-dim'}
            />
          ),
          prefetch,
          shouldScroll,
          spinnerColor: 'dim',
        }}
      />
    </div>
  );
}
