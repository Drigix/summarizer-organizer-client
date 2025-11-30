import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '@config/url.const';
import { SettlementSavingEnum } from '@entities/enums/settlement-saving.enum';
import { SettlementSaving } from '@entities/settlement-saving.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SettlementSavingService {

  private resourceUrl = SERVER_URL + 'settlement-saving';

  constructor(private http: HttpClient) { }

  createSettlementSaving(settlement: SettlementSaving): Observable<any> {
    return this.http.post(this.resourceUrl, settlement);
  }

  updateSettlementSaving(id: string, settlement: SettlementSaving): Observable<any> {
    return this.http.put(`${this.resourceUrl}/${id}`, settlement);
  }

  sellSettlementSaving(id: string, settlement: SettlementSaving): Observable<any> {
    return this.http.put(`${this.resourceUrl}/sell/${id}`, settlement);
  }

  getSettlementsSavingToDate(toDate:string): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/${toDate}`);
  }

  getSummarizeSettlementsSavingToChart(toDate:string): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/summarize/${toDate}`);
  }

  getProfitForBondsAndDeposits(year: number) : Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/profit/bonds-and-deposit/${year}`);
  }

  getSummarizePricesToChart(savingType: SettlementSavingEnum): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/summarize-saving-type/chart/${savingType}`);
  }

  getProfitSavingTypePrices(savingType: SettlementSavingEnum): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/profit/saving-type/${savingType}`);
  }

  deleteSettlementSaving(id: string): Observable<any> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
