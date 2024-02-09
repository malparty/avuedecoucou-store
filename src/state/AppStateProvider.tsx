'use client';

import { useState, useEffect, ReactNode } from 'react';
import { AppStateContext } from '.';
import { AnimationConfig } from '@/components/AnimateItems';
import usePathnames from '@/utility/usePathnames';
import { Cart } from '@/checkout/cart/Cart';

export default function StateProvider({
  children,
}: {
  children: ReactNode
}) {
  const { previousPathname } = usePathnames();

  const cart = new Cart();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [cartCount, setCartCount] = useState(cart.getItems().length);

  const [nextPhotoAnimation, setNextPhotoAnimation] =
    useState<AnimationConfig>();

  useEffect(() => {
    setHasLoaded?.(true);
  }, [setHasLoaded]);

  return (
    <AppStateContext.Provider
      value={{
        previousPathname,
        hasLoaded,
        setHasLoaded,
        nextPhotoAnimation,
        setNextPhotoAnimation,
        clearNextPhotoAnimation: () => setNextPhotoAnimation?.(undefined),
        cartCount,
        setCartCount: setCartCount,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
