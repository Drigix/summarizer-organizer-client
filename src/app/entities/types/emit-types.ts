import { Settlement } from "@entities/settlement.model";
import { ButtonClickType } from "./button-click.types";
import { PriceType } from "./price.types";

export type EmitSettlementPreviewType = {
  buttonClickType: ButtonClickType;
  settlement: Settlement;
  priceType: PriceType
};
