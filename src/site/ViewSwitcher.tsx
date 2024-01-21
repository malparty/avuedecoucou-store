import Switcher from '@/components/Switcher';
import SwitcherItem from '@/components/SwitcherItem';
import IconFullFrame from '@/site/IconFullFrame';
import IconGrid from '@/site/IconGrid';
import { PATH_FULL, PATH_ROOT, PATH_SETS } from '@/site/paths';
import IconSets from './IconSets';

export type SwitcherSelection = 'full-frame' | 'grid' | 'sets' | 'admin';

export default function ViewSwitcher({ currentSelection }: { currentSelection?: SwitcherSelection }) {
  return (
    <Switcher>
      <SwitcherItem
        icon={<IconGrid />}
        href={PATH_ROOT}
        active={currentSelection === 'grid'}
        noPadding
      />
      <SwitcherItem
        icon={<IconFullFrame />}
        href={PATH_FULL}
        active={currentSelection === 'full-frame'}
        noPadding
      />
      <SwitcherItem
        className="md:hidden"
        icon={<IconSets />}
        href={PATH_SETS}
        active={currentSelection === 'sets'}
        noPadding
      />
    </Switcher>
  );
}
