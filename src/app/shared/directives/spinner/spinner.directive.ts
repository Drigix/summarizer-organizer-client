import { ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SumOrgSpinnerComponent } from './spinner.component';

@Directive({ selector: '[isLoading]' })
export class SumOrgSpinnerDirective {
  @Input()
  set isLoading(isLoading: boolean) {
    if (isLoading) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SumOrgSpinnerComponent);
      this.view.createComponent(componentFactory);
    } else {
      this.view.clear();
      this.view.createEmbeddedView(this.template)
    }
  };
  constructor(private view: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, private template: TemplateRef<AnimationPlayState>) {

  }
}
