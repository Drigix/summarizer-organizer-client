import { Component, OnInit, Output } from '@angular/core';
import { ExtractDataTypeEnum } from '@entities/enums/extract-data-type.enum';
import { FileTypeEnum } from '@entities/enums/file-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { DataExtractorDialogComponent } from '@pages/settlements/data-extractor-dialog/data-extractor-dialog.component';
import { SettlementSavingDialogComponent } from '@pages/settlements/settlement-saving-dialog/settlement-saving-dialog.component';
import { DataExtractorService } from '@services/data-extractor.service';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-data-extractor-select',
    templateUrl: 'data-extractor-select.component.html',
    styleUrls: ['data-extractor-select.component.scss'],
    standalone: false
})
export class DataExtractorSelectComponent implements OnInit {

    private _fileTypes: MenuItem[] = [];
    private _selectedFileType: string | null = null;

    constructor(
        private dialogService: DialogService,
        private dataExtractorService: DataExtractorService,
        private translateService: TranslateService
    ) { }

    get fileTypes(): MenuItem[] {
        return this._fileTypes;
    }

    set fileTypes(value: MenuItem[]) {
        this._fileTypes = value;
    }

    get selectedFileType(): string | null {
        return this._selectedFileType;
    }

    set selectedFileType(value: string | null) {
        this._selectedFileType = value;
    }

    ngOnInit(): void { 
        this.initfileTypes();
    }

    openExtractDataDialog(fileType: FileTypeEnum): void {
        const ref = this.dialogService.open(DataExtractorDialogComponent, {
        header: this.translateService.instant('settlement.extractData.dialogHeader'),
        closable: true,
        width: '50%',
        focusOnShow: false
        });
        ref.onClose.subscribe(res => {
            console.log('res', res);
            this.extractData(fileType, res.dataType, res.dateFrom, res.dateTo)   
        });
    }

    private initfileTypes(): void {
        this.fileTypes = [
            { label: 'CSV', command: () => this.openExtractDataDialog(FileTypeEnum.CSV) },
            { label: 'JSON', command: () => this.openExtractDataDialog(FileTypeEnum.JSON) },
            { label: 'XLSX', command: () => this.openExtractDataDialog(FileTypeEnum.XLSX) },
            { label: 'PDF', command: () => this.openExtractDataDialog(FileTypeEnum.PDF) }
        ];
    }

    private extractData(fileType: FileTypeEnum, dataType?: ExtractDataTypeEnum, dateFrom?: Date, dateTo?: Date): void {
        if (!dataType || !dateFrom || !dateTo) {
            return;
        }
        if (dataType === ExtractDataTypeEnum.IN_AND_OUT) {
            this.dataExtractorService.extractSettlementToFile(dateFrom, dateTo, fileType).subscribe((blob: Blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `settlement_${dateFrom.toISOString().split('T')[0]}_${dateTo.toISOString().split('T')[0]}.${fileType}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        }
    }
}