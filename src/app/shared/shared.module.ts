import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    ComponentsModule,
    CommonModule
  ],
  exports: [
    ComponentsModule,
    CommonModule
  ],
  providers: [],
})
export class SharedModule { }
