import { clsx } from 'clsx/lite';
import { BiCheck } from 'react-icons/bi';

export default function SuccessNote({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={clsx(
      'flex items-center gap-3',
      'px-3 py-2 border',
      'text-green-600 dark:text-green-500/90',
      'bg-green-50/50 dark:bg-green-950/50',
      'border-green-100 dark:border-green-950',
      'rounded-md',
    )}>
      <BiCheck
        size={18}
        className="text-green-600/80 dark:text-green-500/70"
      />
      {children}
    </div>
  );
}
