import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { SumOrgSpinnerComponent } from './directives/spinner/spinner.component';
import { SumOrgSpinnerDirective } from './directives/spinner/spinner.directive';


@NgModule({
  imports: [
    ComponentsModule,
    SumOrgSpinnerComponent,
    SumOrgSpinnerDirective
  ],
  exports: [
    ComponentsModule,
    SumOrgSpinnerComponent,
    SumOrgSpinnerDirective
  ],
  providers: [],
})
export class SharedModule { }
