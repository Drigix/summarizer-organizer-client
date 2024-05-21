import { PriceType } from "./types/price.types";

export class Settlement {
  _id?: string;
  settlementId?: number;
  userId?: number;
  date?: Date;
  description?: string;
  price?: number;
  priceType?: PriceType;
}
