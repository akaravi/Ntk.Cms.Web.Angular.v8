import { MatDialog } from "@angular/material/dialog";
import { BaseModuleEntity, IApiCmsServerBase } from "ntk-cms-api";
import { PageInfoService } from "src/app/_metronic/layout/core/page-info.service";
import { environment } from "src/environments/environment";
import { ContentInfoModel } from "../models/contentInfoModel";
import { ProgressSpinnerModel } from "../models/progressSpinnerModel";
import { CmsDataMemoComponent } from "src/app/shared/cms-data-memo/cms-data-memo.component";
import { CmsDataPinComponent } from "src/app/shared/cms-data-pin/cms-data-pin.component";
import { CmsDataTaskComponent } from "src/app/shared/cms-data-task/cms-data-task.component";
import { CmsDataCommentComponent } from "src/app/shared/cms-data-comment/cms-data-comment.component";
//IApiCmsServerBase
export class ListBaseComponent<TService extends IApiCmsServerBase, TModel extends BaseModuleEntity<TKey>, TKey> {
  constructor(baseService: TService, public item: TModel, public pageInfo: PageInfoService, public dialog: MatDialog,) {
    pageInfo.updateContentService(baseService);
  }
  baseService: TService;


  loading = new ProgressSpinnerModel();
  tableRowSelected: TModel;
  onActionTableRowSelect(row: TModel): void {
    this.tableRowSelected = row;
    this.pageInfo.updateContentInfo(new ContentInfoModel(row.id, row['title'], row['viewContentHidden'], '', row['urlViewContent']));
    row["expanded"] = true;
  }
  onActionTableRowMouseClick(row: TModel): void {
    if (this.tableRowSelected.id === row.id) {
      row["expanded"] = false;
      this.onActionTableRowSelect(this.item);
      this.pageInfo.updateContentInfo(new ContentInfoModel('', '', false, '', ''));
    } else {
      this.onActionTableRowSelect(row);
      row["expanded"] = true;
    }
  }
  onActionTableRowMouseEnter(row: TModel): void {
    if (!environment.cmsViewConfig.tableRowMouseEnter)
      return;
    row["expanded"] = true;
  }
  onActionTableRowMouseLeave(row: TModel): void {
    if (!environment.cmsViewConfig.tableRowMouseEnter)
      return;
    if (!this.tableRowSelected || this.tableRowSelected.id !== row.id)
      row["expanded"] = false;
  }
  onActionbuttonMemo(model: TModel = this.tableRowSelected): void {
    //open popup
    const dialogRef = this.dialog.open(CmsDataMemoComponent, {
      height: "70%",
      width: "50%",
      data: {
        service: this.baseService,
        id: this.tableRowSelected ? this.tableRowSelected.id : '',
        title: this.tableRowSelected ? this.tableRowSelected['title'] : ''
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        // this.DataGetAll();
      }
    });
    //open popup
  }
  onActionbuttonPin(model: TModel = this.tableRowSelected): void {
    //open popup
    const dialogRef = this.dialog.open(CmsDataPinComponent, {
      height: "70%",
      width: "50%",
      data: {
        service: this.baseService,
        id: this.tableRowSelected ? this.tableRowSelected.id : '',
        title: this.tableRowSelected ? this.tableRowSelected['title'] : ''
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        // this.DataGetAll();
      }
    });
    //open popup
  }
  onActionbuttonTask(model: TModel = this.tableRowSelected): void {
    //open popup
    const dialogRef = this.dialog.open(CmsDataTaskComponent, {
      height: "70%",
      width: "50%",
      data: {
        service: this.baseService,
        id: this.tableRowSelected ? this.tableRowSelected.id : '',
        title: this.tableRowSelected ? this.tableRowSelected['title'] : ''
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        // this.DataGetAll();
      }
    });
    //open popup
  }
  onActionbuttonComment(model: TModel = this.tableRowSelected): void {
    //open popup
    const dialogRef = this.dialog.open(CmsDataCommentComponent, {
      height: "70%",
      width: "50%",
      data: {
        service: this.baseService,
        id: this.tableRowSelected ? this.tableRowSelected.id : '',
        title: this.tableRowSelected ? this.tableRowSelected['title'] : ''
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        // this.DataGetAll();
      }
    });
    //open popup
  }


}
