import Switcher from '@/components/Switcher';
import SwitcherItem from '@/components/SwitcherItem';
import IconFullFrame from '@/site/IconFullFrame';
import IconGrid from '@/site/IconGrid';
import { PATH_GRID, PATH_SETS } from '@/site/paths';
import IconSets from './IconSets';

export type SwitcherSelection = 'full-frame' | 'grid' | 'sets' | 'admin';

export default function ViewSwitcher({ currentSelection }: { currentSelection?: SwitcherSelection }) {
  return (
    <Switcher>
      <SwitcherItem
        icon={<IconFullFrame />}
        href="/"
        active={currentSelection === 'full-frame'}
        noPadding
      />
      <SwitcherItem
        icon={<IconGrid />}
        href={PATH_GRID}
        active={currentSelection === 'grid'}
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
