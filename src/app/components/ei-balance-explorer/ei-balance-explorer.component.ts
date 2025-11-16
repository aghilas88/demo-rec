import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EIBalance, FilterCriteria, SearchQuery } from '../../models/balances.model';

@Component({
  selector: 'app-ei-balance-explorer',
  templateUrl: './ei-balance-explorer.component.html',
  styleUrls: ['./ei-balance-explorer.component.css']
})
export class EIBalanceExplorerComponent implements OnInit {
  eiBalances: EIBalance[] = [];
  configs: string[] = [];
  configName: string = '';
  balanceDate: string = '';
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

  fetchEIBalances(): void {
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

    this.apiService.searchEIBalances(this.configName, query).subscribe(
      (data: EIBalance[]) => {
        this.eiBalances = data;
      },
      (error) => {
        console.error('Error fetching EI balances', error);
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
    this.fetchEIBalances();
  }

  onFiltersChanged() {
    this.currentPage = 0;
    this.fetchEIBalances();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchEIBalances();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchEIBalances();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.fetchEIBalances();
  }
}