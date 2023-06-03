import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileContentExplorerComponent } from './content/explorer/explorer.component';
import { FileContentListComponent } from './content/list/list.component';
import { FileManagerComponent } from './file-manager.component';

const routes: Routes = [
  {
    path: '',
    component: FileManagerComponent,
    data: { title: 'ROUTE.FILEMANAGER' },
    children: [
      {
        path: 'content',
        component: FileContentListComponent,
        data: { title: 'ROUTE.FILEMANAGER' },
      },
      {
        path: 'explorer',
        component: FileContentExplorerComponent,
        data: { title: 'ROUTE.FILEMANAGER' },
      },
      {
        path: '',
        redirectTo: 'explorer',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileManagerRouting {}
