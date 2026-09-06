import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SERVER_URL } from "@config/url.const";
import { StockCompany } from "@entities/stock-company.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class MarketDataService {
   
    private resourceUrl = SERVER_URL + 'market-data';
   
    constructor(private http: HttpClient) { }

    getStockCompanies(): Observable<StockCompany[]> {
        return this.http.get<StockCompany[]>(`${this.resourceUrl}/stock-company/all`);
    }

    getStockPrices(symbol: string): Observable<any> {
        return this.http.get(`${this.resourceUrl}/stock-price/${symbol}`);
    }
}