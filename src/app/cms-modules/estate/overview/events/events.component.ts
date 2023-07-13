import {
  ChangeDetectorRef, Component,
  OnDestroy, OnInit
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  DataFieldInfoModel, EnumInfoModel,
  ErrorExceptionResult,
  EstateCustomerOrderFilterModel,
  EstateCustomerOrderModel,
  EstateCustomerOrderService,
  EstatePropertyFilterModel,
  EstatePropertyHistoryFilterModel,
  EstatePropertyHistoryModel,
  EstatePropertyHistoryService,
  EstatePropertyModel,
  EstatePropertyService,
  EstatePropertyTypeUsageModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
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
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsToastrService: CmsToastrService,
    public dialog: MatDialog,
    public translate: TranslateService,
    public tokenHelper: TokenHelper
  ) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
  }
  loading = new ProgressSpinnerModel();
  dataModelResult: ErrorExceptionResult<EstatePropertyTypeUsageModel> = new ErrorExceptionResult<EstatePropertyTypeUsageModel>();
  dataModelPropertyResult: ErrorExceptionResult<EstatePropertyModel> = new ErrorExceptionResult<EstatePropertyModel>();
  dataModelCustomerOrderResult: ErrorExceptionResult<EstateCustomerOrderModel> = new ErrorExceptionResult<EstateCustomerOrderModel>();
  dataModelHistoryResult: ErrorExceptionResult<EstatePropertyHistoryModel> = new ErrorExceptionResult<EstatePropertyHistoryModel>();
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
    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {

    });
  }
  DataGetAllProperty(): void {
    const pName = this.constructor.name + 'main';

    let filterModelOnDay = new EstatePropertyFilterModel();
    // filterModelOnDay = filterModel;
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    // filterModelOnDay.onDateTimeFrom = this.checkingOnDayRange.controls.start.value;
    // filterModelOnDay.onDateTimeTo = this.checkingOnDayRange.controls.end.value;

    /** Search On Select Day */
    this.estatePropertyService.ServiceGetAll(filterModelOnDay).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelPropertyResult = ret;
          console.log(this.dataModelPropertyResult);

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
    const pName = this.constructor.name + 'main';

    let filterModelOnDay = new EstateCustomerOrderFilterModel();
    // filterModelOnDay = filterModel;
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    // filterModelOnDay.onDateTimeFrom = this.checkingOnDayRange.controls.start.value;
    // filterModelOnDay.onDateTimeTo = this.checkingOnDayRange.controls.end.value;

    /** Search On Select Day */
    this.estateCustomerOrderService.ServiceGetAll(filterModelOnDay).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelCustomerOrderResult = ret;
          console.log(this.dataModelCustomerOrderResult);

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
    const pName = this.constructor.name + 'main';

    let filterModelOnDay = new EstatePropertyHistoryFilterModel();
    // filterModelOnDay = filterModel;
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    filterModelOnDay.onDateTimeFrom = this.checkingOnDayRange.controls.start.value;
    filterModelOnDay.onDateTimeTo = this.checkingOnDayRange.controls.end.value;

    /** Search On Select Day */
    this.estatePropertyHistoryService.ServiceGetAll(filterModelOnDay).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelHistoryResult = ret;
          console.log(this.dataModelHistoryResult);

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
    this.DataGetAllPropertyHistory();
  }
  onActionNext() {
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    this.checkingOnDayRange.controls.start.setValue(this.addDays(this.checkingOnDayRange.controls.start.value, 1));
    this.checkingOnDayRange.controls.end.setValue(this.addDays(this.checkingOnDayRange.controls.end.value, 1));
  }
  onActionPervious() {
    if (!this.checkingOnDayRange.controls.start?.value)
      this.checkingOnDayRange.controls.start.setValue(new Date());
    if (!this.checkingOnDayRange.controls.end?.value)
      this.checkingOnDayRange.controls.end.setValue(new Date());
    this.checkingOnDayRange.controls.start.setValue(this.addDays(this.checkingOnDayRange.controls.start.value, -1));
    this.checkingOnDayRange.controls.end.setValue(this.addDays(this.checkingOnDayRange.controls.end.value, -1));

  }
  addDays(date: Date, days: number): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
}
