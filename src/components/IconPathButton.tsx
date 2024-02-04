'use client';

import { useRouter } from 'next/navigation';
import IconButton from './IconButton';
import { useEffect, useState, useTransition } from 'react';
import { clsx } from 'clsx/lite';
import { SpinnerColor } from './Spinner';
import { useAppState } from '@/state';
import { CartItem } from '@/checkout/cart/Cart';

export default function IconPathButton({
  icon,
  title,
  path,
  prefetch,
  loaderDelay = 250,
  shouldScroll = true,
  shouldReplace,
  spinnerColor,
}: {
  icon: JSX.Element
  title?: string
  path: string
  prefetch?: boolean
  loaderDelay?: number
  shouldScroll?: boolean
  shouldReplace?: boolean
  spinnerColor?: SpinnerColor
}) {
  const router = useRouter();
  const { cart } = useAppState();

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

  useEffect(() => {
    if (prefetch) {
      router.prefetch(path);
    }
  }, [prefetch, router, path]);

  return (
    <IconButton
      icon={icon}
      title={title}
      onClick={() => startTransition(() => {
        cart.addItem(new CartItem({formatKey: 'a', support: 'acrylique', photoTitle: 'Test Photo', quantity: 4}));
      })}
      isLoading={shouldShowLoader}
      className={clsx(
        'translate-y-[-0.5px]',
        'active:translate-y-[1px]',
        'text-medium',
        'active:text-gray-600 dark:active:text-gray-300',
      )}
      spinnerColor={spinnerColor ?? 'text'}
    />
  );
}
