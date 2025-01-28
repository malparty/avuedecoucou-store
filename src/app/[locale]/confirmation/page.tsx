import ConfirmationPage from '@/checkout/confirmation/ConfirmationPage';
import SiteGrid from '@/components/SiteGrid';
import { PaginationParams } from '@/site/pagination';
import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';

const ConfirmationSideBar = dynamic(() => import('@/checkout/confirmation/ConfirmationSideBar'), { ssr: false });

export const runtime = 'edge';

export default async function CartAppPage({ params: { locale } }: PaginationParams) {
  setRequestLocale(locale);

  return (
    <SiteGrid
      contentMain={<ConfirmationPage />}
      contentSide={
        <div className="sticky top-4 space-y-4">
          <ConfirmationSideBar />
        </div>
      }
      sideHiddenOnMobile
    />
  );
}
