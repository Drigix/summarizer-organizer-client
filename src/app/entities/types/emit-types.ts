import { Settlement } from "@entities/settlement.model";
import { ButtonClickType } from "./button-click.types";
import { PriceType } from "./price.types";
import {SettlementSaving} from "@entities/settlement-saving.model";

export type EmitSettlementPreviewType = {
  buttonClickType: ButtonClickType;
  settlement: Settlement | SettlementSaving;
  priceType: PriceType
};
