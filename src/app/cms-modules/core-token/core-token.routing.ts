import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreTokenActivationListComponent } from './activation/list/list.component';
import { CoreTokenComponent } from './core-token.component';
import { CoreTokenMicroServiceLogListComponent } from './micro-service-log/list/list.component';
import { CoreTokenMicroServiceListComponent } from './micro-service/list/list.component';
import { CoreTokenUserListComponent } from './user/list/list.component';
import { CoreTokenUserBadLoginListComponent } from './userBadLogin/list/list.component';
import { CoreTokenUserLogListComponent } from './userLog/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: CoreTokenComponent,
    data: { title: 'ROUTE.CORETOKEN' },
    children: [
      /** */
      {
        path: 'user',
        component: CoreTokenUserListComponent,
        data: { title: 'ROUTE.CORETOKEN.USER' },
      },
      {
        path: 'user/LinkSiteId/:LinkSiteId',
        component: CoreTokenUserListComponent,
        data: { title: 'ROUTE.CORETOKEN.USER' },
      },
      {
        path: 'user/LinkUserId/:LinkUserId',
        component: CoreTokenUserListComponent,
        data: { title: 'ROUTE.CORETOKEN.USER' },
      },
      {
        path: 'user/LinkDeviceId/:LinkDeviceId',
        component: CoreTokenUserListComponent,
        data: { title: 'ROUTE.CORETOKEN.USER' },
      },
      /** */
      {
        path: 'userlog',
        component: CoreTokenUserLogListComponent,
        data: { title: 'ROUTE.CORETOKEN.USERLOG' },
      },
      {
        path: 'userlog/LinkSiteId/:LinkSiteId',
        component: CoreTokenUserLogListComponent,
        data: { title: 'ROUTE.CORETOKEN.USERLOG' },
      },
      {
        path: 'userlog/LinkUserId/:LinkUserId',
        component: CoreTokenUserLogListComponent,
        data: { title: 'ROUTE.CORETOKEN.USERLOG' },
      },
      {
        path: 'userlog/LinkDeviceId/:LinkDeviceId',
        component: CoreTokenUserLogListComponent,
        data: { title: 'ROUTE.CORETOKEN.USERLOG' },
      },
      /** */
      {
        path: 'userbadlogin',
        component: CoreTokenUserBadLoginListComponent,
        data: { title: 'ROUTE.CORETOKEN.USERBADLOGIN' },
      },
      {
        path: 'userbadlogin/LinkSiteId/:LinkSiteId',
        component: CoreTokenUserBadLoginListComponent,
        data: { title: 'ROUTE.CORETOKEN.USERBADLOGIN' },
      },
      {
        path: 'userbadlogin/LinkUserId/:LinkUserId',
        component: CoreTokenUserBadLoginListComponent,
        data: { title: 'ROUTE.CORETOKEN.USERBADLOGIN' },
      },
      {
        path: 'userbadlogin/LinkDeviceId/:LinkDeviceId',
        component: CoreTokenUserBadLoginListComponent,
        data: { title: 'ROUTE.CORETOKEN.USERBADLOGIN' },
      },
      /** */
      {
        path: 'activation',
        component: CoreTokenActivationListComponent,
        data: { title: 'ROUTE.CORETOKEN.ACTIVATION' },
      },
      /** */
      {
        path: 'microservice',
        component: CoreTokenMicroServiceListComponent,
        data: { title: 'ROUTE.CORETOKEN.MICROSERVICE' },
      },
      /** */
      {
        path: 'microservicelog',
        component: CoreTokenMicroServiceLogListComponent,
        data: { title: 'ROUTE.CORETOKEN.MICROSERVICELOG' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreTokenRoutes {}
