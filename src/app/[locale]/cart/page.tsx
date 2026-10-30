import CartPage from '@/checkout/cart/CartPage';
import SiteGrid from '@/components/SiteGrid';
import { PaginationParams } from '@/site/pagination';
import CartSideBar from '@/checkout/cart/CartSideBarClient';
import { setRequestLocale } from 'next-intl/server';
export const runtime = 'edge';

export default async function CartAppPage(props: PaginationParams) {
  const { locale } = await props.params;

  setRequestLocale(locale);

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
