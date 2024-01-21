import { COUNTRIES } from './countries';

export interface CountrySelectorProps {
  id: string;
  countries: SelectMenuOption[];
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

export interface SelectMenuOption {
  title: string
  value: string
};
