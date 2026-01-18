import {Component, OnInit, ViewChild} from '@angular/core';
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
import { SettlementSavingEnum } from '@entities/enums/settlement-saving.enum';
import {TranslateService} from "@ngx-translate/core";
import {SettlementPreviewComponent} from "@shared/components/settlement-preview/settlement-preview.component";
import {
  SoldInvestmentDialogComponent
} from "@pages/settlements/sold-investment-dialog/sold-investment-dialog.component";

@Component({
    selector: 'app-settlements',
    templateUrl: './settlements.component.html',
    styleUrls: ['./settlements.component.scss'],
    standalone: false
})
export class SettlementsComponent implements OnInit {

  @ViewChild('settlementSavingComponent')
  settlementSavingComponent!: SettlementPreviewComponent;

  settlements: Settlement[] = [];
  settlementsIn: Settlement[] = [];
  settlementsOut: Settlement[] = [];
  settlementsSaving: SettlementSaving[] = [];
  summarizeSettlements: SummarizeSettlement[] = [];
  summarizeProfitGoldPrices: SummarizeSettlement[] = [];
  summarizeProfitSilverPrices: SummarizeSettlement[] = [];
  summarizeSavingSettlements?: DoughnutChartModel;
  summarizeYearChartDataset?: VerticalBarModel;
  summarizeActionsPricesChartDataset?: VerticalBarModel;
  summarizeGoldPricesChartDataset?: VerticalBarModel;
  summarizeSilverPricesChartDataset?: VerticalBarModel;
  summarizeCryptoPricesChartDataset?: VerticalBarModel;
  profitBondsAndDepositsChartDataset?: ProfitLineChartModel;
  date = new Date();

  constructor(
    private dialogService: DialogService,
    private settlementsService: SettlementsService,
    private settlementsSavingService: SettlementSavingService,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService
  ) { }

  ngOnInit():void {
    // this.loadSettlements(this.date);
    // this.loadSavingSettlements(this.date);
    this.onDateChange(this.date);
    this.refreshData();
  }

  refreshData(): void {
    this.loadSummarizeYearChartDataset(this.date);
    this.loadProfitForBondsAndDepositsToChart(this.date);
    this.loadSummarizeActionsPricesToChart();
    this.loadSummarizeGoldPricesToChart();
    this.loadSummarizeSilverPricesToChart();
    this.loadSummarizeCryptoPricesToChart();
    this.loadProfitGoldPrices();
    this.loadProfitSilverPrices();
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
    });
  }

  loadSummarizeSettlementsSaving(toDate: string): void {
    this.settlementsSavingService.getSummarizeSettlementsSavingToChart(toDate).subscribe({
      next: (res) => {
        this.summarizeSavingSettlements = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadSummarizeYearChartDataset(date: Date): void {
    this.settlementsService.getSummarizeYearChartDataset(date.getFullYear()).subscribe({
      next: (res) => {
        this.summarizeYearChartDataset = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadSummarizeActionsPricesToChart(): void {
    this.settlementsSavingService.getSummarizePricesToChart(SettlementSavingEnum.STOCK).subscribe({
      next: (res) => {
        this.summarizeActionsPricesChartDataset = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadProfitGoldPrices(): void {
    this.settlementsSavingService.getProfitSavingTypePrices(SettlementSavingEnum.GOLD).subscribe({
      next: (res) => {
        this.summarizeProfitGoldPrices = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadProfitSilverPrices(): void {
    this.settlementsSavingService.getProfitSavingTypePrices(SettlementSavingEnum.SILVER).subscribe({
      next: (res) => {
        this.summarizeProfitSilverPrices = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadSummarizeGoldPricesToChart(): void {
    this.settlementsSavingService.getSummarizePricesToChart(SettlementSavingEnum.GOLD).subscribe({
      next: (res) => {
        this.summarizeGoldPricesChartDataset = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadSummarizeSilverPricesToChart(): void {
    this.settlementsSavingService.getSummarizePricesToChart(SettlementSavingEnum.SILVER).subscribe({
      next: (res) => {
        this.summarizeSilverPricesChartDataset = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadSummarizeCryptoPricesToChart(): void {
    this.settlementsSavingService.getSummarizePricesToChart(SettlementSavingEnum.CRYPTO).subscribe({
      next: (res) => {
        this.summarizeCryptoPricesChartDataset = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadProfitForBondsAndDepositsToChart(date: Date): void {
    this.settlementsSavingService.getProfitForBondsAndDeposits(date.getFullYear()).subscribe({
      next: (res) => {
        this.profitBondsAndDepositsChartDataset = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
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
          if(emitSettlementPreviewType.priceType === 'save') {
            this.deleteSettlementSaving(emitSettlementPreviewType.settlement._id!);
          } else {
            this.deleteSettlement(emitSettlementPreviewType.settlement._id!);
          }
        },
        key: 'mainDialog'
      });
    } else {
      if(emitSettlementPreviewType.priceType === 'save') {
        const ref = this.dialogService.open(SettlementSavingDialogComponent, {
          header: this.translateService.instant('global.header.addSavingDialog'),
          data: {
            clickType: emitSettlementPreviewType.buttonClickType,
            selectedSettlement: emitSettlementPreviewType.settlement,
            priceType: emitSettlementPreviewType.priceType,
            date: this.date,
          },
          closable: true,
          width: '50%',
          focusOnShow: false
        });
        ref.onClose.subscribe(res => this.onSavingDialogResponse(res));
      } else {
        const ref = this.dialogService.open(SettlementDialogComponent, {
          header: this.translateService.instant('global.header.editSavingDialog'),
          data: {
            clickType: emitSettlementPreviewType.buttonClickType,
            selectedSettlement: emitSettlementPreviewType.settlement,
            priceType: emitSettlementPreviewType.priceType,
            date: this.date
          },
          closable: true,
          width: '50%',
          focusOnShow: false
        });
        ref.onClose.subscribe(res => this.onDialogResponse(res));
      }
    }
  }

  openSoldInvestmentDialog(savingType: SettlementSavingEnum): void {
    const ref = this.dialogService.open(SoldInvestmentDialogComponent, {
      header: this.translateService.instant('global.header.soldStock'),
      data: {
        savingType: savingType,
        year: this.date.getFullYear()
      },
      closable: true,
      width: '50%',
      focusOnShow: false
    });
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

  deleteSettlementSaving(id: string): void {
    this.settlementsSavingService.deleteSettlementSaving(id).subscribe({
      next: (res) => {
        const toDate = DateUtil.getLastDayOfMonth(this.date);
        this.loadSavingSettlements(toDate);
        this.loadSummarizeSettlementsSaving(toDate);
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
      this.refreshData();
    }
  }

  onSavingDialogResponse(res: any): void {
    this.settlementSavingComponent.selectedSettlement = undefined;
    if(res?.save) {
      const toDate = DateUtil.getLastDayOfMonth(this.date);
      this.loadSavingSettlements(toDate);
      this.refreshData();
    }
    if(res?.sell) {
      const fromDate = DateUtil.getFirstDayOfMonth(this.date);
      const toDate = DateUtil.getLastDayOfMonth(this.date);
      this.loadSettlements(fromDate, toDate);
    }
  }

  // onDialogSavingResponse(res: any): void {
  //   if(res.save) {
  //     this.loadSettlements(this.date);
  //   }
  // }
}
