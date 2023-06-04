import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { CatalogContentAddComponent } from './content/add/add.component';
import { CatalogContentEditComponent } from './content/edit/edit.component';
import { CatalogContentListComponent } from './content/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    data: { title: 'ROUTE.CATALOG' },

    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/catalog-config.module').then(
            (m) => m.CatalogConfigModule
          ),
        data: { title: 'ROUTE.CATALOG' },
      },
      /* Config */
      {
        path: 'content',
        // resolve: {categoryList: CategoryResolver},
        // loadChildren: () =>    import('./content/content.module').then(m => m.ContentModule)
        component: CatalogContentListComponent,
        data: { title: 'ROUTE.CATALOG' },
      },
      {
        path: 'content/add/:CategoryId',
        component: CatalogContentAddComponent,
        data: { title: 'ROUTE.CATALOG' },
      },
      {
        path: 'content/edit/:Id',
        component: CatalogContentEditComponent,
        data: { title: 'ROUTE.CATALOG' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRouting {}
