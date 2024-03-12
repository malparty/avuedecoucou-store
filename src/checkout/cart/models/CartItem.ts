import { PRICES, formatKeysType, supportType } from '../../data';
import { CartItemProps } from './CartTypes';

export class CartItem implements CartItemProps {
  photoTitle: string;
  photoUrl: string;
  photoId: string;
  formatKey: formatKeysType;
  support: supportType;
  quantity: number;

  constructor(props: CartItemProps) {
    this.photoTitle = props.photoTitle;
    this.photoUrl= props.photoUrl;
    this.photoId= props.photoId;
    this.formatKey = props.formatKey;
    this.support = props.support;
    this.quantity = props.quantity;
  }

  unitPrice() {
    return PRICES[this.support][this.formatKey];
  };

  totalPrice() {
    return this.quantity * this.unitPrice();
  };
};
