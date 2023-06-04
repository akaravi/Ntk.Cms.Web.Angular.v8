import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogConfigCheckSiteComponent } from './check-site/check-site.component';
import { CatalogConfigCheckUserComponent } from './check-user/check-user.component';
import { CatalogConfigMainAdminComponent } from './main-admin/config-main-admin.component';
import { CatalogConfigSiteComponent } from './site/config-site.component';

const routes: Routes = [
  {
    path: '',
    children: [
      /*Config*/
      {
        path: 'mainadmin',
        component: CatalogConfigMainAdminComponent
      },
      {
        path: 'site',
        component: CatalogConfigSiteComponent
      },
      {
        path: 'site/:LinkSiteId',
        component: CatalogConfigSiteComponent
      },
      {
        path: 'checkuser',
        component: CatalogConfigCheckUserComponent
      },
      {
        path: 'checkuser/:LinkUserId',
        component: CatalogConfigCheckUserComponent
      },
      {
        path: 'checksite',
        component: CatalogConfigCheckSiteComponent
      },
      {
        path: 'checksite/:LinkSiteId',
        component: CatalogConfigCheckSiteComponent
      },
      /*Config*/
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogConfigRouting {
}
