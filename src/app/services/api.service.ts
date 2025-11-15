import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EEBalance, EIBalance, Reconciliation } from '../models/balances.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `${environment.apiBaseUrl}/balance`;

  constructor(private http: HttpClient) { }

  getEEBalances(configName: string, balanceDate: string, page: number = 0, size: number = 20): Observable<EEBalance[]> {
    return this.http.get<EEBalance[]>(`${this.apiUrl}/ee/${configName}?balanceDate=${balanceDate}&page=${page}&size=${size}`);
  }

  getEIBalances(configName: string, balanceDate: string, page: number = 0, size: number = 20): Observable<EIBalance[]> {
    return this.http.get<EIBalance[]>(`${this.apiUrl}/ei/${configName}?balanceDate=${balanceDate}&page=${page}&size=${size}`);
  }

  getReconciliationData(configName: string, balanceDate: string, page: number = 0, size: number = 20): Observable<Reconciliation[]> {
    return this.http.get<Reconciliation[]>(`${this.apiUrl}/reconciliation/${configName}?balanceDate=${balanceDate}&page=${page}&size=${size}`);
  }
}