import { COUNTRIES } from './countries';

export interface CountrySelectorProps {
  id: string;
  open: boolean;
  disabled?: boolean;
  label: string;
  note?: string
  error?: string
  onToggle: () => void;
  onChange: (value: SelectMenuOption['value']) => void;
  selectedValue: SelectMenuOption;
  loading?: boolean;
  required?: boolean;
}

export type SelectMenuOption = (typeof COUNTRIES)[number];
