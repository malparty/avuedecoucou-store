import SiteGrid from '@/components/SiteGrid';
import { PaginationParams } from '@/site/pagination';
import ConfirmationSideBar, { ConfirmationPage } from '@/checkout/confirmation/ConfirmationSideBarClient';
import { setRequestLocale } from 'next-intl/server';
export const runtime = 'edge';

export default async function CartAppPage(props: PaginationParams) {
  const { locale } = await props.params;

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
