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

  settlementsSave: Settlement[] = [
    {
      settlementId: 1,
      description: 'lokata',
      price: 17200,
      priceType: 'save'
    },
    {
      settlementId: 2,
      description: 'obligacje',
      price: 60000,
      priceType: 'save'
    },
    {
      settlementId: 3,
      description: 'złoto',
      price: 20000,
      priceType: 'save'
    }
  ];
  summarizeSettlements: SummarizeSettlement[] = [];
  summarizeYearChartDataset: any;
  date = new Date();

  constructor(
    private dialogService: DialogService,
    private settlementsService: SettlementsService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit():void {
    this.loadSettlements(this.date);
    this.loadSummarizeYearChartDataset(this.date);
  }

  loadSettlements(date: Date): void {
    this.date = date;
    const fromDate = DateUtil.getFirstDayOfMonth(date);
    const toDate = DateUtil.getLastDayOfMonth(date);
    this.settlementsService.getSettlementsBetweenDates(fromDate, toDate).subscribe({
      next: (res) => {
        this.settlements = res;
        this.settlementsIn = this.settlements.filter(s => s.priceType === 'in');
        this.settlementsOut = this.settlements.filter(s => s.priceType === 'out');
        this.settlementsSave = this.settlements.filter(s => s.priceType === 'save');
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.loadSummarizeSettlements(fromDate, toDate);
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
        ref.onClose.subscribe(res => this.onDialogResponse(res));
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
        console.log(res);
        this.loadSettlements(this.date);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onDialogResponse(res: any): void {
    if(res.save) {
      this.loadSettlements(this.date);
    }
  }

  onDialogSavingResponse(res: any): void {
    if(res.save) {
      this.loadSettlements(this.date);
    }
  }
}
