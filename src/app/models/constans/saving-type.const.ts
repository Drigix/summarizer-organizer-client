import { SettlementSavingEnum } from "@entities/enums/settlement-saving.enum";
import { DropdownItem } from "../dropdown-item.model";


export const SAVING_TYPE_LIST: DropdownItem[] = [
    new DropdownItem('settlement.savingTypes.bonds', SettlementSavingEnum.BONDS),
    new DropdownItem('settlement.savingTypes.deposit', SettlementSavingEnum.DEPOSIT),
    new DropdownItem('settlement.savingTypes.stock', SettlementSavingEnum.STOCK),
    new DropdownItem('settlement.savingTypes.silver', SettlementSavingEnum.SILVER),
    new DropdownItem('settlement.savingTypes.gold', SettlementSavingEnum.GOLD),
    new DropdownItem('settlement.savingTypes.crypto', SettlementSavingEnum.CRYPTO),
    new DropdownItem('settlement.savingTypes.none', SettlementSavingEnum.NONE)
];