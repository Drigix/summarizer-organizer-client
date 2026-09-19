import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NewStockCompany, StockCompany } from "@entities/stock-company.model";
import { ButtonClickType } from "@entities/types/button-click.types";
import { TranslateService } from "@ngx-translate/core";
import { MarketDataService } from "@services/market-data.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    selector: 'app-stock-companies-action-dialog',
    templateUrl: './stock-companies-action-dialog.component.html',
    styleUrls: ['./stock-companies-action-dialog.component.scss'],
    standalone: false
})
export class StockCompaniesActionDialogComponent implements OnInit {
    
  formGroup!: FormGroup;
  dialogType?: ButtonClickType;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private cd: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private translationService: TranslateService,
    private messageService: MessageService,
    private marketDataService: MarketDataService
  ) { }

    ngOnInit(): void {
        this.createFormGroup();
        this.loadPageValues();
    }

    createFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            id: new FormControl(null),
            stockSymbol: new FormControl(null, [Validators.required]),
            companyName: new FormControl(null, [Validators.required]),
            icon: new FormControl(null),
            currentPrice: new FormControl(null, [Validators.required]),
            currency: new FormControl(null, [Validators.required]),
            updatedAt: new FormControl(new Date())
        });
    }

    loadPageValues(): void {
            this.dialogType = this.config.data.clickType;
            const stockCompany: StockCompany = this.config.data.stockCompany;
            if(this.dialogType === 'edit' && stockCompany) {
              this.formGroup.patchValue({
                id : stockCompany._id,
                stockSymbol: stockCompany.stockSymbol,
                companyName: stockCompany.companyName,
                icon: stockCompany.icon,
                currentPrice: stockCompany.currentPrice,
                currency: stockCompany.currency,
                updatedAt: new Date(stockCompany.updatedAt!)
              });
            } else {
              this.formGroup.removeControl('id');
            }
            console.log('FormGroup values:', this.formGroup.getRawValue());
    }

    onCloseDialog(): void {
        this.ref.close();
    }

    onSave(): void {
 if(this.dialogType === 'add') {
      const value: NewStockCompany = Object.assign(this.formGroup.getRawValue() as NewStockCompany);
      this.marketDataService.createStockCompany(value).subscribe({
        next: () => {
          this.ref.close({ save: true });
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (this.dialogType === 'edit') {
      const value = Object.assign(this.formGroup.getRawValue() as StockCompany);
      this.marketDataService.updateStockCompany(value).subscribe({
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