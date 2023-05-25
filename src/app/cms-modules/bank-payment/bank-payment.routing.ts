import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankPaymentComponent } from './bank-payment.component';
import { BankPaymentPrivateSiteConfigListComponent } from './private-site-config/list/list.component';
import { BankPaymentPublicConfigListComponent } from './public-config/list/list.component';
import { BankPaymentTransactionLogListComponent } from './transaction-log/list/list.component';
import { BankPaymentTransactionListComponent } from './transaction/list/list.component';
const routes: Routes = [
  {
    path: '',
    component: BankPaymentComponent,
    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/bank-payment-config.module').then((m) => m.BankPaymentConfigModule),
          data:{ title: 'ROUTE.BANKPAYMENT' },
      },
      /* Config */
      {
        path: 'publicconfig',
        component: BankPaymentPublicConfigListComponent,
        data:{ title: 'ROUTE.BANKPAYMENT' },
      },
      {
        path: 'privatesiteconfig',
        component: BankPaymentPrivateSiteConfigListComponent,
        data:{ title: 'ROUTE.BANKPAYMENT' },
      },
      {
        path: 'privatesiteconfig/LinkPublicConfigId/:LinkPublicConfigId',
        component: BankPaymentPrivateSiteConfigListComponent,
        data:{ title: 'ROUTE.BANKPAYMENT' },
      },
      {
        path: 'privatesiteconfig/LinkSiteId/:LinkSiteId',
        component: BankPaymentPrivateSiteConfigListComponent,
        data:{ title: 'ROUTE.BANKPAYMENT' },
      },
      {
        path: 'transaction',
        component: BankPaymentTransactionListComponent,
        data:{ title: 'ROUTE.BANKPAYMENT' },
      },
      {
        path: 'transaction/LinkPrivateSiteConfigId/:LinkPrivateSiteConfigId',
        component: BankPaymentTransactionListComponent,
        data:{ title: 'ROUTE.BANKPAYMENT' },
      },
      {
        path: 'transaction/LinkUserId/:LinkUserId',
        component: BankPaymentTransactionListComponent,
        data:{ title: 'ROUTE.BANKPAYMENT' },
      },
      {
        path: 'transactionlog',
        component: BankPaymentTransactionLogListComponent,
        data:{ title: 'ROUTE.BANKPAYMENT' },
      },
      {
        path: 'transactionlog/LinkTransactionId/:LinkTransactionId',
        component: BankPaymentTransactionLogListComponent,
        data:{ title: 'ROUTE.BANKPAYMENT' },
      },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankPaymentRoutes {
}