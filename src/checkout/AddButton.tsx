'use client';

import { FaCartPlus } from 'react-icons/fa6';
import { useAppState } from '@/state';
import { useEffect, useState, useTransition } from 'react';
import { clsx } from 'clsx/lite';
import { CartItem } from '@/checkout/cart/models/CartItem';
import { CartClient } from '@/checkout/cart/models/CartClient';
import IconButton from '@/components/IconButton';
import { formatKeysType, supportType } from './data';

interface AddButtonnProps {
  title: string;
  formatKey: formatKeysType;
  support: supportType;
  photoTitle: string;
  quantity: number;
}

export default function AddButton({
  title,
  formatKey,
  support,
  photoTitle,
  quantity,
}: AddButtonnProps) {
  const  loaderDelay = 250;
  const { setCartCount } = useAppState();

  const [isPending, startTransition] = useTransition();

  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  useEffect(() => {
    if (isPending) {
      const timeout = setTimeout(() => {
        setShouldShowLoader(true);
      }, loaderDelay);
      return () => clearTimeout(timeout);
    } else {
      setShouldShowLoader(false);
    }
  }, [isPending, loaderDelay]);

  const icon = (
    <FaCartPlus
      size={34}
      className={'text-dim'}
    />
  );

  return (
    <IconButton
      icon={icon}
      title={title}
      onClick={() => startTransition(() => {
        const cart = new CartClient();
        cart.addItem(
          new CartItem({
            formatKey: formatKey,
            support: support,
            photoTitle: photoTitle,
            quantity: quantity}));
        setCartCount?.(cart.getItems().length);
      })}
      isLoading={shouldShowLoader}
      className={clsx(
        'translate-y-[-0.5px]',
        'active:translate-y-[1px]',
        'text-medium',
        'active:text-gray-600 dark:active:text-gray-300',
      )}
      spinnerColor={'dim'}
    />
  );
}
