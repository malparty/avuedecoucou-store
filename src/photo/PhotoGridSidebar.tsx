import HeaderList from '@/components/HeaderList';
import { photoQuantityText } from '.';

export default function PhotoGridSidebar({ photosCount }: { photosCount: number }) {
  return <HeaderList items={[photoQuantityText(photosCount, false)]} />;
}
