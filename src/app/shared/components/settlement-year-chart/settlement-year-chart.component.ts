import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { VerticalBarModel } from '@entities/vertical-bar.model';

@Component({
  selector: 'app-settlement-year-chart',
  templateUrl: './settlement-year-chart.component.html',
  styleUrls: ['./settlement-year-chart.component.scss'],
})
export class SettlementYearChartComponent implements OnInit, OnChanges {
  @Input() data: VerticalBarModel = {};

  options: any;
  documentStyle: any;

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
    this.data.datasets?.forEach((dt: any) => {
      if (dt.label === 'Przychodzące') {
        dt.backgroundColor = this.documentStyle.getPropertyValue(
          '--uwb-price-in-light-color'
        );
        dt.borderColor = this.documentStyle.getPropertyValue(
          '--uwb-price-in-light-color'
        );
      } else if (dt.label === 'Wychodzące') {
        dt.backgroundColor = this.documentStyle.getPropertyValue(
          '--uwb-price-out-light-color'
        );
        dt.borderColor = this.documentStyle.getPropertyValue(
          '--uwb-price-out-light-color'
        );
      }
    });
  }
}
