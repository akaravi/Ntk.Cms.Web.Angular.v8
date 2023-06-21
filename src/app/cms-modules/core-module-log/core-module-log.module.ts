import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModuleLogComponent } from './core-module-log.component';
import { CoreModuleLogRoutes } from './core-module-log.routing';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { CmsFileManagerModule } from 'ntk-cms-filemanager';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  CoreModuleDataMemoService,
  CoreModuleLogContentCountService, CoreModuleLogFavoriteService, CoreModuleLogLikeService,
  CoreModuleLogReportAbuseService, CoreModuleLogScoreService, CoreModuleLogShowKeyService, CoreModuleLogSiteCreditBlockedService, CoreModuleLogSiteCreditService,
  CoreModuleLogSiteUserCreditBlockedService, CoreModuleLogSiteUserCreditService, CoreModuleService, CoreModuleSiteCreditService,
  CoreModuleSiteUserCreditService, CoreModuleTagCategoryService, CoreModuleTagService
} from 'ntk-cms-api';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { CoreModuleLogContentCountEditComponent } from './content-count/edit/edit.component';
import { CoreModuleLogContentCountListComponent } from './content-count/list/list.component';
import { CoreModuleLogContentCountViewComponent } from './content-count/view/view.component';
import { CoreModuleLogFavoriteEditComponent } from './favorite/edit/edit.component';
import { CoreModuleLogFavoriteListComponent } from './favorite/list/list.component';
import { CoreModuleLogFavoriteViewComponent } from './favorite/view/view.component';
import { CoreModuleLogLikeEditComponent } from './like/edit/edit.component';
import { CoreModuleLogLikeListComponent } from './like/list/list.component';
import { CoreModuleLogLikeViewComponent } from './like/view/view.component';
import { CoreModuleLogReportAbuseEditComponent } from './report-abuse/edit/edit.component';
import { CoreModuleLogReportAbuseListComponent } from './report-abuse/list/list.component';
import { CoreModuleLogReportAbuseViewComponent } from './report-abuse/view/view.component';
import { CoreModuleLogScoreEditComponent } from './score/edit/edit.component';
import { CoreModuleLogScoreListComponent } from './score/list/list.component';
import { CoreModuleLogScoreViewComponent } from './score/view/view.component';
import { CoreModuleLogShowKeyAddComponent } from './show-key/add/add.component';
import { CoreModuleLogShowKeyEditComponent } from './show-key/edit/edit.component';
import { CoreModuleLogShowKeyListComponent } from './show-key/list/list.component';
import { CoreModuleLogShowKeyViewComponent } from './show-key/view/view.component';
import { CoreModuleLogSiteCreditBlockedEditComponent } from './site-credit-blocked/edit/edit.component';
import { CoreModuleLogSiteCreditBlockedListComponent } from './site-credit-blocked/list/list.component';
import { CoreModuleLogSiteCreditBlockedViewComponent } from './site-credit-blocked/view/view.component';
import { CoreModuleLogSiteCreditEditComponent } from './site-credit/edit/edit.component';
import { CoreModuleLogSiteCreditListComponent } from './site-credit/list/list.component';
import { CoreModuleLogSiteCreditViewComponent } from './site-credit/view/view.component';
import { CoreModuleLogSiteUserCreditBlockedEditComponent } from './site-user-credit-blocked/edit/edit.component';
import { CoreModuleLogSiteUserCreditBlockedListComponent } from './site-user-credit-blocked/list/list.component';
import { CoreModuleLogSiteUserCreditBlockedViewComponent } from './site-user-credit-blocked/view/view.component';
import { CoreModuleLogSiteUserCreditEditComponent } from './site-user-credit/edit/edit.component';
import { CoreModuleLogSiteUserCreditListComponent } from './site-user-credit/list/list.component';
import { CoreModuleLogSiteUserCreditViewComponent } from './site-user-credit/view/view.component';


@NgModule({
  imports: [
    CoreModuleLogRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),

    SharedModule.forRoot(),
    AngularEditorModule,

    CmsFileManagerModule
  ],
  declarations: [
    CoreModuleLogComponent,

    /**ShowKey */
    CoreModuleLogShowKeyListComponent,
    CoreModuleLogShowKeyEditComponent,
    CoreModuleLogShowKeyAddComponent,
    CoreModuleLogShowKeyViewComponent,
    /**ReportAbuse */
    CoreModuleLogReportAbuseListComponent,
    CoreModuleLogReportAbuseEditComponent,
    CoreModuleLogReportAbuseViewComponent,
    /**Favorite */
    CoreModuleLogFavoriteListComponent,
    CoreModuleLogFavoriteEditComponent,
    CoreModuleLogFavoriteViewComponent,
    /**ContentCount */
    CoreModuleLogContentCountListComponent,
    CoreModuleLogContentCountEditComponent,
    CoreModuleLogContentCountViewComponent,
    /**Like */
    CoreModuleLogLikeListComponent,
    CoreModuleLogLikeEditComponent,
    CoreModuleLogLikeViewComponent,
    /**score */
    CoreModuleLogScoreListComponent,
    CoreModuleLogScoreEditComponent,
    CoreModuleLogScoreViewComponent,
    /**SiteCreditBlocked */
    CoreModuleLogSiteCreditBlockedListComponent,
    CoreModuleLogSiteCreditBlockedEditComponent,
    CoreModuleLogSiteCreditBlockedViewComponent,
    /**SiteUserCreditBlocked */
    CoreModuleLogSiteUserCreditBlockedListComponent,
    CoreModuleLogSiteUserCreditBlockedEditComponent,
    CoreModuleLogSiteUserCreditBlockedViewComponent,
    /**SiteCredit */
    CoreModuleLogSiteCreditListComponent,
    CoreModuleLogSiteCreditEditComponent,
    CoreModuleLogSiteCreditViewComponent,
    /**SiteUserCredit */
    CoreModuleLogSiteUserCreditListComponent,
    CoreModuleLogSiteUserCreditEditComponent,
    CoreModuleLogSiteUserCreditViewComponent,
  ],
  exports: [
    CoreModuleLogComponent,

    /**ReportAbuse */
    CoreModuleLogReportAbuseListComponent,
    CoreModuleLogReportAbuseEditComponent,
    CoreModuleLogReportAbuseViewComponent,
    /**Favorite */
    CoreModuleLogFavoriteListComponent,
    CoreModuleLogFavoriteEditComponent,
    CoreModuleLogFavoriteViewComponent,
    /**ContentCount */
    CoreModuleLogContentCountListComponent,
    CoreModuleLogContentCountEditComponent,
    CoreModuleLogContentCountViewComponent,
    /**Like */
    CoreModuleLogLikeListComponent,
    CoreModuleLogLikeEditComponent,
    CoreModuleLogLikeViewComponent,
    /**score */
    CoreModuleLogScoreListComponent,
    CoreModuleLogScoreEditComponent,
    CoreModuleLogScoreViewComponent,
    /**SiteCreditBlocked */
    CoreModuleLogSiteCreditBlockedListComponent,
    CoreModuleLogSiteCreditBlockedEditComponent,
    CoreModuleLogSiteCreditBlockedViewComponent,
    /**SiteUserCreditBlocked */
    CoreModuleLogSiteUserCreditBlockedListComponent,
    CoreModuleLogSiteUserCreditBlockedEditComponent,
    CoreModuleLogSiteUserCreditBlockedViewComponent,
    /**SiteCredit */
    CoreModuleLogSiteCreditListComponent,
    CoreModuleLogSiteCreditEditComponent,
    CoreModuleLogSiteCreditViewComponent,
    /**SiteUserCredit */
    CoreModuleLogSiteUserCreditListComponent,
    CoreModuleLogSiteUserCreditEditComponent,
    CoreModuleLogSiteUserCreditViewComponent,
  ],
  providers: [
    CoreModuleService,
    CoreModuleTagService,
    CoreModuleTagCategoryService,
    CoreModuleSiteCreditService,
    CoreModuleSiteUserCreditService,
    CoreModuleLogFavoriteService,
    CoreModuleLogContentCountService,
    CoreModuleLogLikeService,
    CoreModuleDataMemoService,
    CoreModuleLogShowKeyService,
    CoreModuleLogReportAbuseService,
    CoreModuleLogScoreService,
    CoreModuleLogSiteCreditBlockedService,
    CoreModuleLogSiteUserCreditBlockedService,
    CoreModuleLogSiteCreditService,
    CoreModuleLogSiteUserCreditService,
    CmsConfirmationDialogService
  ]
})
export class CoreModuleLogModule { }
