import {
  ChangeDetectorRef, Component,
  OnDestroy, OnInit
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreUserModel,
  DataFieldInfoModel, EnumInfoModel,
  ErrorExceptionResult,
  EstateAccountAgencyFilterModel,
  EstateAccountAgencyModel,
  EstateAccountAgencyService,
  EstateAccountUserFilterModel,
  EstateAccountUserModel,
  EstateAccountUserService,
  EstateCustomerOrderFilterModel,
  EstateCustomerOrderModel,
  EstateCustomerOrderService,
  EstatePropertyFilterModel,
  EstatePropertyHistoryFilterModel,
  EstatePropertyHistoryModel,
  EstatePropertyHistoryService,
  EstatePropertyModel,
  EstatePropertyService
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';

import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { EstateCustomerOrderQuickViewComponent } from '../../customer-order/quick-view/quick-view.component';
import { EstatePropertyHistoryQuickViewComponent } from '../../property-history/quick-view/quick-view.component';
import { EstatePropertyQuickViewComponent } from '../../property/quick-view/quick-view.component';
@Component({
  selector: 'app-estate-overview-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EstateOverviewEventsComponent implements OnInit, OnDestroy {
  constructor(
    public estatePropertyService: EstatePropertyService,
    public estatePropertyHistoryService: EstatePropertyHistoryService,
    public estateCustomerOrderService: EstateCustomerOrderService,
    public estateAccountUserService: EstateAccountUserService,
    public estateAccountAgencyService: EstateAccountAgencyService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsToastrService: CmsToastrService,
    private router: Router,
    public dialog: MatDialog,
    public translate: TranslateService,
    public tokenHelper: TokenHelper,

  ) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');



  }

  loading = new ProgressSpinnerModel();
  dataModelPropertyResult: ErrorExceptionResult<EstatePropertyModel> = new ErrorExceptionResult<EstatePropertyModel>();
  dataModelCustomerOrderResult: ErrorExceptionResult<EstateCustomerOrderModel> = new ErrorExceptionResult<EstateCustomerOrderModel>();
  dataModelHistoryResult: ErrorExceptionResult<EstatePropertyHistoryModel> = new ErrorExceptionResult<EstatePropertyHistoryModel>();
  dataModelAccountUserResult: ErrorExceptionResult<EstateAccountUserModel> = new ErrorExceptionResult<EstateAccountUserModel>();
  dataModelAccountAgencyResult: ErrorExceptionResult<EstateAccountAgencyModel> = new ErrorExceptionResult<EstateAccountAgencyModel>();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  dataModelEnumRecordStatusResult: ErrorExceptionResult<EnumInfoModel> = new ErrorExceptionResult<EnumInfoModel>();
  cmsApiStoreSubscribe: Subscription;
  checkingOnDayRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit(): void {
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());

    var lStorlinkCmsUserId = this.publicHelper.getComponentLocalStorageMap(this.constructor.name, 'linkCmsUserId');
    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {
      this.linkCmsUserId = next.userId;
      if (Number.isFinite(lStorlinkCmsUserId) && +lStorlinkCmsUserId >= 0)
        this.linkCmsUserId = +lStorlinkCmsUserId;
      this.onActionbuttonOnDateSearch();
      //this.singlarService.login(next.token);
    });
    if (this.tokenHelper?.tokenInfo?.userId > 0) {
      this.linkCmsUserId = this.tokenHelper.tokenInfo.userId
      //this.singlarService.login(this.tokenHelper.tokenInfo.token);
    }
    if (Number.isFinite(lStorlinkCmsUserId) && +lStorlinkCmsUserId >= 0)
      this.linkCmsUserId = +lStorlinkCmsUserId;


    this.onActionbuttonOnDateSearch();
  }
  DataGetAllProperty(): void {
    const pName = this.constructor.name + 'DataGetAllProperty';

    let filterModelOnDay = new EstatePropertyFilterModel();
    // filterModelOnDay = filterModel;
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    filterModelOnDay.onDateTimeFrom = this.checkingOnDayRange.controls.start.value;
    filterModelOnDay.onDateTimeTo = this.checkingOnDayRange.controls.end.value;
    filterModelOnDay.countLoad = true;
    filterModelOnDay.linkResponsibleUserId = this.linkCmsUserId;
    this.loading.Start(pName);
    /** Search On Select Day */
    this.estatePropertyService.ServiceGetAll(filterModelOnDay).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelPropertyResult = ret;
          this.loading.Stop(pName);
        }
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.loading.Stop(pName);
        }
      }
    }
    );
  }
  DataGetAllCustomerOrder(): void {
    const pName = this.constructor.name + 'DataGetAllCustomerOrder';
    let filterModelOnDay = new EstateCustomerOrderFilterModel();
    // filterModelOnDay = filterModel;
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    filterModelOnDay.onDateTimeFrom = this.checkingOnDayRange.controls.start.value;
    filterModelOnDay.onDateTimeTo = this.checkingOnDayRange.controls.end.value;
    filterModelOnDay.countLoad = true;
    filterModelOnDay.linkResponsibleUserId = this.linkCmsUserId;
    this.loading.Start(pName);
    /** Search On Select Day */
    this.estateCustomerOrderService.ServiceGetAll(filterModelOnDay).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelCustomerOrderResult = ret;
          this.loading.Stop(pName);
        }
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.loading.Stop(pName);
        }
      }
    }
    );
  }
  DataGetAllPropertyHistory(): void {
    const pName = this.constructor.name + 'DataGetAllPropertyHistory';

    let filterModelOnDay = new EstatePropertyHistoryFilterModel();
    // filterModelOnDay = filterModel;
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    filterModelOnDay.onDateTimeFrom = this.checkingOnDayRange.controls.start.value;
    filterModelOnDay.onDateTimeTo = this.checkingOnDayRange.controls.end.value;
    filterModelOnDay.countLoad = true;
    filterModelOnDay.linkResponsibleUserId = this.linkCmsUserId;
    this.loading.Start(pName);
    /** Search On Select Day */
    this.estatePropertyHistoryService.ServiceGetAll(filterModelOnDay).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelHistoryResult = ret;
          this.loading.Stop(pName);
        }
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.loading.Stop(pName);
        }
      }
    }
    );
  }

  DataGetAllAccountUser(): void {
    const pName = this.constructor.name + 'DataGetAllAccountUser';

    let filterModelOnDay = new EstateAccountUserFilterModel();
    // filterModelOnDay = filterModel;
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    filterModelOnDay.onDateTimeFrom = this.checkingOnDayRange.controls.start.value;
    filterModelOnDay.onDateTimeTo = this.checkingOnDayRange.controls.end.value;
    filterModelOnDay.countLoad = true;
    filterModelOnDay.linkResponsibleUserId = this.linkCmsUserId;
    this.loading.Start(pName);
    /** Search On Select Day */
    this.estateAccountUserService.ServiceGetAll(filterModelOnDay).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelAccountUserResult = ret;
          this.loading.Stop(pName);
        }
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.loading.Stop(pName);
        }
      }
    }
    );
  }

  DataGetAllAccountAgency(): void {
    const pName = this.constructor.name + 'DataGetAllAccountAgency';

    let filterModelOnDay = new EstateAccountAgencyFilterModel();
    // filterModelOnDay = filterModel;
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    filterModelOnDay.onDateTimeFrom = this.checkingOnDayRange.controls.start.value;
    filterModelOnDay.onDateTimeTo = this.checkingOnDayRange.controls.end.value;
    filterModelOnDay.countLoad = true;
    filterModelOnDay.linkResponsibleUserId = this.linkCmsUserId;
    this.loading.Start(pName);
    /** Search On Select Day */
    this.estateAccountAgencyService.ServiceGetAll(filterModelOnDay).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelAccountAgencyResult = ret;
          this.loading.Stop(pName);
        }
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.loading.Stop(pName);
        }
      }
    }
    );
  }

  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
  onActionbuttonOnDateSearch() {

    this.DataGetAllProperty();
    this.DataGetAllCustomerOrder();
    this.DataGetAllPropertyHistory();
    this.DataGetAllAccountUser();
    this.DataGetAllAccountAgency();

  }
  linkCmsUserId = 0;
  onActionSelectorUser(model: CoreUserModel | null): void {
    this.linkCmsUserId = 0;
    if (model && model.id > 0) {
      this.linkCmsUserId = model.id;
    }
    this.publicHelper.setComponentLocalStorageMap(this.constructor.name, 'linkCmsUserId', this.linkCmsUserId);
    this.onActionbuttonOnDateSearch();
  }
  onActionToDay() {
    this.checkingOnDayRange.controls.start.setValue(new Date());
    this.checkingOnDayRange.controls.end.setValue(new Date());
    this.onActionbuttonOnDateSearch();
  }
  onActionNext() {
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    this.checkingOnDayRange.controls.start.setValue(this.addDays(this.checkingOnDayRange.controls.start.value, 1));
    this.checkingOnDayRange.controls.end.setValue(this.addDays(this.checkingOnDayRange.controls.end.value, 1));
    this.onActionbuttonOnDateSearch();
  }
  onActionPervious() {
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    this.checkingOnDayRange.controls.start.setValue(this.addDays(this.checkingOnDayRange.controls.start.value, -1));
    this.checkingOnDayRange.controls.end.setValue(this.addDays(this.checkingOnDayRange.controls.end.value, -1));
    this.onActionbuttonOnDateSearch();
  }
  addDays(date: Date, days: number): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  onActionbuttonProperty(model: EstatePropertyModel, event?: MouseEvent): void {
    if (!model || !model.id || model.id.length === 0) {
      const message = this.translate.instant('MESSAGE.no_row_selected_to_display');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }
    var nextItem = this.publicHelper.InfoNextRowInList(this.dataModelPropertyResult.listItems, model);
    var perviousItem = this.publicHelper.InfoPerviousRowInList(this.dataModelPropertyResult.listItems, model);
    const dialogRef = this.dialog.open(EstatePropertyQuickViewComponent, {
      height: '90%',
      data: {
        id: model.id,
        perviousItem: perviousItem,
        nextItem: nextItem
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate && result.onActionOpenItem && result.onActionOpenItem.id.length > 0) {
        this.onActionbuttonProperty(result.onActionOpenItem)
      }
    });
  }
  onActionbuttonCustomerOrder(model: EstateCustomerOrderModel, event?: MouseEvent): void {
    if (!model || !model.id || model.id.length === 0) {
      const message = this.translate.instant('MESSAGE.no_row_selected_to_display');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }

    var nextItem = this.publicHelper.InfoNextRowInList(this.dataModelCustomerOrderResult.listItems, model);
    var perviousItem = this.publicHelper.InfoPerviousRowInList(this.dataModelCustomerOrderResult.listItems, model);
    const dialogRef = this.dialog.open(EstateCustomerOrderQuickViewComponent, {
      height: '90%',
      data: {
        id: model.id,
        perviousItem: perviousItem,
        nextItem: nextItem
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate && result.onActionOpenItem && result.onActionOpenItem.id.length > 0) {
        this.onActionbuttonCustomerOrder(result.onActionOpenItem)
      }
    });
  }

  onActionbuttonHistory(model: EstatePropertyHistoryModel, event?: MouseEvent): void {
    if (!model || !model.id || model.id.length === 0) {
      const message = this.translate.instant('MESSAGE.no_row_selected_to_display');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }

    var nextItem = this.publicHelper.InfoNextRowInList(this.dataModelHistoryResult.listItems, model);
    var perviousItem = this.publicHelper.InfoPerviousRowInList(this.dataModelHistoryResult.listItems, model);
    const dialogRef = this.dialog.open(EstatePropertyHistoryQuickViewComponent, {
      height: '90%',
      data: {
        id: model.id,
        perviousItem: perviousItem,
        nextItem: nextItem
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate && result.onActionOpenItem && result.onActionOpenItem.id.length > 0) {
        this.onActionbuttonHistory(result.onActionOpenItem)
      }
    });
  }
  onActionbuttonAccountAgency(model: EstateAccountAgencyModel, event?: MouseEvent): void {
    if (!model || !model.id || model.id.length === 0) {
      const message = this.translate.instant('MESSAGE.no_row_selected_to_display');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }

    if (event?.ctrlKey) {
      var link = "/#/estate/account-agency/LinkCustomerOrderId/" + model.id;
      window.open(link, "_blank");
    } else {
      this.router.navigate(['/estate/account-agency/LinkCustomerOrderId/', model.id]);
    }
  }
  onActionbuttonAccountUser(model: EstateAccountUserModel, event?: MouseEvent): void {
    if (!model || !model.id || model.id.length === 0) {
      const message = this.translate.instant('MESSAGE.no_row_selected_to_display');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }

    if (event?.ctrlKey) {
      var link = "/#/estate/account-user/LinkCustomerOrderId/" + model.id;
      window.open(link, "_blank");
    } else {
      this.router.navigate(['/estate/account-user/LinkCustomerOrderId/', model.id]);
    }
  }
}


