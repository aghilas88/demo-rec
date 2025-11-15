import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EIBalance } from '../../models/balances.model';

@Component({
  selector: 'app-ei-list',
  templateUrl: './ei-list.component.html',
  styleUrls: ['./ei-list.component.css']
})
export class EIListComponent implements OnInit {
  eiBalances: EIBalance[] = [];
  configName: string = '';
  balanceDate: string = '';
  currentPage: number = 0;
  pageSize: number = 20;
  totalPages: number = 5;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  fetchEIBalances(): void {
    if (!this.configName || !this.balanceDate) {
      alert('Please enter Config Name and Balance Date');
      return;
    }
    
    this.apiService.getEIBalances(this.configName, this.balanceDate, this.currentPage, this.pageSize).subscribe(
      (data: EIBalance[]) => {
        this.eiBalances = data;
      },
      (error) => {
        console.error('Error fetching EI balances', error);
      }
    );
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