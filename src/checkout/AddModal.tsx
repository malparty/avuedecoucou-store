'use client';

import Modal from '@/components/Modal';
import { TbPhotoShare } from 'react-icons/tb';
import { Photo } from '@/photo';
import { clsx } from 'clsx/lite';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import InfoBlock from '@/components/InfoBlock';

export default function AddModal({
  photo,
  pathClose,
  children,
}: {
  photo: Photo;
  pathClose: string;
  children: ReactNode;
}) {
  const t = useTranslations('checkout');

  return (
    <Modal onClosePath={pathClose} large>
      <div className="space-y-3 md:space-y-4 w-full">
        <div className={clsx('flex items-center gap-x-3', 'text-xl md:text-3xl leading-snug')}>
          <TbPhotoShare
            size={22}
            className="hidden xs:block"
          />
          <div className="flex-grow">{t('add_cart')}</div>
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
          <InfoBlock>
            Photo ajoutée avec success!! (ce message sera remplacé par une mini notification!)
          </InfoBlock>
        </div>
      </div>
    </Modal>
  );
}
