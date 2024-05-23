import { PriceType } from "./types/price.types";

export class Settlement {
  _id?: string;
  settlementId?: number;
  userId?: number;
  date?: Date;
  description?: string;
  linkUrl?: string;
  price?: number;
  priceType?: PriceType;

  constructor(_id?: string, settlementId?: number, userId?: number, date?: Date, description?: string, price?: number, priceType?: PriceType) {
    this._id = _id;
    this.settlementId = settlementId;
    this.userId = userId;
    this.date = date;
    this.description = description;
    this.price = price;
    this.priceType = priceType;
  }
}

export type NewSettlement = Omit<Settlement, '_id'>;
