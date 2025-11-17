import { formatType, supportType } from "../../data";

export interface CartItemProps {
  photoTitle: string;
  photoUrl: string;
  photoId: string;
  formatKey: formatType;
  support: supportType;
  quantity: number;
}
