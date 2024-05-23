import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '@config/url.const';
import { Settlement } from '@entities/settlement.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SettlementsService {

  private resourceUrl = SERVER_URL + 'settlement';

  constructor(private http: HttpClient) { }

  createSettlement(settlement: Settlement): Observable<any> {
    return this.http.post(this.resourceUrl, settlement);
  }

  updateSettlement(id: string, settlement: Settlement): Observable<any> {
    return this.http.put(`${this.resourceUrl}/${id}`, settlement);
  }

  getSettlementsBetweenDates(fromDate:string, toDate:string): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/${fromDate}/${toDate}`);
  }

  getSummarizeSettlementsBetweenDates(fromDate:string, toDate:string): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/summarize/${fromDate}/${toDate}`);
  }

  getSummarizeYearChartDataset(year: number): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/chart/${year}`);
  }

  deleteSettlement(id: string): Observable<any> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
