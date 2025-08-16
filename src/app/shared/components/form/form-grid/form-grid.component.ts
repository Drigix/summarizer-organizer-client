import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-form-grid',
    templateUrl: './form-grid.component.html',
    standalone: false
})

export class FormGridComponent {

  @Input() formControlClass?: string;

  @HostBinding('class') classes = 'p-fluid formgrid grid';
}
