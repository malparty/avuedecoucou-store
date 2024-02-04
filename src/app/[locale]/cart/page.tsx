import CartPage from '@/checkout/cart/CartPage';
import CartSideBar from '@/checkout/cart/CartSideBar';
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
