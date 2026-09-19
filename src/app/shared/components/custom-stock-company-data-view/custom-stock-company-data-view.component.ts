import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockCompany } from '@entities/stock-company.model';
import { ButtonClickType } from '@entities/types/button-click.types';

@Component({
    selector: 'app-custom-stock-company-data-view',
    templateUrl: 'custom-stock-company-data-view.component.html',
    styleUrls: ['custom-stock-company-data-view.component.scss'],
    standalone: false
})

export class CustomStockCompanyDataViewComponent implements OnInit {

    @Input() stockCompanies: StockCompany[] = [];
    @Output() emitButtonClick: EventEmitter<{ clickType: ButtonClickType, stockCompany?: StockCompany }> = new EventEmitter<{ clickType: ButtonClickType, stockCompany?: StockCompany }>();

    constructor() { }

    ngOnInit() { }

    onButtonClick(clickType: ButtonClickType, stockCompany?: StockCompany): void {
        this.emitButtonClick.emit({ clickType, stockCompany });
    }
}