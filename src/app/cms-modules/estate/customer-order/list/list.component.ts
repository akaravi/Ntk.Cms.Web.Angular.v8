
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  DataFieldInfoModel, EnumRecordStatus, EnumSortType,
  ErrorExceptionResult, EstateCustomerOrderModel,
  EstateCustomerOrderService, FilterDataModel, FilterModel,
  TokenInfoModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout/core/page-info.service';
import { ComponentOptionSearchModel } from 'src/app/core/cmsComponent/base/componentOptionSearchModel';
import { ComponentOptionStatistModel } from 'src/app/core/cmsComponent/base/componentOptionStatistModel';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ContentInfoModel } from 'src/app/core/models/contentInfoModel';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { CmsExportEntityComponent } from 'src/app/shared/cms-export-entity/cms-export-entity.component';
import { CmsExportListComponent } from 'src/app/shared/cms-export-list/cmsExportList.component';
import { CmsLinkToComponent } from "src/app/shared/cms-link-to/cms-link-to.component";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-estate-customer-order-list',
  templateUrl: './list.component.html',
  styleUrls: ["./list.component.scss"],
})
export class EstateCustomerOrderListComponent implements OnInit, OnDestroy {
  constructor(
    public contentService: EstateCustomerOrderService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    public publicHelper: PublicHelper,
    private cmsToastrService: CmsToastrService,
    private tokenHelper: TokenHelper,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private pageInfo: PageInfoService) {
    pageInfo.updateContentService(contentService);
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    this.responsibleUserId = +this.activatedRoute.snapshot.paramMap.get('ResponsibleUserId');
    this.recordStatus = EnumRecordStatus[this.activatedRoute.snapshot.paramMap.get('RecordStatus') + ''];
    if (this.recordStatus) {
      this.optionsSearch.data.show = true;
      this.optionsSearch.data.defaultQuery = '{"condition":"and","rules":[{"field":"RecordStatus","type":"select","operator":"equal","value":"' + this.recordStatus + '"}]}';
      this.recordStatus = null;
    }
    /*filter Sort*/
    this.filteModelContent.sortColumn = 'CreatedDate';
    this.filteModelContent.sortType = EnumSortType.Descending;

  }
  recordStatus: EnumRecordStatus;
  responsibleUserId = 0;
  searchInResponsible = false;
  searchInResponsibleChecked = false;
  link: string;
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];
  filteModelContent = new FilterModel();
  dataModelResult: ErrorExceptionResult<EstateCustomerOrderModel> = new ErrorExceptionResult<EstateCustomerOrderModel>();
  optionsSearch: ComponentOptionSearchModel = new ComponentOptionSearchModel();
  optionsStatist: ComponentOptionStatistModel = new ComponentOptionStatistModel();

  tokenInfo = new TokenInfoModel();
  loading = new ProgressSpinnerModel();
  tableRowsSelected: Array<EstateCustomerOrderModel> = [];
  tableRowSelected: EstateCustomerOrderModel = new EstateCustomerOrderModel();
  tableSource: MatTableDataSource<EstateCustomerOrderModel> = new MatTableDataSource<EstateCustomerOrderModel>();
  tabledisplayedColumns: string[] = [];
  categoryModelSelected: EstateCustomerOrderModel;

  tabledisplayedColumnsSource: string[] = [
    'Id',
    'LinkSiteId',
    'RecordStatus',
    'Title',
    'CreatedDate',
    'UpdatedDate',
    'scoreRushToBuy',
    'scorePurchaseDecision',
    'scoreLiquidityPower',
    'scorePurchasingPower',
    "CaseCode",
    'Action',
    "LinkTo",
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    'Title',
    'RecordStatus',
    "CaseCode",
    'Action',
    "LinkTo",
  ];
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  expandedElement: EstateCustomerOrderModel | null;
  cmsApiStoreSubscribe: Subscription;
  ngOnInit(): void {
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
      if (!this.tokenHelper.isAdminSite && !this.tokenHelper.isSupportSite) {
        this.tabledisplayedColumnsSource = this.publicHelper.listRemoveIfExist(this.tabledisplayedColumnsSource, 'scoreRushToBuy');
        this.tabledisplayedColumnsSource = this.publicHelper.listRemoveIfExist(this.tabledisplayedColumnsSource, 'scorePurchaseDecision');
        this.tabledisplayedColumnsSource = this.publicHelper.listRemoveIfExist(this.tabledisplayedColumnsSource, 'scoreLiquidityPower');
        this.tabledisplayedColumnsSource = this.publicHelper.listRemoveIfExist(this.tabledisplayedColumnsSource, 'scorePurchasingPower');
      }
      this.DataGetAll();
    });
    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {
      this.tokenInfo = next;
      if (!this.tokenHelper.isAdminSite && this.tokenHelper.isSupportSite) {
        this.tabledisplayedColumnsSource = this.publicHelper.listRemoveIfExist(this.tabledisplayedColumnsSource, 'scoreRushToBuy');
        this.tabledisplayedColumnsSource = this.publicHelper.listRemoveIfExist(this.tabledisplayedColumnsSource, 'scorePurchaseDecision');
        this.tabledisplayedColumnsSource = this.publicHelper.listRemoveIfExist(this.tabledisplayedColumnsSource, 'scoreLiquidityPower');
        this.tabledisplayedColumnsSource = this.publicHelper.listRemoveIfExist(this.tabledisplayedColumnsSource, 'scorePurchasingPower');
      }
      this.DataGetAll();
    });
  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
  DataGetAll(): void {

    this.tabledisplayedColumns = this.publicHelper.TableDisplayedColumns(this.tabledisplayedColumnsSource, this.tabledisplayedColumnsMobileSource, [], this.tokenInfo);
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new EstateCustomerOrderModel());
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName, this.translate.instant('MESSAGE.get_information_list'));
    this.filteModelContent.accessLoad = true;
    /*filter CLone*/
    const filterModel = JSON.parse(JSON.stringify(this.filteModelContent));
    /*filter CLone*/
    /** filter Category */
    if (this.categoryModelSelected && this.categoryModelSelected.id.length > 0) {
      const filterChild = new FilterDataModel();
      filterChild.propertyName = 'linkEstateCustomerCategoryId';
      filterChild.value = this.categoryModelSelected.id;
      filterModel.filters.push(filterChild);
    }
    /** filter Category */
    var setResponsibleUserId = 0;
    if (this.searchInResponsible) {
      setResponsibleUserId = this.tokenInfo.userId;
    } else if (this.responsibleUserId > 0) {
      setResponsibleUserId = this.responsibleUserId;
    }
    if (setResponsibleUserId > 0) {
      /** ResponsibleUserId  */
      this.contentService.ServiceGetAllWithResponsibleUserId(setResponsibleUserId, filterModel).subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          if (ret.isSuccess) {
            this.dataModelResult = ret;
            this.tableSource.data = ret.listItems;

            if (this.optionsSearch.childMethods) {
              this.optionsSearch.childMethods.setAccess(ret.access);
            }
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
      /** ResponsibleUserId  */
    } else {
      /** GetAllEditor  */
      this.contentService.ServiceGetAllEditor(filterModel).subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          if (ret.isSuccess) {
            this.dataModelResult = ret;
            this.tableSource.data = ret.listItems;

            if (this.optionsSearch.childMethods) {
              this.optionsSearch.childMethods.setAccess(ret.access);
            }
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
      /** GetAllEditor  */
    }
  }
  onTableSortData(sort: MatSort): void {
    if (this.tableSource && this.tableSource.sort && this.tableSource.sort.active === sort.active) {
      if (this.tableSource.sort.start === 'asc') {
        sort.start = 'desc';
        this.filteModelContent.sortColumn = sort.active;
        this.filteModelContent.sortType = EnumSortType.Descending;
      } else if (this.tableSource.sort.start === 'desc') {
        sort.start = 'asc';
        this.filteModelContent.sortColumn = '';
        this.filteModelContent.sortType = EnumSortType.Ascending;
      } else {
        sort.start = 'desc';
      }
    } else {
      this.filteModelContent.sortColumn = sort.active;
      this.filteModelContent.sortType = EnumSortType.Ascending;
    }
    this.tableSource.sort = sort;
    this.filteModelContent.currentPageNumber = 0;
    this.DataGetAll();
  }
  onTablePageingData(event?: PageEvent): void {
    this.filteModelContent.currentPageNumber = event.pageIndex + 1;
    this.filteModelContent.rowPerPage = event.pageSize;
    this.DataGetAll();
  }
  onActionbuttonNewRow(event?: MouseEvent): void {
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessAddRow
    ) {
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }
    if (this.categoryModelSelected && this.categoryModelSelected.id && this.categoryModelSelected.id.length > 0) {
      this.router.navigate(['/estate/customer-order/add/LinkParentId', this.categoryModelSelected.id]);
      if (event?.ctrlKey) {
        this.link = "/#/estate/customer-order/add/LinkParentId/" + this.tableRowSelected.id;
        window.open(this.link, "_blank");
      } else {
        this.router.navigate(['/estate/customer-order/add/LinkParentId', this.categoryModelSelected.id]);
      }
    }
    else {
      if (event?.ctrlKey) {
        this.link = "/#/estate/customer-order/add/";
        window.open(this.link, "_blank");
      } else {
        this.router.navigate(['/estate/customer-order/add']);
      }
    }
  }
  onActionbuttonCopyNewRow(model: EstateCustomerOrderModel = this.tableRowSelected, event?: MouseEvent): void {
    if (!model || !model.id || model.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.onActionTableRowSelect(model);


    if (event?.ctrlKey) {
      this.link = "/#/estate/customer-order/add-copy/" + this.tableRowSelected.id;
      window.open(this.link, "_blank");
    } else {
      this.router.navigate(['/estate/customer-order/add-copy', this.tableRowSelected.id]);
    }
  }
  onActionbuttonEditRow(model: EstateCustomerOrderModel = this.tableRowSelected, event?: MouseEvent): void {
    if (!model || !model.id || model.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.onActionTableRowSelect(model);
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessEditRow
    ) {
      this.cmsToastrService.typeErrorAccessEdit();
      return;
    }

    if (event?.ctrlKey) {
      this.link = "/#/estate/customer-order/edit/" + this.tableRowSelected.id;
      window.open(this.link, "_blank");
    } else {
      this.router.navigate(['/estate/customer-order/edit', this.tableRowSelected.id]);
    }
  }
  onActionbuttonDeleteRow(model: EstateCustomerOrderModel = this.tableRowSelected): void {
    if (!model || !model.id || model.id.length === 0) {
      const emessage = this.translate.instant('MESSAGE.no_row_selected_to_delete');
      this.cmsToastrService.typeErrorSelected(emessage);
      return;
    }
    this.onActionTableRowSelect(model);

    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessDeleteRow
    ) {
      this.cmsToastrService.typeErrorAccessDelete();
      return;
    }
    const title = this.translate.instant('MESSAGE.Please_Confirm');
    const message = this.translate.instant('MESSAGE.Do_you_want_to_delete_this_content') + '?' + '<br> ( ' + this.tableRowSelected.title + ' ) ';
    this.cmsConfirmationDialogService.confirm(title, message)
      .then((confirmed) => {
        if (confirmed) {
          const pName = this.constructor.name + 'main';
          this.loading.Start(pName);
          this.contentService.ServiceDelete(this.tableRowSelected.id).subscribe({
            next: (ret) => {
              if (ret.isSuccess) {
                this.cmsToastrService.typeSuccessRemove();
                this.DataGetAll();
              } else {
                this.cmsToastrService.typeErrorRemove();
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
      }
      )
      .catch(() => {
        // console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      }
      );
  }
  onActionbuttonHistoryRow(
    mode: EstateCustomerOrderModel = this.tableRowSelected, event?: MouseEvent
  ): void {
    if (!mode || !mode.id || mode.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.onActionTableRowSelect(mode);
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessEditRow
    ) {
      this.cmsToastrService.typeErrorAccessEdit();
      return;
    }

    if (event?.ctrlKey) {
      this.link = "/#/estate/property-history/LinkCustomerOrderId/" + this.tableRowSelected.id;
      window.open(this.link, "_blank");
    } else {
      this.router.navigate(["/estate/property-history/LinkCustomerOrderId", this.tableRowSelected.id]);
    }
  }
  onActionbuttonOpenCustomerOrder(model: EstateCustomerOrderModel = this.tableRowSelected): void {
    if (!model || !model.id || model.id.length === 0) {
      const message = this.translate.instant('MESSAGE.no_row_selected_to_display');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }
    this.onActionTableRowSelect(model);
    window.open(this.tableRowSelected.urlViewContent, '_blank');
  }
  onActionbuttonContentList(model: EstateCustomerOrderModel = this.tableRowSelected, event?: MouseEvent): void {
    if (!model || !model.id || model.id.length === 0) {
      const message = this.translate.instant('MESSAGE.no_row_selected_to_display');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }
    this.onActionTableRowSelect(model);


    if (event?.ctrlKey) {
      this.link = "/#/estate/property/LinkCustomerOrderId/" + this.tableRowSelected.id;
      window.open(this.link, "_blank");
    } else {
      this.router.navigate(['/estate/property/LinkCustomerOrderId/', this.tableRowSelected.id]);
    }
  }
  onActionbuttonStatist(): void {
    this.optionsStatist.data.show = !this.optionsStatist.data.show;
    if (!this.optionsStatist.data.show) {
      return;
    }
    const statist = new Map<string, number>();
    statist.set(this.translate.instant('MESSAGE.Active'), 0);
    statist.set(this.translate.instant('MESSAGE.All'), 0);
    const pName = this.constructor.name + '.ServiceStatist';
    this.loading.Start(pName, this.translate.instant('MESSAGE.Get_the_statist'));
    this.contentService.ServiceGetCount(this.filteModelContent).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          statist.set(this.translate.instant('MESSAGE.All'), ret.totalRowCount);
          this.optionsStatist.childMethods.setStatistValue(statist);
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
    const filterStatist1 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter = new FilterDataModel();
    fastfilter.propertyName = 'RecordStatus';
    fastfilter.value = EnumRecordStatus.Available;
    filterStatist1.filters.push(fastfilter);
    this.contentService.ServiceGetCount(filterStatist1).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          statist.set(this.translate.instant('MESSAGE.Active'), ret.totalRowCount);
          this.optionsStatist.childMethods.setStatistValue(statist);
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
  onActionbuttonExport(): void {
    //open popup
    const dialogRef = this.dialog.open(CmsExportListComponent, {
      height: "50%",
      width: "50%",
      data: {
        service: this.contentService,
        filterModel: this.filteModelContent,
        title: ''
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
    });
    //open popup

  }
  onActionbuttonInResponsible(model: boolean): void {
    this.searchInResponsible = model;
    this.DataGetAll();
  }

  onActionButtonPrintEntity(model: any = this.tableRowSelected): void {
    if (!model || !model.id || model.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.onActionTableRowSelect(model);
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessEditRow
    ) {
      this.cmsToastrService.typeErrorAccessWatch();
      return;
    }
    //open popup
    const dialogRef = this.dialog.open(CmsExportEntityComponent, {
      height: "50%",
      width: "50%",
      data: {
        service: this.contentService,
        id: this.tableRowSelected.id,
        title: this.tableRowSelected.title
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
    });
    //open popup
  }

  onActionSelectorSelect(model: EstateCustomerOrderModel | null): void {
    /*filter */
    var sortColumn = this.filteModelContent.sortColumn;
    var sortType = this.filteModelContent.sortType;
    /*filter */
    var sortColumn = this.filteModelContent.sortColumn;
    var sortType = this.filteModelContent.sortType;
    this.filteModelContent = new FilterModel();
    this.filteModelContent.sortColumn = sortColumn;
    this.filteModelContent.sortType = sortType;
    /*filter */
    this.filteModelContent.sortColumn = sortColumn;
    this.filteModelContent.sortType = sortType;
    /*filter */
    this.categoryModelSelected = model;
    this.DataGetAll();
  }
  onActionbuttonReload(): void {
    this.DataGetAll();
  }
  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
  onSubmitOptionsSearch(model: any): void {
    this.filteModelContent.filters = model;
    this.DataGetAll();
  }
  onActionTableRowSelect(row: EstateCustomerOrderModel): void {
    this.tableRowSelected = row;
    this.pageInfo.updateContentInfo(new ContentInfoModel(row.id, row.title, false, '', row.urlViewContent));
    row["expanded"] = true;
  }
  onActionTableRowMouseClick(row: EstateCustomerOrderModel): void {
    if (this.tableRowSelected.id === row.id) {
      row["expanded"] = false;
      this.onActionTableRowSelect(new EstateCustomerOrderModel());
      this.pageInfo.updateContentInfo(new ContentInfoModel('', '', false, '', ''));
    } else {
      this.onActionTableRowSelect(row);
      row["expanded"] = true;
    }
  }
  onActionTableRowMouseEnter(row: EstateCustomerOrderModel): void {
    if (!environment.cmsViewConfig.tableRowMouseEnter)
      return;
    row["expanded"] = true;
  }
  onActionTableRowMouseLeave(row: EstateCustomerOrderModel): void {
    if (!environment.cmsViewConfig.tableRowMouseEnter)
      return;
    if (!this.tableRowSelected || this.tableRowSelected.id !== row.id)
      row["expanded"] = false;
  }
  onActionbuttonLinkTo(
    model: EstateCustomerOrderModel = this.tableRowSelected
  ): void {
    if (!model || !model.id || model.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (model.recordStatus != EnumRecordStatus.Available) {
      this.cmsToastrService.typeWarningRecordStatusNoAvailable();
      return;
    }
    this.onActionTableRowSelect(model);

    const pName = this.constructor.name + "ServiceGetOneById";
    this.loading.Start(pName, this.translate.instant('MESSAGE.get_customer_information'));
    this.contentService
      .ServiceGetOneById(this.tableRowSelected.id)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            //open poup
            const dialogRef = this.dialog.open(CmsLinkToComponent, {
              height: "90%",
              width: "90%",
              data: {
                title: ret.item.title,
                urlViewContentQRCodeBase64: ret.item.urlViewContentQRCodeBase64,
                urlViewContent: ret.item.urlViewContent,
              },
            });
            dialogRef.afterClosed().subscribe((result) => {
              if (result && result.dialogChangedDate) {
                this.DataGetAll();
              }
            });
            //open poup
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
  onActionGridExpandRows(flag: boolean) {
    this.tableSource.data.forEach(row => {
      row['expanded'] = flag;
    })
  }
}
