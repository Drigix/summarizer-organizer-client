import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExtractDataTypeEnum } from '@entities/enums/extract-data-type.enum';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-data-extractor-dialog',
    templateUrl: 'data-extractor-dialog.component.html',
    styleUrls: ['data-extractor-dialog.component.scss'],
    standalone: false
})
export class DataExtractorDialogComponent implements OnInit {

    private _formGroup!: FormGroup;
    private _settlementDataTypeToExtract: any[] = [];

    constructor(
        private ref: DynamicDialogRef
    ) { }

    get formGroup(): FormGroup {
        return this._formGroup;
    }

    set formGroup(value: FormGroup) {
        this._formGroup = value;
    }

    get settlementDataTypeToExtract(): any[] {
        return this._settlementDataTypeToExtract;
    }

    set settlementDataTypeToExtract(value: any[]) {
        this._settlementDataTypeToExtract = value;
    }

    ngOnInit(): void {
        this.createFormGroup();
        this.initSettlementDataTypeToExtract();
    }

    onSave(): void {
        const object = Object.assign({}, this.formGroup.value);
        console.log('onSave', object);
        this.ref.close({dataType: object.dataType.key, dateFrom: object.dateRange[0], dateTo: object.dateRange[1]});
    }

    onCloseDialog(): void {
        this.ref.close();
    }

     createFormGroup(): void {
        this.formGroup = new FormGroup({
            dataType: new FormControl(null, Validators.required),
            dateRange: new FormControl<Date[] | null>(null, Validators.required)
        });
     }
    
    private initSettlementDataTypeToExtract(): void {
        this.settlementDataTypeToExtract = [
            { name: 'settlement.extractOptions.inAndOut', key: ExtractDataTypeEnum.IN_AND_OUT },
            { name: 'settlement.extractOptions.savings', key: ExtractDataTypeEnum.SAVINGS }
        ];
    }
}