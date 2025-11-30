import {SettlementSavingType} from "@entities/types/settlement-saving.type";

export class SoldInvestment {
  _id?: string;
  sellDate?: Date;
  date?: Date;
  dateTo?: Date;
  description?: string;
  linkUrl?: string;
  buyPrice?: number;
  sellPrice?: number;
  profit?: number;
  savingType?: SettlementSavingType;
  amount?: number;
}
