import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebDesignerMainIntroAddComponent } from './intro/add/add.component';
import { WebDesignerMainIntroEditComponent } from './intro/edit/edit.component';
import { WebDesignerMainIntroListComponent } from './intro/list/list.component';
import { WebDesignerLogMemberInfoListComponent } from './log-member-info/list/list.component';
import { WebDesignerMainMenuListComponent } from './menu/list/list.component';
import { WebDesignerMainPageDependencyListComponent } from './page-dependency/list/list.component';
import { WebDesignerMainPageTemplateListComponent } from './page-template/list/list.component';
import { WebDesignerMainPageListGridComponent } from './page/list-grid/list-grid.component';
import { WebDesignerMainPageListComponent } from './page/list/list.component';
import { WebDesignerComponent } from './web-designer.component';
const routes: Routes = [
  {
    path: '',
    component: WebDesignerComponent,
    data: { title: 'ROUTE.WEBDESIGNER' },

    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/web-designer-config.module').then(
            (m) => m.WebDesignerConfigModule
          ),
        data: { title: 'ROUTE.WEBDESIGNER' },
      },
      /* Config */
      /** */
      {
        path: 'intro',
        component: WebDesignerMainIntroListComponent,
        data: { title: 'ROUTE.WEBDESIGNER.INTRO' },
      },
      {
        path: 'intro/LinkPageId/:LinkPageId',
        component: WebDesignerMainIntroListComponent,
        data: { title: 'ROUTE.WEBDESIGNER.INTRO' },
      },
      {
        path: 'intro/add',
        component: WebDesignerMainIntroAddComponent,
        data: { title: 'ROUTE.WEBDESIGNER.INTRO' },
      },
      {
        path: 'intro/add/:LinkPageId',
        component: WebDesignerMainIntroAddComponent,
        data: { title: 'ROUTE.WEBDESIGNER.INTRO' },
      },
      {
        path: 'intro/edit/:Id',
        component: WebDesignerMainIntroEditComponent,
        data: { title: 'ROUTE.WEBDESIGNER.INTRO' },
      },
      /** */
      /** */
      {
        path: 'menu',
        component: WebDesignerMainMenuListComponent,
        data: { title: 'ROUTE.WEBDESIGNER.MENU' },
      },
      /** */
      {
        path: 'logmemberinfo',
        component: WebDesignerLogMemberInfoListComponent,
        data: { title: 'ROUTE.WEBDESIGNER.LOGMEMBERINFO' },
      },
      /** */
      {
        path: 'pagetemplate',
        component: WebDesignerMainPageTemplateListComponent,
        data: { title: 'ROUTE.WEBDESIGNER.PAGETEMPLATE' },
      },
      /** */
      /** */
      {
        path: 'pagedependency',
        component: WebDesignerMainPageDependencyListComponent,
        data: { title: 'ROUTE.WEBDESIGNER.PAGEDEPENDENCY' },
      },
      /** */
      {
        path: 'page',
        component: WebDesignerMainPageListComponent,
        data: { title: 'ROUTE.WEBDESIGNER.PAGE' },
      },
      {
        path: 'page/LinkPageTemplateGuId/:LinkPageTemplateGuId',
        component: WebDesignerMainPageListComponent,
        data: { title: 'ROUTE.WEBDESIGNER.PAGE' },
      },
      {
        path: 'page/LinkPageParentGuId/:LinkPageParentGuId',
        component: WebDesignerMainPageListComponent,
        data: { title: 'ROUTE.WEBDESIGNER.PAGE' },
      },
      {
        path: 'page/LinkPageDependencyGuId/:LinkPageDependencyGuId',
        component: WebDesignerMainPageListComponent,
        data: { title: 'ROUTE.WEBDESIGNER.PAGE' },
      },
      /** */
      {
        path: 'page/list-grid',
        component: WebDesignerMainPageListGridComponent,
        data: { title: 'ROUTE.WEBDESIGNER.PAGE' },
      },
      {
        path: 'page/list-grid/LinkPageTemplateGuId/:LinkPageTemplateGuId',
        component: WebDesignerMainPageListGridComponent,
        data: { title: 'ROUTE.WEBDESIGNER.PAGE' },
      },
      {
        path: 'page/list-grid/LinkPageParentGuId/:LinkPageParentGuId',
        component: WebDesignerMainPageListGridComponent,
        data: { title: 'ROUTE.WEBDESIGNER.PAGE' },
      },
      {
        path: 'page/list-grid/LinkPageDependencyGuId/:LinkPageDependencyGuId',
        component: WebDesignerMainPageListGridComponent,
        data: { title: 'ROUTE.WEBDESIGNER.PAGE' },
      },
      /** */
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebDesignerRoutes {}
