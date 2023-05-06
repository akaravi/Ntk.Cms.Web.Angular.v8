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
    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/catalog-config.module').then((m) => m.CatalogConfigModule),
      },
      /* Config */
      {
        path: 'content',
        // resolve: {categoryList: CategoryResolver},
        // loadChildren: () =>    import('./content/content.module').then(m => m.ContentModule)
        component: CatalogContentListComponent
      },
      {
        path: 'content/add/:CategoryId',
        component: CatalogContentAddComponent
      },
      {
        path: 'content/edit/:Id',
        component: CatalogContentEditComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRouting {
}
