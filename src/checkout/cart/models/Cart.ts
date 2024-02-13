import { CartItem } from './CartItem';

export class Cart {
  _items?: CartItem[];

  constructor(items?: CartItem[]) {
    this._items = items;
  }

  getItems(): CartItem[] {
    return this._items || [];
  }

  totalPrice() {
    return this.getItems().reduce((sum, current) => sum + current.totalPrice(), 0);
  }
}