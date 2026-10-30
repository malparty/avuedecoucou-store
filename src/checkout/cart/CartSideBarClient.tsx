'use client';

import dynamic from 'next/dynamic';

const CartSideBar = dynamic(() => import('./CartSideBar'), { ssr: false });

export default CartSideBar;
