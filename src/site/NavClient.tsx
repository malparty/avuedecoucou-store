'use client';

import { clsx } from 'clsx/lite';
import { usePathname } from 'next/navigation';
import { Link } from '../navigation';
import SiteGrid from '../components/SiteGrid';
import { SITE_DOMAIN_OR_TITLE } from '@/site/config';
import ViewSwitcher, { SwitcherSelection } from '@/site/ViewSwitcher';
import { PATH_ROOT, isPathGrid, isPathSets } from '@/site/paths';
import AnimateItems from '../components/AnimateItems';
import IconButton from '@/components/IconButton';
import CartButton from '@/checkout/CartButton';

export default function NavClient() {
  const pathname = usePathname();

  const renderLink = (text: string, linkOrAction: string | (() => void)) =>
    typeof linkOrAction === 'string' ? (
      <Link href={linkOrAction}>{text}</Link>
    ) : (
      <button onClick={linkOrAction}>{text}</button>
    );

  const switcherSelectionForPath = (): SwitcherSelection | undefined => {
    if (pathname === PATH_ROOT) {
      return 'full-frame';
    } else if (isPathGrid(pathname)) {
      return 'grid';
    } else if (isPathSets(pathname)) {
      return 'sets';
    }
  };

  return (
    <SiteGrid
      contentMain={
        <AnimateItems
          animateOnFirstLoadOnly
          type={'none'}
          distanceOffset={10}
          items={[
            <div
              key="nav"
              className={clsx('flex items-center', 'w-full min-h-[4rem]', 'leading-none')}
            >
              <div className="flex flex-grow items-center gap-4">
                <ViewSwitcher currentSelection={switcherSelectionForPath()} />
              </div>
              <div className="hidden xs:block">{renderLink(SITE_DOMAIN_OR_TITLE, PATH_ROOT)}</div>
              <CartButton path='/cart' />
            </div>,
          ]}
        />
      }
    />
  );
}
