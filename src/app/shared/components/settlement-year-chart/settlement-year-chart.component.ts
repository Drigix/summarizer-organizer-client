import {
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { VerticalBarModel } from '@entities/vertical-bar.model';
import {SettlementSavingEnum} from "@entities/enums/settlement-saving.enum";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-settlement-year-chart',
    templateUrl: './settlement-year-chart.component.html',
    styleUrls: ['./settlement-year-chart.component.scss'],
    standalone: false
})
export class SettlementYearChartComponent implements OnInit, OnChanges{

  @Input() set data(data: VerticalBarModel) {
    if (data?.datasets && Array.isArray(data.datasets)) {
      data.datasets.forEach((dataset: any) => {
        dataset.label = this.translateService.instant(dataset.label);
      });
    }
    this._data = data;
  };

  get data() {
    return this._data;
  }

  @Input() investment = false;
  @Input() showSoldInvestmentButton = false;

  @Output() emitSoldInvestment = new EventEmitter();

  options: any;
  documentStyle: any;
  summarizePrizesLeft: number = 0;
  summarizePrizesRight: number = 0;

  private _data: VerticalBarModel = {}

  constructor(
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = this.documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder =
      this.documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.summarizePrizesLeft = 0;
      this.summarizePrizesRight = 0;
      if(this.investment) {
        const dataBuy = this.data?.datasets![0];
        const dataCurrent = this.data?.datasets![1];
        dataBuy?.data?.forEach(d => this.summarizePrizesLeft!+= Number(d));
        dataCurrent?.data?.forEach(d => this.summarizePrizesRight!+= Number(d));
      } else {
        const dataIn = this.data?.datasets![0];
        const dataOut = this.data?.datasets![1];
        dataIn?.data?.forEach(d => this.summarizePrizesLeft!+= Number(d));
        dataOut?.data?.forEach(d => this.summarizePrizesRight!+= Number(d));
      }
    }
  }

  onSoldStockClicked(): void {
    this.emitSoldInvestment.emit(SettlementSavingEnum.STOCK);
  }
}
