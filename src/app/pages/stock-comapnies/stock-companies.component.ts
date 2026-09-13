import { Component, OnInit } from '@angular/core';
import { StockCompany } from '@entities/stock-company.model';
import { ButtonClickType } from '@entities/types/button-click.types';
import { MarketDataService } from '@services/market-data.service';
import { StockCompaniesActionDialogComponent } from './stock-companies-action-dialog/stock-companies-action-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedMessage } from '@entities/shared-message.model';
import { SharedMessageService } from '@services/shared-message.service';

@Component({
    selector: 'app-stock-companies',
    templateUrl: './stock-companies.component.html',
    styleUrls: ['./stock-companies.component.scss'],
    standalone: false
})

export class StockCompaniesComponent implements OnInit {

    stockCompanies: StockCompany[] = []

    constructor(
        private marketDataService: MarketDataService,
        private dialogService: DialogService,
        private translationService: TranslateService,
        private confirmationService: ConfirmationService,
        private sharedMessageService: SharedMessageService
    ) { }

    ngOnInit(): void { 
        this.loadStockCompanies();
    }

    openDialog(action: {clickType: ButtonClickType, stockCompany?: StockCompany}): void {
        if(action.clickType === 'add') {
            this.openStockCompanyActionSaveDialog(action.clickType);
        } else if(action.clickType === 'edit' && action.stockCompany) {
            this.openStockCompanyActionEditDialog(action.clickType, action.stockCompany);
        } else if(action.clickType === 'delete' && action.stockCompany) {
            this.confirmationService.confirm({
                message: this.translationService.instant('global.questions.deleteConfirmation'),
                header: this.translationService.instant('global.header.confirm'),
                icon: 'pi pi-info-circle',
                acceptIcon:"pi pi-check",
                rejectIcon:"none",
                rejectButtonStyleClass:"p-button-text",
                accept: () => {
                    this.deleteStockCompany(action!.stockCompany!);
                },
                key: 'mainDialog'
            });
        } else if(action.clickType === 'refresh') {
            this.marketDataService.updateStockCompanyPrice(action.stockCompany?.stockSymbol!).subscribe({
                next: (res) => {
                    this.sharedMessageService.showSuccessMessage(new SharedMessage('global.messages.success', 'settlement.stockCompanies.refreshPriceSuccess'));
                    this.loadStockCompanies();
                }
            });
        }
    }

    private openStockCompanyActionSaveDialog(clickType: ButtonClickType): void {
        const ref = this.dialogService.open(StockCompaniesActionDialogComponent, {
          header: this.translationService.instant('stockCompanies.addStockCompany'),
          data: {
            clickType: clickType
          },
          closable: true,
          width: '50%',
          focusOnShow: false
        });
        ref?.onClose.subscribe(res => this.onStockCompanyActionDialogResponse(res));
    }

    private openStockCompanyActionEditDialog(clickType: ButtonClickType, stockCompany: StockCompany): void {
        const ref = this.dialogService.open(StockCompaniesActionDialogComponent, {
          header: this.translationService.instant('stockCompanies.editStockCompany'),
          data: {
            clickType: clickType,
            stockCompany: stockCompany
          },
          closable: true,
          width: '50%',
          focusOnShow: false
        });
        ref?.onClose.subscribe(res => this.onStockCompanyActionDialogResponse(res));
    }

    private deleteStockCompany(stockCompany: StockCompany): void {
        this.marketDataService.deleteStockCompany(stockCompany.stockSymbol!).subscribe({
            next: () => {
                this.loadStockCompanies();
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    private onStockCompanyActionDialogResponse(response: any): void {
        if(response && response.save) {
            this.loadStockCompanies();
        }
    }

    private loadStockCompanies(): void {
        this.marketDataService.getStockCompanies().subscribe({
        next: (res) => {
            this.stockCompanies = res;
        },
        error: (err) => {
            console.error(err);
        }
        });
    }
}