import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EEBalance, EIBalance, Reconciliation } from '../../models/balances.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  eeBalances: EEBalance[] = [];
  eiBalances: EIBalance[] = [];
  reconciliations: Reconciliation[] = [];
  balanceDate: string = '2025-12-01';
  configName: string = 'defaultConfig'; // Replace with actual config name if needed

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchEEBalances();
    this.fetchEIBalances();
    this.fetchReconciliations();
  }

  fetchEEBalances(): void {
    this.apiService.getEEBalances(this.configName, this.balanceDate).subscribe(data => {
      this.eeBalances = data;
    });
  }

  fetchEIBalances(): void {
    this.apiService.getEIBalances(this.configName, this.balanceDate).subscribe(data => {
      this.eiBalances = data;
    });
  }

  fetchReconciliations(): void {
    this.apiService.getReconciliationData(this.configName, this.balanceDate).subscribe((data: Reconciliation[]) => {
      this.reconciliations = data;
    });
  }
}