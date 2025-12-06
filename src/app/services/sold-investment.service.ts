import {Injectable} from "@angular/core";
import {SERVER_URL} from "@config/url.const";
import {HttpClient} from "@angular/common/http";
import {SettlementSavingEnum} from "@entities/enums/settlement-saving.enum";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class SoldInvestmentService {

  private resourceUrl = SERVER_URL + 'sold-investment';

  constructor(private http: HttpClient) { }

  getSummarizeSoldInvestmentToChart(savingType: SettlementSavingEnum): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/summarize-sold-investment/chart/${savingType}`);
  }
}
