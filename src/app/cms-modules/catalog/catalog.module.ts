import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { CatalogRouting } from './catalog.routing';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CatalogCategoryService,
  CatalogConfigurationService,
  CatalogContentOtherInfoService,
  CatalogContentService,
  CoreEnumService, CoreModuleService, CoreModuleTagService
} from 'ntk-cms-api';
import { CatalogCategoryDeleteComponent } from './category/delete/delete.component';
import { CatalogCategoryEditComponent } from './category/edit/edit.component';
import { CatalogContentAddComponent } from './content/add/add.component';
import { CatalogContentEditComponent } from './content/edit/edit.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CmsFileManagerModule } from 'ntk-cms-filemanager';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { CatalogCategoryAddComponent } from './category/add/add.component';
import { CatalogCategorySelectorComponent } from './category/selector/selector.component';
import { CatalogCategoryTreeSelectorComponent } from './category/tree-selector/tree-selector.component';
import { CatalogCategoryTreeComponent } from './category/tree/tree.component';
import { CatalogContentDeleteComponent } from './content/delete/delete.component';
import { CatalogContentHeaderComponent } from './content/header/header.component';
import { CatalogContentListComponent } from './content/list/list.component';
import { CatalogContentSelectorComponent } from './content/selector/selector.component';

@NgModule({
  declarations: [
    CatalogComponent,
    /** */
    CatalogContentAddComponent,
    CatalogContentEditComponent,
    CatalogContentDeleteComponent,
    CatalogContentListComponent,
    CatalogContentHeaderComponent,
    CatalogContentSelectorComponent,
    CatalogCategoryTreeComponent,
    CatalogCategorySelectorComponent,
    CatalogCategoryAddComponent,
    CatalogCategoryEditComponent,
    CatalogCategoryDeleteComponent,
    CatalogCategoryTreeSelectorComponent,

  ],
  imports: [
    CommonModule,
    CatalogRouting,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SharedModule.forRoot(),
    AngularEditorModule,

    CmsFileManagerModule,
    InlineSVGModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    /*Config*/
    CatalogConfigurationService,
    /*Config*/
    CoreModuleTagService,
    CmsConfirmationDialogService,
    CatalogCategoryService,
    CatalogConfigurationService,
    CatalogContentService,
    CatalogContentOtherInfoService,
  ]
})
export class CatalogModule { }
