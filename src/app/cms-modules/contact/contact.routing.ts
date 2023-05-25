import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactContentAddComponent } from './content/add/add.component';
import { ContactContentEditComponent } from './content/edit/edit.component';
import { ContactContentListComponent } from './content/list/list.component';


const routes: Routes = [
  {
    path: '',
    component: ContactComponent,    data: { title: 'ROUTE.CONTACT' },

    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/contact-config.module').then((m) => m.ContactConfigModule),    data: { title: 'Route.CONTACT' },

      },
      /* Config */
      {
        path: 'content',
        component: ContactContentListComponent,    data: { title: 'Route.CONTACT' },

      },
      {
        path: 'content/add/:CategoryId',
        component: ContactContentAddComponent,    data: { title: 'Route.CONTACT' },

      },
      {
        path: 'content/edit/:Id',
        component: ContactContentEditComponent,    data: { title: 'Route.CONTACT' },

      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRouting {
}
