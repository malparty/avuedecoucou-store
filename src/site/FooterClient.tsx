'use client';

import { clsx } from 'clsx/lite';
import SiteGrid from '../components/SiteGrid';
import ThemeSwitcher from '@/site/ThemeSwitcher';
import { SHOW_REPO_LINK } from '@/site/config';
import RepoLink from '../components/RepoLink';
import AnimateItems from '@/components/AnimateItems';

export default function FooterClient({}: { userEmail?: string | null | undefined }) {
  return (
    <SiteGrid
      contentMain={
        <AnimateItems
          animateOnFirstLoadOnly
          type={'none'}
          distanceOffset={10}
          items={[
            <div
              key="footer"
              className={clsx('flex items-center', 'text-dim min-h-[4rem]')}
            >
              <div className="flex gap-x-4 gap-y-1 flex-grow flex-wrap h-4">
                {<>{SHOW_REPO_LINK && <RepoLink />}</>}
              </div>
              <div className="flex items-center h-4">
                <ThemeSwitcher />
              </div>
            </div>,
          ]}
        />
      }
    />
  );
}
