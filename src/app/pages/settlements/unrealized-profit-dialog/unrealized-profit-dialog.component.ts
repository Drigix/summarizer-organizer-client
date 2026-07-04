import {Component, OnInit} from '@angular/core';
import {SoldInvestmentService} from "@services/sold-investment.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {UnrealizedProfitDialogModel} from "@entities/unrealized-profit-dialog.model";

@Component({
  selector: 'unrealized-profit-dialog',
  templateUrl: 'unrealized-profit-dialog.component.html',
  standalone: false
})
export class UnrealizedProfitDialogComponent implements OnInit {

  unrealizedProfitData: UnrealizedProfitDialogModel[] = [];
  collectedBuyPrizes = 0;
  collectedCurrentPrizes = 0;

  constructor(
    private config: DynamicDialogConfig
  ) {
  }

  ngOnInit(): void {
    this.unrealizedProfitData = this.config.data.unrealizedProfitData;
    this.unrealizedProfitData.forEach(i => {
      this.collectedBuyPrizes += i.buyPrice!;
      this.collectedCurrentPrizes += i.currentPrice!;
    });
  }
}
