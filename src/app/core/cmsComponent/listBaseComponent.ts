import { MatDialog } from "@angular/material/dialog";
import { BaseModuleEntity, IApiCmsServerBase } from "ntk-cms-api";
import { PageInfoService } from "src/app/_metronic/layout/core/page-info.service";
import { CmsMemoComponent } from "src/app/shared/cms-memo/cms-memo.component";
import { environment } from "src/environments/environment";
import { ContentInfoModel } from "../models/contentInfoModel";
import { ProgressSpinnerModel } from "../models/progressSpinnerModel";
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
    const dialogRef = this.dialog.open(CmsMemoComponent, {
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
