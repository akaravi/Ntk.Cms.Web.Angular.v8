import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiTelegramComponent } from './api-telegram.component';
import { ApiTelegramBotConfigListComponent } from './bot-config/list/list.component';
import { ApiTelegramLogInputListComponent } from './log-input/list/list.component';
import { ApiTelegramLogOutputListComponent } from './log-output/list/list.component';
import { ApiTelegramMemberInfoListComponent } from './member-info/list/list.component';
import { ApiTelegramReceivedFileListComponent } from './received-file/list/list.component';
import { ApiTelegramUploadedFileListComponent } from './uploaded-file/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ApiTelegramComponent,
    data: { title: 'ROUTE.APITELEGRAM' },

    children: [
      /*Config*/
      {
        path: 'config',
        loadChildren: () =>
          import('./config/api-telegram-config.module').then(
            (m) => m.ApiTelegramConfigModule
          ),
        data: { title: 'ROUTE.APITELEGRAM' },
      },
      /*Config*/
      {
        path: 'bot-config',
        component: ApiTelegramBotConfigListComponent,
        data: { title: 'ROUTE.APITELEGRAM.BOTCONFIG' },
      },
      {
        path: 'log-input',
        component: ApiTelegramLogInputListComponent,
        data: { title: 'ROUTE.APITELEGRAM.LOGINPUT' },
      },
      {
        path: 'log-input/LinkBotConfigId/:LinkBotConfigId',
        component: ApiTelegramLogInputListComponent,
        data: { title: 'ROUTE.APITELEGRAM.LOGINPUT' },
      },
      {
        path: 'log-output',
        component: ApiTelegramLogOutputListComponent,
        data: { title: 'ROUTE.APITELEGRAM.LOGOUTPUT' },
      },
      {
        path: 'log-output/LinkBotConfigId/:LinkBotConfigId',
        component: ApiTelegramLogOutputListComponent,
        data: { title: 'ROUTE.APITELEGRAM.LOGOUTPUT' },
      },
      {
        path: 'member-info',
        component: ApiTelegramMemberInfoListComponent,
        data: { title: 'ROUTE.APITELEGRAM.MEMBERINFO' },
      },
      {
        path: 'received-file',
        component: ApiTelegramReceivedFileListComponent,
        data: { title: 'ROUTE.APITELEGRAM.RECEIVEDFILE' },
      },
      {
        path: 'uploaded-file',
        component: ApiTelegramUploadedFileListComponent,
        data: { title: 'ROUTE.APITELEGRAM.UPLOADEDFILE' },
      },
      //   {
      //     path: 'app',
      //     component: ApiTelegramAppListComponent
      //   },
      //   {
      //     path: 'app/:SourceId',
      //     component: ApiTelegramAppListComponent
      //   },
      //   {
      //     path: 'app/add/:SourceId',
      //     component: ApiTelegramAppAddComponent
      //   },
      //   {
      //     path: 'app/edit/:Id',
      //     component: ApiTelegramAppEditComponent
      //   },
      //   {
      //     path: 'intro',
      //     component: ApiTelegramIntroListComponent
      //   },
      //   {
      //     path: 'intro/add/:ApiTelegramId',
      //     component: ApiTelegramIntroListComponent
      //   },
      //   {
      //     path: 'intro/edit/:Id',
      //     component: ApiTelegramIntroListComponent
      //   },
      //   {
      //     path: 'memberinfo',
      //     component: ApiTelegramMemberInfoListComponent
      //   },
      //   {
      //     path: 'notification',
      //     component: ApiTelegramNotificationListComponent
      //   },

      //   {
      //     path: 'themeconfig',
      //     component: ApiTelegramThemeConfigListComponent
      //   },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiTelegramRoutes {}
