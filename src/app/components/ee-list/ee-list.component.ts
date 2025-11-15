import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EEBalance } from '../../models/balances.model';

@Component({
  selector: 'app-ee-list',
  templateUrl: './ee-list.component.html',
  styleUrls: ['./ee-list.component.css']
})
export class EEListComponent implements OnInit {
  eeBalances: EEBalance[] = [];
  configName: string = '';
  balanceDate: string = '';
  currentPage: number = 0;
  pageSize: number = 20;
  totalPages: number = 5;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  fetchEEBalances() {
    if (!this.configName || !this.balanceDate) {
      alert('Please enter Config Name and Balance Date');
      return;
    }
    
    this.apiService.getEEBalances(this.configName, this.balanceDate, this.currentPage, this.pageSize).subscribe(
      (data) => {
        this.eeBalances = data;
      },
      (error) => {
        console.error('Error fetching EE balances', error);
      }
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchEEBalances();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchEEBalances();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.fetchEEBalances();
  }
}