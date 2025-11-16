import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EEBalanceExplorerComponent } from './components/ee-balance-explorer/ee-balance-explorer.component';
import { EIBalanceExplorerComponent } from './components/ei-balance-explorer/ei-balance-explorer.component';
import { ReconciliationExplorerComponent } from './components/reconciliation-explorer/reconciliation-explorer.component';
import { FilterBarComponent } from './components/filter-bar.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'ee-list', component: EEBalanceExplorerComponent },
  { path: 'ei-list', component: EIBalanceExplorerComponent },
  { path: 'reconciliation', component: ReconciliationExplorerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EEBalanceExplorerComponent,
    EIBalanceExplorerComponent,
    ReconciliationExplorerComponent,
    FilterBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }