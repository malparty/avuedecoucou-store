'use client';

import SideBarTitle from '@/components/SideBarTitle';
import { useAppState } from '@/state';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SideInfo from '../SideInfo';
import { CartClient } from './models/CartClient';
import CartSideBarItem from './CartSideBarItem';


export default function CartSideBar() {
  const { cartCount, setCartCount } = useAppState();
  const cart = new CartClient();
  const [items, setItems] = useState(cart.getItems());

  const refreshItems = () => {
    const newItems = cart.getItems();
    setItems(newItems);
    setCartCount?.(newItems.length);
  };

  const minusQuantity = (index: number) => {
    cart.minusItemAt(index);
    refreshItems();
  };

  const plusQuantity = (index: number) => {
    cart.plusItemAt(index);
    refreshItems();
  };
  const t = useTranslations('checkout');

  return (<div>
    <SideBarTitle href="/cart" title={`${cartCount} ${t('photos_in_cart')}`} />
    <div>{t('total')}: {cart.totalPrice()}EUR</div>
    {
      items.map(((item, index) => (<CartSideBarItem {...{item, index, minusQuantity, plusQuantity}} key={index} />)))
    }
    <SideInfo />
  </div>);
}
