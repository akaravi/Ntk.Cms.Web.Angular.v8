import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollingContentAddComponent } from './content/add/add.component';
import { PollingContentEditComponent } from './content/edit/edit.component';
import { PollingContentListComponent } from './content/list/list.component';
import { PollingComponent } from './polling.component';
import { PollingVoteListComponent } from './vote/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: PollingComponent,
    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/polling-config.module').then(
            (m) => m.PollingConfigModule
          ),
        data: { title: 'ROUTE.POLLING' },
      },
      /* Config */
      {
        path: 'content',
        // resolve: {categoryList: CategoryResolver},
        // loadChildren: () =>    import('./content/content.module').then(m => m.ContentModule)
        component: PollingContentListComponent,
        data: { title: 'ROUTE.POLLING.CONTENT' },
      },
      {
        path: 'content/add/:CategoryId',
        component: PollingContentAddComponent,
        data: { title: 'ROUTE.POLLING.CONTENT' },
      },
      {
        path: 'content/edit/:Id',
        component: PollingContentEditComponent,
        data: { title: 'ROUTE.POLLING.CONTENT' },
      },
      {
        path: 'vote',
        component: PollingVoteListComponent,
        data: { title: 'ROUTE.POLLING.VOTE' },
      },
      {
        path: 'vote/ContentId/:ContentId',
        component: PollingVoteListComponent,
        data: { title: 'ROUTE.POLLING.VOTE' },
      },
      {
        path: 'vote/OptionId/:OptionId',
        component: PollingVoteListComponent,
        data: { title: 'ROUTE.POLLING.VOTE' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollingRouting {}
