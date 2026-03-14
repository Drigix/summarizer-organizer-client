import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getMonth } from '@entities/types/month.types';
import { DateUtil } from '@shared/date/date.util';

type DateChangerType = 'month' | 'year';
type DateChangeType = 'next' | 'previous';

@Component({
    selector: 'app-date-changer',
    templateUrl: './date-changer.component.html',
    styleUrls: ['./date-changer.component.scss'],
    standalone: false
})
export class DateChangerComponent implements OnInit {

  @Input() dateChangerType: DateChangerType = 'month';

  @Output() emitDateChange = new EventEmitter();

  @Input() date = new Date();

  currentDate: Date = new Date();
  isNextChangeDisabled = false;

  constructor() { }

  ngOnInit(): void {
    this.changeButtonStatus();
  }

  onDateChange(dateChangeType: DateChangeType): void {
    if(this.dateChangerType === 'month') {
      if(dateChangeType === 'next') {
        this.date.setMonth(this.date.getMonth() + 1);
      } else if(dateChangeType === 'previous') {
        this.date.setMonth(this.date.getMonth() - 1);
      }
    } else if(this.dateChangerType === 'year') {
      if(dateChangeType === 'next') {
        this.date.setFullYear(this.date.getFullYear() + 1);
      } else if(dateChangeType === 'previous') {
        this.date.setFullYear(this.date.getFullYear() - 1);
      }
    }
    this.changeButtonStatus();
    this.emitDateChange.emit(this.date);
  }

  changeButtonStatus(): void {
    if(this.dateChangerType === 'month') {

    } else if(this.dateChangerType === 'year') {
      this.isNextChangeDisabled = this.date.getFullYear() + 1 > this.currentDate.getFullYear();
    }
  }

  getMonthName(): string {
    return getMonth(this.date.getMonth() + 1);
  }
}
