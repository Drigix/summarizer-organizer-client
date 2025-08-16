import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewSettlementSaving, SettlementSaving } from '@entities/settlement-saving.model';
import { Settlement } from '@entities/settlement.model';
import { ButtonClickType } from '@entities/types/button-click.types';
import { PriceType } from '@entities/types/price.types';
import { SettlementSavingService } from '@services/settlement-saving.service';
import { SettlementsService } from '@services/settlement.service';
import { DateUtil } from '@shared/date/date.util';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-settlement-saving-dialog',
    templateUrl: './settlement-saving-dialog.component.html',
    styleUrls: ['./settlement-saving-dialog.component.scss'],
    standalone: false
})
export class SettlementSavingDialogComponent implements OnInit {

  formGroup!: FormGroup;
  date = new Date();
  priceType?: PriceType;
  dialogType?: ButtonClickType;
  savingTypes = [
    { name: 'Obligacje', value: 'bonds'},
    { name: 'Lokata', value: 'deposit'},
    { name: 'Akcje', value: 'stock'},
    { name: 'Złoto', value: 'gold'},
    { name: 'Srebro', value: 'silver'},
    { name: 'Kryptowaluty', value: 'crypto'},
    { name: 'Bez procentów', value: 'none'}
  ];
  isStockChoose = false;
  isCryptoChoose = false;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private settlementsSavingService: SettlementSavingService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.loadPageValues();
  }

  loadPageValues(): void {
    this.dialogType = this.config.data.clickType;
    const priceType = this.config.data.priceType;
    const date = DateUtil.getFirstDayOfMonth(this.config.data.date);
    const settlement: SettlementSaving = this.config.data.selectedSettlement;
    if(this.dialogType === 'edit' && settlement) {
      this.formGroup.patchValue({
        id : settlement._id,
        date: new Date(settlement.date!),
        dateTo: settlement.dateTo ? new Date(settlement.dateTo) : null,
        priceType: settlement.priceType,
        description: settlement.description,
        linkUrl: settlement.linkUrl,
        quantity: settlement.quantity,
        price: settlement.price,
        currentPrice: settlement.currentPrice,
        savingType: settlement.savingType,
        percent: settlement.percent,
        percentPeriod: settlement.percentPeriod
      });
      this.onSavingTypeChange(settlement.savingType!);
    } else {
      this.formGroup.removeControl('id');
      this.formGroup.patchValue({
        date: this.date,
        priceType,
      });
    }
  }

  createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      id: new FormControl(null),
      date: new FormControl(this.date, Validators.required),
      dateTo: new FormControl(null),
      description: new FormControl('', Validators.required),
      linkUrl: new FormControl(null),
      quantity: new FormControl(null),
      price: new FormControl(0, Validators.required),
      currentPrice: new FormControl(0),
      savingType: new FormControl('', Validators.required),
      percent: new FormControl(0, Validators.required),
      percentPeriod: new FormControl(0, Validators.required),
      priceType: new FormControl('', Validators.required)
    });
  }

  onSavingTypeChange(value: string) {
    if(value === 'stock' || value === 'gold' || value === 'silver') {
      this.isStockChoose = true;
      this.cd.detectChanges();
    } else if (value === 'crypto') {
      this.isCryptoChoose = true;
    } else {
      this.isStockChoose = false;
      this.isCryptoChoose = false;
    }
  }

  onCloseDialog(): void {
    this.ref.close();
  }

  onSave(): void {
    if (this.isCryptoChoose || this.isStockChoose) {
      this.formGroup.get('dateTo')?.setValue(null);
    }
    if(this.dialogType === 'add') {
      const value: NewSettlementSaving = Object.assign(this.formGroup.getRawValue() as NewSettlementSaving);
      this.settlementsSavingService.createSettlementSaving(value).subscribe({
        next: () => {
          this.ref.close({ save: true });
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (this.dialogType === 'edit') {
      const value = Object.assign(this.formGroup.getRawValue() as SettlementSaving);
      this.settlementsSavingService.updateSettlementSaving(value.id, value).subscribe({
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
