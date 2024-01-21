import CartPage from '@/cart/CartPage';
import CartSideBar from '@/cart/CartSideBar';
import SiteGrid from '@/components/SiteGrid';
import { PaginationParams } from '@/site/pagination';
import { unstable_setRequestLocale } from 'next-intl/server';

export const runtime = 'edge';

export default async function CartAppPage({ params: { locale } }: PaginationParams) {
  unstable_setRequestLocale(locale);

  return (
    <SiteGrid
      contentMain={<CartPage />}
      contentSide={
        <div className="sticky top-4 space-y-4">
          <CartSideBar />
        </div>
      }
      sideHiddenOnMobile
    />
  );
}
