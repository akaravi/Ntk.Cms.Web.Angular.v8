
import {
  ChangeDetectorRef, Component, Inject,
  OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService, DataFieldInfoModel, ErrorExceptionResult, EstateContractModel, EstateContractTypeModel,
  EstatePropertyProjectModel,
  EstatePropertyProjectService, FormInfoModel, InputDataTypeEnum, ManageUserAccessDataTypesEnum, TokenInfoModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
  selector: 'app-estate-property-project-quick-view',
  templateUrl: './quick-view.component.html',
})
export class EstatePropertyProjectQuickViewComponent implements OnInit, OnDestroy {
  requestId = '';
  requestPerviousItem: any;
  requestNextItem: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstatePropertyProjectQuickViewComponent>,
    public coreEnumService: CoreEnumService,
    public estatePropertyProjectService: EstatePropertyProjectService,
    private cmsToastrService: CmsToastrService,
    private tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    if (data) {
      this.requestId = data.id + '';
      this.requestPerviousItem = data.perviousItem;
      this.requestNextItem = data.nextItem;
    }
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  tokenInfo = new TokenInfoModel();
  loading = new ProgressSpinnerModel();
  dataModelResult: ErrorExceptionResult<EstatePropertyProjectModel> = new ErrorExceptionResult<EstatePropertyProjectModel>();
  dataModelEstateContractTypeResult: ErrorExceptionResult<EstateContractTypeModel> = new ErrorExceptionResult<EstateContractTypeModel>();
  dataModel: EstatePropertyProjectModel = new EstatePropertyProjectModel();
  formInfo: FormInfoModel = new FormInfoModel();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  loadingOption = new ProgressSpinnerModel();
  optionTabledataSource = new MatTableDataSource<EstateContractModel>();
  optionTabledisplayedColumns = ['LinkEstateContractTypeId', 'Price'];// 'SalePrice', 'DepositPrice', 'RentPrice', 'PeriodPrice'];
  fileManagerOpenForm = false;
  errorMessage: string = '';
  enumInputDataType = InputDataTypeEnum;


  cmsApiStoreSubscribe: Subscription;
  ngOnInit(): void {
    this.formInfo.formTitle = this.translate.instant('TITLE.QUICK_VIEW');
    if (this.requestId.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.DataGetOneContent();
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
    });

    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {
      this.tokenInfo = next;
    });
  }

  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }


  DataGetOneContent(): void {
    this.formInfo.formAlert = this.translate.instant('MESSAGE.Receiving_Information_From_The_Server');
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);

    /*َAccess Field*/
    this.estatePropertyProjectService.setAccessLoad();
    this.estatePropertyProjectService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.estatePropertyProjectService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        /*َAccess Field*/
        // this.dataAccessModel = next.access;
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModel = ret.item;


        if (ret.isSuccess) {

          this.formInfo.formTitle = this.formInfo.formTitle;
          this.formInfo.formAlert = '';

        } else {
          this.formInfo.formAlert = this.translate.instant('ERRORMESSAGE.MESSAGE.typeError');
          this.formInfo.formError = ret.errorMessage;
          this.errorMessage = ret.errorMessage + '<br> ( ' + ret.errorTypeTitle + ' ) ';
          this.cmsToastrService.typeErrorMessage(this.errorMessage);
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
  setStep(index: number): void {
    this.step = index;
  }
  step = 0;
  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
  onActionNext(): void {
    this.dialogRef.close({ dialogChangedDate: true, onActionOpenItem: this.requestNextItem });
  }
  onActionPervious(): void {
    this.dialogRef.close({ dialogChangedDate: true, onActionOpenItem: this.requestPerviousItem });
  }
}
