'use client';

import { PHOTOS } from '@/photo/data';
import ImageSmall from '@/components/ImageSmall';
import { FORMATS } from '../data';
import PhotoLink from '@/photo/PhotoLink';
import IconButton from '@/components/IconButton';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { type CartItem } from './models/CartItem';
import { useState } from 'react';

interface CartSideBarItemProps {
item: CartItem,
index: number,
minusQuantity: (index: number)=> void,
plusQuantity: (index: number)=> void,
}

export default function CartSideBarItem({item, index, plusQuantity, minusQuantity}: CartSideBarItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const photo = PHOTOS.find(photo => photo.title == item.photoTitle);
  console.log('GO!', item.photoTitle);
  console.log('GO!', index);
  if(photo == undefined)
    return;

  return (
    <div className="pt-4">
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
            testid="cart-item__decrement"
            {...{
              onClick: () => { setQuantity(quantity - 1); minusQuantity(index);},
              icon:(
                <CiCircleMinus
                  size={34}
                />
              )}
            } />
          <span className="text-xl font-bold px-1 relative -top-3">{quantity}</span>
          <IconButton
            testid="cart-item__increment"
            {...{
              onClick: () => { setQuantity(quantity + 1); plusQuantity(index);},
              icon:(
                <CiCirclePlus
                  size={34}
                />
              )}
            } />
        </div>
      </div>
    </div>

  );
}
