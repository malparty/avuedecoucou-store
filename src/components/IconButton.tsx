'use client';

import { clsx } from 'clsx/lite';
import Spinner, { SpinnerColor } from './Spinner';

export default function IconButton({
  icon,
  title,
  onClick,
  isLoading,
  className,
  spinnerColor,
  spinnerSize,
}: {
  icon: JSX.Element
  title?: string
  onClick?: () => void
  isLoading?: boolean
  className?: string
  spinnerColor?: SpinnerColor
  spinnerSize?: number
}) {
  return (
    <span className={clsx(
      className,
      'relative inline-flex items-start'
    )}>
      {!isLoading
        ? <button
          onClick={onClick}
          className={clsx(
            'inline-flex items-start justify-start',
            'p-0 border-none shadow-none',
            'active:bg-transparent bg-transparent dark:bg-transparent',
            'translate-x-[-1px]',
            onClick !== undefined && 'cursor-pointer',
            'active:opacity-50',
          )}
        >
          {icon} {title}
        </button>
        : <span className={clsx(
          'inline-flex items-start justify-start',
          'h-full w-full',
        )}>
          <Spinner
            color={spinnerColor}
            size={spinnerSize}
          />
          {title}
        </span>}
    </span>
  );
}
