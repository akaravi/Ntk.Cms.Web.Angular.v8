import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreMainActionComponent } from './core-main-action.component';
import { CoreMainActionSendNotificationComponent } from './send-notification/send-notification.component';

const routes: Routes = [
  {
    path: '',
    component: CoreMainActionComponent,
    children: [
      {
        path: 'send-notification',
        component: CoreMainActionSendNotificationComponent
      },
      {
        path: 'send-notification/inbox-extras',
        component: CoreMainActionSendNotificationComponent
      },
      {
        path: 'send-notification/outbox-extras',
        component: CoreMainActionSendNotificationComponent
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreMainActionRoutes {
}
