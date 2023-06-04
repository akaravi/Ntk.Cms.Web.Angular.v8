import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {
  CoreModuleEntityReportFileService
} from 'ntk-cms-api';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreSharedModule } from '../core.shared.module';
import { CoreModuleEntityModule } from '../module-entity/core-module-entity.module';
import { CoreModuleEntityReportFileAddComponent } from './add/add.component';
import { CoreModuleEntityReportFileComponent } from './core-module-entity-report-file.component';
import { CoreModuleEntityReportFileRouting } from './core-module-entity-report-file.routing';
import { CoreModuleEntityReportFileEditComponent } from './edit/edit.component';
import { CoreModuleEntityReportFileListComponent } from './list/list.component';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';


@NgModule({
  declarations: [
    CoreModuleEntityReportFileComponent,
    CoreModuleEntityReportFileAddComponent,
    CoreModuleEntityReportFileEditComponent,
    CoreModuleEntityReportFileListComponent,
  ],
  exports: [
    CoreModuleEntityReportFileComponent,
    CoreModuleEntityReportFileAddComponent,
    CoreModuleEntityReportFileEditComponent,
    CoreModuleEntityReportFileListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModuleEntityReportFileRouting,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SharedModule.forRoot(),
    AngularEditorModule,

    CoreSharedModule,
    CoreModuleEntityModule,
  ],
  providers: [
    CoreModuleEntityReportFileService,
    CmsConfirmationDialogService,
  ]
})
export class CoreModuleEntityReportFileModule {
}
