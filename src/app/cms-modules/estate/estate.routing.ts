import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstateAccountAgencyListComponent } from './account-agency/list/list.component';
import { EstateAccountUserListComponent } from './account-user/list/list.component';
import { EstateActivityTypeListComponent } from './activity-type/list/list.component';
import { EstateAdsTypeListComponent } from './ads-type/list/list.component';
import { EstateBillboardAddComponent } from './billbord/add/add.component';
import { EstateBillboardEditComponent } from './billbord/edit/edit.component';
import { EstateBillboardListComponent } from './billbord/list/list.component';
import { EstateContractTypeListComponent } from './contract-type/list/list.component';
import { EstateCustomerOrderResultListComponent } from './customer-order-result/list/list.component';
import { EstateCustomerOrderAddComponent } from './customer-order/add/add.component';
import { EstateCustomerOrderEditComponent } from './customer-order/edit/edit.component';
import { EstateCustomerOrderListComponent } from './customer-order/list/list.component';
import { EstateComponent } from './estate.component';
import { EstatePropertyAdsListComponent } from './property-ads/list/list.component';
import { EstatePropertyAdsSaleListComponent } from './property-ads/sale-list/sale-list.component';
import { EstatePropertyCompanyAddComponent } from './property-company/add/add.component';
import { EstatePropertyCompanyEditComponent } from './property-company/edit/edit.component';
import { EstatePropertyCompanyListComponent } from './property-company/list/list.component';
import { EstatePropertyDetailGroupListComponent } from './property-detail-group/list/list.component';
import { EstatePropertyDetailListComponent } from './property-detail/list/list.component';
import { EstatePropertyExpertPriceListComponent } from './property-expert-price/list/list.component';
import { EstatePropertyHistoryListComponent } from './property-history/list/list.component';
import { EstatePropertyProjectAddComponent } from './property-project/add/add.component';
import { EstatePropertyProjectEditComponent } from './property-project/edit/edit.component';
import { EstatePropertyProjectListComponent } from './property-project/list/list.component';
import { EstatePropertySupplierAddComponent } from './property-supplier/add/add.component';
import { EstatePropertySupplierEditComponent } from './property-supplier/edit/edit.component';
import { EstatePropertySupplierListComponent } from './property-supplier/list/list.component';
import { EstatePropertyTypeLanduseListComponent } from './property-type-landuse/list/list.component';
import { EstatePropertyTypeUsageListComponent } from './property-type-usage/list/list.component';
import { EstatePropertyAddComponent } from './property/add/add.component';
import { EstatePropertyEditComponent } from './property/edit/edit.component';
import { EstatePropertyListComponent } from './property/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: EstateComponent,
    data: { title: 'ROUTE.ESTATE' },
    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/estate-config.module').then(
            (m) => m.EstateConfigModule
          ),
        data: { title: 'ROUTE.ESTATE' },
      },
      /* Config */
      {
        path: 'property',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/Action/:Action',
        component: EstatePropertyListComponent
      },
      {
        path: 'property/LinkPropertyTypeLanduseId/:LinkPropertyTypeLanduseId',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/LinkPropertyTypeUsageId/:LinkPropertyTypeUsageId',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/LinkContractTypeId/:LinkContractTypeId',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/LinkBillboardId/:LinkBillboardId',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/LinkCustomerOrderId/:LinkCustomerOrderId',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/LinkUserId/:LinkUserId',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/LinkProjectId/:LinkProjectId',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/LinkCompanyId/:LinkCompanyId',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/LinkEstateUserId/:LinkEstateUserId',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/LinkEstateAgencyId/:LinkEstateAgencyId',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },
      {
        path: 'property/InChecking/:InChecking',
        component: EstatePropertyListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTY' },
      },

      {
        path: 'property/add',
        component: EstatePropertyAddComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTYADD' },
      },
      {
        path: 'property/add/LinkPropertyTypeLanduseId/:LinkPropertyTypeLanduseId',
        component: EstatePropertyAddComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTYADD' },
      },
      {
        path: 'property/edit/:id',
        component: EstatePropertyEditComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTYEDIT' },
      },
      /**/
      {
        path: 'property-type-usage',
        component: EstatePropertyTypeUsageListComponent,
        data: { title: 'ROUTE.ESTATE.TYPEUSAGE' },
      },
      {
        path: 'property-type-landuse',
        component: EstatePropertyTypeLanduseListComponent,
        data: { title: 'ROUTE.ESTATE.LANDUSE' },
      },
      /**/
      {
        path: 'property-ads/LinkPropertyId/:LinkPropertyId',
        component: EstatePropertyAdsListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTYADS' },
      },
      {
        path: 'property-ads',
        component: EstatePropertyAdsListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTYADS' },
      },
      {
        path: 'property-ads/sale/:LinkPropertyId',
        component: EstatePropertyAdsSaleListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTYADS' },
      },
      /**/
      {
        path: 'activity-type',
        component: EstateActivityTypeListComponent,
        data: { title: 'ROUTE.ESTATE.ACTIVITYTYPE' },
      },
      /**/
      /**/
      {
        path: 'property-company',
        component: EstatePropertyCompanyListComponent,
        data: { title: 'ROUTE.ESTATE.COMPANY' },
      },
      {
        path: 'property-company/LinkProjectId/:LinkProjectId',
        component: EstatePropertyCompanyListComponent,
        data: { title: 'ROUTE.ESTATE.COMPANY' },
      },
      {
        path: 'property-company/add',
        component: EstatePropertyCompanyAddComponent,
        data: { title: 'ROUTE.ESTATE.COMPANY' },
      },
      {
        path: 'property-company/edit/:id',
        component: EstatePropertyCompanyEditComponent,
        data: { title: 'ROUTE.ESTATE.COMPANY' },
      },
      /**/
      /**/
      {
        path: 'property-supplier',
        component: EstatePropertySupplierListComponent,
        data: { title: 'ROUTE.ESTATE.SUPPLIER' },
      },
      {
        path: 'property-supplier/LinkProjectId/:LinkProjectId',
        component: EstatePropertySupplierListComponent,
        data: { title: 'ROUTE.ESTATE.SUPPLIER' },
      },
      {
        path: 'property-supplier/add',
        component: EstatePropertySupplierAddComponent,
        data: { title: 'ROUTE.ESTATE.SUPPLIER' },
      },
      {
        path: 'property-supplier/edit/:id',
        component: EstatePropertySupplierEditComponent,
        data: { title: 'ROUTE.ESTATE.SUPPLIER' },
      },
      /**/
      {
        path: 'property-history',
        component: EstatePropertyHistoryListComponent,
<<<<<<< HEAD
        data: { title: 'ROUTE.ESTATE.HISTORY' }
=======
        data: { title: 'ROUTE.ESTATE.HISTORY' },
>>>>>>> main
      },
      {
        path: 'property-history/InCheckingOnDay/:InCheckingOnDay',
        component: EstatePropertyHistoryListComponent,
        data: { title: 'ROUTE.ESTATE.HISTORY' },
      },
      {
        path: 'property-history/LinkPropertyId/:LinkPropertyId',
        component: EstatePropertyHistoryListComponent,
        data: { title: 'ROUTE.ESTATE.HISTORY' },
      },
      {
        path: 'property-history/LinkEstateUserId/:LinkEstateUserId',
        component: EstatePropertyHistoryListComponent,
        data: { title: 'ROUTE.ESTATE.HISTORY' },
      },
      {
        path: 'property-history/LinkCustomerOrderId/:LinkCustomerOrderId',
        component: EstatePropertyHistoryListComponent,
        data: { title: 'ROUTE.ESTATE.HISTORY' },
      },
      {
        path: 'property-history/LinkEstateAgencyId/:LinkEstateAgencyId',
        component: EstatePropertyHistoryListComponent,
        data: { title: 'ROUTE.ESTATE.HISTORY' },
      },
      {
        path: 'property-history/recordstatus/:RecordStatus',
        component: EstatePropertyHistoryListComponent,
        data: { title: 'ROUTE.ESTATE.HISTORY' },
      },
      {
        path: 'property-history/action/:Action',
        component: EstatePropertyHistoryListComponent,
        data: { title: 'ROUTE.ESTATE.HISTORY' },
      },
      /**/
      {
        path: 'expert-price',
        component: EstatePropertyExpertPriceListComponent,
        data: { title: 'ROUTE.EXPERT.PRICE' },
      },
      /**/
      {
        path: 'ads-type',
        component: EstateAdsTypeListComponent,
        data: { title: 'ROUTE.ESTATE.ADSTYPE' },
      },
      /**/
      {
        path: 'account-agency',
        component: EstateAccountAgencyListComponent,
        data: { title: 'ROUTE.ESTATE.ACCOUNTAGENCY' },
      },
      {
        path: 'account-agency/LinkAccountUserId/:LinkAccountUserId',
        component: EstateAccountAgencyListComponent,
        data: { title: 'ROUTE.ESTATE.ACCOUNTAGENCY' },
      },
      /**/ {
        path: 'account-user',
        component: EstateAccountUserListComponent,
        data: { title: 'ROUTE.ESTATE.ACCOUNTUSER' },
      },
      {
        path: 'account-user/LinkAccountAgencyId/:LinkAccountAgencyId',
        component: EstateAccountUserListComponent,
        data: { title: 'ROUTE.ESTATE.ACCOUNTUSER' },
      },
      /**/
      {
        path: 'contract-type',
        component: EstateContractTypeListComponent,
        data: { title: 'ROUTE.ESTATE.CONTRACTTYPE' },
      },
      /**/
      {
        path: 'billboard',
        component: EstateBillboardListComponent,
        data: { title: 'ROUTE.ESTATE.BILLBOARD' },
      },
      {
        path: 'billboard/add',
        component: EstateBillboardAddComponent,
        data: { title: 'ROUTE.ESTATE.BILLBOARD' },
      },
      {
        path: 'billboard/add-copy/:id',
        component: EstateBillboardAddComponent,
        data: { title: 'ROUTE.ESTATE.BILLBOARD' },
      },
      {
        path: 'billboard/edit/:id',
        component: EstateBillboardEditComponent,
        data: { title: 'ROUTE.ESTATE.BILLBOARD' },
      },
      /**/
      {
        path: 'property-project',
        component: EstatePropertyProjectListComponent,
        data: { title: 'ROUTE.ESTATE.PROJECT' },
      },
      {
        path: 'property-project/add',
        component: EstatePropertyProjectAddComponent,
        data: { title: 'ROUTE.ESTATE.PROJECT' },
      },
      {
        path: 'property-project/edit/:id',
        component: EstatePropertyProjectEditComponent,
        data: { title: 'ROUTE.ESTATE.PROJECT' },
      },
      {
        path: 'customer-order',
        component: EstateCustomerOrderListComponent,
        data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      },
      {
        path: 'customer-order/recordstatus/:RecordStatus',
        component: EstateCustomerOrderListComponent,
        data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      },
      {
        path: 'customer-order/recordstatus/:RecordStatus/:ResponsibleUserId',
        component: EstateCustomerOrderListComponent,
        data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      },
      {
        path: 'customer-order/responsibleUserId/:ResponsibleUserId',
        component: EstateCustomerOrderListComponent,
        data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      },
      {
        path: 'customer-order/add',
        component: EstateCustomerOrderAddComponent,
        data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      },
      {
        path: 'customer-order/add-copy/:id',
        component: EstateCustomerOrderAddComponent,
        data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      },
      {
        path: 'customer-order/add/LinkParentId/:LinkParentId',
        component: EstateCustomerOrderAddComponent,
        data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      },
      {
        path: 'customer-order/edit/:id',
        component: EstateCustomerOrderEditComponent,
        data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      },
      /**/
      {
        path: 'customer-order-result/LinkCustomerOrder/:LinkCustomerOrder',
        component: EstateCustomerOrderResultListComponent,
        data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDERRESULT' },
      },
      {
        path: 'customer-order-result/LinkProperty/:LinkProperty',
        component: EstateCustomerOrderResultListComponent,
        data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDERRESULT' },
      },
      /**/
      {
        path: 'property-detail-group',
        component: EstatePropertyDetailGroupListComponent,
        data: { title: 'ROUTE.ESTATE.DETAIL.GROUP' },
      },
      /**/
      {
        path: 'property-detail',
        component: EstatePropertyDetailListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTYDETAIL' },
      },
      {
        path: 'property-detail/LinkPropertyTypeLanduseId/:LinkPropertyTypeLanduseId',
        component: EstatePropertyDetailListComponent,
        data: { title: 'ROUTE.ESTATE.PROPERTYDETAIL' },
      },
      /** */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstateRoutes {}
