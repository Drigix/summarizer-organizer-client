import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VerticalBarDataModel } from '@entities/vertical-bar.model';
import { TranslateService } from '@ngx-translate/core';
import { SettlementsService } from '@services/settlement.service';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { catchError, debounceTime, distinctUntilChanged, map, of, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ChartData } from 'chart.js';
import { SharedModule } from '@shared/shared.module';

export interface SummarizeYearsResponse {
  labels: string[];
  datasets: [VerticalBarDataModel, VerticalBarDataModel, VerticalBarDataModel]; // in, out, balance
}

@Component({
  selector: 'compare-years-dialog',
  templateUrl: 'compare-years-dialog.component.html',
  standalone: true,
  imports: [ChartModule, DatePickerModule, FormsModule, SharedModule],
})

export class CompareYearsDialogComponent implements OnInit, OnDestroy {

  private settlementsService = inject(SettlementsService);
  private translationService = inject(TranslateService);

  dates: Date[] = [new Date(new Date().getFullYear(), 0, 1)];
  data: ChartData = { labels: [], datasets: [] };
  options: any;
  loading = false;

  private readonly yearsChange$ = new Subject<number[]>();
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadOptions();
    this.yearsChange$
      .pipe(
        map((years) => [...new Set(years)].sort((a, b) => a - b)),
        debounceTime(1000),
        startWith(this.toYears(this.dates)),
        distinctUntilChanged((a, b) => a.join() === b.join()),
        tap(() => (this.loading = true)),
        switchMap((years) =>
          years.length
            ? this.settlementsService
              .getSummarizeYearsChartDataset(years)
              .pipe(catchError(() => of(null)))
            : of(null),
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        this.data = response ? this.buildChartData(response) : { labels: [], datasets: [] };
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDateChange(selectedDates: Date[] | null): void {
    this.dates = selectedDates ?? [];
    this.yearsChange$.next(this.toYears(this.dates));
  }

  private loadOptions(): void {
    this.options = {
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (ctx: any) =>
              `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('pl-PL')} zł`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: (v: number) => `${(v / 1000).toLocaleString('pl-PL')} tys. zł` },
        },
      },
    };
  }

  private toYears(dates: Date[]): number[] {
    return dates.map((d) => d.getFullYear());
  }

  private buildChartData(response: SummarizeYearsResponse): ChartData {
    const [income, expense, balance] = response.datasets;
    const t = (key: string) => this.translationService.instant(key);

    return {
      labels: response.labels,
      datasets: [
        {
          type: 'bar',
          label: t(income.label!),
          data: income.data,
          backgroundColor: income.backgroundColor,
          borderRadius: 6,
        },
        {
          type: 'bar',
          label: t(expense.label!),
          data: expense.data,
          backgroundColor: expense.backgroundColor,
          borderRadius: 6,
        },
        {
          type: 'line',
          label: t(balance.label!),
          data: balance.data,
          borderColor: balance.borderColor,
          backgroundColor: balance.backgroundColor,
          tension: 0.3,
          pointRadius: 5,
        },
      ],
    } as ChartData;
  }
}