import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettlementsComponent } from './settlements/settlements.component';
import { StockCompaniesComponent } from './stock-comapnies/stock-companies.component';

const routes: Routes = [
  {
    path: '',
    component: SettlementsComponent
  },
  {
    path: 'stock-companies',
    component: StockCompaniesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PagesRoutingModule { }
