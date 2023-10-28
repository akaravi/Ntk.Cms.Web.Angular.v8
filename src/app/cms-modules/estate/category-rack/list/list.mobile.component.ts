
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  DataFieldInfoModel, ErrorExceptionResult, EstateCategoryRackFolderOrderModel, EstateCategoryRackFolderPropertyModel, EstateCategoryRackModel,
  EstateCategoryRackService, FilterDataModel, FilterModel, RecordStatusEnum, SortTypeEnum, TokenInfoModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { ComponentOptionSearchModel } from 'src/app/core/cmsComponent/base/componentOptionSearchModel';
import { ComponentOptionStatistModel } from 'src/app/core/cmsComponent/base/componentOptionStatistModel';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { CmsExportEntityComponent } from 'src/app/shared/cms-export-entity/cms-export-entity.component';
import { CmsExportListComponent } from 'src/app/shared/cms-export-list/cmsExportList.component';
import { environment } from 'src/environments/environment';
import { EstateCategoryRackAddComponent } from '../add/add.component';
import { EstateCategoryRackEditComponent } from '../edit/edit.component';
@Component({
  selector: 'app-estate-category-rack-list-mobile',
  templateUrl: './list.mobile.component.html',
  styleUrls: ['list.mobile.component.scss']
})
export class EstateCategoryRackListMobileComponent implements OnInit, OnDestroy {
  constructor(
    private contentService: EstateCategoryRackService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    public publicHelper: PublicHelper,
    private cmsToastrService: CmsToastrService,
    private router: Router,
    private tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public dialog: MatDialog) {
    this.loading.cdr = this.cdr; this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    /*filter Sort*/
    this.filteModelContent.sortColumn = 'Id';
    this.filteModelContent.sortType = SortTypeEnum.Descending;
  }
  link: string;
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];

  filteModelContent = new FilterModel();
  dataModelResult: ErrorExceptionResult<EstateCategoryRackModel> = new ErrorExceptionResult<EstateCategoryRackModel>();
  optionsSearch: ComponentOptionSearchModel = new ComponentOptionSearchModel();
  optionsStatist: ComponentOptionStatistModel = new ComponentOptionStatistModel();

  tokenInfo = new TokenInfoModel();
  loading = new ProgressSpinnerModel();
  tableRowsSelected: Array<EstateCategoryRackModel> = [];
  tableRowSelected: EstateCategoryRackModel = new EstateCategoryRackModel();
  tableSource: MatTableDataSource<EstateCategoryRackModel> = new MatTableDataSource<EstateCategoryRackModel>();


  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    'LinkMainImageIdSrc',
    'IconFont',
    'Title',
    'Description',
    'Action'
  ];

  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();



  expandedElement: EstateCategoryRackModel | null;
  cmsApiStoreSubscribe: Subscription;

  ngOnInit(): void {
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
      this.DataGetAll();
    });

    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {
      this.tokenInfo = next;
      this.DataGetAll();
    });
  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
  DataGetAll(): void {
    this.tabledisplayedColumns = this.publicHelper.TabledisplayedColumnsCheckByAllDataAccess(this.tabledisplayedColumnsSource, [], this.tokenInfo);
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new EstateCategoryRackModel());
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName, this.translate.instant('MESSAGE.get_information_list'));
    this.filteModelContent.accessLoad = true;
    /*filter CLone*/
    const filterModel = JSON.parse(JSON.stringify(this.filteModelContent));
    /*filter CLone*/
    this.contentService.ServiceGetAllEditor(filterModel).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          /** */
          var orders: EstateCategoryRackFolderOrderModel[] = [];
          var orderItem = new EstateCategoryRackFolderOrderModel();
          orderItem.area = 200;
          orderItem.caseCode = "222";
          orderItem.uid = this.publicHelper.getGuid();
          orders.push(orderItem);
          orderItem.uid = this.publicHelper.getGuid();
          orders.push(orderItem);

          var properties: EstateCategoryRackFolderPropertyModel[] = [];
          var propertItem = new EstateCategoryRackFolderPropertyModel();
          propertItem.area = 200;
          propertItem.caseCode = "333";
          propertItem.uid = this.publicHelper.getGuid();
          properties.push(propertItem);
          propertItem.uid = this.publicHelper.getGuid();
          properties.push(propertItem);
          propertItem.uid = this.publicHelper.getGuid();
          properties.push(propertItem);
          for (let index = 0; index < this.dataModelResult.listItems.length; index++) {
            this.dataModelResult.listItems[index].rackFolderOrders = orders;
            this.dataModelResult.listItems[index].rackFolderProperties = properties;
          }

          /** */



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
  }


  onTableSortData(sort: MatSort): void {
    if (this.tableSource && this.tableSource.sort && this.tableSource.sort.active === sort.active) {
      if (this.tableSource.sort.start === 'asc') {
        sort.start = 'desc';
        this.filteModelContent.sortColumn = sort.active;
        this.filteModelContent.sortType = SortTypeEnum.Descending;
      } else if (this.tableSource.sort.start === 'desc') {
        sort.start = 'asc';
        this.filteModelContent.sortColumn = '';
        this.filteModelContent.sortType = SortTypeEnum.Ascending;
      } else {
        sort.start = 'desc';
      }
    } else {
      this.filteModelContent.sortColumn = sort.active;
      this.filteModelContent.sortType = SortTypeEnum.Descending;
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

    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessAddRow
    ) {
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }
    var panelClass = '';
    if (this.tokenHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstateCategoryRackAddComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }

  onActionbuttonEditRow(model: EstateCategoryRackModel = this.tableRowSelected): void {

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
    var panelClass = '';
    if (this.tokenHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstateCategoryRackEditComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id: this.tableRowSelected.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
  onActionbuttonDeleteRow(model: EstateCategoryRackModel = this.tableRowSelected): void {
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


  statusFolderClick = false;
  onActionbuttonEditFolderOrder(model: EstateCategoryRackModel = this.tableRowSelected, folder: EstateCategoryRackFolderOrderModel): void {
    this.statusFolderClick = true;
    if (!model || !model.id || model.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (!folder || !folder.uid || folder.uid.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    var findRow = model.rackFolderOrders.findIndex(x => x.uid == folder.uid);
    if (findRow < 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    console.log(model.rackFolderOrders[findRow]);

    var panelClass = '';
    if (this.tokenHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstateCategoryRackEditComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { model: model, folder: folder }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
        model.rackFolderOrders[findRow] = result.folder;
        const pName = this.constructor.name + 'onActionbuttonEditFolderProperty';
        this.loading.Start(pName);
        this.contentService.ServiceEdit(model).subscribe({
          next: (ret) => {
            if (ret.isSuccess) {
              model = ret.item;
            } else {
              this.cmsToastrService.typeErrorMessage(ret.errorMessage);
            }
            this.loading.Stop(pName);
          },
          error: (er) => {
            this.cmsToastrService.typeError(er);

            this.loading.Stop(pName);
          }
        });
      }
    });
    setTimeout(() => {
      this.statusFolderClick = false;
    }, 1000);

  }
  onActionbuttonEditFolderProperty(model: EstateCategoryRackModel = this.tableRowSelected, folder: EstateCategoryRackFolderPropertyModel): void {
    this.statusFolderClick = true;

    if (!model || !model.id || model.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (!folder || !folder.uid || folder.uid.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    var findRow = model.rackFolderProperties.findIndex(x => x.uid == folder.uid);
    if (findRow < 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    console.log(model.rackFolderProperties[findRow]);
    var panelClass = '';
    if (this.tokenHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstateCategoryRackEditComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { model: model, folder: folder }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
        model.rackFolderProperties[findRow] = result.folder;
        const pName = this.constructor.name + 'onActionbuttonEditFolderProperty';
        this.loading.Start(pName);
        this.contentService.ServiceEdit(model).subscribe({
          next: (ret) => {
            if (ret.isSuccess) {
              model = ret.item;
            } else {
              this.cmsToastrService.typeErrorMessage(ret.errorMessage);
            }
            this.loading.Stop(pName);
          },
          error: (er) => {
            this.cmsToastrService.typeError(er);

            this.loading.Stop(pName);
          }
        });
      }
    });

    setTimeout(() => {
      this.statusFolderClick = false;
    }, 1000);
  }


  onActionbuttonContentDetailList(model: EstateCategoryRackModel = this.tableRowSelected, event?: MouseEvent): void {
    if (!model || !model.id || model.id.length === 0) {
      const message = this.translate.instant('MESSAGE.no_row_selected_to_display');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }
    this.onActionTableRowSelect(model);

    if (event?.ctrlKey) {
      this.link = "/#/estate/property-detail/LinkCategoryRackId/" + this.tableRowSelected.id;
      window.open(this.link, "_blank");
    } else {
      this.router.navigate(['/estate/property-detail/LinkCategoryRackId/', this.tableRowSelected.id]);
    }
  }
  onActionbuttonContentList(model: EstateCategoryRackModel = this.tableRowSelected, event?: MouseEvent): void {
    if (!model || !model.id || model.id.length === 0) {
      const message = this.translate.instant('MESSAGE.no_row_selected_to_display');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }
    this.onActionTableRowSelect(model);


    if (event?.ctrlKey) {
      this.link = "/#/estate/property/LinkCategoryRackId/" + this.tableRowSelected.id;
      window.open(this.link, "_blank");
    } else {
      this.router.navigate(['/estate/property/LinkCategoryRackId/', this.tableRowSelected.id]);
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
    fastfilter.value = RecordStatusEnum.Available;
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
    var panelClass = '';
    if (this.tokenHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(CmsExportListComponent, {
      height: "50%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
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
    var panelClass = '';
    if (this.tokenHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(CmsExportEntityComponent, {
      height: "50%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
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

  onActionbuttonReload(): void {
    this.DataGetAll();
  }
  onSubmitOptionsSearch(model: any): void {
    this.filteModelContent.filters = model;
    this.DataGetAll();
  }
  onActionTableRowSelect(row: EstateCategoryRackModel): void {
    this.tableRowSelected = row;
    if (!row["expanded"])
      row["expanded"] = false;
    row["expanded"] = !row["expanded"];
  }
  public onActionClickRackDoor(model: EstateCategoryRackModel): void {
    if (this.statusFolderClick)
      return;

    if (model['rackOpen'] && model['rackOpen'] == true)
      model['rackOpen'] = false;
    else
      model['rackOpen'] = true;
  }
  onActionbuttoncheck: boolean = false;
  public onActionbuttonmenu() {
    this.onActionbuttoncheck = true;
  }

  public onActionbuttonclose() {
    this.onActionbuttoncheck = false;
  }
}

