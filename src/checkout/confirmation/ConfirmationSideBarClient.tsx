'use client';

import dynamic from 'next/dynamic';

// Both read the last order from localStorage, so they can only render in the browser
export const ConfirmationPage = dynamic(() => import('./ConfirmationPage'), { ssr: false });
const ConfirmationSideBar = dynamic(() => import('./ConfirmationSideBar'), { ssr: false });

export default ConfirmationSideBar;
