import { PriceType } from "./types/price.types";

export class Settlement {
  _id?: string;
  settlementId?: number;
  userId?: number;
  date?: Date;
  toDate?: Date;
  description?: string;
  linkUrl?: string;
  price?: number;
  priceType?: PriceType;
  amount?: number;

  constructor(_id?: string, settlementId?: number, userId?: number, date?: Date, toDate?: Date, description?: string, price?: number, priceType?: PriceType, amount?: number) {
    this._id = _id;
    this.settlementId = settlementId;
    this.userId = userId;
    this.date = date;
    this.toDate = toDate;
    this.description = description;
    this.price = price;
    this.priceType = priceType;
    this.amount = amount;
  }
}

export type NewSettlement = Omit<Settlement, '_id'>;
