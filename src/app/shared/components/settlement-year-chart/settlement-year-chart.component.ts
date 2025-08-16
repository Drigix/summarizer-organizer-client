import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { VerticalBarModel } from '@entities/vertical-bar.model';

@Component({
  selector: 'app-settlement-year-chart',
  templateUrl: './settlement-year-chart.component.html',
  styleUrls: ['./settlement-year-chart.component.scss'],
})
export class SettlementYearChartComponent implements OnInit, OnChanges{
  @Input() data: VerticalBarModel = {};
  @Input() investment = false;

  options: any;
  documentStyle: any;
  summarizePrizesLeft: number = 0;
  summarizePrizesRight: number = 0;

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
        const dataBuy = this.data.datasets![0];
        const dataCurrent = this.data.datasets![1];
        dataBuy.data?.forEach(d => this.summarizePrizesLeft!+= d);
        dataCurrent.data?.forEach(d => this.summarizePrizesRight!+= d);
      } else {
        const dataIn = this.data.datasets![0];
        const dataOut = this.data.datasets![1];
        dataIn.data?.forEach(d => this.summarizePrizesLeft!+= d);
        dataOut.data?.forEach(d => this.summarizePrizesRight!+= d);
      }
    }
  }
}
