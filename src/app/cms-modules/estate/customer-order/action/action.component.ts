import {
  ChangeDetectorRef,
  Component, Inject, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  DataFieldInfoModel,
  EstateCustomerOrderActionSendSmsDtoModel,
  EstateCustomerOrderModel, EstateCustomerOrderService, FormInfoModel
} from 'ntk-cms-api';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
  selector: 'app-estate-customer-order-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class EstateCustomerOrderActionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstateCustomerOrderActionComponent>,
    public service: EstateCustomerOrderService,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
  ) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    if (data) {
      this.dataModelCustomerOrder = data.model;
      this.dataModel.id = this.dataModelCustomerOrder.id;
    }
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  loading = new ProgressSpinnerModel();


  dataModel: EstateCustomerOrderActionSendSmsDtoModel = new EstateCustomerOrderActionSendSmsDtoModel();
  dataModelCustomerOrder: EstateCustomerOrderModel = new EstateCustomerOrderModel();

  formInfo: FormInfoModel = new FormInfoModel();
  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.formInfo.formTitle = this.translate.instant('TITLE.Activities');
    if (!this.dataModel || !this.dataModel.id || this.dataModel.id.length == 0) {
      this.cmsToastrService.typeErrorMessage('شناسه مشخص نمی باشد');
      this.dialogRef.close({
        dialogChangedDate: false,
      });
    }
  }

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.formSubmitAllow = false;
    this.DataSend();

  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
  DataSend(): void {
    this.formInfo.formAlert = this.translate.instant('MESSAGE.sending_information_to_the_server');
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);

    this.service.ServiceActionSendSms(this.dataModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.formInfo.formAlert = this.translate.instant('MESSAGE.registration_completed_successfully');
          this.cmsToastrService.typeSuccessAdd();
        } else {
          this.formInfo.formAlert = this.translate.instant('ERRORMESSAGE.MESSAGE.typeError');
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(pName);
        this.formInfo.formSubmitAllow = true;
        this.dialogRef.close({
          dialogChangedDate: true,
        });
      },
      error: (er) => {
        this.formInfo.formSubmitAllow = true;
        this.cmsToastrService.typeError(er);
        this.loading.Stop(pName);
      }
    }
    );

  }
}
