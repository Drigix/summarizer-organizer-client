import { PriceType } from "./types/price.types";

export class Settlement {
  _id?: string;
  settlementId?: number;
  userId?: number;
  date?: Date;
  dateTo?: Date;
  description?: string;
  linkUrl?: string;
  price?: number;
  priceType?: PriceType;
  amount?: number;
  updateAllRecords?: boolean;

  constructor(_id?: string, settlementId?: number, userId?: number, date?: Date, dateTo?: Date, description?: string, price?: number, priceType?: PriceType, amount?: number, updateAllRecords?: boolean) {
    this._id = _id;
    this.settlementId = settlementId;
    this.userId = userId;
    this.date = date;
    this.dateTo = dateTo;
    this.description = description;
    this.price = price;
    this.priceType = priceType;
    this.amount = amount;
    this.updateAllRecords = updateAllRecords;
  }
}

export type NewSettlement = Omit<Settlement, '_id'>;
