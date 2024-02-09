'use client';

import { PRICES, formatKeysType, supportType } from '../data';

const CART_ITEMS_KEY = 'cartItems';

interface CartItemProps {
  photoTitle: string
  formatKey: formatKeysType
  support: supportType
  quantity: number
}

export class CartItem implements CartItemProps {
  photoTitle: string;
  formatKey: formatKeysType;
  support: supportType;
  quantity: number;

  constructor(props: CartItemProps) {
    this.photoTitle = props.photoTitle;
    this.formatKey = props.formatKey;
    this.support = props.support;
    this.quantity = props.quantity;
  }

  price() {
    return this.quantity * PRICES[this.support][this.formatKey];
  };
};

export class Cart {
  _items?: CartItem[];

  getItems(): CartItem[] {
    if(this._items !== undefined)
      return this._items;
    if(typeof window === 'undefined')
      return [];

    const currentItems = localStorage.getItem(CART_ITEMS_KEY);
    this._items = currentItems ? (JSON.parse(currentItems) as (CartItem[] | undefined) || []) : [];

    return this._items;
  }

  totalPrice() {
    return this.getItems().reduce((sum, current) => sum + current.price(), 0);
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