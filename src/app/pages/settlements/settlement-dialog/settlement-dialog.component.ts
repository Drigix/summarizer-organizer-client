import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewSettlement, Settlement } from '@entities/settlement.model';
import { ButtonClickType } from '@entities/types/button-click.types';
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
  dialogType?: ButtonClickType;

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
    this.dialogType = this.config.data.clickType;
    const priceType = this.config.data.priceType;
    this.date = this.config.data.date;
    const date = DateUtil.getFirstDayOfMonth(this.config.data.date);
    const settlement: Settlement = this.config.data.selectedSettlement;
    if(this.dialogType === 'edit' && settlement) {
      this.formGroup.patchValue({
        id : settlement._id,
        date: new Date(settlement.date!),
        priceType: settlement.priceType,
        description: settlement.description,
        linkUrl: settlement.linkUrl,
        price: settlement.price
      });
    } else {
      this.formGroup.removeControl('id');
      this.formGroup.patchValue({
        date: this.date,
        toDate: this.date,
        priceType,
      });
    }
  }

  createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      id: new FormControl(null),
      date: new FormControl(this.date, Validators.required),
      toDate: new FormControl(this.date, Validators.required),
      description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      linkUrl: new FormControl(null, [Validators.minLength(10), Validators.maxLength(300)]),
      price: new FormControl(0, Validators.required),
      priceType: new FormControl('', Validators.required)
    });
  }

  onCloseDialog(): void {
    this.ref.close();
  }

  onSave(): void {
    if(this.dialogType === 'add') {
      const value: NewSettlement = Object.assign(this.formGroup.getRawValue() as NewSettlement);
      this.settlementsService.createSettlement(value).subscribe({
        next: () => {
          this.ref.close({ save: true });
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (this.dialogType === 'edit') {
      const value = Object.assign(this.formGroup.getRawValue() as Settlement);
      this.settlementsService.updateSettlement(value.id, value).subscribe({
        next: () => {
          this.ref.close({ save: true });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
