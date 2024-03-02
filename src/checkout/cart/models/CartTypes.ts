import { formatKeysType, supportType } from '../../data';

export interface CartItemProps {
  photoTitle: string
  photoUrl: string
  photoId: string
  formatKey: formatKeysType
  support: supportType
  quantity: number
}