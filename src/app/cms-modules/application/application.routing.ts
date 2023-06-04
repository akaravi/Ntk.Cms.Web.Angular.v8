import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { ApplicationAppAddComponent } from './content/add/add.component';
import { ApplicationAppEditComponent } from './content/edit/edit.component';
import { ApplicationAppListComponent } from './content/list/list.component';
import { ApplicationIntroAddComponent } from './intro/add/add.component';
import { ApplicationIntroEditComponent } from './intro/edit/edit.component';
import { ApplicationIntroListComponent } from './intro/list/list.component';
import { ApplicationMemberInfoListComponent } from './memberInfo/list/list.component';
import { ApplicationLogNotificationListComponent } from './notification/list/list.component';
import { ApplicationSourceAddComponent } from './source/add/add.component';
import { ApplicationSourceEditComponent } from './source/edit/edit.component';
import { ApplicationSourceListComponent } from './source/list/list.component';
import { ApplicationThemeConfigListComponent } from './themeConfig/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    data: { title: 'ROUTE.APPLICATION' },

    children: [
      /*Config*/
      {
        path: 'config',
        loadChildren: () =>
          import('./config/application-config.module').then(
            (m) => m.ApplicationConfigModule
          ),
        data: { title: 'ROUTE.APPLICATION' },
      },
      /*Config*/
      {
        path: 'source',
        component: ApplicationSourceListComponent,
        data: { title: 'ROUTE.APPLICATION.SOURCE' },
      },
      {
        path: 'source/add',
        component: ApplicationSourceAddComponent,
        data: { title: 'ROUTE.APPLICATION.SOURCE' },
      },
      {
        path: 'source/edit/:Id',
        component: ApplicationSourceEditComponent,
        data: { title: 'ROUTE.APPLICATION.SOURCE' },
      },
      {
        path: 'app',
        component: ApplicationAppListComponent,
        data: { title: 'ROUTE.APPLICATION.APP' },
      },
      {
        path: 'app/LinkSourceId/:LinkSourceId',
        component: ApplicationAppListComponent,
        data: { title: 'ROUTE.APPLICATION.APP' },
      },
      {
        path: 'app/LinkThemeConfigId/:LinkThemeConfigId',
        component: ApplicationAppListComponent,
        data: { title: 'ROUTE.APPLICATION.APP' },
      },
      {
        path: 'app/add',
        component: ApplicationAppAddComponent,
        data: { title: 'ROUTE.APPLICATION.APP' },
      },
      {
        path: 'app/add/:SourceId',
        component: ApplicationAppAddComponent,
        data: { title: 'ROUTE.APPLICATION.APP' },
      },
      {
        path: 'app/edit/:Id',
        component: ApplicationAppEditComponent,
        data: { title: 'ROUTE.APPLICATION.APP' },
      },
      /** */
      {
        path: 'intro',
        component: ApplicationIntroListComponent,
        data: { title: 'ROUTE.APPLICATION.INTRO' },
      },
      {
        path: 'intro/LinkApplicationId/:LinkApplicationId',
        component: ApplicationIntroListComponent,
        data: { title: 'ROUTE.APPLICATION.INTRO' },
      },
      {
        path: 'intro/add/:LinkApplicationId',
        component: ApplicationIntroAddComponent,
        data: { title: 'ROUTE.APPLICATION.INTRO' },
      },
      {
        path: 'intro/edit/:Id',
        component: ApplicationIntroEditComponent,
        data: { title: 'ROUTE.APPLICATION.INTRO' },
      },
      /** */
      {
        path: 'memberinfo',
        component: ApplicationMemberInfoListComponent,
        data: { title: 'ROUTE.APPLICATION.MEMBERINFO' },
      },
      {
        path: 'memberinfo/LinkMemberId/:LinkMemberId',
        component: ApplicationMemberInfoListComponent,
        data: { title: 'ROUTE.APPLICATION.MEMBERINFO' },
      },
      {
        path: 'memberinfo/LinkUserId/:LinkUserId',
        component: ApplicationMemberInfoListComponent,
        data: { title: 'ROUTE.APPLICATION.MEMBERINFO' },
      },
      {
        path: 'memberinfo/LinkApplicationId/:LinkApplicationId',
        component: ApplicationMemberInfoListComponent,
        data: { title: 'ROUTE.APPLICATION.MEMBERINFO' },
      },
      {
        path: 'notification',
        component: ApplicationLogNotificationListComponent,
        data: { title: 'ROUTE.APPLICATION.NOTIFICATION' },
      },
      {
        path: 'notification/LinkApplicationId/:LinkApplicationId',
        component: ApplicationLogNotificationListComponent,
        data: { title: 'ROUTE.APPLICATION.NOTIFICATION' },
      },
      {
        path: 'notification/LinkApplicationMemberId/:LinkApplicationMemberId',
        component: ApplicationLogNotificationListComponent,
        data: { title: 'ROUTE.APPLICATION.NOTIFICATION' },
      },

      {
        path: 'themeconfig',
        component: ApplicationThemeConfigListComponent,
        data: { title: 'ROUTE.APPLICATION.THEMECONFIG' },
      },
      {
        path: 'themeconfig/LinkSourceId/:LinkSourceId',
        component: ApplicationThemeConfigListComponent,
        data: { title: 'ROUTE.APPLICATION.THEMECONFIG' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutes {}
