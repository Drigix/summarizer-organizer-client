import { NgModule } from '@angular/core';
import { SettlementsComponent } from './settlements/settlements.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SettlementDialogComponent } from './settlements/settlement-dialog/settlement-dialog.component';
import {} from '@angular/common/http';
import { SettlementsService } from '@services/settlement.service';
import { SettlementSavingDialogComponent } from './settlements/settlement-saving-dialog/settlement-saving-dialog.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule
  ],
  exports: [
    PagesRoutingModule,
    SettlementsComponent,
    SettlementDialogComponent,
    SettlementSavingDialogComponent
  ],
  declarations: [
    SettlementsComponent,
    SettlementDialogComponent,
    SettlementSavingDialogComponent
  ],
  providers: [
    SettlementsService
  ],
})
export class PagesModule { }
