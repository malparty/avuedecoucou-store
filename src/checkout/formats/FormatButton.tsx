import clsx from 'clsx';
import { FORMATS, formatType } from '../data';
import { MouseEventHandler } from 'react';

interface FormatButtonProps {
  isSelected: boolean
  formatKey: formatType
  onClick: MouseEventHandler<HTMLButtonElement>
};

export default function FormatButton({isSelected, formatKey, onClick}:FormatButtonProps) {

  return (
    <div className={clsx(isSelected && 'text-red-600', 'm-1')}>
      <button onClick={onClick}>
        {FORMATS[formatKey]}
      </button>
    </div>
  );
}
