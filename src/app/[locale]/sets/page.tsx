import InfoBlock from '@/components/InfoBlock';
import RedirectOnDesktop from '@/components/RedirectOnDesktop';
import SiteGrid from '@/components/SiteGrid';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';
import { PATH_GRID } from '@/site/paths';
import { PHOTOS_COUNT } from '@/photo/data';

export const runtime = 'edge';

export default async function SetsPage() {
  return (
    <SiteGrid
      contentMain={
        <InfoBlock
          padding="tight"
          centered={false}
        >
          <RedirectOnDesktop redirectPath={PATH_GRID} />
          <div className="text-base space-y-4 p-2">
            <PhotoGridSidebar photosCount={PHOTOS_COUNT} />
          </div>
        </InfoBlock>
      }
    />
  );
}
