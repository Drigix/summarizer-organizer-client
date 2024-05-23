import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SettlementSaving } from '@entities/settlement-saving.model';
import { Settlement } from '@entities/settlement.model';
import { PriceType } from '@entities/types/price.types';
import { SettlementsService } from '@services/settlement.service';
import { DateUtil } from '@shared/date/date.util';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-settlement-saving-dialog',
  templateUrl: './settlement-saving-dialog.component.html',
  styleUrls: ['./settlement-saving-dialog.component.scss']
})
export class SettlementSavingDialogComponent implements OnInit {

  formGroup!: FormGroup;
  date = new Date();
  priceType?: PriceType;
  savingTypes = [
    { name: 'Obligacje', value: 'bonds'},
    { name: 'Lokata', value: 'deposit'},
    { name: 'Akcje', value: 'stock'},
    { name: 'Złoto', value: 'gold'},
    { name: 'Bez procentów', value: 'none'}
  ];

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
    const settlement: SettlementSaving = this.config.data.selectedSettlement;
    if(settlement) {
      this.formGroup.patchValue({
        date: settlement.date,
        dateTo: settlement.dateTo,
        priceType: settlement.priceType,
        description: settlement.description,
        price: settlement.price,
        savingType: settlement.savingType,
        percent: settlement.percent,
        percentPeriod: settlement.percentPeriod
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
      dateTo: new FormControl(this.date, Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      savingType: new FormControl('', Validators.required),
      percent: new FormControl(0, Validators.required),
      percentPeriod: new FormControl(0, Validators.required),
      priceType: new FormControl('', Validators.required)
    });
  }

  onCloseDialog(): void {
    this.ref.close();
  }

  onSave(): void {
    const value = Object.assign(this.formGroup.getRawValue() as SettlementSaving);
    console.log(value);
    // this.settlementsService.createSettlement(value).subscribe({
    //   next: () => {
    //     this.ref.close({ save: true });
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }

}
