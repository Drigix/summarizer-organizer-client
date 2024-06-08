import { PriceType } from "./types/price.types";
import { SettlementSavingType } from "./types/settlement-saving.type";

export class SettlementSaving {
  _id?: string;
  date?: Date;
  dateTo?: Date;
  description?: string;
  linkUrl?: string;
  price?: number;
  savingType?: SettlementSavingType;
  percent?: number;
  percentPeriod?: number;
  priceType?: PriceType;

  constructor(_id?: string, date?: Date, dateTo?: Date, description?: string, linkUrl?:string, price?: number, savingType?: SettlementSavingType,
    percent?: number, percentPeriod?: number, priceType?: PriceType) {
    this._id = _id;
    this.date = date;
    this.dateTo = dateTo;
    this.description = description;
    this.linkUrl = linkUrl;
    this.price = price;
    this.savingType = savingType;
    this.percent = percent;
    this.percentPeriod = percentPeriod;
    this.priceType = priceType;
  }
}

export type NewSettlementSaving = Omit<SettlementSaving, 'id'>;
