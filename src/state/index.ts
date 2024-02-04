import { createContext, useContext } from 'react';
import { AnimationConfig } from '@/components/AnimateItems';
import { Cart } from '@/checkout/cart/Cart';

export interface AppStateContext {
  previousPathname?: string
  hasLoaded?: boolean
  setHasLoaded?: (hasLoaded: boolean) => void
  nextPhotoAnimation?: AnimationConfig
  setNextPhotoAnimation?: (animation?: AnimationConfig) => void
  clearNextPhotoAnimation?: () => void
  cart?: Cart
}

export const AppStateContext = createContext<AppStateContext>({});

export const useAppState = () => useContext(AppStateContext);
