export class StockCompany {
    _id?: string;
    stockSymbol?: string;
    oldStockSymbol?: string;
    companyName?: string;
    icon?: string;
    currentPrice?: number;
    currency?: string;
    updatedAt?: Date;
}

export type NewStockCompany = Omit<StockCompany, 'id'>;