import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsComponent } from './sms.component';

const routes: Routes = [
  {
    path: '',
    component: SmsComponent,
    data: { title: 'ROUTE.SMS' },

    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('./main/sms-main.module').then((m) => m.SmsMainModule),
        data: { title: 'ROUTE.SMS.MAIN' },
      },
      {
        path: 'action',
        loadChildren: () =>
          import('./action/sms-action.module').then((m) => m.SmsActionModule),
        data: { title: 'ROUTE.SMS.ACTION' },
      },
      {
        path: 'log',
        loadChildren: () =>
          import('./log/sms-log.module').then((m) => m.SmsLogModule),
        data: { title: 'ROUTE.SMS.LOG' },
      },
      {
        path: 'config',
        loadChildren: () =>
          import('./config/sms-config.module').then((m) => m.SmsConfigModule),
        data: { title: 'ROUTE.SMS' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsRoutes {}
