import InfoBlock from '@/components/InfoBlock';
import SiteGrid from '@/components/SiteGrid';
import { clsx } from 'clsx/lite';
import { HiOutlinePhotograph } from 'react-icons/hi';

export default function PhotosEmptyState() {
  return (
    <SiteGrid
      contentMain={
        <InfoBlock
          className="min-h-[20rem] sm:min-h-[30rem] px-8"
          padding="loose"
        >
          <HiOutlinePhotograph
            className="text-medium"
            size={24}
          />
          <div className={clsx('font-bold text-2xl', 'text-gray-700 dark:text-gray-200')}>{'Setup Complete!'}</div>
          {
            <div className="max-w-md text-center space-y-6">
              <div className="space-y-2">
                <div>Add your first photo by editing the code.</div>
              </div>
            </div>
          }
        </InfoBlock>
      }
    />
  );
}
