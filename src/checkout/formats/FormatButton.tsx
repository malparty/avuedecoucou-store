import clsx from 'clsx';
import { FORMATS, formatKeysType } from '../data';
import { MouseEventHandler } from 'react';

interface FormatButtonProps {
  isSelected: boolean
  formatKey: formatKeysType
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
