import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EEListComponent } from './components/ee-list/ee-list.component';
import { EIListComponent } from './components/ei-list/ei-list.component';
import { ReconciliationComponent } from './components/reconciliation/reconciliation.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'ee-list', component: EEListComponent },
  { path: 'ei-list', component: EIListComponent },
  { path: 'reconciliation', component: ReconciliationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EEListComponent,
    EIListComponent,
    ReconciliationComponent
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