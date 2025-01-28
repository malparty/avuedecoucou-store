import InfoBlock from '@/components/InfoBlock';
import RedirectOnDesktop from '@/components/RedirectOnDesktop';
import SiteGrid from '@/components/SiteGrid';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';
import { PHOTOS_COUNT } from '@/photo/data';
import { PATH_FULL } from '@/site/paths';

export const runtime = 'edge';

export default async function SetsPage() {
  return (
    <SiteGrid
      contentMain={
        <InfoBlock
          padding="tight"
          centered={false}
        >
          <RedirectOnDesktop redirectPath={PATH_FULL} />
          <div className="text-base space-y-4 p-2">
            <PhotoGridSidebar photosCount={PHOTOS_COUNT} />
          </div>
        </InfoBlock>
      }
    />
  );
}
