import { SettlementSavingEnum } from "@entities/enums/settlement-saving.enum";
import { DropdownItem } from "../dropdown-item.model";


export const SAVING_TYPE_LIST: DropdownItem[] = [
    new DropdownItem('settlement.savingType.bonds', SettlementSavingEnum.BONDS),
    new DropdownItem('settlement.savingType.deposit', SettlementSavingEnum.DEPOSIT),
    new DropdownItem('settlement.savingType.stock', SettlementSavingEnum.STOCK),
    new DropdownItem('settlement.savingType.silver', SettlementSavingEnum.SILVER),
    new DropdownItem('settlement.savingType.gold', SettlementSavingEnum.GOLD),
    new DropdownItem('settlement.savingType.crypto', SettlementSavingEnum.CRYPTO),
    new DropdownItem('settlement.savingType.none', SettlementSavingEnum.NONE)
];