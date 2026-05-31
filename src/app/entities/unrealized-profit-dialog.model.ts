import {SettlementSavingType} from "@entities/types/settlement-saving.type";

export class UnrealizedProfitDialogModel {
  constructor(
    public savingType?: SettlementSavingType,
    public buyPrice?: number,
    public currentPrice?: number
  ) {
  }
}
