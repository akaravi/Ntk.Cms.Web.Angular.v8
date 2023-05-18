
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CoreModuleSiteUserCreditChargeDirectDtoModel, CoreModuleSiteUserCreditModel, CoreModuleSiteUserCreditService, ErrorExceptionResult } from 'ntk-cms-api';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
  selector: 'app-coremodule-site-credit-direct-add',
  templateUrl: './charge-direct.component.html'
})
export class CoreModuleSiteUserCreditChargeDirectComponent implements OnInit {
  requestModel: CoreModuleSiteUserCreditModel;
  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private cmsToastrService: CmsToastrService,
    private router: Router,
    private service: CoreModuleSiteUserCreditService,
    public translate: TranslateService,
    private dialogRef: MatDialogRef<CoreModuleSiteUserCreditChargeDirectComponent>,

  ) {
    if (data) {
      this.requestModel = data.model || new CoreModuleSiteUserCreditModel();
    }
  }

  loading = new ProgressSpinnerModel();
  dataModel: CoreModuleSiteUserCreditChargeDirectDtoModel = new CoreModuleSiteUserCreditChargeDirectDtoModel();
  dataModelResult: ErrorExceptionResult<CoreModuleSiteUserCreditModel> = new ErrorExceptionResult<CoreModuleSiteUserCreditModel>();
  ngOnInit(): void {

    if (!this.requestModel || this.requestModel.linkSiteId <= 0 || this.requestModel.linkModuleId <= 0 || this.requestModel.linkUserId <= 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.dataModel.credit = this.requestModel.credit;
    this.dataModel.linkModuleId = this.requestModel.linkModuleId;
    this.dataModel.linkSiteId = this.requestModel.linkSiteId;
    this.dataModel.linkUserId = this.requestModel.linkUserId;
  }
  onActionbuttonAdd(): void {
    const pName = this.constructor.name + 'ServiceChargeDirect';
    this.loading.Start(pName);
    this.service.ServiceChargeDirect(this.dataModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true });
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

  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });

  }
}

