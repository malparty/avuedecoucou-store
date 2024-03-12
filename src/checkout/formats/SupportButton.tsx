import clsx from 'clsx';
import { supportType } from '../data';
import { MouseEventHandler } from 'react';

interface SupportButtonProps {
  isSelected: boolean
  support: supportType
  onClick: MouseEventHandler<HTMLButtonElement>
};

export default function SupportButton({isSelected, support, onClick}:SupportButtonProps) {

  return (
    <div className={clsx(isSelected && 'text-red-600', 'm-1')}>
      <button onClick={onClick}>
        {support}
      </button>
    </div>
  );
}
