'use client';

import { clsx } from 'clsx/lite';
import { usePathname } from 'next/navigation';
import { Link } from '../navigation';
import SiteGrid from '../components/SiteGrid';
import ViewSwitcher, { SwitcherSelection } from '@/site/ViewSwitcher';
import { PATH_ROOT, isPathFull } from '@/site/paths';
import AnimateItems from '../components/AnimateItems';
import CartButton from '@/checkout/cart/CartButton';
import { useLocale, useTranslations } from 'next-intl';
import LangSwitch from '@/components/LangSwitch';

export default function NavClient() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('layout');

  const renderLink = (text: string, linkOrAction: string | (() => void)) =>
    typeof linkOrAction === 'string' ? (
      <Link href={linkOrAction}>{text}</Link>
    ) : (
      <button onClick={linkOrAction}>{text}</button>
    );

  const switcherSelectionForPath = (): SwitcherSelection | undefined => 
    isPathFull(locale, pathname) ? 'full-frame' : 'grid';

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
                <LangSwitch />
              </div>
              <div className="hidden xs:block">{renderLink(t('header_title'), PATH_ROOT)}</div>
            </div>,
          ]}
        />
      }
      contentSide={
        <AnimateItems
          animateOnFirstLoadOnly
          type={'none'}
          distanceOffset={10}
          items={[
            <div
              key="nav"
              className={clsx('flex items-center', 'w-full min-h-[4rem]', 'leading-none')}
            >
              <CartButton path="/cart" />
            </div>,
          ]}
        />
      }
    />
  );
}
