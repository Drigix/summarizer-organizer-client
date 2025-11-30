import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    standalone: false
})

export class FormComponent {

  @Input() formGroup?: FormGroup;
  @Input() showCancelButton = true;
  @Input() showSaveButton = true;
  @Input() footerButton = true;
  @Input() submitButtonLabel = 'global.buttons.save'
  @Input() disabledButtonOption = false;
  @Input() additionalSaveCondidtionValue = true;
  @Input() cancelIcon = 'pi pi-times';

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() blockSave = new EventEmitter<any>();

  constructor(
    private controlContainer: ControlContainer,
    private renderer: Renderer2
  ) { }

  ngSubmit(event: Event): void {
    const formGroup = this.controlContainer.control as FormGroup;
    formGroup.markAllAsTouched();
    if(!formGroup.valid) {
      this.save.emit(event);
    }
  }
}
