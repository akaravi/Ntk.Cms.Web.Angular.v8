import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiographyComponent } from './biography.component';
import { BiographyCommentListComponent } from './comment/list/list.component';
import { BiographyContentAddComponent } from './content/add/add.component';
import { BiographyContentEditComponent } from './content/edit/edit.component';
import { BiographyContentListComponent } from './content/list/list.component';
const routes: Routes = [
  {
    path: '',
    component: BiographyComponent,
    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/biography-config.module').then((m) => m.BiographyConfigModule),
      },
      /* Config */
      {
        path: 'content',
        // resolve: {categoryList: CategoryResolver},
        // loadChildren: () =>    import('./content/content.module').then(m => m.ContentModule)
        component: BiographyContentListComponent,
        data:{ title: 'ROUTE.BIOGRAPHY' },
        
      },
      {
        path: 'content/add/:CategoryId',
        component: BiographyContentAddComponent,
        data:{ title: 'ROUTE.BIOGRAPHY' },
      },
      {
        path: 'content/edit/:Id',
        component: BiographyContentEditComponent,
        data:{ title: 'ROUTE.BIOGRAPHY' },
      },
      {
        path: 'comment',
        component: BiographyCommentListComponent,
        data:{ title: 'ROUTE.BIOGRAPHY' },
      },
      {
        path: 'comment/:ContentId',
        component: BiographyCommentListComponent,
        data:{ title: 'ROUTE.BIOGRAPHY' },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiographyRouting {
}