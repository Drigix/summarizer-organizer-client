import { Component, Input, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-settlement-saving-chart',
    templateUrl: './settlement-saving-chart.component.html',
    styleUrls: ['./settlement-saving-chart.component.scss'],
    standalone: false
})
export class SettlementSavingChartComponent implements OnInit {

  private _data: any;

  @Input() set data(data: any) {
    if (data?.labels && Array.isArray(data.labels)) {
      const translatedLabels: string[] = [];
      data.labels.forEach((label: string) => {
        translatedLabels.push(this.translateService.instant(label));
      });
      data.labels = translatedLabels;
    }
    this._data = data;
  };

  get data(): any {
    return this._data;
  }

  options: any;

  constructor(
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');


      this.options = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };
  }
}
