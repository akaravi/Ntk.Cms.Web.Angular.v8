import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CoreModuleLogMemoModel, CoreModuleMemoDtoModel, ErrorExceptionResult, ErrorExceptionResultBase, FormInfoModel, IApiCmsServerBase } from 'ntk-cms-api';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';


@Component({
  selector: 'app-cms-memo',
  templateUrl: './cms-memo.component.html',
  styleUrls: ['./cms-memo.component.scss']
})
export class CmsMemoComponent implements OnInit {
  static nextId = 0;
  id = ++CmsMemoComponent.nextId;
  requestService: IApiCmsServerBase;
  constructor(private cmsToastrService: CmsToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CmsMemoComponent>,
    public http: HttpClient,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public tokenHelper: TokenHelper,
  ) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    if (data) {
      this.requestService = data.service;
      this.dataModel.moduleEntityId = data.id;
      this.dataModel.subjectTitle = data.title;
    }

    if (!this.requestService)
      this.dialogRef.close({ dialogChangedDate: true });

  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;

  showFormAdd = true;

  loading = new ProgressSpinnerModel();

  dataModelResult: ErrorExceptionResult<CoreModuleLogMemoModel> = new ErrorExceptionResult<CoreModuleLogMemoModel>();
  dataModelResultBase: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: CoreModuleMemoDtoModel = new CoreModuleMemoDtoModel();
  formInfo: FormInfoModel = new FormInfoModel();


  ngOnInit(): void {
    this.tokenHelper.getCurrentToken().then((value) => {

    });

    this.DataGetAll();
  }

  DataGetAll(): void {
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName, this.translate.instant('MESSAGE.get_information_list'));

    /*filter CLone*/
    if (this.dataModel.moduleEntityId && this.dataModel.moduleEntityId.length > 0) {
      this.requestService.ServiceMemoGetAllEntity(this.dataModel.moduleEntityId).subscribe({
        next: (ret) => {
          this.dataModelResult = ret;
          if (ret.listItems?.length > 0)
            this.showFormAdd = false;
          if (!ret.isSuccess) {
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
    else {
      this.requestService.ServiceMemoGetAll().subscribe({
        next: (ret) => {
          this.dataModelResult = ret;
          if (ret.listItems?.length > 0)
            this.showFormAdd = false;
          if (!ret.isSuccess)
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);

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

DataAddContent(): void {
  this.formInfo.formAlert = this.translate.instant('MESSAGE.sending_information_to_the_server');
  this.formInfo.formError = '';
  const pName = this.constructor.name + 'main';
  this.loading.Start(pName);

  this.requestService.ServiceMemoAdd(this.dataModel).subscribe({
    next: (ret) => {
      this.formInfo.formSubmitAllow = true;
      // this.dataModelResultBase = ret;
      if (ret.isSuccess) {
        this.formInfo.formAlert = this.translate.instant('MESSAGE.registration_completed_successfully');
        this.cmsToastrService.typeSuccessAdd();
        this.DataGetAll();

      } else {
        this.formInfo.formAlert = this.translate.instant('ERRORMESSAGE.MESSAGE.typeError');
        this.formInfo.formError = ret.errorMessage;
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }
      this.loading.Stop(pName);

    },
    error: (er) => {
      this.formInfo.formSubmitAllow = true;
      this.cmsToastrService.typeError(er);
      this.loading.Stop(pName);
    }
  }
  );
}
DataDeleteContent(id: string): void {
  this.formInfo.formAlert = this.translate.instant('MESSAGE.sending_information_to_the_server');
  this.formInfo.formError = '';
  const pName = this.constructor.name + 'main';
  this.loading.Start(pName);

  this.requestService.ServiceMemoDelete(id).subscribe({
    next: (ret) => {
      this.formInfo.formSubmitAllow = true;
      // this.dataModelResultBase = ret;
      if (ret.isSuccess) {
        this.formInfo.formAlert = this.translate.instant('MESSAGE.registration_completed_successfully');
        this.cmsToastrService.typeSuccessRemove();
        this.DataGetAll();
        //this.dialogRef.close({ dialogChangedDate: true });

      } else {
        this.formInfo.formAlert = this.translate.instant('ERRORMESSAGE.MESSAGE.typeError');
        this.formInfo.formError = ret.errorMessage;
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }
      this.loading.Stop(pName);

    },
    error: (er) => {
      this.formInfo.formSubmitAllow = true;
      this.cmsToastrService.typeError(er);
      this.loading.Stop(pName);
    }
  }
  );
}

onFormSubmit(): void {
  if(!this.formGroup.valid) {
  return;
}
this.formInfo.formSubmitAllow = false;
this.DataAddContent();
  }

onActionAdd() {
  this.showFormAdd = !this.showFormAdd
}
onFormCancel(): void {
  this.dialogRef.close({ dialogChangedDate: false });

}

}
