import { NgModule } from '@angular/core';
import { DateChangerComponent } from './date-changer/date-changer.component';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SettlementPreviewComponent } from './settlement-preview/settlement-preview.component';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormComponent } from './form/form.component';
import { FormGridComponent } from './form/form-grid/form-grid.component';
import { FormControlComponent } from './form/form-control/form-control.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { SumarrizerSettlementComponent } from './sumarrizer-settlement/sumarrizer-settlement.component';
import { MeterGroupModule } from 'primeng/metergroup';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { SettlementYearChartComponent } from './settlement-year-chart/settlement-year-chart.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SettlementSavingChartComponent } from './settlement-saving-chart/settlement-saving-chart.component';
import { ProfitLineChartComponent } from './profit-line-chart/profit-line-chart.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    CalendarModule,
    PanelModule,
    FieldsetModule,
    DividerModule,
    MeterGroupModule,
    CardModule,
    ChartModule,
    ConfirmDialogModule,
    InputNumberModule,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    FormsModule
  ],
  exports: [
    DateChangerComponent,
    ToolbarModule,
    ButtonModule,
    SettlementPreviewComponent,
    FormComponent,
    FormGridComponent,
    FormControlComponent,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    CalendarModule,
    PanelModule,
    FieldsetModule,
    DividerModule,
    SumarrizerSettlementComponent,
    CardModule,
    ChartModule,
    SettlementYearChartComponent,
    ConfirmDialogModule,
    InputNumberModule,
    DropdownModule,
    SettlementSavingChartComponent,
    ProfitLineChartComponent,
    IconFieldModule,
    InputIconModule
  ],
  declarations: [
    DateChangerComponent,
    SettlementPreviewComponent,
    FormComponent,
    FormGridComponent,
    FormControlComponent,
    SumarrizerSettlementComponent,
    SettlementYearChartComponent,
    SettlementSavingChartComponent,
    ProfitLineChartComponent
  ],
  providers: [
    DialogService,
    TranslateService,
    ConfirmationService
  ],
})
export class ComponentsModule { }
