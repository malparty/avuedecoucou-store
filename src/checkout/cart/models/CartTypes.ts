import { formatKeysType, supportType } from '../../data';

export interface CartItemProps {
  photoTitle: string
  formatKey: formatKeysType
  support: supportType
  quantity: number
}