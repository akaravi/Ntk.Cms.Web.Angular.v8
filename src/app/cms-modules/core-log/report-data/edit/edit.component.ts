
import {
  ChangeDetectorRef, Component, Inject,
  OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService, CoreLogReportDataModel, CoreLogReportDataService, DataFieldInfoModel, ErrorExceptionResult,
  ErrorExceptionResultBase,
  FormInfoModel, InfoEnumModel, ManageUserAccessDataTypesEnum, TokenInfoModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
  selector: 'app-core-log-report-data-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class CoreLogReportDataEditComponent implements OnInit, OnDestroy {
  requestId = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CoreLogReportDataEditComponent>,
    public coreEnumService: CoreEnumService,
    public coreLogReportDataService: CoreLogReportDataService,
    private cmsToastrService: CmsToastrService,
    private tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    if (data) {
      this.requestId = data.id;
    }
  }
  tokenInfo = new TokenInfoModel();


  loading = new ProgressSpinnerModel();
  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: CoreLogReportDataModel = new CoreLogReportDataModel();
  @ViewChild('vform', { static: false }) formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();
  dataModelEnumSendReportDataStatusTypeResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();


  fileManagerOpenForm = false;

  cmsApiStoreSubscribe: Subscription;

  ngOnInit(): void {
    if (this.requestId && this.requestId.length > 0) {
      this.formInfo.formTitle = this.translate.instant('TITLE.Edit');
      this.DataGetOneContent();
    } else {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
    });

    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {
      this.tokenInfo = next;
    });
    // this.getEnumSendReportDataStatusType();
  }

  // getEnumSendReportDataStatusType(): void {
  //   this.coreEnumService.ServiceSendReportDataStatusTypeEnum().subscribe((next) => {
  //     this.dataModelEnumSendReportDataStatusTypeResult = next;
  //   });
  // }

  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }


  DataGetOneContent(): void {
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }

    this.formInfo.formAlert = this.translate.instant('MESSAGE.Receiving_Information_From_The_Server');
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);

    /*َAccess Field*/
    this.coreLogReportDataService.setAccessLoad();
    this.coreLogReportDataService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.coreLogReportDataService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        /*َAccess Field*/
        // this.dataAccessModel = next.access;
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModel = ret.item;
        if (ret.isSuccess) {
          this.formInfo.formTitle = this.formInfo.formTitle + ' ' + ret.item.id;
          this.formInfo.formAlert = '';
        } else {
          this.formInfo.formAlert = this.translate.instant('ERRORMESSAGE.MESSAGE.typeError');
          this.formInfo.formError = ret.errorMessage;
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
