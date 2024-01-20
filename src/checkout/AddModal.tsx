'use client';

import Modal from '@/components/Modal';
import { TbPhotoShare } from 'react-icons/tb';
import { Photo } from '@/photo';
import { clsx } from 'clsx/lite';
import { ReactNode } from 'react';
import CheckOutForm from './CheckOutForm';

export default function AddModal({
  title = 'Ajouter au panier',
  photo,
  pathClose,
  children,
}: {
  title?: string;
  photo: Photo;
  pathClose: string;
  children: ReactNode;
}) {
  return (
    <Modal onClosePath={pathClose} large>
      <div className="space-y-3 md:space-y-4 w-full">
        <div className={clsx('flex items-center gap-x-3', 'text-xl md:text-3xl leading-snug')}>
          <TbPhotoShare
            size={22}
            className="hidden xs:block"
          />
          <div className="flex-grow">{title}</div>
        </div>
        {children}
        <div
          className={clsx(
            'rounded-md',
            'w-full overflow-hidden',
            'border border-gray-200 dark:border-gray-800'
          )}
        >
          <div className="truncate p-2 w-full">{photo.title}</div>
          <CheckOutForm />
        </div>
      </div>
    </Modal>
  );
}
