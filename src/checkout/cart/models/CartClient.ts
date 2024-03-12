'use client';

import { Cart } from './Cart';
import { CartItem } from './CartItem';
import { CART_ITEMS_KEY } from './constants';

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

  plusItemAt(index: number) {
    if(!this._items || this._items?.length <= index)
      return;

    this._items[index].quantity ++;
    this._updateLocalStorage();
  }

  minusItemAt(index: number) {
    if(!this._items || this._items?.length <= index) return;

    this._items[index].quantity --;

    if(this._items[index].quantity === 0){
      this._removeItemAt(index);
    }
    this._updateLocalStorage();
  }

  _removeItemAt(index: number) {
    this.getItems().splice(index, 1);
  }

  _updateLocalStorage() {
    if(typeof window !== 'undefined')
      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(this._items));
  }
}