'use client';

import SideBarTitle from '@/components/SideBarTitle';
import { useAppState } from '@/state';
import { PHOTOS } from '@/photo/data';
import ImageSmall from '@/components/ImageSmall';
import { FORMATS } from '../data';
import { useTranslations } from 'next-intl';
import PhotoLink from '@/photo/PhotoLink';
import IconButton from '@/components/IconButton';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { useState } from 'react';
import SideInfo from '../SideInfo';
import { CartClient } from './models/CartClient';


export default function CartSideBar() {
  const { cartCount, setCartCount } = useAppState();
  const cart = new CartClient();
  const [items, setItems] = useState(cart.getItems());
  const t = useTranslations('checkout');

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

  return (<div>
    <SideBarTitle href="/cart" title={`${cartCount} ${t('photos_in_cart')}`} />
    <div>{t('total')}: {cart.totalPrice()}EUR</div>
    {
      items.map(((item, index) => {
        const photo = PHOTOS.find(photo => photo.title == item.photoTitle);
        if(photo == undefined)
          return;

        return (
          <div key={index} className="pt-4">
            <PhotoLink photo={photo}>
              <div className="text-lg font-bold pb-1">{item.photoTitle}</div>
            </PhotoLink>
            <div className='flex gap-1'>
              <div className="w-1/3">
                <PhotoLink photo={photo} >
                  <ImageSmall
                    src={photo.url}
                    alt={photo.title}
                  />
                </PhotoLink>
              </div>
              <div>
                <div className="capitalize">{item.support}</div>
                <div>{FORMATS[item.formatKey]}</div>
                <div className="font-bold">{item.totalPrice()}EUR</div>
              </div>
              <div>
                <IconButton
                  {...{
                    onClick: () => minusQuantity(index),
                    icon:(
                      <CiCircleMinus
                        size={34}
                      />
                    )}
                  } />
                <span className="text-xl font-bold px-1 relative -top-3">{item.quantity}</span>
                <IconButton
                  {...{
                    onClick: () => plusQuantity(index),
                    icon:(
                      <CiCirclePlus
                        size={34}
                      />
                    )}
                  } />
              </div>
            </div>
          </div>

        );}))
    }
    <SideInfo />
  </div>);
}
