import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileTypeEnum } from '@entities/enums/file-type.enum';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-data-extractor-select',
    templateUrl: 'data-extractor-select.component.html',
    styleUrls: ['data-extractor-select.component.scss'],
    standalone: false
})
export class DataExtractorSelectComponent implements OnInit {
    
    @Output() fileTypeSelected: EventEmitter<FileTypeEnum> = new EventEmitter<FileTypeEnum>();

    private _fileTypes: MenuItem[] = [];
    private _selectedFileType: string | null = null;

    constructor(
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

    extractData(fileType: FileTypeEnum): void {
        this.fileTypeSelected.emit(fileType);
    }

    private initfileTypes(): void {
        this.fileTypes = [
            { label: 'CSV', command: () => this.extractData(FileTypeEnum.CSV) },
            { label: 'JSON', command: () => this.extractData(FileTypeEnum.JSON) },
            { label: 'XLSX', command: () => this.extractData(FileTypeEnum.XLSX) },
            { label: 'PDF', command: () => this.extractData(FileTypeEnum.PDF) }
        ];
    }
}