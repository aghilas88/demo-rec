import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Reconciliation, FilterCriteria, SearchQuery } from '../../models/balances.model';

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
  filters: FilterCriteria[] = [];

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
    
    const query: SearchQuery = {
      balanceDate: this.balanceDate,
      filters: this.filters,
      page: this.currentPage,
      size: this.pageSize
    };

    this.apiService.searchReconciliation(this.configName, query).subscribe(
      (data: Reconciliation[]) => {
        this.reconciliations = data;
      },
      (error) => {
        console.error('Error fetching reconciliation data', error);
      }
    );
  }

  addFilter(field: string, value: any) {
    const newFilter: FilterCriteria = {
      field,
      value,
      operator: 'equals',
      negate: false
    };
    
    this.filters.push(newFilter);
    this.currentPage = 0;
    this.fetchReconciliationData();
  }

  onFiltersChanged() {
    this.currentPage = 0;
    this.fetchReconciliationData();
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