import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ApplicationAppService, ApplicationMemberInfoService, ArticleContentService, BiographyContentService, BlogContentService, ChartContentService, CoreModuleLogReportAbuseService, CoreModuleSiteCreditService, CoreSiteService, CoreUserClaimContentService, CoreUserClaimTypeService, CoreUserService, EstateCustomerOrderService, EstatePropertyHistoryService, EstatePropertyService, NewsContentService, TicketingTaskService, WebDesignerLogMemberInfoService } from 'ntk-cms-api';
import { ApplicationAppWidgetCreateComponent } from 'src/app/cms-modules/application/content/widget/create/widget-create.component';
import { ApplicationAppWidgetComponent } from 'src/app/cms-modules/application/content/widget/widget.component';
import { ApplicationAppWidget2Component } from 'src/app/cms-modules/application/content/widget/widget2.component';
import { ApplicationMemberInfoWidgetComponent } from 'src/app/cms-modules/application/memberInfo/widget/widget.component';
import { ApplicationMemberInfoWidget2Component } from 'src/app/cms-modules/application/memberInfo/widget/widget2.component';
import { ArticleContentWidgetComponent } from 'src/app/cms-modules/article/content/widget/widget.component';
import { ArticleContentWidget2Component } from 'src/app/cms-modules/article/content/widget/widget2.component';
import { BiographyContentWidgetComponent } from 'src/app/cms-modules/biography/content/widget/widget.component';
import { BiographyContentWidget2Component } from 'src/app/cms-modules/biography/content/widget/widget2.component';
import { BlogContentWidgetComponent } from 'src/app/cms-modules/blog/content/widget/widget.component';
import { BlogContentWidget2Component } from 'src/app/cms-modules/blog/content/widget/widget2.component';
import { ChartContentWidgetComponent } from 'src/app/cms-modules/chart/content/widget/widget.component';
import { ChartContentWidget2Component } from 'src/app/cms-modules/chart/content/widget/widget2.component';
import { CoreSiteWidgetCountComponent } from 'src/app/cms-modules/core-main/site/widget/count/widget.component';
import { CoreSiteWidgetCount2Component } from 'src/app/cms-modules/core-main/site/widget/count/widget2.component';
import { CoreSiteWidgetModuleComponent } from 'src/app/cms-modules/core-main/site/widget/module/widget.component';
import { CoreSiteWidgetStatusComponent } from 'src/app/cms-modules/core-main/site/widget/status/widget.component';
import { CoreUserClaimContentWidgetStatusComponent } from 'src/app/cms-modules/core-main/user-claim/content/widget/widget-status.component';
import { CoreUserWidgetComponent } from 'src/app/cms-modules/core-main/user/widget/widget.component';
import { CoreModuleLogReportAbuseWidget2Component } from 'src/app/cms-modules/core-module-log/report-abuse/widget/widget2.component';
import { CoreModuleSiteCreditWidgetPriceComponent } from 'src/app/cms-modules/core-module/site-credit/widget/widget-price.component';
import { CoreModuleSiteUserCreditWidgetPriceComponent } from 'src/app/cms-modules/core-module/site-user-credit/widget/widget-price.component';
import { EstateCustomerOrderWidgetAddComponent } from 'src/app/cms-modules/estate/customer-order/widget/widget-add.component';
import { EstateCustomerOrderWidgetComponent } from 'src/app/cms-modules/estate/customer-order/widget/widget.component';
import { EstateCustomerOrderWidget2Component } from 'src/app/cms-modules/estate/customer-order/widget/widget2.component';
import { EstatePropertyWidgetAddComponent } from 'src/app/cms-modules/estate/property/widget/widget-add.component';
import { EstatePropertyWidgetComponent } from 'src/app/cms-modules/estate/property/widget/widget.component';
import { EstatePropertyWidget2Component } from 'src/app/cms-modules/estate/property/widget/widget2.component';
import { NewsContentWidgetComponent } from 'src/app/cms-modules/news/content/widget/widget.component';
import { NewsContentWidget2Component } from 'src/app/cms-modules/news/content/widget/widget2.component';
import { TicketingTaskWidgetComponent } from 'src/app/cms-modules/ticketing/task/widget/widget.component';
import { TicketingTaskWidget2Component } from 'src/app/cms-modules/ticketing/task/widget/widget2.component';
import { WebDesignerLogMemberInfoWidgetComponent } from 'src/app/cms-modules/web-designer/log-member-info/widget/widget.component';
import { WebDesignerLogMemberInfoWidget2Component } from 'src/app/cms-modules/web-designer/log-member-info/widget/widget2.component';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsHtmlWidgetComponent } from 'src/app/shared/cms-html-widget/cms-html-widget.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WidgetsModule } from '../../_metronic/partials';
import { DashboardComponent } from './dashboard.component';
import { EstatePropertyHistoryWidgetComponent } from 'src/app/cms-modules/estate/property-history/widget/widget.component';
import { EstatePropertyHistoryWidget2Component } from 'src/app/cms-modules/estate/property-history/widget/widget2.component';
import { EstatePropertyHistoryWidgetAddComponent } from 'src/app/cms-modules/estate/property-history/widget/widget-add.component';

@NgModule({
  declarations: [DashboardComponent
    ,
    WebDesignerLogMemberInfoWidgetComponent,
    WebDesignerLogMemberInfoWidget2Component,
    ApplicationAppWidgetComponent,
    ApplicationAppWidget2Component,
    ApplicationAppWidgetCreateComponent,
    ApplicationMemberInfoWidgetComponent,
    ApplicationMemberInfoWidget2Component,
    NewsContentWidgetComponent,
    NewsContentWidget2Component,
    ChartContentWidgetComponent,
    ChartContentWidget2Component,
    ArticleContentWidgetComponent,
    ArticleContentWidget2Component,
    BiographyContentWidgetComponent,
    BiographyContentWidget2Component,
    BlogContentWidgetComponent,
    BlogContentWidget2Component,
    CoreSiteWidgetCountComponent,
    CoreSiteWidgetCount2Component,
    CoreSiteWidgetStatusComponent,
    CoreSiteWidgetModuleComponent,
    CoreUserWidgetComponent,
    CoreUserClaimContentWidgetStatusComponent,
    CmsHtmlWidgetComponent,
    EstatePropertyWidgetComponent,
    EstatePropertyWidget2Component,
    EstatePropertyWidgetAddComponent,
    EstateCustomerOrderWidgetComponent,
    EstateCustomerOrderWidget2Component,
    EstateCustomerOrderWidgetAddComponent,
    EstatePropertyHistoryWidgetComponent,
    EstatePropertyHistoryWidget2Component,
    EstatePropertyHistoryWidgetAddComponent,
    TicketingTaskWidgetComponent,
    TicketingTaskWidget2Component,
    CoreModuleLogReportAbuseWidget2Component,
    CoreModuleSiteCreditWidgetPriceComponent,
    CoreModuleSiteUserCreditWidgetPriceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    WidgetsModule,
    InlineSVGModule,
    NgApexchartsModule,
    SharedModule.forRoot(),
    //DropdownMenusModule
  ],
  providers: [
    PublicHelper,
    WebDesignerLogMemberInfoService,
    ApplicationAppService,
    ApplicationMemberInfoService,
    NewsContentService,
    BiographyContentService,
    BlogContentService,
    EstatePropertyService,
    EstateCustomerOrderService,
    TicketingTaskService,
    ChartContentService,
    ArticleContentService,
    CoreSiteService,
    CoreUserService,
    CoreUserClaimContentService,
    CoreUserClaimTypeService,
    CoreModuleLogReportAbuseService,
    CoreModuleSiteCreditService,
    EstatePropertyHistoryService,
  ]
})
export class DashboardModule { }
