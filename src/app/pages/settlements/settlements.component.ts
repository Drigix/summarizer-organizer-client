import { Component, OnInit } from '@angular/core';
import { Settlement } from '@entities/settlement.model';
import { EmitSettlementPreviewType } from '@entities/types/emit-types';
import { DateUtil } from '@shared/date/date.util';
import { DialogService } from 'primeng/dynamicdialog';
import { SettlementDialogComponent } from './settlement-dialog/settlement-dialog.component';
import { SettlementsService } from '@services/settlement.service';
import { SummarizeSettlement } from '@entities/summarize-settlement.model';
import { ConfirmationService } from 'primeng/api';
import { SettlementSavingDialogComponent } from './settlement-saving-dialog/settlement-saving-dialog.component';
import { SettlementSavingService } from '@services/settlement-saving.service';
import { SettlementSaving } from '@entities/settlement-saving.model';
import { DoughnutChartModel } from '@entities/doughnut-chart.model';
import { VerticalBarModel } from '@entities/vertical-bar.model';
import { ProfitLineChartModel } from '@entities/profit-line-chart.model';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.scss']
})
export class SettlementsComponent implements OnInit {

  settlements: Settlement[] = [];
  settlementsIn: Settlement[] = [
    {
      settlementId: 1,
      description: 'wyplata',
      price: 5800,
      priceType: 'in'
    },
    {
      settlementId: 1,
      description: 'z drugiego konta',
      price: 200,
      priceType: 'in'
    },
    {
      settlementId: 1,
      description: 'odsetki',
      price: 150,
      priceType: 'in'
    }
  ];

  settlementsOut: Settlement[] = [
    {
      settlementId: 1,
      description: 'silownia',
      price: 80,
      priceType: 'out'
    },
    {
      settlementId: 1,
      description: 'jedzenie',
      price: 200,
      priceType: 'out'
    },
    {
      settlementId: 1,
      description: 'bilet',
      price: 80,
      priceType: 'out'
    }
  ];

  settlementsSaving: SettlementSaving[] = [
    {
      description: 'lokata',
      price: 17200,
      priceType: 'save'
    },
    {
      description: 'obligacje',
      price: 60000,
      priceType: 'save'
    },
    {
      description: 'złoto',
      price: 20000,
      priceType: 'save'
    }
  ];
  summarizeSettlements: SummarizeSettlement[] = [];
  summarizeSavingSettlements?: DoughnutChartModel;
  summarizeYearChartDataset?: VerticalBarModel;
  profitBondsAndDepositsChartDataset?: ProfitLineChartModel;
  date = new Date();

  constructor(
    private dialogService: DialogService,
    private settlementsService: SettlementsService,
    private settlementsSavingService: SettlementSavingService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit():void {
    // this.loadSettlements(this.date);
    // this.loadSavingSettlements(this.date);
    this.onDateChange(this.date);
    this.loadSummarizeYearChartDataset(this.date);
    this.loadProfitForBondsAndDepositsToChart(this.date);
  }

  onDateChange(date: Date): void {
    this.date = date;
    const fromDate = DateUtil.getFirstDayOfMonth(date);
    const toDate = DateUtil.getLastDayOfMonth(date);
    this.loadSettlements(fromDate, toDate);
    this.loadSummarizeSettlements(fromDate, toDate);
    this.loadSavingSettlements(toDate);
    this.loadSummarizeSettlementsSaving(toDate);
  }

  loadSettlements(fromDate: string, toDate: string): void {
    this.settlementsService.getSettlementsBetweenDates(fromDate, toDate).subscribe({
      next: (res) => {
        this.settlements = res;
        this.settlementsIn = this.settlements.filter(s => s.priceType === 'in');
        this.settlementsOut = this.settlements.filter(s => s.priceType === 'out');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadSavingSettlements(toDate: string): void {
    this.settlementsSavingService.getSettlementsSavingToDate(toDate).subscribe({
      next: (res) => {
        this.settlementsSaving = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadSummarizeSettlements(fromDate: string, toDate: string): void {
    this.settlementsService.getSummarizeSettlementsBetweenDates(fromDate, toDate).subscribe({
      next: (res) => {
        this.summarizeSettlements = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadSummarizeSettlementsSaving(toDate: string): void {
    this.settlementsSavingService.getSummarizeSettlementsSavingToChart(toDate).subscribe({
      next: (res) => {
        this.summarizeSavingSettlements = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  loadSummarizeYearChartDataset(date: Date): void {
    this.settlementsService.getSummarizeYearChartDataset(date.getFullYear()).subscribe({
      next: (res) => {
        this.summarizeYearChartDataset = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadProfitForBondsAndDepositsToChart(date: Date): void {
    this.settlementsSavingService.getProfitForBondsAndDeposits(date.getFullYear()).subscribe({
      next: (res) => {
        this.profitBondsAndDepositsChartDataset = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  openDialog(emitSettlementPreviewType: EmitSettlementPreviewType): void {
    if(emitSettlementPreviewType.buttonClickType === 'delete') {

      this.confirmationService.confirm({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        acceptIcon:"pi pi-check",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.deleteSettlement(emitSettlementPreviewType.settlement._id!);
        },
        key: 'mainDialog'
      });
    } else {
      if(emitSettlementPreviewType.priceType === 'save') {
        const ref = this.dialogService.open(SettlementSavingDialogComponent, {
          header: 'Test',
          data: {
            clickType: emitSettlementPreviewType.buttonClickType,
            selectedSettlement: emitSettlementPreviewType.settlement,
            priceType: emitSettlementPreviewType.priceType,
            date: this.date
          },
          width: '50%'
        });
        ref.onClose.subscribe(res => this.onSavingDialogResponse(res));
      } else {
        const ref = this.dialogService.open(SettlementDialogComponent, {
          header: 'Test',
          data: {
            clickType: emitSettlementPreviewType.buttonClickType,
            selectedSettlement: emitSettlementPreviewType.settlement,
            priceType: emitSettlementPreviewType.priceType,
            date: this.date
          },
          width: '50%'
        });
        ref.onClose.subscribe(res => this.onDialogResponse(res));
      }
    }
  }

  deleteSettlement(id: string): void {
    this.settlementsService.deleteSettlement(id).subscribe({
      next: (res) => {
        const fromDate = DateUtil.getFirstDayOfMonth(this.date);
        const toDate = DateUtil.getLastDayOfMonth(this.date);
        this.loadSettlements(fromDate, toDate);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onDialogResponse(res: any): void {
    if(res.save) {
      const fromDate = DateUtil.getFirstDayOfMonth(this.date);
      const toDate = DateUtil.getLastDayOfMonth(this.date);
      this.loadSettlements(fromDate, toDate);
    }
  }

  onSavingDialogResponse(res: any): void {
    if(res?.save) {
      const toDate = DateUtil.getLastDayOfMonth(this.date);
      this.loadSavingSettlements(toDate);
    }
  }

  // onDialogSavingResponse(res: any): void {
  //   if(res.save) {
  //     this.loadSettlements(this.date);
  //   }
  // }
}
