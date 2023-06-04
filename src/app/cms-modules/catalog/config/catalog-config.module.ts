import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CatalogConfigurationService, CoreModuleService
} from 'ntk-cms-api';
import { SharedModule } from 'src/app/shared/shared.module';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { CatalogConfigRouting } from './catalog-config.routing';
import { CatalogConfigCheckSiteComponent } from './check-site/check-site.component';
import { CatalogConfigCheckUserComponent } from './check-user/check-user.component';
import { CatalogConfigMainAdminComponent } from './main-admin/config-main-admin.component';
import { CatalogConfigSiteComponent } from './site/config-site.component';


@NgModule({
  declarations: [
    /*Config*/
    CatalogConfigMainAdminComponent,
    CatalogConfigSiteComponent,
    CatalogConfigCheckUserComponent,
    CatalogConfigCheckSiteComponent,
    /*Config*/
  ],
  exports: [
    /*Config*/
    CatalogConfigMainAdminComponent,
    CatalogConfigSiteComponent,
    CatalogConfigCheckUserComponent,
    CatalogConfigCheckSiteComponent,
    /*Config*/
  ],
  imports: [
    CommonModule,
    FormsModule,
    CatalogConfigRouting,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SharedModule.forRoot(),
    AngularEditorModule,
  ],
  providers: [
    CoreModuleService,
    CatalogConfigurationService,
  ]
})
export class CatalogConfigModule {
}
