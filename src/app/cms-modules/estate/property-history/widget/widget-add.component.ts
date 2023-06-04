
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  EnumFilterDataModelSearchTypes,
  EnumManageUserAccessDataTypes, EnumRecordStatus, EstatePropertyHistoryService, FilterDataModel, FilterModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { WidgetInfoModel } from 'src/app/core/models/widget-info-model';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
  selector: 'app-estate-property-history-widget-add',
  templateUrl: './widget-add.component.html'
})

export class EstatePropertyHistoryWidgetAddComponent implements OnInit, OnDestroy {
  @Input() cssClass = '';

  constructor(
    private service: EstatePropertyHistoryService,
    private cdr: ChangeDetectorRef,
    private cmsToastrService: CmsToastrService,
    private tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    this.loading.cdr = this.cdr; this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
  }
  modelData = new Map<string, number>();

  filteModelContent = new FilterModel();
  widgetInfoModel = new WidgetInfoModel();
  cmsApiStoreSubscribe: Subscription;
  loading: ProgressSpinnerModel = new ProgressSpinnerModel();
  get optionLoading(): ProgressSpinnerModel {
    return this.loading;
  }
  @Input() set optionLoading(value: ProgressSpinnerModel) {
    this.loading = value;
  }
  rowExist = false;
  ngOnInit() {
    this.widgetInfoModel.title = this.translate.instant('TITLE.Check_registered_properties');
    this.widgetInfoModel.description = this.translate.instant('TITLE.Introduction_of_your_customer_order');
    this.widgetInfoModel.link = '/estate/customer-order';

    this.onActionStatist();
    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {
      this.onActionStatist();
    });

  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }

  onActionStatist(): void {
    this.loading.Start(this.constructor.name + 'All', this.translate.instant('MESSAGE.customer_order_list'));
    this.loading.Start(this.constructor.name + 'Available', this.translate.instant('MESSAGE.customer_order_list_active'));
    this.loading.Start(this.constructor.name + 'Archive', this.translate.instant('MESSAGE.customer_order_list_close'));
    this.loading.Start(this.constructor.name + 'Disable', this.translate.instant('MESSAGE.customer_order_list_disable'));
    this.loading.Start(this.constructor.name + 'Pending', this.translate.instant('MESSAGE.customer_order_needs_approval'));
    this.service.setAccessDataType(EnumManageUserAccessDataTypes.Editor);
    this.service.ServiceGetCount(this.filteModelContent).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.rowExist = true;
          this.widgetInfoModel.title = this.translate.instant('TITLE.Add_PropertyHistory');
          this.widgetInfoModel.description = this.translate.instant('TITLE.Number_Registered_PropertyHistory') + ' : ' + ret.totalRowCount;
          this.widgetInfoModel.link = '/estate/customer-order/add';
        }
        else {
          this.widgetInfoModel.title = this.translate.instant('TITLE.Register_your_first_customer_order');
          this.widgetInfoModel.link = '/estate/customer-order/add';
        }
        this.loading.Stop(this.constructor.name + 'All');

      },
      error: (er) => {
        this.widgetInfoModel.title = this.translate.instant('TITLE.Add_new_properties');
        this.widgetInfoModel.link = '/estate/customer-order/add';
        this.loading.Stop(this.constructor.name + 'All');
      }
    }
    );
    /** Pending*/
    const filterStatist2 = JSON.parse(JSON.stringify(this.filteModelContent));
    let fastfilter1 = new FilterDataModel();
    fastfilter1.propertyName = 'RecordStatus';
    fastfilter1.value = EnumRecordStatus.Pending;
    fastfilter1.searchType = EnumFilterDataModelSearchTypes.Equal;
    filterStatist2.filters.push(fastfilter1);

    this.service.setAccessDataType(EnumManageUserAccessDataTypes.Editor);
    this.service.ServiceGetCount(filterStatist2).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          if (ret.totalRowCount > 0) {
            this.modelData.set('Pending', ret.totalRowCount);
          }
          else {
            this.modelData.delete('Pending');
          }
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(this.constructor.name + 'Pending');

      },
      error: (er) => {
        this.loading.Stop(this.constructor.name + 'Pending');
      }
    }
    );
    /** Available */
    const filterStatist3 = JSON.parse(JSON.stringify(this.filteModelContent));
    fastfilter1 = new FilterDataModel();
    fastfilter1.propertyName = 'RecordStatus';
    fastfilter1.value = EnumRecordStatus.Available;
    fastfilter1.searchType = EnumFilterDataModelSearchTypes.Equal;
    filterStatist3.filters.push(fastfilter1);

    this.service.setAccessDataType(EnumManageUserAccessDataTypes.Editor);
    this.service.ServiceGetCount(filterStatist3).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          if (ret.totalRowCount > 0) {
            this.modelData.set('Available', ret.totalRowCount);
          }
          else {
            this.modelData.delete('Available');
          }
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(this.constructor.name + 'Available');

      },
      error: (er) => {
        this.loading.Stop(this.constructor.name + 'Available');
      }
    }
    );
    /** Archive */
    const filterStatist4 = JSON.parse(JSON.stringify(this.filteModelContent));
    fastfilter1 = new FilterDataModel();
    fastfilter1.propertyName = 'RecordStatus';
    fastfilter1.value = EnumRecordStatus.Archive;
    fastfilter1.searchType = EnumFilterDataModelSearchTypes.Equal;
    filterStatist4.filters.push(fastfilter1);
    this.service.setAccessDataType(EnumManageUserAccessDataTypes.Editor);
    this.service.ServiceGetCount(filterStatist4).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          if (ret.totalRowCount > 0) {
            this.modelData.set('Archive', ret.totalRowCount);
          }
          else {
            this.modelData.delete('Archive');
          }
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(this.constructor.name + 'Archive');

      },
      error: (er) => {
        this.loading.Stop(this.constructor.name + 'Archive');
      }
    }
    );
    /** Disable */
    const filterStatist5 = JSON.parse(JSON.stringify(this.filteModelContent));
    fastfilter1 = new FilterDataModel();
    fastfilter1.propertyName = 'RecordStatus';
    fastfilter1.value = EnumRecordStatus.Disable;
    fastfilter1.searchType = EnumFilterDataModelSearchTypes.Equal;
    filterStatist5.filters.push(fastfilter1);
    this.service.setAccessDataType(EnumManageUserAccessDataTypes.Editor);
    this.service.ServiceGetCount(filterStatist5).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          if (ret.totalRowCount > 0) {
            this.modelData.set('Disable', ret.totalRowCount);
          }
          else {
            this.modelData.delete('Disable');
          }
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(this.constructor.name + 'Disable');

      },
      error: (er) => {
        this.loading.Stop(this.constructor.name + 'Disable');
      }
    }
    );

  }
  translateHelp(t: string, v: string): string {
    return t + v;
  }
}
