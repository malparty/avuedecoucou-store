'use client';

import SideBarTitle from '@/components/SideBarTitle';
import { PHOTOS } from '@/photo/data';
import ImageSmall from '@/components/ImageSmall';
import { FORMATS } from '../data';
import { useTranslations } from 'next-intl';
import PhotoLink from '@/photo/PhotoLink';
import SideInfo from '../SideInfo';
import { CartItem } from '../cart/models/CartItem';
import { Cart } from '../cart/models/Cart';
import { LAST_ORDER_KEY } from '../cart/models/constants';


export default function ConfirmationSideBar() {
  const t = useTranslations('checkout');

  if (!localStorage.getItem(LAST_ORDER_KEY)){
    return <div></div>;
  }

  const { items }: {items: CartItem[]} = JSON.parse(localStorage.getItem(LAST_ORDER_KEY) ?? '');
  const cartItems = items.map(props => new CartItem(props));
  const cart = new Cart(cartItems);

  return (<div>
    <SideBarTitle href="/confirmation" title={t('confirm.your_order')} />
    <div>{t('total')}: {cart.totalPrice()}EUR</div>
    {
      cartItems.map(((item, index) => {
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
            </div>
          </div>
        );}))
    }
    <SideInfo />
  </div>);
}
