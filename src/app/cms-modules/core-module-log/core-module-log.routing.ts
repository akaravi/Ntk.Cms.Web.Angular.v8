import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModuleLogComponent } from './core-module-log.component';
import { CoreModuleLogFavoriteListComponent } from './favorite/list/list.component';
import { CoreModuleLogLikeListComponent } from './like/list/list.component';
import { CoreModuleLogMemoListComponent } from './memo/list/list.component';
import { CoreModuleLogReportAbuseListComponent } from './report-abuse/list/list.component';
import { CoreModuleLogScoreListComponent } from './score/list/list.component';
import { CoreModuleLogSiteCreditBlockedListComponent } from './site-credit-blocked/list/list.component';
import { CoreModuleLogSiteCreditListComponent } from './site-credit/list/list.component';
import { CoreModuleLogSiteUserCreditBlockedListComponent } from './site-user-credit-blocked/list/list.component';
import { CoreModuleLogSiteUserCreditListComponent } from './site-user-credit/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: CoreModuleLogComponent,
    children: [
      {
        path: 'report-abuse',
        component: CoreModuleLogReportAbuseListComponent,
        data: { title: 'ROUTE.COREMODULELOG' },
      },
      {
        path: 'memo',
        component: CoreModuleLogMemoListComponent,
        data: { title: 'ROUTE.COREMODULELOG.MEMO' },
      },
      {
        path: 'favorite',
        component: CoreModuleLogFavoriteListComponent,
        data: { title: 'ROUTE.COREMODULELOG.FAVORITE' },
      },
      {
        path: 'like',
        component: CoreModuleLogLikeListComponent,
        data: { title: 'ROUTE.COREMODULELOG.LIKE' },
      },
      {
        path: 'score',
        component: CoreModuleLogScoreListComponent,
        data: { title: 'ROUTE.COREMODULELOG.SCORE' },
      },
      {
        path: 'site-credit',
        component: CoreModuleLogSiteCreditListComponent,
        data: { title: 'ROUTE.COREMODULELOG' },
      },
      {
        path: 'site-user-credit',
        component: CoreModuleLogSiteUserCreditListComponent,
        data: { title: 'ROUTE.COREMODULELOG' },
      },
      {
        path: 'site-credit-blocked',
        component: CoreModuleLogSiteCreditBlockedListComponent,
        data: { title: 'ROUTE.COREMODULELOG' },
      },
      {
        path: 'site-user-credit-blocked',
        component: CoreModuleLogSiteUserCreditBlockedListComponent,
        data: { title: 'ROUTE.COREMODULELOG' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreModuleRoutes {}
