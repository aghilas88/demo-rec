import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Reconciliation } from '../../models/balances.model';

@Component({
  selector: 'app-reconciliation-explorer',
  templateUrl: './reconciliation-explorer.component.html',
  styleUrls: ['./reconciliation-explorer.component.css']
})
export class ReconciliationExplorerComponent implements OnInit {
  reconciliations: Reconciliation[] = [];
  configs: string[] = [];
  balanceDate: string = '';
  configName: string = '';
  currentPage: number = 0;
  pageSize: number = 20;
  totalPages: number = 5;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadConfigs();
  }

  loadConfigs() {
    this.apiService.getConfigs().subscribe(
      (data) => {
        this.configs = data;
      },
      (error) => {
        console.error('Error loading configs', error);
      }
    );
  }

  fetchReconciliationData(): void {
    if (!this.configName || !this.balanceDate) {
      alert('Please select Config Name and Balance Date');
      return;
    }
    
    this.apiService.getReconciliationData(this.configName, this.balanceDate, this.currentPage, this.pageSize).subscribe(
      (data: Reconciliation[]) => {
        this.reconciliations = data;
      },
      (error) => {
        console.error('Error fetching reconciliation data', error);
      }
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchReconciliationData();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchReconciliationData();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.fetchReconciliationData();
  }
}