import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Settlement } from '@entities/settlement.model';
import { ButtonClickType } from '@entities/types/button-click.types';
import { EmitSettlementPreviewType } from '@entities/types/emit-types';
import { PriceType } from '@entities/types/price.types';

@Component({
  selector: 'app-settlement-preview',
  templateUrl: './settlement-preview.component.html',
  styleUrls: ['./settlement-preview.component.scss']
})
export class SettlementPreviewComponent implements OnInit {

  @Input() settlements: Settlement[] = [];
  @Input() priceType?: PriceType;

  @Output() emitButtonClick = new EventEmitter<EmitSettlementPreviewType>();

  selectedSettlement?: Settlement;

  constructor() { }

  ngOnInit() {
  }

  onSettlementSelected(settlement: Settlement) {
    this.selectedSettlement = settlement;
  }

  onButtonClick(clickType: ButtonClickType): void {
    this.emitButtonClick.emit({ buttonClickType: clickType, settlement: this.selectedSettlement!, priceType: this.priceType! });
  }

  getTitle(): string {
    let string = '';
    switch (this.priceType) {
      case 'in': string += '+ ';
      break;
      case 'out': string += '- ';
      break;
      case 'save': string += '% ';
      break;
    }
    string += this.countAllPrices() + '$'
    return string;
  }

  getComponentStyle(style: string): string {
    let string = style;
    switch (this.priceType) {
      case 'in': string += 'in';
      break;
      case 'out': string += 'out';
      break;
      case 'save': string += 'save';
      break;
    }
    return string;
  }

  getPriceColor(style: string): string {
    let string = style;
    switch (this.priceType) {
      case 'in': string = string.replace('?', 'in');
      break;
      case 'out': string = string.replace('?', 'out');
      break;
      case 'save': string = string.replace('?', 'save');
      break;
    }
    return string;
  }

  getPriceIcon(): string {
    let string = '';
    switch (this.priceType) {
      case 'in': string = 'pi pi-plus';
      break;
      case 'out': string = 'pi pi-minus';
      break;
      case 'save': string = 'pi pi-percentage';
      break;
    }
    return string;
  }

  getPriceType(): string {
    return this.priceType!;
  }

  countAllPrices(): number {
    let sum = 0;
    this.settlements.forEach((settlement) => {
      sum += settlement.price!;
    });
    return sum;
  }
}
