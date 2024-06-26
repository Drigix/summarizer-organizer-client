import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettlementsComponent } from './settlements/settlements.component';

const routes: Routes = [
  {
    path: '',
    component: SettlementsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PagesRoutingModule { }
