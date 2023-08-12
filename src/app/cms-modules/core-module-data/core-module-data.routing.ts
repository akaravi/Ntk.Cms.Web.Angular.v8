import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModuleDataCommentListComponent } from './comment/list/list.component';
import { CoreModuleDataComponent } from './core-module-data.component';
import { CoreModuleDataMemoListComponent } from './memo/list/list.component';
import { CoreModuleDataPinListComponent } from './pin/list/list.component';
import { CoreModuleDataTaskListComponent } from './task/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: CoreModuleDataComponent,
    children: [
      {
        path: 'memo',
        component: CoreModuleDataMemoListComponent,
        data: { title: 'ROUTE.COREMODULELOG.MEMO' },
      },
      {
        path: 'pin',
        component: CoreModuleDataPinListComponent,
        data: { title: 'ROUTE.COREMODULELOG.PIN' },
      },
      {
        path: 'task',
        component: CoreModuleDataTaskListComponent,
        data: { title: 'ROUTE.COREMODULELOG.TASK' },
      },
      {
        path: 'comment',
        component: CoreModuleDataCommentListComponent,
        data: { title: 'ROUTE.COREMODULELOG.COMMENT' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreModuleDataRoutes { }
