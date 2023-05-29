import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonateComponent } from './donate.component';
import { DonateLogViewListComponent } from './log-view/list/list.component';
import { DonateSponserListComponent } from './sponser/list/list.component';
import { DonateTargetPeriodSponserListComponent } from './target-period-sponsor/list/list.component';
import { DonateTargetPeriodChargeComponent } from './target-period/charge/charge.component';
// import { DonateTargetPeriodSponsorListComponent } from './target-period-sponsor/list/list.component';
import { DonateTargetPeriodListComponent } from './target-period/list/list.component';
import { DonateTargetAddComponent } from './target/add/add.component';
import { DonateTargetDeleteComponent } from './target/delete/delete.component';
import { DonateTargetEditComponent } from './target/edit/edit.component';
import { DonateTargetListComponent } from './target/list/list.component';
import { DonateTransactionListComponent } from './transaction/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: DonateComponent,
    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/donate-config.module').then(
            (m) => m.DonateConfigModule
          ),
        data: { title: 'ROUTE.DONATE' },
      },
      /* Config */
      {
        path: 'target',
        component: DonateTargetListComponent,
        data: { title: 'ROUTE.DONATE.TARGET' },
      },
      {
        path: 'target/add/:CategoryId',
        component: DonateTargetAddComponent,
        data: { title: 'ROUTE.DONATE.TARGET' },
      },
      {
        path: 'target/edit/:Id',
        component: DonateTargetEditComponent,
        data: { title: 'ROUTE.DONATE.TARGET' },
      },
      {
        path: 'target/Delete/:Id',
        component: DonateTargetDeleteComponent,
        data: { title: 'ROUTE.DONATE.TARGET' },
      },
      {
        path: 'log-view',
        component: DonateLogViewListComponent,
        data: { title: 'ROUTE.DONATE.LOGVIEW' },
      },
      {
        path: 'log-view/:Id',
        component: DonateLogViewListComponent,
        data: { title: 'ROUTE.DONATE.LOGVIEW' },
      },
      {
        path: 'sponser',
        component: DonateSponserListComponent,
        data: { title: 'ROUTE.DONATE.SPONSER' },
      },
      {
        path: 'target-period',
        component: DonateTargetPeriodListComponent,
        data: { title: 'ROUTE.DONATE.TARGETPERIOD' },
      },
      {
        path: 'target-period/LinkTargeId/:LinkTargeId',
        component: DonateTargetPeriodListComponent,
        data: { title: 'ROUTE.DONATE.TARGETPERIOD' },
      },
      {
        path: 'target-period-charge/:LinkTargetPeriodId',
        component: DonateTargetPeriodChargeComponent,
        data: { title: 'ROUTE.DONATE.TARGETPERIODSPONSER' },
      },
      {
        path: 'target-period-sponser',
        component: DonateTargetPeriodSponserListComponent,
        data: { title: 'ROUTE.DONATE.TARGETPERIODSPONSER' },
      },
      {
        path: 'target-period-sponser/LinkTargetPeriodId/:LinkTargetPeriodId',
        component: DonateTargetPeriodSponserListComponent,
        data: { title: 'ROUTE.DONATE.TARGETPERIODSPONSER' },
      },
      {
        path: 'target-period-sponser/LinkSponserId/:LinkSponserId',
        component: DonateTargetPeriodSponserListComponent,
        data: { title: 'ROUTE.DONATE.TARGETPERIODSPONSER' },
      },
      /** */
      {
        path: 'transaction',
        component: DonateTransactionListComponent,
        data: { title: 'ROUTE.DONATE.TRANSACTION' },
      },
      {
        path: 'transaction/LinkCmsUserId/:LinkCmsUserId',
        component: DonateTransactionListComponent,
        data: { title: 'ROUTE.DONATE.TRANSACTION' },
      },
      {
        path: 'transaction/LinkSponsorId/:LinkSponsorId',
        component: DonateTransactionListComponent,
        data: { title: 'ROUTE.DONATE.TRANSACTION' },
      },
      {
        path: 'transaction/LinkTargetPeriodId/:LinkTargetPeriodId',
        component: DonateTransactionListComponent,
        data: { title: 'ROUTE.DONATE.TRANSACTION' },
      },
      /** */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateRoutes {}
