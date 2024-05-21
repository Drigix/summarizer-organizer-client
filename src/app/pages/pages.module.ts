import { NgModule } from '@angular/core';
import { SettlementsComponent } from './settlements/settlements.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SettlementDialogComponent } from './settlements/settlement-dialog/settlement-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SettlementsService } from '@services/settlement.service';


@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule
  ],
  exports: [
    PagesRoutingModule,
    SettlementsComponent,
    SettlementDialogComponent
  ],
  declarations: [
    SettlementsComponent,
    SettlementDialogComponent
  ],
  providers: [
    SettlementsService
  ],
})
export class PagesModule { }
