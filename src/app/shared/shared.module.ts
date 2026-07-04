import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    ComponentsModule,
  ],
  exports: [
    ComponentsModule,
  ],
  providers: [],
})
export class SharedModule { }
