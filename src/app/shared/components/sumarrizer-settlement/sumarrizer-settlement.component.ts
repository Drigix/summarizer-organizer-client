import { Component, Input, OnInit } from '@angular/core';
import { SummarizeSettlement } from '@entities/summarize-settlement.model';

@Component({
  selector: 'app-sumarrizer-settlement',
  templateUrl: './sumarrizer-settlement.component.html',
  styleUrls: ['./sumarrizer-settlement.component.scss']
})
export class SumarrizerSettlementComponent implements OnInit {

  @Input() header = '';
  @Input() values: SummarizeSettlement[] = [
    { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
    { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
    { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
    { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
  ];


  constructor() { }

  ngOnInit() {
  }

  getComponentStyle(string: string, index: number): string {
    switch(index) {
      case 0: string += 'in'; break;
      case 1: string += 'out'; break;
    }
    return string;
  }

}
