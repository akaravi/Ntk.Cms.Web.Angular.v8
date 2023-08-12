import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CmsFileManagerModule } from 'ntk-cms-filemanager';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModuleDataComponent } from './core-module-data.component';
import { CoreModuleDataRoutes } from './core-module-data.routing';

import {
  CoreModuleDataCommentService,
  CoreModuleDataMemoService,
  CoreModuleDataPinService,
  CoreModuleDataTaskService,
  CoreModuleService, CoreModuleSiteCreditService,
  CoreModuleSiteUserCreditService, CoreModuleTagCategoryService, CoreModuleTagService
} from 'ntk-cms-api';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';

import { CoreModuleDataCommentAddComponent } from './comment/add/add.component';
import { CoreModuleDataCommentEditComponent } from './comment/edit/edit.component';
import { CoreModuleDataCommentListComponent } from './comment/list/list.component';
import { CoreModuleDataCommentViewComponent } from './comment/view/view.component';
import { CoreModuleDataMemoAddComponent } from './memo/add/add.component';
import { CoreModuleDataMemoEditComponent } from './memo/edit/edit.component';
import { CoreModuleDataMemoListComponent } from './memo/list/list.component';
import { CoreModuleDataMemoViewComponent } from './memo/view/view.component';
import { CoreModuleDataPinAddComponent } from './pin/add/add.component';
import { CoreModuleDataPinEditComponent } from './pin/edit/edit.component';
import { CoreModuleDataPinListComponent } from './pin/list/list.component';
import { CoreModuleDataPinViewComponent } from './pin/view/view.component';
import { CoreModuleDataTaskAddComponent } from './task/add/add.component';
import { CoreModuleDataTaskEditComponent } from './task/edit/edit.component';
import { CoreModuleDataTaskListComponent } from './task/list/list.component';
import { CoreModuleDataTaskViewComponent } from './task/view/view.component';


@NgModule({
  imports: [
    CoreModuleDataRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),

    SharedModule.forRoot(),
    AngularEditorModule,

    CmsFileManagerModule
  ],
  declarations: [
    CoreModuleDataComponent,
    /**Memo */
    CoreModuleDataMemoListComponent,
    CoreModuleDataMemoEditComponent,
    CoreModuleDataMemoAddComponent,
    CoreModuleDataMemoViewComponent,
    /**Pin */
    CoreModuleDataPinListComponent,
    CoreModuleDataPinEditComponent,
    CoreModuleDataPinAddComponent,
    CoreModuleDataPinViewComponent,
    /**Task */
    CoreModuleDataTaskListComponent,
    CoreModuleDataTaskEditComponent,
    CoreModuleDataTaskAddComponent,
    CoreModuleDataTaskViewComponent,
    /**Comment */
    CoreModuleDataCommentListComponent,
    CoreModuleDataCommentEditComponent,
    CoreModuleDataCommentAddComponent,
    CoreModuleDataCommentViewComponent,

  ],
  exports: [
    CoreModuleDataComponent,
    /**Memo */
    CoreModuleDataMemoListComponent,
    CoreModuleDataMemoEditComponent,
    CoreModuleDataMemoAddComponent,
    CoreModuleDataMemoViewComponent,
    /**Pin */
    CoreModuleDataPinListComponent,
    CoreModuleDataPinEditComponent,
    CoreModuleDataPinAddComponent,
    CoreModuleDataPinViewComponent,
    /**Task */
    CoreModuleDataTaskListComponent,
    CoreModuleDataTaskEditComponent,
    CoreModuleDataTaskAddComponent,
    CoreModuleDataTaskViewComponent,
    /**Comment */
    CoreModuleDataCommentListComponent,
    CoreModuleDataCommentEditComponent,
    CoreModuleDataCommentAddComponent,
    CoreModuleDataCommentViewComponent,

  ],
  providers: [
    CoreModuleService,
    CoreModuleTagService,
    CoreModuleTagCategoryService,
    CoreModuleSiteCreditService,
    CoreModuleSiteUserCreditService,
    CoreModuleDataCommentService,
    CoreModuleDataMemoService,
    CoreModuleDataPinService,
    CoreModuleDataTaskService,
    CmsConfirmationDialogService
  ]
})
export class CoreModuleDataModule { }
