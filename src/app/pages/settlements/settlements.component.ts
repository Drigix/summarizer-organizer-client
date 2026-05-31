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
import {ButtonClickType} from "@entities/types/button-click.types";
import {PriceType} from "@entities/types/price.types";
import {SharedMessageService} from "@services/shared-message.service";
import {SharedMessage} from "@entities/shared-message.model";
import {SettlementYearChartComponent} from "@shared/components/settlement-year-chart/settlement-year-chart.component";
import {ProfitLineChartComponent} from "@shared/components/profit-line-chart/profit-line-chart.component";
import {
  UnrealizedProfitDialogComponent
} from "@pages/settlements/unrealized-profit-dialog/unrealized-profit-dialog.component";
import {UnrealizedProfitDialogModel} from "@entities/unrealized-profit-dialog.model";

@Component({
    selector: 'app-settlements',
    templateUrl: './settlements.component.html',
    styleUrls: ['./settlements.component.scss'],
    standalone: false
})
export class SettlementsComponent implements OnInit {

  @ViewChild('settlementSavingComponent')
  settlementSavingComponent!: SettlementPreviewComponent;

  @ViewChild('stockComponent')
  stockComponent!: SettlementYearChartComponent;

  @ViewChild('goldComponent')
  goldComponent!: SettlementYearChartComponent;

  @ViewChild('silverComponent')
  silverComponent!: SettlementYearChartComponent;

  @ViewChild('bondsAndDepositComponent')
  bondsAndDepositComponent!: ProfitLineChartComponent;

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
    private translateService: TranslateService,
    private sharedMessageService: SharedMessageService
  ) { }

  ngOnInit():void {
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
    switch (emitSettlementPreviewType.buttonClickType) {
      case 'refresh': {
        this.onRefreshPriceClick([emitSettlementPreviewType?.settlement?._id!]);
        break;
      }
      case 'unrealized-profit': {
        this.onUnrealizedProfitClick();
        break;
      }
      case 'delete': {
        this.confirmationService.confirm({
          message: this.translateService.instant('global.questions.deleteConfirmation'),
          header: this.translateService.instant('global.header.confirm'),
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
        break;
      }
      case 'add':
      case 'edit': {
        if (emitSettlementPreviewType.priceType === 'save') {
          this.openSettlementSaveDialog(emitSettlementPreviewType);
        } else {
          this.openSettlementDialog(emitSettlementPreviewType);
        }
        break;
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

  private openSettlementDialog(emitSettlementPreviewType: EmitSettlementPreviewType): void {
    const ref = this.dialogService.open(SettlementDialogComponent, {
      header: this.getSettlementDialogHeader(emitSettlementPreviewType.buttonClickType, emitSettlementPreviewType.priceType),
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

  private openSettlementSaveDialog(emitSettlementPreviewType: EmitSettlementPreviewType): void {
    const ref = this.dialogService.open(SettlementSavingDialogComponent, {
      header: this.getSettlementDialogHeader(emitSettlementPreviewType.buttonClickType, emitSettlementPreviewType.priceType),
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
  }

  private onRefreshPriceClick(ids: string[]): void {
    this.settlementsSavingService.refreshPrices(ids).subscribe({
      next: (res) => {
        this.sharedMessageService.showSuccessMessage(new SharedMessage('global.messages.success', 'settlement.messages.refreshPriceSuccess'));
        const toDate = DateUtil.getLastDayOfMonth(this.date);
        this.loadSavingSettlements(toDate);
        this.refreshData();
      },
      error: (err) => {
        this.sharedMessageService.showErrorMessage(new SharedMessage('global.messages.error', 'global.messages.errorDetails'));
      }
    })
  }

  private onUnrealizedProfitClick(): void {
    const noneSavingTypePrize = this.settlementsSaving.filter(s => s.savingType! === 'none').reduce((sum, s) => sum + s.price!, 0);
    const unrealizedProfitData = [
      new UnrealizedProfitDialogModel('stock', this.stockComponent.summarizePrizesLeft, this.stockComponent.summarizePrizesRight),
      new UnrealizedProfitDialogModel('gold', this.goldComponent.summarizePrizesLeft, this.goldComponent.summarizePrizesRight),
      new UnrealizedProfitDialogModel('silver', this.silverComponent.summarizePrizesLeft, this.silverComponent.summarizePrizesRight),
      new UnrealizedProfitDialogModel('bonds', this.bondsAndDepositComponent.summarizePrizesLeft, this.bondsAndDepositComponent.summarizePrizesRight),
      new UnrealizedProfitDialogModel('none', noneSavingTypePrize, noneSavingTypePrize),
    ]
    const ref = this.dialogService.open(UnrealizedProfitDialogComponent, {
      header: this.translateService.instant('global.header.unrealizedProfit'),
      data: {
        unrealizedProfitData: unrealizedProfitData
      },
      closable: true,
      width: '50%',
      focusOnShow: false
    });
  }

  private getSettlementDialogHeader(buttonClickType: ButtonClickType, priceType: PriceType): string {
    let header = this.translateService.instant('global.header.addSettlementInHeader');
    if (buttonClickType === 'add') {
      if (priceType === 'in') {
        header = this.translateService.instant('global.header.addSettlementInHeader');
      } else if (priceType === 'out') {
        header = this.translateService.instant('global.header.addSettlementOutHeader');
      } else if (priceType === 'save') {
        header = this.translateService.instant('global.header.addSettlementSaveHeader');
      }
    } else if (buttonClickType === 'edit') {
      if (priceType === 'in') {
        header = this.translateService.instant('global.header.editSettlementInHeader');
      } else if (priceType === 'out') {
        header = this.translateService.instant('global.header.editSettlementOutHeader');
      } else if (priceType === 'save') {
        header = this.translateService.instant('global.header.editSettlementSaveHeader');
      }
    }
    return header;
  }
}
