import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Settlement } from '@entities/settlement.model';
import { PriceType } from '@entities/types/price.types';
import { SettlementsService } from '@services/settlement.service';
import { DateUtil } from '@shared/date/date.util';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-settlement-dialog',
  templateUrl: './settlement-dialog.component.html',
  styleUrls: ['./settlement-dialog.component.scss']
})
export class SettlementDialogComponent implements OnInit {

  formGroup!: FormGroup;
  date = new Date();
  priceType?: PriceType;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private settlementsService: SettlementsService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.loadPageValues();
  }

  loadPageValues(): void {
    const priceType = this.config.data.priceType;
    const date = DateUtil.getFirstDayOfMonth(this.config.data.date);
    const settlement: Settlement = this.config.data.selectedSettlement;
    if(settlement) {
      this.formGroup.patchValue({
        date: settlement.date,
        priceType: settlement.priceType,
        description: settlement.description,
        price: settlement.price
      });
    } else {
      this.formGroup.patchValue({
        date: this.date,
        priceType,
      });
    }
  }

  createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      date: new FormControl(this.date, Validators.required),
      toDate: new FormControl(this.date, Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      priceType: new FormControl('', Validators.required)
    });
  }

  onCloseDialog(): void {
    this.ref.close();
  }

  onSave(): void {
    const value = Object.assign(this.formGroup.getRawValue() as Settlement);
    console.log(value);
    this.settlementsService.createSettlement(value).subscribe({
      next: () => {
        this.ref.close({ save: true });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
