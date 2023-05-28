
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  DataFieldInfoModel, EnumInfoModel, EnumRecordStatus, EnumSortType,
  ErrorExceptionResult, EstateActivityTypeModel, EstateActivityTypeService, EstateEnumService, EstatePropertyHistoryModel,
  EstatePropertyHistorySearchDtoModel,
  EstatePropertyHistoryService, FilterDataModel, FilterModel,
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
import { EstatePropertyQuickViewComponent } from '../../property/quick-view/quick-view.component';
import { EstatePropertyHistoryAddComponent } from '../add/add.component';
import { EstatePropertyHistoryEditComponent } from '../edit/edit.component';
import { EstatePropertyHistoryQuickViewComponent } from '../quick-view/quick-view.component';
@Component({
  selector: 'app-estate-property-history-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class EstatePropertyHistoryListComponent implements OnInit, OnDestroy {
  requestLinkPropertyId = '';
  requestLinkEstateUserId = '';
  requestLinkCustomerOrderId = '';
  requestLinkEstateAgencyId = '';

  constructor(
    public contentService: EstatePropertyHistoryService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    public publicHelper: PublicHelper,
    private cmsToastrService: CmsToastrService,
    private estateActivityTypeService: EstateActivityTypeService,
    public estateEnumService: EstateEnumService,
    private tokenHelper: TokenHelper,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public dialog: MatDialog,
    private pageInfo: PageInfoService) {
    pageInfo.updateContentService(contentService);
    this.loading.cdr = this.cdr; this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    this.requestLinkPropertyId = this.activatedRoute.snapshot.paramMap.get('LinkPropertyId');
    this.requestLinkEstateUserId = this.activatedRoute.snapshot.paramMap.get('LinkEstateUserId');
    this.requestLinkCustomerOrderId = this.activatedRoute.snapshot.paramMap.get('LinkCustomerOrderId');
    this.requestLinkEstateAgencyId = this.activatedRoute.snapshot.paramMap.get('LinkEstateAgencyId');
    this.popupAdd = this.activatedRoute.snapshot.paramMap.get('Action')?.toLowerCase() === 'add';

    this.recordStatus = EnumRecordStatus[this.activatedRoute.snapshot.paramMap.get('RecordStatus') + ''];
    if (this.recordStatus) {
      this.optionsSearch.data.show = true;
      this.optionsSearch.data.defaultQuery = '{"condition":"and","rules":[{"field":"RecordStatus","type":"select","operator":"equal","value":"' + this.recordStatus + '"}]}';
      this.recordStatus = null;
    }
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };
    if (this.activatedRoute.snapshot.paramMap.get("InCheckingOnDay")) {
      this.searchInCheckingOnDay = this.activatedRoute.snapshot.paramMap.get("InCheckingOnDay") === "true";
    }
    /*filter Sort*/
    this.filteModelContent.sortColumn = 'CreatedDate';
    this.filteModelContent.sortType = EnumSortType.Descending;

  }
  recordStatus: EnumRecordStatus;
  popupAdd = false;
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];

  filteModelContent = new FilterModel();
  dataModelResult: ErrorExceptionResult<EstatePropertyHistoryModel> = new ErrorExceptionResult<EstatePropertyHistoryModel>();
  dataModelActivityTypeResult: ErrorExceptionResult<EstateActivityTypeModel> = new ErrorExceptionResult<EstateActivityTypeModel>();
  optionsSearch: ComponentOptionSearchModel = new ComponentOptionSearchModel();
  optionsStatist: ComponentOptionStatistModel = new ComponentOptionStatistModel();

  tokenInfo = new TokenInfoModel();
  loading = new ProgressSpinnerModel();
  tableRowsSelected: Array<EstatePropertyHistoryModel> = [];
  tableRowSelected: EstatePropertyHistoryModel = new EstatePropertyHistoryModel();
  tableSource: MatTableDataSource<EstatePropertyHistoryModel> = new MatTableDataSource<EstatePropertyHistoryModel>();
  categoryModelSelected: EstateActivityTypeModel;
  searchInCheckingOnDay = false;
  searchInCheckingOnDayChecked = false;

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    'Id',
    'RecordStatus',
    'Title',
    'CreatedDate',
    'AppointmentDateFrom',
    'AppointmentDateTo',
    'LinkActivityTypeId',
    'ActivityStatus',
    'Action'
  ];

  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();

  dataModelEstateActivityStatusEnumResult: ErrorExceptionResult<EnumInfoModel> = new ErrorExceptionResult<EnumInfoModel>();

  expandedElement: EstatePropertyHistoryModel | null;
  cmsApiStoreSubscribe: Subscription;

  ngOnInit(): void {
    this.filteModelContent.sortColumn = 'CreatedDate';
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
      this.DataGetAll();
    });

    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {
      this.tokenInfo = next;
      this.DataGetAll();
    });
    this.getEstateActivityStatusEnum();
    this.getActivityTypeList();

  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
  ngAfterViewInit(): void {
    if (this.searchInCheckingOnDay) {
      this.searchInCheckingOnDayChecked = true;
    }
  }
  getEstateActivityStatusEnum(): void {
    this.estateEnumService.ServiceEstateActivityStatusEnum().subscribe((next) => {
      this.dataModelEstateActivityStatusEnumResult = next;
    });
  }
  getActivityTypeList(): void {
    const filter = new FilterModel();
    filter.rowPerPage = 100;
    this.estateActivityTypeService.ServiceGetAllEditor(filter).subscribe((next) => {
      this.dataModelActivityTypeResult = next;
    });
  }
  checkingOnDayRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  DataGetAll(): void {
    this.tabledisplayedColumns = this.publicHelper.TabledisplayedColumnsCheckByAllDataAccess(this.tabledisplayedColumnsSource, [], this.tokenInfo);


    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new EstatePropertyHistoryModel());
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName, this.translate.instant('MESSAGE.get_information_list'));
    this.filteModelContent.accessLoad = true;
    /*filter CLone*/
    const filterModel = JSON.parse(JSON.stringify(this.filteModelContent));
    /*filter CLone*/


    if (this.requestLinkPropertyId && this.requestLinkPropertyId.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = 'LinkPropertyId';
      filter.value = this.requestLinkPropertyId;
      filterModel.filters.push(filter);
    }
    if (this.requestLinkEstateUserId && this.requestLinkEstateUserId.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = 'linkEstateUserId';
      filter.value = this.requestLinkEstateUserId;
      filterModel.filters.push(filter);
    }
    if (this.requestLinkCustomerOrderId && this.requestLinkCustomerOrderId.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = 'linkCustomerOrderId';
      filter.value = this.requestLinkCustomerOrderId;
      filterModel.filters.push(filter);
    }
    if (this.requestLinkEstateAgencyId && this.requestLinkEstateAgencyId.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = 'linkEstateAgencyId';
      filter.value = this.requestLinkEstateAgencyId;
      filterModel.filters.push(filter);
    }

    /** filter Category */
    if (this.categoryModelSelected && this.categoryModelSelected.id.length > 0) {
      const filterChild = new FilterDataModel();
      filterChild.propertyName = 'LinkActivityTypeId';
      filterChild.value = this.categoryModelSelected.id;
      filterModel.filters.push(filterChild);
    }
    /** filter Category */



    if (this.searchInCheckingOnDay) {
      // const CheckingOnDay = new Date();
      let filterModelOnDay = new EstatePropertyHistorySearchDtoModel();
      filterModelOnDay = filterModel;
      if (!this.checkingOnDayRange.controls.start?.value)
        this.checkingOnDayRange.controls.start.setValue(new Date());
      if (!this.checkingOnDayRange.controls.end?.value)
        this.checkingOnDayRange.controls.end.setValue(new Date());
      filterModelOnDay.onDateTimeFrom = this.checkingOnDayRange.controls.start.value;
      filterModelOnDay.onDateTimeTo = this.checkingOnDayRange.controls.end.value;

      /** Search On Select Day */
      this.contentService.ServiceGetAllWithFilterOnDate(filterModelOnDay).subscribe({
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
          if (this.popupAdd) {
            this.onActionbuttonNewRow();
          }
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.loading.Stop(pName);
        }
      }
      );
      /** Search On Select Day */
    } else {
      this.contentService.ServiceGetAll(filterModel).subscribe({
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
          if (this.popupAdd) {
            this.onActionbuttonNewRow();
          }
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.loading.Stop(pName);
        }
      }
      );
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


  onActionbuttonNewRow(): void {
    if (!this.popupAdd && (this.categoryModelSelected == null || this.categoryModelSelected.id.length === 0)) {
      const message = this.translate.instant('ERRORMESSAGE.MESSAGE.typeErrorCategoryNotSelected');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }
    this.popupAdd = false;
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessAddRow
    ) {
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }
    const dialogRef = this.dialog.open(EstatePropertyHistoryAddComponent, {
      height: '90%',
      data: {
        linkActivityTypeId: this.categoryModelSelected?.id,
        linkPropertyId: this.requestLinkPropertyId,
        linkEstateUserId: this.requestLinkEstateUserId,
        linkCustomerOrderId: this.requestLinkCustomerOrderId,
        linkEstateAgencyId: this.requestLinkEstateAgencyId,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }

  onActionbuttonEditRow(model: EstatePropertyHistoryModel = this.tableRowSelected): void {

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
    const dialogRef = this.dialog.open(EstatePropertyHistoryEditComponent, {
      height: '90%',
      data: { id: this.tableRowSelected.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
  onActionbuttonDeleteRow(model: EstatePropertyHistoryModel = this.tableRowSelected): void {
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

  onActionbuttonPropertyQuickViewRow(id: any): void {
    if (!id || id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessWatchRow
    ) {
      this.cmsToastrService.typeErrorAccessWatch();
      return;
    }
    const dialogRef = this.dialog.open(EstatePropertyQuickViewComponent, {
      height: '90%',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
      }
    });
  }
  onActionbuttonQuickViewRow(id: any): void {
    if (!id || id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessWatchRow
    ) {
      this.cmsToastrService.typeErrorAccessWatch();
      return;
    }
    const dialogRef = this.dialog.open(EstatePropertyHistoryQuickViewComponent, {
      height: '90%',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
      }
    });
  }

  onActionSelectorSelect(model: EstateActivityTypeModel | null): void {
    /*filter */
    var sortColumn = this.filteModelContent.sortColumn;
    var sortType = this.filteModelContent.sortType;
    this.filteModelContent = new FilterModel();
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
  onActionTableRowSelect(row: EstatePropertyHistoryModel): void {
    this.pageInfo.updateContentInfo(new ContentInfoModel(row.id, row.title, false, '', ''));
    this.tableRowSelected = row;
  }
  onActionTableRowMouseEnter(row: EstatePropertyHistoryModel): void {
    this.onActionTableRowSelect(row);
    row["expanded"] = true;
  }
  onActionTableRowMouseLeave(row: EstatePropertyHistoryModel): void {
    row["expanded"] = false;
  }
  onActionbuttonInCheckingOnDate(model: boolean): void {
    this.searchInCheckingOnDay = model;
    if (this.searchInCheckingOnDay) {
      if (!this.checkingOnDayRange.controls.start?.value)
        this.checkingOnDayRange.controls.start.setValue(new Date());
      if (!this.checkingOnDayRange.controls.end?.value)
        this.checkingOnDayRange.controls.end.setValue(new Date());
    } else {
      this.DataGetAll();
    }
  }
  onActionbuttonInCheckingOnDateSearch() {
    if (this.searchInCheckingOnDay)
      this.DataGetAll();
  }
}
