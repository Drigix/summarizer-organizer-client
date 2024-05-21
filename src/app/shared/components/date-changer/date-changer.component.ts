import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getMonth } from '@entities/types/month.types';
import { DateUtil } from '@shared/date/date.util';

type DateChangerType = 'month' | 'year';
type DateChangeType = 'next' | 'previous';

@Component({
  selector: 'app-date-changer',
  templateUrl: './date-changer.component.html',
  styleUrls: ['./date-changer.component.scss']
})
export class DateChangerComponent implements OnInit {

  @Input() dateChangerType: DateChangerType = 'month';

  @Output() emitDateChange = new EventEmitter();

  date = new Date();

  constructor() { }

  ngOnInit() { }

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
    this.emitDateChange.emit(this.date);
  }

  getMonthName(): string {
    return getMonth(this.date.getMonth() + 1);
  }
}
