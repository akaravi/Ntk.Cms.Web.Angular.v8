import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketingAnswerListComponent } from './answer/list/list.component';
import { TicketingDepartemenEditComponent } from './departemen/edit/edit.component';
import { TicketingDepartemenListComponent } from './departemen/list/list.component';
import { TicketingDepartemenLogListComponent } from './departemenLog/list/list.component';
import { TicketingFaqListComponent } from './faq/list/list.component';
import { TicketingFaqOriginListComponent } from './faq/origin-list/origin-list.component';
import { TicketingTaskContactUsAddComponent } from './task/contact-us-add/contact-us-add.component';
import { TicketingTaskContactUsListComponent } from './task/contact-us-list/contact-us-list.component';
import { TicketingTaskListComponent } from './task/list/list.component';
import { TicketingTemplateListComponent } from './template/list/list.component';
import { TicketingComponent } from './ticketing.component';

const routes: Routes = [
  {
    path: '',
    component: TicketingComponent,
    data: { title: 'ROUTE.TICKETING' },

    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/ticketing-config.module').then(
            (m) => m.TicketingConfigModule
          ),
        data: { title: 'ROUTE.TICKETING' },
      },
      /* Config */
      {
        path: 'departemen',
        component: TicketingDepartemenListComponent,
        data: { title: 'ROUTE.TICKETING.DEPARTMENT' },
      },
      {
        path: 'departemen/add/',
        component: TicketingDepartemenEditComponent,
        data: { title: 'ROUTE.TICKETING.DEPARTMENT' },
      },
      {
        path: 'departemen/edit/:Id',
        component: TicketingDepartemenEditComponent,
        data: { title: 'ROUTE.TICKETING.DEPARTMENT' },
      },
      {
        path: 'departemenlog/DepartemenId/:DepartemenId',
        component: TicketingDepartemenLogListComponent,
        data: { title: 'ROUTE.TICKETING.DEPARTMENTLOG' },
      },
      {
        path: 'departemenlog/OperatorId/:OperatorId',
        component: TicketingDepartemenLogListComponent,
        data: { title: 'ROUTE.TICKETING.DEPARTMENTLOG' },
      },
      {
        path: 'faq',
        component: TicketingFaqOriginListComponent,
        data: { title: 'ROUTE.TICKETING.FAQ' },
      },
      {
        path: 'faq/:DepartemenId',
        component: TicketingFaqListComponent,
        data: { title: 'ROUTE.TICKETING.FAQ' },
      },
      {
        path: 'faq/list',
        component: TicketingFaqListComponent,
        data: { title: 'ROUTE.TICKETING.LIST' },
      },
      {
        path: 'template',
        component: TicketingTemplateListComponent,
        data: { title: 'ROUTE.TICKETING.TEMPLATE' },
      },
      {
        path: 'template/:DepartemenId',
        component: TicketingTemplateListComponent,
        data: { title: 'ROUTE.TICKETING.TEMPLATE' },
      },
      {
        path: 'contactus',
        component: TicketingTaskContactUsAddComponent,
        data: { title: 'ROUTE.TICKETING.CONTACTUS' },
      },
      {
        path: 'task',
        component: TicketingTaskListComponent,
        data: { title: 'ROUTE.TICKETING.TASK' },
      },
      {
        path: 'task/listTicketStatus/:TicketStatus',
        component: TicketingTaskListComponent,
        data: { title: 'ROUTE.TICKETING.TASK' },
      },
      {
        path: 'task/contactus-list',
        component: TicketingTaskContactUsListComponent,
        data: { title: 'ROUTE.TICKETING.TASK' },
      },
      {
        path: 'task/contactus-list/LinkCmsUserId/:LinkCmsUserId',
        component: TicketingTaskContactUsListComponent,
        data: { title: 'ROUTE.TICKETING.TASK' },
      },
      {
        path: 'task/:DepartemenId',
        component: TicketingTaskListComponent,
        data: { title: 'ROUTE.TICKETING.TASK' },
      },
      {
        path: 'task/LinkCmsUserId/:LinkCmsUserId',
        component: TicketingTaskListComponent,
        data: { title: 'ROUTE.TICKETING.TASK' },
      },
      // ,
      // {
      //   path: 'task/edit/:id',
      //   component: TicketingTaskEditComponent
      // }
      {
        path: 'answer',
        component: TicketingAnswerListComponent,
        data: { title: 'ROUTE.TICKETING.ANSWER' },
      },
      {
        path: 'answer/LinkTaskId/:LinkTaskId',
        component: TicketingAnswerListComponent,
        data: { title: 'ROUTE.TICKETING.ANSWER' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketingRouting {}
