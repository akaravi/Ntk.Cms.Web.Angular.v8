import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsCommentListComponent } from './comment/list/list.component';
import { NewsContentAddComponent } from './content/add/add.component';
import { NewsContentEditComponent } from './content/edit/edit.component';
import { NewsContentListComponent } from './content/list/list.component';
import { NewsComponent } from './news.component';
const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/news-config.module').then((m) => m.NewsConfigModule),
        data: { title: 'ROUTE.NEWS' },
      },
      /* Config */
      {
        path: 'content',
        // resolve: {categoryList: CategoryResolver},
        // loadChildren: () =>    import('./content/content.module').then(m => m.ContentModule)
        component: NewsContentListComponent,
        data: { title: 'ROUTE.NEWS.CONTENT' },
      },
      {
        path: 'content/add/:CategoryId',
        component: NewsContentAddComponent,
        data: { title: 'ROUTE.NEWS.CONTENT' },
      },
      {
        path: 'content/edit/:Id',
        component: NewsContentEditComponent,
        data: { title: 'ROUTE.NEWS.CONTENT' },
      },
      {
        path: 'comment',
        component: NewsCommentListComponent,
        data: { title: 'ROUTE.NEWS.COMMENT' },
      },
      {
        path: 'comment/:ContentId',
        component: NewsCommentListComponent,
        data: { title: 'ROUTE.NEWS.COMMENT' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRouting {}
