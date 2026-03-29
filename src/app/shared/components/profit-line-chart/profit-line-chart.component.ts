import { Component, Input, OnInit } from '@angular/core';
import { ProfitLineChartModel } from '@entities/profit-line-chart.model';
import {TranslateService} from "@ngx-translate/core";
import {VerticalBarModel} from "@entities/vertical-bar.model";

@Component({
    selector: 'app-profit-line-chart',
    templateUrl: './profit-line-chart.component.html',
    styleUrls: ['./profit-line-chart.component.scss'],
    standalone: false
})
export class ProfitLineChartComponent implements OnInit {

  @Input() set data(data: VerticalBarModel) {
    if (data?.datasets && Array.isArray(data.datasets)) {
      data.datasets.forEach((dataset: any) => {
        dataset.label = this.translateService.instant(dataset.label);
      });
    }
    this._data = data;
  };

  get data(): any {
    return this._data;
  }

  options: any;

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

}
