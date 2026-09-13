import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SERVER_URL } from "@config/url.const";
import { StockCompany } from "@entities/stock-company.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class MarketDataService {
   
    private resourceUrl = SERVER_URL + 'market-data';
   
    constructor(private http: HttpClient) { }

    createStockCompany(stockCompany: StockCompany): Observable<StockCompany> {
        return this.http.post<StockCompany>(`${this.resourceUrl}/stock-company`, stockCompany);
    }

    updateStockCompany(stockCompany: StockCompany): Observable<StockCompany> {
        return this.http.put<StockCompany>(`${this.resourceUrl}/stock-company`, stockCompany);
    }

    deleteStockCompany(stockSymbol: string): Observable<void> {
        return this.http.delete<void>(`${this.resourceUrl}/stock-company/${stockSymbol}`);
    }

    getStockCompanies(): Observable<StockCompany[]> {
        return this.http.get<StockCompany[]>(`${this.resourceUrl}/stock-company/all`);
    }

    getStockPrices(symbol: string): Observable<any> {
        return this.http.get(`${this.resourceUrl}/stock-price/${symbol}`);
    }

    updateStockCompanyPrice(symbol: string): Observable<StockCompany> {
        return this.http.put(`${this.resourceUrl}/stock-price/${symbol}`, {});
    }
}