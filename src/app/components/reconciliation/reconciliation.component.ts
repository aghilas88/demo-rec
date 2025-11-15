import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Reconciliation } from '../../models/balances.model';

@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.css']
})
export class ReconciliationComponent implements OnInit {
  reconciliations: Reconciliation[] = [];
  balanceDate: string = '';
  configName: string = '';
  currentPage: number = 0;
  pageSize: number = 20;
  totalPages: number = 5;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  fetchReconciliationData(): void {
    if (!this.configName || !this.balanceDate) {
      alert('Please enter Config Name and Balance Date');
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