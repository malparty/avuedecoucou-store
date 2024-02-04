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
  items: CartItem[] = [];

  constructor() {
    const currentItems = localStorage.getItem(CART_ITEMS_KEY);
    if(currentItems) {
      this.items = JSON.parse(currentItems);
    }
  }

  totalPrice() {
    return this.items.reduce((sum, current) => sum + current.price(), 0);
  }

  addItem(item: CartItem) {
    this.items.push(item);
    this._updateLocalStorage();
  }

  removeItemAt(index: number) {
    this.items.splice(index, 1);
    this._updateLocalStorage();
  }

  _updateLocalStorage() {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(this.items));
  }
}