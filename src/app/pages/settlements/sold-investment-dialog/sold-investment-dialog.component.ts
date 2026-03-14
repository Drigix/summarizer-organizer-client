import {Component, OnInit} from '@angular/core';
import {VerticalBarModel} from "@entities/vertical-bar.model";
import {SoldInvestmentService} from "@services/sold-investment.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SettlementSavingEnum} from "@entities/enums/settlement-saving.enum";

@Component({
  selector: 'sold-investment-dialog',
  templateUrl: 'sold-investment-dialog.component.html',
  standalone: false
})
export class SoldInvestmentDialogComponent implements OnInit {

  soldInvestmentsChartDataset?: VerticalBarModel;
  soldInvestmentsSavingType?: SettlementSavingEnum;
  soldInvestmentsDate?: Date;

  constructor(
    private soldInvestmentService: SoldInvestmentService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
  }

  ngOnInit(): void {
    this.soldInvestmentsSavingType = this.config.data.savingType;
    const year = this.config.data.year;
    this.soldInvestmentsDate = new Date(year,1,1)
    this.loadChartDataset(this.soldInvestmentsSavingType!, this.soldInvestmentsDate);
  }

  loadChartDataset(savingType: SettlementSavingEnum, date: Date) {
    this.soldInvestmentService.getSummarizeSoldInvestmentToChart(savingType, date.getFullYear()).subscribe({
      next: (res: any) => this.soldInvestmentsChartDataset = res
    });
  }
}
