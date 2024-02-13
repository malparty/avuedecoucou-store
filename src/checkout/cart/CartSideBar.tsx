'use client';

import SideBarTitle from '@/components/SideBarTitle';
import { useAppState } from '@/state';
import { CartClient } from './models/CartClient';
import { PHOTOS } from '@/photo/data';
import ImageSmall from '@/components/ImageSmall';
import { FORMATS } from '../data';
import { useTranslations } from 'next-intl';

export default function CartSideBar() {
  const { cartCount } = useAppState();
  const cart = new CartClient();
  const t = useTranslations('checkout');

  return (<div>
    <SideBarTitle href="/cart" title={`${cartCount} ${t('photos_in_cart')}`} />
    <div>{t('checkout.total')}: {cart.totalPrice()}EUR</div>
    {
      cart.getItems().map(((item, index) => {
        const photo = PHOTOS.find(photo => photo.title == item.photoTitle);
        if(photo == undefined)
          return;

        return (
          <div key={index} className="pt-8">
            <div>{item.photoTitle}</div>
            <div className='flex gap-2'>
              <ImageSmall
                src={photo.url}
                className="w-1/3"
                alt={photo.title}
              />
              <div>
                <div>{item.support}</div>
                <div>{FORMATS[item.formatKey]}</div>
                <div>{item.quantity}x{item.unitPrice()}EUR</div>
                <div>{t('checkout.total')}: {item.totalPrice()}EUR</div>
              </div>
            </div>
          </div>

        );}))
    }
  </div>);
}
