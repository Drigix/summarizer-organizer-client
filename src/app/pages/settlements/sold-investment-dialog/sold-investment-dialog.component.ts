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

  constructor(
    private soldInvestmentService: SoldInvestmentService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
  }

  ngOnInit(): void {
    const savingType = this.config.data.savingType;
    const year = this.config.data.year;
    this.loadChartDataset(savingType, year);
  }

  private loadChartDataset(savingType: SettlementSavingEnum, year: number) {
    this.soldInvestmentService.getSummarizeSoldInvestmentToChart(savingType).subscribe({
      next: (res: any) => this.soldInvestmentsChartDataset = res
    });
  }
}
