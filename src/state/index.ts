import { createContext, useContext } from 'react';
import { AnimationConfig } from '@/components/AnimateItems';

export interface AppStateContext {
  previousPathname?: string
  hasLoaded?: boolean
  setHasLoaded?: (hasLoaded: boolean) => void
  nextPhotoAnimation?: AnimationConfig
  setNextPhotoAnimation?: (animation?: AnimationConfig) => void
  clearNextPhotoAnimation?: () => void
  cartCount: number
  setCartCount?: (count: number) => void
}

export const AppStateContext = createContext<AppStateContext>({cartCount: 0});

export const useAppState = () => useContext(AppStateContext);
