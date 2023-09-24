import { ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreLogNotificationModel, CoreLogNotificationService, CoreTokenUserLogModel, CoreTokenUserLogService, CoreTokenUserModel, CoreTokenUserService, ErrorExceptionResult, FilterDataModel, FilterModel, SortTypeEnum, TokenInfoModel } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

export type NotificationsTabsType =
  | 'kt_topbar_notifications_1'
  | 'kt_topbar_notifications_2'
  | 'kt_topbar_notifications_3';

@Component({
  selector: 'app-notifications-inner',
  templateUrl: './notifications-inner.component.html',
})
export class NotificationsInnerComponent implements OnInit {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  activeTabId: NotificationsTabsType = 'kt_topbar_notifications_2';
  alerts: Array<AlertModel> = defaultAlerts;
  logs: Array<LogModel> = defaultLogs;
  constructor(
    public coreLogNotificationService: CoreLogNotificationService,
    public coreTokenUserLogService: CoreTokenUserLogService,
    public coreTokenUserService: CoreTokenUserService,
    private cdr: ChangeDetectorRef,
    private cmsToastrService: CmsToastrService,
    public translate: TranslateService,
    private tokenHelper: TokenHelper,

  ) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
      this.CoreTokenUserLogDataGetAll();
      this.CoreTokenUserDataGetAll();
      this.CoreLogNotificationDataGetAll();
    });

    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {
      this.tokenInfo = next;
      this.CoreTokenUserLogDataGetAll();
      this.CoreTokenUserDataGetAll();
      this.CoreLogNotificationDataGetAll();
    });
  }
  tokenInfo = new TokenInfoModel();
  cmsApiStoreSubscribe: Subscription;

  ngOnInit(): void {
    // this.CoreTokenUserLogDataGetAll();
    // this.CoreTokenUserDataGetAll();
    // this.CoreLogNotificationDataGetAll();
  }

  setActiveTabId(tabId: NotificationsTabsType) {
    this.activeTabId = tabId;
  }
  loading = new ProgressSpinnerModel();
  coreTokenUserLogDataModelResult: ErrorExceptionResult<CoreTokenUserLogModel> = new ErrorExceptionResult<CoreTokenUserLogModel>();
  coreTokenUserDataModelResult: ErrorExceptionResult<CoreTokenUserModel> = new ErrorExceptionResult<CoreTokenUserModel>();
  coreLogNotificationDataModelResult: ErrorExceptionResult<CoreLogNotificationModel> = new ErrorExceptionResult<CoreLogNotificationModel>();
  CoreLogNotificationDataGetAll(): void {
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName, this.translate.instant('MESSAGE.get_information_list'));
    this.coreLogNotificationService.ServiceGetAllEditor(null).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.coreLogNotificationDataModelResult = ret;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);

        this.loading.Stop(pName);
      }
    }
    );
  }

  CoreTokenUserLogDataGetAll(): void {
    const pName = this.constructor.name + 'CoreTokenUserLogDataGetAll';
    this.loading.Start(pName, this.translate.instant('MESSAGE.get_information_list'));

    /*filter Sort*/
    var filteModelContent = new FilterModel();
    filteModelContent.sortColumn = 'Id';
    filteModelContent.sortType = SortTypeEnum.Descending;
    this.coreTokenUserLogService.ServiceGetAllEditor(filteModelContent).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.coreTokenUserLogDataModelResult = ret;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);

        this.loading.Stop(pName);
      }
    }
    );
  }



  CoreTokenUserDataGetAll(): void {
    const pName = this.constructor.name + 'CoreTokenUserDataGetAll';
    this.loading.Start(pName, this.translate.instant('MESSAGE.get_information_list'));

    /*filter Sort*/
    var filteModelContent = new FilterModel();
    filteModelContent.sortColumn = 'Id';
    filteModelContent.sortType = SortTypeEnum.Descending;
    if (this.tokenInfo?.userId > 0) {
      var filterData = new FilterDataModel();
      filterData.propertyName = 'linkUserId';
      filterData.value = this.tokenInfo.userId;
      filteModelContent.filters = [];
      filteModelContent.filters.push(filterData);
    }
    this.coreTokenUserService.ServiceGetAllEditor(filteModelContent).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.coreTokenUserDataModelResult = ret;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);

        this.loading.Stop(pName);
      }
    }
    );
  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
}

interface AlertModel {
  title: string;
  description: string;
  time: string;
  icon: string;
  state: 'primary' | 'danger' | 'warning' | 'success' | 'info';
}

const defaultAlerts: Array<AlertModel> = [
  {
    title: 'Project Alice',
    description: 'Phase 1 development',
    time: '1 hr',
    icon: 'icons/duotune/technology/teh008.svg',
    state: 'primary',
  },
  {
    title: 'HR Confidential',
    description: 'Confidential staff documents',
    time: '2 hrs',
    icon: 'icons/duotune/general/gen044.svg',
    state: 'danger',
  },
  {
    title: 'Company HR',
    description: 'Corporeate staff profiles',
    time: '5 hrs',
    icon: 'icons/duotune/finance/fin006.svg',
    state: 'warning',
  },
  {
    title: 'Project Redux',
    description: 'New frontend admin theme',
    time: '2 days',
    icon: 'icons/duotune/files/fil023.svg',
    state: 'success',
  },
  {
    title: 'Project Breafing',
    description: 'Product launch status update',
    time: '21 Jan',
    icon: 'icons/duotune/maps/map001.svg',
    state: 'primary',
  },
  {
    title: 'Banner Assets',
    description: 'Collection of banner images',
    time: '21 Jan',
    icon: 'icons/duotune/general/gen006.svg',
    state: 'info',
  },
  {
    title: 'Icon Assets',
    description: 'Collection of SVG icons',
    time: '20 March',
    icon: 'icons/duotune/art/art002.svg',
    state: 'warning',
  },
];

interface LogModel {
  code: string;
  state: 'success' | 'danger' | 'warning';
  message: string;
  time: string;
}

const defaultLogs: Array<LogModel> = [
  { code: '200 OK', state: 'success', message: 'New order', time: 'Just now' },
  { code: '500 ERR', state: 'danger', message: 'New customer', time: '2 hrs' },
  {
    code: '200 OK',
    state: 'success',
    message: 'Payment process',
    time: '5 hrs',
  },
  {
    code: '300 WRN',
    state: 'warning',
    message: 'Search query',
    time: '2 days',
  },
  {
    code: '200 OK',
    state: 'success',
    message: 'API connection',
    time: '1 week',
  },
  {
    code: '200 OK',
    state: 'success',
    message: 'Database restore',
    time: 'Mar 5',
  },
  {
    code: '300 WRN',
    state: 'warning',
    message: 'System update',
    time: 'May 15',
  },
  {
    code: '300 WRN',
    state: 'warning',
    message: 'Server OS update',
    time: 'Apr 3',
  },
  {
    code: '300 WRN',
    state: 'warning',
    message: 'API rollback',
    time: 'Jun 30',
  },
  {
    code: '500 ERR',
    state: 'danger',
    message: 'Refund process',
    time: 'Jul 10',
  },
  {
    code: '500 ERR',
    state: 'danger',
    message: 'Withdrawal process',
    time: 'Sep 10',
  },
  { code: '500 ERR', state: 'danger', message: 'Mail tasks', time: 'Dec 10' },
];
