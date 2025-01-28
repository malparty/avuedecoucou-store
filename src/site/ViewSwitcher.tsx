import Switcher from '@/components/Switcher';
import SwitcherItem from '@/components/SwitcherItem';
import IconFullFrame from '@/site/IconFullFrame';
import IconGrid from '@/site/IconGrid';
import { PATH_FULL, PATH_ROOT } from '@/site/paths';

export type SwitcherSelection = 'full-frame' | 'grid';

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
    </Switcher>
  );
}
