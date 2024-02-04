import SideBarTitle from '@/components/SideBarTitle';

export default async function CartSideBar() {
  return (<div>
    <SideBarTitle href="/cart" title="2 photos dans le panier" />
    <div className="pt-8">Liste des photos ICI</div>
    <div className="pt-8">Liste des photos ICI</div>
    <div className="pt-8">Liste des photos ICI</div>
    <div className="pt-8">Liste des photos ICI</div>
  </div>);
}
