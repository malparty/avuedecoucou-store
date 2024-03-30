import clsx from 'clsx';
import { supportType } from '../data';
import { MouseEventHandler } from 'react';
import Tooltip from '@/components/Tooltip';
import { useTranslations } from 'next-intl';

interface SupportButtonProps {
  isSelected: boolean
  support: supportType
  onClick: MouseEventHandler<HTMLButtonElement>
};

export default function SupportButton({isSelected, support, onClick}:SupportButtonProps) {
  const t = useTranslations('supports');

  return (
    <div className={clsx(isSelected && 'text-red-600', 'm-1')}>
      <Tooltip message={t(`${support}.description`)}>
        <button onClick={onClick}>
          {t(`${support}.title`)}
        </button>
      </Tooltip>
    </div>
  );
}
