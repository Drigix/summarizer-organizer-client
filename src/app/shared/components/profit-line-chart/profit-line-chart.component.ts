import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProfitLineChartDataModel, ProfitLineChartModel} from '@entities/profit-line-chart.model';
import {TranslateService} from "@ngx-translate/core";
import {VerticalBarDataModel, VerticalBarModel} from "@entities/vertical-bar.model";

@Component({
    selector: 'app-profit-line-chart',
    templateUrl: './profit-line-chart.component.html',
    styleUrls: ['./profit-line-chart.component.scss'],
    standalone: false
})
export class ProfitLineChartComponent implements OnInit, OnChanges {

  @Input() set data(data: ProfitLineChartModel) {
    if (data?.datasets && Array.isArray(data.datasets)) {
      data.datasets.forEach((dataset: ProfitLineChartDataModel) => {
        dataset.label = this.translateService.instant(dataset?.label!);
      });
    }
    this._data = data;
  };

  get data(): any {
    return this._data;
  }

  options: any;
  summarizePrizesLeft: number = 0;
  summarizePrizesRight: number = 0;

  private _data: ProfitLineChartModel = {};

  constructor(
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.summarizePrizesLeft = 0;
      this.summarizePrizesRight = 0;
      if (this.data?.datasets && Array.isArray(this.data.datasets)) {
        this.data.datasets.forEach((dataset: ProfitLineChartDataModel) => {
          this.summarizePrizesLeft += dataset?.buyPrice!;
          this.summarizePrizesRight += Number(dataset?.data![dataset?.data?.length! - 1]);
        });
      }
    }
  }
}
