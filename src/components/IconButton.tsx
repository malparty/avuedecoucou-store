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
  testid,
}: {
  icon: JSX.Element
  title?: string
  onClick?: () => void
  isLoading?: boolean
  className?: string
  spinnerColor?: SpinnerColor
  spinnerSize?: number
  testid?: string
}) {
  return (
    <span className={clsx(
      className,
      'relative inline-flex items-start'
    )} data-testid={testid} >
      {!isLoading
        ? <button
          onClick={onClick}
          className={clsx(
            'inline-flex items-start justify-start',
            'p-0 border-none shadow-none',
            'active:bg-transparent bg-transparent dark:bg-transparent',
            onClick !== undefined && 'cursor-pointer',
            'active:opacity-50',
          )}
        >
          {icon}
          { title && (<div className="p-1">
            {title}
          </div>)}
        </button>
        : <span className={clsx(
          'inline-flex items-start justify-start',
          'h-full w-full',
        )}>
          <Spinner
            color={spinnerColor}
            size={spinnerSize}
            className="mr-2 mb-1"
          />
          { title && (<div className="p-1">
            {title}
          </div>)}
        </span>}
    </span>
  );
}
