import clsx from 'clsx';
import React, { ReactNode } from 'react';

export default function Tooltip({ message, children }: {message: string, children: ReactNode}) {
  return (
    <div className="group relative flex">
      {children}
      <span className={clsx([
        'z-50 w-80 top-10 right-0',
        'absolute scale-0',
        'transition-all rounded-md',
        'bg-gray-100 dark:bg-gray-800',
        'text-gray-800 dark:text-white',
        'p-2 text-justify',
        'group-hover:scale-100',
      ])}>
        ✨ {message}
      </span>
    </div>
  );
}