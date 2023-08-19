import { NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { IconPickerModule } from 'ngx-icon-picker';
import {
  CoreCpMainMenuCmsUserGroupService, CoreCpMainMenuService, CoreEnumService, CoreModuleService, CoreSiteUserService
} from 'ntk-cms-api';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModuleModule } from '../module/coreModule.module';
import { CoreUserGroupCmsModule } from '../user-group/coreUserGroup.module';
import { CoreCpMainMenuAddComponent } from './add/add.component';
import { CoreCpMainMenuComponent } from './coreCpMainMenu.component';
import { CoreCpMainMenuRouting } from './coreCpMainMenu.routing';
import { CoreCpMainMenuEditComponent } from './edit/edit.component';
import { CoreCpMainMenuListComponent } from './list/list.component';
import { CoreCpMainMenuSelectorComponent } from './selector/selector.component';
import { CoreCpMainMenuTreeComponent } from './tree/tree.component';



@NgModule({
  declarations: [
    CoreCpMainMenuComponent,
    CoreCpMainMenuListComponent,
    CoreCpMainMenuAddComponent,
    CoreCpMainMenuEditComponent,
    CoreCpMainMenuTreeComponent,
    CoreCpMainMenuSelectorComponent,
  ],
  exports: [
    CoreCpMainMenuComponent,
    CoreCpMainMenuListComponent,
    CoreCpMainMenuAddComponent,
    CoreCpMainMenuEditComponent,
    CoreCpMainMenuTreeComponent,
    CoreCpMainMenuSelectorComponent,
  ],
  imports: [
    CommonModule,
    CoreCpMainMenuRouting,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SharedModule.forRoot(),
    AngularEditorModule,
    CoreModuleModule,
    CoreUserGroupCmsModule,
    NgxMatColorPickerModule,
    IconPickerModule,
    DragDropModule
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreCpMainMenuService,
    CoreCpMainMenuCmsUserGroupService,
    CoreSiteUserService,
    CmsConfirmationDialogService
  ]
})
export class CoreCpMainMenu { }
