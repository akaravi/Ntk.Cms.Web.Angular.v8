import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { ClipboardModule } from 'ngx-clipboard';
import { MatColorFormats, MAT_COLOR_FORMATS } from 'ngx-ntk-mat-color-picker';
import { ToastrModule } from 'ngx-toastr';
import { CoreAuthService, CoreEnumService, CoreModuleService } from 'ntk-cms-api';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CmsStoreModule } from './core/reducers/cmsStore.module';
import { CmsAuthService } from './core/services/cmsAuth.service';
import { SharedModule } from './shared/shared.module';

function appInitializer(authService: CmsAuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}
export function CreateTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
export const CUSTOM_MAT_COLOR_FORMATS: MatColorFormats = {
  display: {
    colorInput: 'hex'
  }
}
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: " "
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,

    SharedModule.forRoot(),
    ToastrModule.forRoot({
      // timeOut: 0,
      timeOut: 5000,
      enableHtml: true,
      positionClass: 'toast-bottom-right',
      // positionClass: "toast-bottom-full-width",
      preventDuplicates: true,
      closeButton: true,
      // extendedTimeOut: 0,
      extendedTimeOut: 1000,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (CreateTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    ClipboardModule,
    InlineSVGModule.forRoot(),
    CmsStoreModule.forRoot(),
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      //enabled: !isDevMode(),
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    RouterModule,
  ],
  providers: [
    CoreAuthService,
    CoreEnumService,
    CoreModuleService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [CmsAuthService],
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [13]
      }
    },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: MAT_COLOR_FORMATS, useValue: CUSTOM_MAT_COLOR_FORMATS },

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
