import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkManagementAccountingDetailListComponent } from './accounting-detail/list/list.component';
import { LinkManagementAccountingListComponent } from './accounting/list/list.component';
import { LinkManagementBillboardPatternListComponent } from './billboard-pattern/list/list.component';
import { LinkManagementBillboardAddComponent } from './billboard/add/add.component';
import { LinkManagementBillboardEditComponent } from './billboard/edit/edit.component';
import { LinkManagementBillboardListComponent } from './billboard/list/list.component';
import { LinkManagementComponent } from './link-management.component';
import { LinkManagementMemberListComponent } from './member/list/list.component';
import { LinkManagementTargetBillboardLogListComponent } from './target-billboard-log/list/list.component';
import { LinkManagementTargetAddComponent } from './target/add/add.component';
import { LinkManagementTargetEditComponent } from './target/edit/edit.component';
import { LinkManagementTargetListComponent } from './target/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: LinkManagementComponent,
    data: { title: 'ROUTE.LINKMANAGMENT' },

    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/link-management-config.module').then(
            (m) => m.LinkManagementConfigModule
          ),
        data: { title: 'ROUTE.LINKMANAGMENT' },
      },
      /* Config */
      {
        path: 'target',
        component: LinkManagementTargetListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.TARGET' },
      },
      {
        path: 'target/add/:CategoryId',
        component: LinkManagementTargetAddComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.TARGET' },
      },
      {
        path: 'target/edit/:Id',
        component: LinkManagementTargetEditComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.TARGET' },
      },
      {
        path: 'billboard',
        component: LinkManagementBillboardListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.BILLBOARD' },
      },
      {
        path: 'billboard/add/:CategoryId',
        component: LinkManagementBillboardAddComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.BILLBOARD' },
      },
      {
        path: 'billboard/edit/:Id',
        component: LinkManagementBillboardEditComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.BILLBOARD' },
      },
      {
        path: 'target-billboard-log',
        component: LinkManagementTargetBillboardLogListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.TARGETBILLBOARD' },
      },
      {
        path: 'target-billboard-log/LinkManagementBillboardId/:LinkManagementBillboardId',
        component: LinkManagementTargetBillboardLogListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.TARGETBILLBOARD' },
      },
      {
        path: 'target-billboard-log/LinkManagementTargetId/:LinkManagementTargetId',
        component: LinkManagementTargetBillboardLogListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.TARGETBILLBOARD' },
      },
      {
        path: 'target-billboard-log/Key/:Key',
        component: LinkManagementTargetBillboardLogListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.TARGETBILLBOARD' },
      },
      {
        path: 'billboard-pattern',
        component: LinkManagementBillboardPatternListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.BILLBOARDPATTERN' },
      },
      {
        path: 'accounting',
        component: LinkManagementAccountingListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.ACCOUNTING' },
      },
      {
        path: 'accountingdetail',
        component: LinkManagementAccountingDetailListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.ACCOUNTINGDETAIL' },
      },
      {
        path: 'accountingdetail/LinkManagementAccountingId/:LinkManagementAccountingId',
        component: LinkManagementAccountingDetailListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.ACCOUNTINGDETAIL' },
      },
      {
        path: 'member',
        component: LinkManagementMemberListComponent,
        data: { title: 'ROUTE.LINKMANAGMENT.MEMBER' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkManagementRoutes {}
