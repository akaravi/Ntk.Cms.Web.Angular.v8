
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService, CoreSiteService, ErrorExceptionResult, EstateAdsTypeModel, EstateAdsTypeService, FilterModel, InfoEnumModel, TokenInfoModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsBankpaymentTransactionInfoComponent } from 'src/app/shared/cms-bankpayment-transaction-info/cms-bankpayment-transaction-info.component';
import { EstateAccountAgencyAdsSalePaymentComponent } from '../sale-payment/sale-payment.component';

@Component({
  selector: 'app-estate-account-agency-ads-salelist',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class EstateAccountAgencyAdsSaleListComponent implements OnInit, OnDestroy {
  requestLinkAccountAgencyId = '';
  constructor(
    private estateAdsTypeService: EstateAdsTypeService,
    public publicHelper: PublicHelper,
    private cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    private coreSiteService: CoreSiteService,
    private tokenHelper: TokenHelper,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
    this.loading.cdr = this.cdr; this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    this.requestLinkAccountAgencyId = this.activatedRoute.snapshot.paramMap.get('LinkAccountAgencyId');
  }
  showBuy = false;
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];
  dataModelResult: ErrorExceptionResult<EstateAdsTypeModel> = new ErrorExceptionResult<EstateAdsTypeModel>();
  tokenInfo = new TokenInfoModel();
  loading = new ProgressSpinnerModel();
  tableRowSelected: EstateAdsTypeModel = new EstateAdsTypeModel();
  categoryModelSelected: EstateAdsTypeModel = new EstateAdsTypeModel();
  dataModelEnumCmsModuleSaleItemTypeResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();

  tabledisplayedColumns: string[] = [
    'LinkModuleId',
    'EnumCmsModuleSaleItemType',
    'FromDate',
    'ExpireDate',
  ];



  // expandedElement: CoreModuleSaleItemModel | null;
  cmsApiStoreSubscribe: Subscription;
  currency = '';

  ngOnInit(): void {
    if (!this.requestLinkAccountAgencyId || this.requestLinkAccountAgencyId.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.router.navigate(['/estate/account-agency']);
      return;
    }
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
    });

    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {

      this.tokenInfo = next;
    });
    // this.getEnumCmsModuleSaleItemType();

    this.DataGetAll();
    this.DataGetCurrency();
    //**بررسی تراکنش از قبل */
    const transactionId = + localStorage.getItem('TransactionId') | 0;
    if (transactionId > 0) {
      var panelClass = '';
      if (this.tokenHelper.isMobile)
        panelClass = 'fullscreen-dialog';
         else
        panelClass = 'dialog-min';
      const dialogRef = this.dialog.open(CmsBankpaymentTransactionInfoComponent, {
        panelClass: panelClass,
        data: {
          id: transactionId,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.dialogChangedDate) {
          localStorage.removeItem('TransactionId');
        }
      });
    }
    //**بررسی تراکنش از قبل */
  }

  DataGetCurrency(): void {
    this.coreSiteService.ServiceGetCurrencyMaster().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.currency = ret.item;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
      }
    }
    );
  }

  getEnumCmsModuleSaleItemType(): void {
    this.coreEnumService.ServiceCmsModuleSaleItemTypeEnum().subscribe((next) => {
      this.dataModelEnumCmsModuleSaleItemTypeResult = next;
    });
  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
  DataGetAll(): void {
    this.tableRowSelected = new EstateAdsTypeModel();
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);



    this.showBuy = false;
    const model = new FilterModel();
    this.estateAdsTypeService.ServiceGetAllSale(model).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.showBuy = true;
          this.dataModelResult = ret;
        }
        else {
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

  onActionbuttonBuy(model: EstateAdsTypeModel): void {
    this.tableRowSelected = model;
    var panelClass = '';
    if (this.tokenHelper.isMobile)
      panelClass = 'fullscreen-dialog';
	     else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstateAccountAgencyAdsSalePaymentComponent, {
      height: '90%',
      panelClass: panelClass,
      data: {
        linkAccountAgencyId: this.requestLinkAccountAgencyId,
        linkAdsTypeId: model.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {

      }
    });
  }

  onActionBackToParent(): void {

    this.router.navigate(['/estate/account-agency-ads/LinkPropertyId/' + this.requestLinkAccountAgencyId]);

  }
}
