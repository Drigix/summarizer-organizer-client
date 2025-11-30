import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from '@pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { ComponentsModule } from '@shared/components/components.module';
import {providePrimeNG} from "primeng/config";
import Aura from "@primeuix/themes/aura";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        PagesModule,
        BrowserAnimationsModule,
        ComponentsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })], providers: [
        TranslateService,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: Aura,
          },
        })
    ] })
export class AppModule {

  constructor(private translateService: TranslateService) {
    this.translateService.use('pl');
    this.translateService.setDefaultLang('pl');
  }
}
