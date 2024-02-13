'use client';

import { Cart } from './Cart';
import { CartItem } from './CartItem';

const CART_ITEMS_KEY = 'cartItems';

export class CartClient extends Cart {
  _items?: CartItem[];

  getItems(): CartItem[] {
    if(this._items !== undefined)
      return this._items;
    if(typeof window === 'undefined')
      return [];

    const currentItems = localStorage.getItem(CART_ITEMS_KEY);
    const parsedItems  = currentItems ? (JSON.parse(currentItems) as (CartItem[] | undefined) || []) : [];

    this._items = parsedItems.map(item => new CartItem(item));
    return this._items;
  }

  addItem(item: CartItem) {
    this.getItems().push(item);
    this._updateLocalStorage();
  }

  removeItemAt(index: number) {
    this.getItems().splice(index, 1);
    this._updateLocalStorage();
  }

  _updateLocalStorage() {
    if(typeof window !== 'undefined')
      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(this._items));
  }
}