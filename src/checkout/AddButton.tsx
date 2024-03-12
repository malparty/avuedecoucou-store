'use client';

import { FaCartPlus } from 'react-icons/fa6';
import { useAppState } from '@/state';
import { useEffect, useState, useTransition } from 'react';
import { clsx } from 'clsx/lite';
import { CartItem } from '@/checkout/cart/models/CartItem';
import { CartClient } from '@/checkout/cart/models/CartClient';
import IconButton from '@/components/IconButton';
import { formatKeysType, supportType } from './data';
import { Photo } from '@/photo';
import { useRouter } from '@/navigation';
import { pathForPhoto } from '@/site/paths';

interface AddButtonnProps {
  title: string;
  formatKey: formatKeysType;
  support: supportType;
  photo: Photo;
  quantity: number;
}

export default function AddButton({
  title,
  formatKey,
  support,
  photo,
  quantity,
}: AddButtonnProps) {
  const  loaderDelay = 250;
  const { setCartCount } = useAppState();
  const router = useRouter();
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

  const onAdded = () => {
    startTransition(() => {
      router.push(`${pathForPhoto(photo.id)}/added`);
    });
  };

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
            photoId: photo.id,
            photoTitle: photo.title,
            photoUrl: photo.url,
            quantity: quantity}));
        setCartCount?.(cart.getItems().length);
        onAdded();
      })}
      isLoading={shouldShowLoader}
      className={clsx(
        'translate-y-[-0.5px]',
        'active:translate-y-[1px]',
        'text-medium pt-2 px-2 text-gray-400 hover:text-gray-600',
        'text-gray-600 dark:text-gray-300',
        'border rounded-md shadow',
        'border-gray-200 hover:border-gray-300',
        'dark:border-gray-700 dark:hover:border-gray-600',
      )}
      spinnerColor={'dim'}
    />
  );
}
