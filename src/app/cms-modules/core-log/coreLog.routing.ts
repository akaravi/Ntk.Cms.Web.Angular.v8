import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreLogAvoidDuplicateDataEntryListComponent } from './avoid-duplicate/list/list.component';
import { CoreLogComponent } from './coreLog.component';
import { CoreLogCurrencyListComponent } from './currency/list/list.component';
import { CoreLogErrorListComponent } from './error/list/list.component';
import { CoreLogMemberListComponent } from './member/list/list.component';
import { CoreLogReportDataListComponent } from './report-data/list/list.component';
import { CoreLogSmsListComponent } from './sms/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: CoreLogComponent,
    data: { title: 'ROUTE.CORELOG' },

    children: [
      {
        path: 'error',
        component: CoreLogErrorListComponent,
        data: { title: 'ROUTE.CORELOG.ERROR' },
      },
      {
        path: 'avoid-duplicate',
        component: CoreLogAvoidDuplicateDataEntryListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
      {
        path: 'avoid-duplicate/:LinkUserId',
        component: CoreLogAvoidDuplicateDataEntryListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
      {
        path: 'sms',
        component: CoreLogSmsListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
      {
        path: 'report-data',
        component: CoreLogReportDataListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
      {
        path: 'report-data/LinkSiteId/:LinkSiteId',
        component: CoreLogReportDataListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
      {
        path: 'report-data/LinkUserId/:LinkUserId',
        component: CoreLogReportDataListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
      {
        path: 'report-data/LinkModuleEntityId/:LinkModuleEntityId',
        component: CoreLogReportDataListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
      {
        path: 'report-data/LinkModuleEntityReportFileId/:LinkModuleEntityReportFileId',
        component: CoreLogReportDataListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
      {
        path: 'member',
        component: CoreLogMemberListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
      {
        path: 'currency',
        component: CoreLogCurrencyListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
      {
        path: 'currency/:LinkCurrencyId',
        component: CoreLogCurrencyListComponent,
        data: { title: 'ROUTE.CORELOG' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreLogRoutes {}
