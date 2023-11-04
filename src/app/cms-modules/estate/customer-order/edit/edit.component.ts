
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef, Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreCurrencyModel, CoreEnumService, CoreUserModel, DataFieldInfoModel, ErrorExceptionResult, ErrorExceptionResultBase, EstateAccountAgencyModel, EstateAccountUserModel, EstateContractTypeModel, EstateContractTypeService, EstateCustomerCategoryModel, EstateCustomerOrderModel, EstateCustomerOrderService, EstatePropertyDetailGroupService, EstatePropertyDetailValueModel, EstatePropertyService, EstatePropertyTypeLanduseModel,
  EstatePropertyTypeUsageModel, FilterDataModel,
  FilterModel, FormInfoModel, InfoEnumModel, InputDataTypeEnum, ManageUserAccessDataTypesEnum, ManageUserAccessUserTypesEnum, RecordStatusEnum, SortTypeEnum, TokenInfoModel
} from 'ntk-cms-api';
import { TreeModel } from 'ntk-cms-filemanager';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { EstateAccountAgencyListComponent } from '../../account-agency/list/list.component';
import { EstateAccountUserListComponent } from '../../account-user/list/list.component';
import { EstatePropertyHistoryAddComponent } from '../../property-history/add/add.component';
import { EstatePropertyHistoryListComponent } from '../../property-history/list/list.component';
import { EstatePropertyListComponent } from '../../property/list/list.component';
import { EstateCustomerOrderActionComponent } from '../action/action.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-estate-customer-order-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EstateCustomerOrderEditComponent implements OnInit {
  requestId = '';
  constructor(
    private router: Router,
    public coreEnumService: CoreEnumService,
    public estateCustomerOrderService: EstateCustomerOrderService,
    private estateContractTypeService: EstateContractTypeService,
    private estatePropertyService: EstatePropertyService,

    public estatePropertyDetailGroupService: EstatePropertyDetailGroupService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
    public dialog: MatDialog,
  ) {
    this.loading.cdr = this.cdr; this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    this.requestId = this.activatedRoute.snapshot.paramMap.get('id');

    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
    });
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  @ViewChild(EstatePropertyListComponent) estatePropertyListComponent: EstatePropertyListComponent;
  @ViewChild(EstatePropertyListComponent) estatePropertyHaveHistoryListComponent: EstatePropertyListComponent;

  @ViewChild(EstateAccountAgencyListComponent) estateAccountAgencyListComponent: EstateAccountAgencyListComponent;
  @ViewChild(EstateAccountUserListComponent) estateAccountUserListComponent: EstateAccountUserListComponent;
  @ViewChild(EstatePropertyHistoryListComponent) estatePropertyHistoryListComponent: EstatePropertyHistoryListComponent;

  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  enumInputDataType = InputDataTypeEnum;
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  fileManagerTree: TreeModel;
  appLanguage = 'fa';
  tokenInfo = new TokenInfoModel();
  loading = new ProgressSpinnerModel();
  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: EstateCustomerOrderModel = new EstateCustomerOrderModel();
  dataModelCorCurrencySelector = new CoreCurrencyModel();
  formInfo: FormInfoModel = new FormInfoModel();
  contractTypeSelected: EstateContractTypeModel;
  dataModelEnumRecordStatusResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();
  fileManagerOpenForm = false;
  propertyDetails: Map<string, string> = new Map<string, string>();
  PropertyTypeSelected = new EstatePropertyTypeLanduseModel();
  optionloadComponent = false;
  LinkPropertyIdsInUse = false;
  areaAddressView = false;


  // ** Accardon */
  step = 0;
  hidden = true;

  ngOnInit(): void {
    this.formInfo.formTitle = this.translate.instant('TITLE.Edit');
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      setTimeout(() => this.router.navigate(['/estate/customer-order']), 1000);
      return;
    }
    this.DataGetOneContent();
    this.DataGetAccessEstate();
    this.getEnumRecordStatus();
  }
  async getEnumRecordStatus(): Promise<void> {
    this.dataModelEnumRecordStatusResult = await this.publicHelper.getEnumRecordStatus();
  }

  lastRecordStatus: RecordStatusEnum;
  dataFieldInfoModel: DataFieldInfoModel[];
  DataGetAccessEstate(): void {
    this.estatePropertyService
      .ServiceViewModel()
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataFieldInfoModel = ret.access.fieldsInfo;
          } else {
            this.cmsToastrService.typeErrorGetAccess(ret.errorMessage);
          }
          this.cdr.detectChanges();
        },
        error: (er) => {
          this.cmsToastrService.typeErrorGetAccess(er);
        }
      }
      );

  }
  DataGetOneContent(): void {

    this.formInfo.formAlert = this.translate.instant('MESSAGE.Receiving_Information_From_The_Server');
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);

    this.estateCustomerOrderService.setAccessLoad();
    this.estateCustomerOrderService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.estateCustomerOrderService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.lastRecordStatus = ret.item.recordStatus;
        this.dataModel = ret.item;
        if (ret.isSuccess) {
          this.formInfo.formTitle = this.formInfo.formTitle + ' ' + ret.item.title;
          if (this.dataModel.linkPropertyIds && this.dataModel.linkPropertyIds.length > 0)
            this.LinkPropertyIdsInUse = true;
          this.formInfo.formAlert = '';
          /** load Value */
          if (this.dataModel.propertyDetailGroups)
            this.dataModel.propertyDetailGroups.forEach(itemGroup => {
              itemGroup.propertyDetails.forEach(element => {
                this.propertyDetails[element.id] = 0;
                if (this.dataModel.propertyDetailValues) {
                  const value = this.dataModel.propertyDetailValues.find(x => x.linkPropertyDetailId === element.id);
                  if (value) {
                    this.propertyDetails[element.id] = value.value;
                  }
                }
              });
            });
          /** load Value */
          /** */
          if (this.dataModel.linkContractTypeId.length > 0) {
            this.estateContractTypeService.ServiceGetOneById(this.dataModel.linkContractTypeId).subscribe({
              next: (ret) => {
                if (ret.isSuccess) {
                  this.contractTypeSelected = ret.item;
                } else {
                  this.cmsToastrService.typeErrorMessage(ret.errorMessage);
                }
              }
            });
          }
          this.cdr.detectChanges();
          /** */
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
  DataEditContent(forcePopupMessageAction = false): void {
    this.formInfo.formAlert = this.translate.instant('MESSAGE.sending_information_to_the_server');
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName, this.translate.instant('MESSAGE.sending_information_to_the_server'));

    this.estateCustomerOrderService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.formInfo.formAlert = this.translate.instant('MESSAGE.registration_completed_successfully');
          this.cmsToastrService.typeSuccessEdit();
          this.optionReload();
          if ((this.tokenHelper.CheckIsAdmin() || this.tokenHelper.CheckIsSupport() || this.tokenHelper.tokenInfo.userAccessUserType == ManageUserAccessUserTypesEnum.ResellerCpSite || this.tokenHelper.tokenInfo.userAccessUserType == ManageUserAccessUserTypesEnum.ResellerEmployeeCpSite) && this.dataModel.recordStatus == RecordStatusEnum.Available) {
            var panelClass = '';
            if (this.tokenHelper.isMobile)
              panelClass = 'dialog-fullscreen';
            else
              panelClass = 'dialog-min';
            const dialogRef = this.dialog.open(EstateCustomerOrderActionComponent, {
              panelClass: panelClass,
              enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
              exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
              data: { model: this.dataModel }
            });
            dialogRef.afterClosed().subscribe(result => {
              this.formInfo.formSubmitAllow = true;
              this.loading.Stop(pName);
            });
          }
          this.cdr.detectChanges();
        } else {
          this.formInfo.formAlert = this.translate.instant('ERRORMESSAGE.MESSAGE.typeError');
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(pName);

        this.formInfo.formSubmitAllow = true;
      },
      error: (er) => {
        this.formInfo.formSubmitAllow = true;
        this.cmsToastrService.typeError(er);
        this.loading.Stop(pName);
      }
    }
    );
  }

  DataGetPropertyDetailGroup(id: string): void {
    const filteModelProperty = new FilterModel();
    const filter = new FilterDataModel();
    filter.propertyName = 'LinkPropertyTypeLanduseId';
    filter.value = id;
    filteModelProperty.filters.push(filter);
    this.dataModel.propertyDetailGroups = [];
    const pName = this.constructor.name + 'DataGetPropertyDetailGroup';
    this.loading.Start(pName, this.translate.instant('MESSAGE.Get_detailed_information'));
    this.estatePropertyDetailGroupService.ServiceGetAll(filteModelProperty)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataModel.propertyDetailGroups = ret.listItems;
            /** load Value */
            if (this.dataModel.propertyDetailGroups)
              this.dataModel.propertyDetailGroups.forEach(itemGroup => {
                itemGroup.propertyDetails.forEach(element => {
                  this.propertyDetails[element.id] = 0;

                  if (this.dataModel.propertyDetailValues) {
                    const value = this.dataModel.propertyDetailValues.find(x => x.linkPropertyDetailId === element.id);
                    if (value) {
                      this.propertyDetails[element.id] = value.value;
                    }
                  }
                });
              });
            /** load Value */
          } else {
            this.cmsToastrService.typeErrorGetAccess(ret.errorMessage);
          }
          this.cdr.detectChanges();
          this.loading.Stop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeErrorGetAccess(er);
          this.loading.Stop(pName);
        }
      }
      );
  }
  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
  onActionSelectorSelectUsage(model: EstatePropertyTypeUsageModel | null): void {
    if (!model || !model.id || model.id.length <= 0) {
      const message = this.translate.instant('MESSAGE.category_of_information_is_not_clear');
      this.cmsToastrService.typeWarningSelected(message);
      return;
    }
    this.dataModel.linkPropertyTypeUsageId = model.id;
    this.cdr.detectChanges();
  }
  onActionSelectorSelectLanduse(model: EstatePropertyTypeLanduseModel | null): void {
    this.PropertyTypeSelected = null;
    this.dataModel.linkPropertyTypeLanduseId = null;
    if (!model || !model.id || model.id.length <= 0) {
      const message = this.translate.instant('MESSAGE.category_of_information_is_not_clear');
      this.cmsToastrService.typeWarningSelected(message);
      return;
    }
    this.PropertyTypeSelected = model;
    this.dataModel.linkPropertyTypeLanduseId = model.id;
    this.DataGetPropertyDetailGroup(model.id);
    this.cdr.detectChanges();
  }
  onActionSelectorContarctType(model: EstateContractTypeModel | null): void {
    this.contractTypeSelected = null;
    this.dataModel.linkContractTypeId = null;
    if (!model || !model.id || model.id.length <= 0) {
      const message = this.translate.instant('MESSAGE.Type_of_property_transaction_is_not_known');
      this.cmsToastrService.typeWarningSelected(message);
      return;
    }
    this.contractTypeSelected = model;
    this.dataModel.linkContractTypeId = model.id;

    this.cdr.detectChanges();
  }
  onActionSelectorEstateUser(model: EstateAccountUserModel | null): void {
    this.dataModel.linkEstateUserId = null;
    if (!model || !model.id || model.id.length <= 0) {
      return;
    }
    this.dataModel.linkEstateUserId = model.id;
  }

  onActionSelectorEstateAgency(model: EstateAccountAgencyModel | null): void {
    this.dataModel.linkEstateAgencyId = null;
    if (!model || !model.id || model.id.length <= 0) {
      return;
    }
    this.dataModel.linkEstateAgencyId = model.id;
  }
  onActionSelectorLocation(model: number[] | null): void {

    this.dataModel.linkLocationIds = model;
  }
  onActionSelectorProperty(model: string[] | null): void {
    this.dataModel.linkPropertyIds = model;
    if (this.dataModel.linkPropertyIds && this.dataModel.linkPropertyIds.length > 0) {
      this.LinkPropertyIdsInUse = true;
    } else {
      this.LinkPropertyIdsInUse = false;
    }
  }
  onActionSelectorPropertyIgnored(model: string[] | null): void {
    this.dataModel.linkPropertyIdsIgnored = model;

  }
  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }
  // ** Accardon */
  onFormSendMessage() {
    this.onFormSubmit(true);
  }
  onFormSubmit(forcePopupMessageAction = false): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.formSubmitAllow = false;
    // ** Save Value */
    this.dataModel.propertyDetailValues = [];
    if (this.dataModel.propertyDetailGroups)
      this.dataModel.propertyDetailGroups.forEach(itemGroup => {
        itemGroup.propertyDetails.forEach(element => {
          const value = new EstatePropertyDetailValueModel();
          value.linkPropertyDetailId = element.id;
          value.value = this.propertyDetails[element.id];
          this.dataModel.propertyDetailValues.push(value);
        });
      });
    // ** Save Value */

    this.DataEditContent(forcePopupMessageAction);


  }

  onActionSelectorSelect(model: EstateCustomerCategoryModel | null): void {
    if (!model || model.id.length <= 0) {
      const message = this.translate.instant('MESSAGE.category_of_information_is_not_clear');
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }
    this.dataModel.linkEstateCustomerCategoryId = model.id;
  }
  onFormCancel(): void {
    this.router.navigate(['/estate/customer-order/']);
  }
  optionReload = (): void => {
    this.loadResult = ''
  }
  loadResult = '';
  onFormLoadEstateResult(): void {
    this.loadResult = 'estatePropertyList';
    this.cdr.detectChanges();
    this.estatePropertyListComponent.optionloadComponent = true;
    this.estatePropertyListComponent.DataGetAll();
  }
  onFormLoadEstateHaveHistoryResult(): void {
    this.loadResult = 'estatePropertyHaveHistoryList';
    this.cdr.detectChanges();
    this.estatePropertyHaveHistoryListComponent.optionloadComponent = true;
    this.estatePropertyHaveHistoryListComponent.DataGetAll();
  }
  onActionSelectCurrency(model: CoreCurrencyModel): void {
    if (!model || model.id <= 0) {
      // this.cmsToastrService.typeErrorSelected();
      this.dataModelCorCurrencySelector = null;
      this.dataModel.linkCoreCurrencyId = null;
      return;
    }
    this.dataModelCorCurrencySelector = model;
    this.dataModel.linkCoreCurrencyId = model.id;
  }
  onFormLoadEstateAgencyResult(): void {
    this.loadResult = 'estateAccountAgencyList';
    this.cdr.detectChanges();
    this.estateAccountAgencyListComponent.optionloadComponent = true;
    this.estateAccountAgencyListComponent.DataGetAll();
  }
  onFormLoadEstateUserResult(): void {
    this.loadResult = 'estateAccountUserList';
    this.cdr.detectChanges();
    this.estateAccountUserListComponent.optionloadComponent = true;
    this.estateAccountUserListComponent.DataGetAll();
  }

  onFormLoadEstateHistoryResult(): void {
    this.loadResult = 'estateHistoryList';
    this.cdr.detectChanges();
    this.estatePropertyHistoryListComponent.optionloadComponent = true;
    this.estatePropertyHistoryListComponent.DataGetAll();
  }
  onActionSelectorCmsUser(model: CoreUserModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      //  const message = this.translate.instant('MESSAGE.Information_user_is_not_clear');
      //  this.cmsToastrService.typeErrorSelected(message);
      this.dataModel.linkCmsUserId = null;
      return;
    }
    this.dataModel.linkCmsUserId = model.id;
  }

  onActionbuttonQuickHistoryAddRow(): void {
    var panelClass = '';
    if (this.tokenHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstatePropertyHistoryAddComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        linkActivityTypeId: null,
        linkPropertyId: null,
        linkEstateUserId: null,
        linkCustomerOrderId: this.dataModel.id,
        linkEstateAgencyId: null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {

      }
    });
  }

  onActionSortArrow() {
    if (this.dataModel.resultSortType == SortTypeEnum.Ascending)
      this.dataModel.resultSortType = SortTypeEnum.Descending;
    else if (this.dataModel.resultSortType == SortTypeEnum.Descending)
      this.dataModel.resultSortType = SortTypeEnum.Random;
    else if (this.dataModel.resultSortType == SortTypeEnum.Random)
      this.dataModel.resultSortType = SortTypeEnum.Ascending;
    else
      this.dataModel.resultSortType = SortTypeEnum.Ascending;
  }
}

