'use client';

import SideBarTitle from '@/components/SideBarTitle';
import { useAppState } from '@/state';
import { Cart } from './Cart';
import { PHOTOS } from '@/photo/data';
import ImageSmall from '@/components/ImageSmall';
import { FORMATS } from '../data';

export default function CartSideBar() {
  const { cartCount } = useAppState();
  const cart = new Cart();

  return (<div>
    <SideBarTitle href="/cart" title={`${cartCount} photos dans le panier`} />
    <div>Total: {cart.totalPrice()}EUR</div>
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
                <div>Total: {item.totalPrice()}EUR</div>
              </div>
            </div>
          </div>

        );}))
    }
  </div>);
}
