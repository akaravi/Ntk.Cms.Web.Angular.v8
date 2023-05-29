import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataProviderClientChargeComponent } from './client/charge/charge.component';
import { DataProviderClientListComponent } from './client/list/list.component';
import { DataProviderComponent } from './data-provider.component';
import { DataProviderLogClientListComponent } from './log-client/list/list.component';
import { DataProviderLogPlanListComponent } from './log-plan/list/list.component';
import { DataProviderLogSourceListComponent } from './log-source/list/list.component';
import { DataProviderPlanClientListComponent } from './plan-client/list/list.component';
import { DataProviderPlanPriceListComponent } from './plan-price/list/list.component';
import { DataProviderPlanSourceListComponent } from './plan-source/list/list.component';
import { DataProviderPlanListComponent } from './plan/list/list.component';
import { DataProviderSourceListComponent } from './source/list/list.component';
import { DataProviderTransactionListComponent } from './transaction/list/list.component';


const routes: Routes = [
  {
    path: '',
    component: DataProviderComponent,
    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/data-provider-config.module').then((m) => m.DataProviderConfigModule),
          data: { title: 'ROUTE.DATAPROVIDER' },

      },
      /* Config */
      {
        path: 'log-client',
        component: DataProviderLogClientListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.LOGCLIENT' },
      },
      {
        path: 'log-client/LinkClientId/:LinkClientId',
        component: DataProviderLogClientListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.LOGCLIENT' },
      },
      {
        path: 'log-client/LinkPlanId/:LinkPlanId',
        component: DataProviderLogClientListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.LOGCLIENT' },
      },
      /** */
      {
        path: 'log-plan',
        component: DataProviderLogPlanListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.LOGPLAN' },
      },
      {
        path: 'log-plan/LinkSourceId/:LinkSourceId',
        component: DataProviderLogPlanListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.LOGPLAN' },
      },
      {
        path: 'log-plan/LinkPlanId/:LinkPlanId',
        component: DataProviderLogPlanListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.LOGPLAN' },
      },
      /** */
      {
        path: 'log-source',
        component: DataProviderLogSourceListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.LOGSOURCE' },
      },
      {
        path: 'log-source/LinkSourceId/:LinkSourceId',
        component: DataProviderLogSourceListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.LOGSOURCE' },
      },
      /** */
      {
        path: 'client',
        component: DataProviderClientListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.CLIENT' },
      },
      {
        path: 'client-charge/:LinkClientId',
        component: DataProviderClientChargeComponent,
        data: { title: 'ROUTE.DATAPROVIDER.CLIENTCHARGE' },
      },
      {
        path: 'source',
        component: DataProviderSourceListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.SOURCE' },
      },
      {
        path: 'plan-client',
        component: DataProviderPlanClientListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.PLANCLIENT' },
      },
      {
        path: 'plan-client/LinkPlanId/:LinkPlanId',
        component: DataProviderPlanClientListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.PLANCLIENT' },
      },
      {
        path: 'plan-client/LinkClientId/:LinkClientId',
        component: DataProviderPlanClientListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.PLANCLIENT' },
      },
      {
        path: 'plan',
        component: DataProviderPlanListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.PLAN' },
      },
      {
        path: 'plan/LinkPlanCategory/:LinkPlanCategory',
        component: DataProviderPlanListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.PLAN' },
      },
      {
        path: 'plan-source',
        component: DataProviderPlanSourceListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.PLANSOURCE' },
      },
      {
        path: 'plan-source/LinkPlanId/:LinkPlanId',
        component: DataProviderPlanSourceListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.PLANSOURCE' },
      },
      {
        path: 'plan-source/LinkSourceId/:LinkSourceId',
        component: DataProviderPlanSourceListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.PLANSOURCE' },
      },
      {
        path: 'plan-price',
        component: DataProviderPlanPriceListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.PLANPRICE' },
      },
      {
        path: 'plan-price/LinkPlanId/:LinkPlanId',
        component: DataProviderPlanPriceListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.PLANPRICE' },
      },
      {
        path: 'transaction',
        component: DataProviderTransactionListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.TRANSACTION' },
      }
      , {
        path: 'transaction/LinkPlanId/:LinkPlanId',
        component: DataProviderTransactionListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.TRANSACTION' },
      }
      ,
      {
        path: 'transaction/LinkCmsUserId/:LinkCmsUserId',
        component: DataProviderTransactionListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.TRANSACTION' },
      },
      {
        path: 'transaction/LinkClientId/:LinkClientId',
        component: DataProviderTransactionListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.TRANSACTION' },
      },
      {
        path: 'transaction/LinkSponsorId/:LinkSponsorId',
        component: DataProviderTransactionListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.TRANSACTION' },
      }
      ,
      {
        path: 'transaction/LinkPlanPriceId/:LinkPlanPriceId',
        component: DataProviderTransactionListComponent,
        data: { title: 'ROUTE.DATAPROVIDER.TRANSACTION' },
      }
      /** */


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataProviderRoutes {
}
