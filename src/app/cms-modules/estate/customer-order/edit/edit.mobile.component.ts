import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ClauseTypeEnum,
  CoreCurrencyModel,
  CoreEnumService,
  CoreUserModel,
  DataFieldInfoModel,
  ErrorExceptionResult,
  EstateAccountAgencyModel,
  EstateAccountUserModel,
  EstateContractTypeModel,
  EstateContractTypeService,
  EstateCustomerCategoryModel,
  EstateCustomerOrderActionSendSmsDtoModel,
  EstateCustomerOrderModel,
  EstateCustomerOrderService,
  EstatePropertyDetailGroupService,
  EstatePropertyDetailValueModel,
  EstatePropertyFilterModel,
  EstatePropertyModel,
  EstatePropertyService,
  EstatePropertyTypeLanduseModel,
  EstatePropertyTypeLanduseService,
  EstatePropertyTypeUsageModel,
  EstatePropertyTypeUsageService,
  FilterDataModel,
  FilterDataModelSearchTypesEnum,
  FilterModel,
  InfoEnumModel,
  InputDataTypeEnum,
  ManageUserAccessDataTypesEnum,
  ManageUserAccessUserTypesEnum,
  RecordStatusEnum,
  SortTypeEnum,
  TokenInfoModel,
} from 'ntk-cms-api';
import { TreeModel } from 'ntk-cms-filemanager';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { EstatePropertyListComponent } from '../../property/list/list.component';

@Component({
  selector: 'app-estate-customer-order-edit-mobile',
  templateUrl: './edit.mobile.component.html',
  styleUrls: ['./edit.mobile.component.scss'],
})
export class EstateCustomerOrderEditMobileComponent implements OnInit {
  requestId = '';
  constructor(
    private router: Router,
    public coreEnumService: CoreEnumService,
    public estateCustomerOrderService: EstateCustomerOrderService,
    public estateContractTypeService: EstateContractTypeService,
    public estatePropertyTypeUsageService: EstatePropertyTypeUsageService,
    public estatePropertyTypeLanduseService: EstatePropertyTypeLanduseService,
    private estatePropertyService: EstatePropertyService,

    private cmsToastrService: CmsToastrService,
    public estatePropertyDetailGroupService: EstatePropertyDetailGroupService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public tokenHelper: TokenHelper,
    public http: HttpClient,
    public dialog: MatDialog,
    public translate: TranslateService
  ) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant(
      'MESSAGE.Receiving_information'
    );
    this.requestId = this.activatedRoute.snapshot.paramMap.get('id');
    this.linkParentId =
      this.activatedRoute.snapshot.paramMap.get('LinkParentId');
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
      this.allowActionSend = false;
      if (
        (this.tokenHelper.CheckIsAdmin() ||
          this.tokenHelper.CheckIsSupport() ||
          this.tokenHelper.tokenInfo.userAccessUserType ==
            ManageUserAccessUserTypesEnum.ResellerCpSite ||
          this.tokenHelper.tokenInfo.userAccessUserType ==
            ManageUserAccessUserTypesEnum.ResellerEmployeeCpSite) &&
        this.dataModel.recordStatus == RecordStatusEnum.Available
      )
        this.allowActionSend = true;
    });
    this.dataModel.partition = 3;
  }

  @ViewChild(EstatePropertyListComponent)
  estatePropertyList: EstatePropertyListComponent;
  allowActionSend = false;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  enumInputDataType = InputDataTypeEnum;
  fileManagerTree: TreeModel;
  appLanguage = 'fa';
  tokenInfo = new TokenInfoModel();
  linkParentId = '';
  loading = new ProgressSpinnerModel();
  dataModelContractTypeResult: ErrorExceptionResult<EstateContractTypeModel> =
    new ErrorExceptionResult<EstateContractTypeModel>();
  dataModelPropertyTypeUsageResult: ErrorExceptionResult<EstatePropertyTypeUsageModel> =
    new ErrorExceptionResult<EstatePropertyTypeUsageModel>();
  dataModelPropertyTypeLanduseResult: ErrorExceptionResult<EstatePropertyTypeLanduseModel> =
    new ErrorExceptionResult<EstatePropertyTypeLanduseModel>();
  dataModelEstatePropertyResult: ErrorExceptionResult<EstatePropertyModel> =
    new ErrorExceptionResult<EstatePropertyModel>();
  dataModel: EstateCustomerOrderModel = new EstateCustomerOrderModel();
  dataModelActionSend: EstateCustomerOrderActionSendSmsDtoModel =
    new EstateCustomerOrderActionSendSmsDtoModel();
  dataModelCorCurrencySelector = new CoreCurrencyModel();

  dataModelEnumRecordStatusResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  fileManagerOpenForm = false;
  PropertyTypeSelected = new EstatePropertyTypeLanduseModel();
  propertyDetails: Map<string, string> = new Map<string, string>();
  contractTypeSelected: EstateContractTypeModel;
  optionloadComponent = false;
  LinkPropertyIdsInUse = false;
  regeMobile = new RegExp('09[0-9]{2}[0-9]{3}[0-9]{4}');
  stepContent = 'mobile';
  // ** Accardon */
  step = 0;
  hidden = true;

  areaAddressView = false;
  ngOnInit(): void {
    this.getEnumRecordStatus();
    this.DataGetAccess();
    this.DataGetAccessEstate();
    this.DataGetAllContractType();
    this.DataGetAllPropertyTypeUsage();

    this.dataModel.caseCode = this.publicHelper.StringRandomGenerator(5, true);
    if (this.requestId && this.requestId.length > 0) {
      this.DataGetOneContent();
    } else if (this.linkParentId && this.linkParentId.length > 0) {
      this.dataModel.linkEstateCustomerCategoryId = this.linkParentId;
    }
  }
  async getEnumRecordStatus(): Promise<void> {
    this.dataModelEnumRecordStatusResult =
      await this.publicHelper.getEnumRecordStatus();
  }
  dataFieldInfoModel: DataFieldInfoModel[];
  DataGetAccess(): void {
    const pName = this.constructor.name + 'DataGetAccess';
    this.loading.Start(pName);

    this.estateCustomerOrderService.ServiceViewModel().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        } else {
          this.cmsToastrService.typeErrorGetAccess(ret.errorMessage);
        }
        this.loading.Stop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeErrorGetAccess(er);
        this.loading.Stop(pName);
      },
    });
  }
  DataGetAccessEstate(): void {
    this.estatePropertyService.ServiceViewModel().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataFieldInfoModel = ret.access.fieldsInfo;
        } else {
          this.cmsToastrService.typeErrorGetAccess(ret.errorMessage);
        }
      },
      error: (er) => {
        this.cmsToastrService.typeErrorGetAccess(er);
      },
    });
  }

  DataEditContent(actionSubmit = false): void {
    const pName = this.constructor.name + 'main';
    this.loading.Start(
      pName,
      this.translate.instant('MESSAGE.sending_information_to_the_server')
    );
    this.estateCustomerOrderService.setAccessLoad;
    this.estateCustomerOrderService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.cmsToastrService.typeSuccessEdit();
          //this.optionReload();
          if (actionSubmit) {
            if (this.allowActionSend) this.DataSend();
            setTimeout(
              () => this.router.navigate(['/estate/customer-order/']),
              1000
            );
          } else {
            this.estateCustomerOrderService
              .ServiceGetOneById(this.requestId)
              .subscribe({
                next: (ret) => {
                  this.fieldsInfo = this.publicHelper.fieldInfoConvertor(
                    ret.access
                  );
                  this.dataModel = ret.item;
                  if (ret.isSuccess) {
                    if (this.dataModel.linkPropertyTypeUsageId.length > 0)
                      this.DataGetAllPropertyTypeLanduse();

                    this.DataGetAllProperty();
                    this.cdr.detectChanges();
                  } else {
                    this.cmsToastrService.typeErrorMessage(ret.errorMessage);
                  }
                  this.loading.Stop(pName);
                },
                error: (er) => {
                  this.cmsToastrService.typeError(er);
                  this.loading.Stop(pName);
                },
              });
          }
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.loading.Stop(pName);
      },
    });
  }
  DataGetOneContent(): void {
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);
    // var id = '';
    // if (this.dataModelResult && this.dataModelResult.item && this.dataModelResult.item.id && this.dataModelResult.item.id.length > 0) {
    //   id = this.dataModelResult.item.id;
    // } else if (this.requestId && this.requestId.length > 0) {
    //   id = this.requestId;
    // }
    this.estateCustomerOrderService.setAccessLoad();
    this.estateCustomerOrderService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          this.dataModel = ret.item;

          if (ret.isSuccess) {
            if (this.dataModel.linkPropertyTypeUsageId.length > 0)
              this.DataGetAllPropertyTypeLanduse();
            if (
              this.dataModel.linkContractTypeId?.length > 0 &&
              this.dataModelContractTypeResult?.listItems?.length > 0
            ) {
              var index = this.dataModelContractTypeResult.listItems.findIndex(
                (x) => x.id == this.dataModel.linkContractTypeId
              );
              this.onActionSelectorContarctType(
                this.dataModelContractTypeResult.listItems[index]
              );
            }
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
          this.loading.Stop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.loading.Stop(pName);
        },
      });
  }
  DataGetAllContractType(): void {
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);
    const filterModel = new FilterModel();
    this.estateContractTypeService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        this.dataModelContractTypeResult = ret;
        if (ret.isSuccess) {
          if (
            this.dataModel.linkContractTypeId?.length > 0 &&
            this.dataModelContractTypeResult?.listItems?.length > 0
          ) {
            var index = this.dataModelContractTypeResult.listItems.findIndex(
              (x) => x.id == this.dataModel.linkContractTypeId
            );
            this.onActionSelectorContarctType(
              this.dataModelContractTypeResult.listItems[index]
            );
          }
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.loading.Stop(pName);
      },
    });
  }

  DataGetAllPropertyTypeUsage(): void {
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);
    const filterModel = new FilterModel();
    this.estatePropertyTypeUsageService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        this.dataModelPropertyTypeUsageResult = ret;
        if (!ret.isSuccess) {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.loading.Stop(pName);
      },
    });
  }
  DataGetAllPropertyTypeLanduse(): void {
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);
    const filterModel = new FilterModel();

    if (
      this.dataModel.linkPropertyTypeUsageId &&
      this.dataModel.linkPropertyTypeUsageId.length > 0
    ) {
      const filter = new FilterDataModel();
      filter.propertyName = 'PropertyTypes';
      filter.propertyAnyName = 'LinkPropertyTypeUsageId';
      filter.value = this.dataModel.linkPropertyTypeUsageId;
      filter.searchType = FilterDataModelSearchTypesEnum.Equal;
      filter.clauseType = ClauseTypeEnum.And;
      filterModel.filters.push(filter);
    }

    this.estatePropertyTypeLanduseService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        this.dataModelPropertyTypeLanduseResult = ret;
        if (ret.isSuccess) {
          if (this.dataModel.linkPropertyTypeUsageId.length > 0) {
            var state =
              this.dataModelPropertyTypeLanduseResult.listItems.findIndex(
                (x) => x.id == this.dataModel.linkPropertyTypeLanduseId
              );
            if (state >= 0)
              this.onActionSelectorSelectLanduse(
                this.dataModelPropertyTypeLanduseResult.listItems[state]
              );
          }
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.loading.Stop(pName);
      },
    });
  }
  DataGetPropertyDetailGroup(id: string): void {
    const filteModelProperty = new FilterModel();
    const filter = new FilterDataModel();
    filter.propertyName = 'LinkPropertyTypeLanduseId';
    filter.value = id;
    filteModelProperty.filters.push(filter);
    this.dataModel.propertyDetailGroups = [];
    const pName = this.constructor.name + 'DataGetPropertyDetailGroup';
    this.loading.Start(
      pName,
      this.translate.instant('MESSAGE.Get_detailed_information')
    );
    this.estatePropertyDetailGroupService
      .ServiceGetAll(filteModelProperty)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataModel.propertyDetailGroups = ret.listItems;
            /** load Value */
            if (this.dataModel.propertyDetailGroups)
              this.dataModel.propertyDetailGroups.forEach((itemGroup) => {
                itemGroup.propertyDetails.forEach((element) => {
                  this.propertyDetails[element.id] = 0;

                  if (this.dataModel.propertyDetailValues) {
                    const value = this.dataModel.propertyDetailValues.find(
                      (x) => x.linkPropertyDetailId === element.id
                    );
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
          this.loading.Stop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeErrorGetAccess(er);
          this.loading.Stop(pName);
        },
      });
  }
  DataGetAllProperty() {
    if (!this.dataModel || !this.dataModel.id || this.dataModel.id.length == 0)
      return;

    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);
    this.dataModelEstatePropertyResult =
      new ErrorExceptionResult<EstatePropertyModel>();
    const filterModel = new EstatePropertyFilterModel();
    filterModel.countLoad = true;
    // **requestLinkCustomerOrderId*/
    this.estatePropertyService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor
    );
    this.estatePropertyService
      .ServiceGetAllWithCoverCustomerOrderId(this.dataModel.id, filterModel)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          if (ret.isSuccess) {
            this.dataModelEstatePropertyResult = ret;

            // this.tableSource.data = ret.listItems;
            // if (this.optionsSearch.childMethods) {
            //   this.optionsSearch.childMethods.setAccess(ret.access);
            // }
          } else {
            this.cmsToastrService.typeErrorGetAll(ret.errorMessage);
          }
          this.loading.Stop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.loading.Stop(pName);
        },
      });
    // **requestLinkCustomerOrderId*/
  }
  DataSend(): void {
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);
    this.dataModelActionSend.id = this.dataModel.id;
    this.estateCustomerOrderService
      .ServiceActionSendSms(this.dataModelActionSend)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.cmsToastrService.typeSuccessAdd();
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
          this.loading.Stop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.loading.Stop(pName);
        },
      });
  }
  onActionSelectorSelectUsage(
    model: EstatePropertyTypeUsageModel | null
  ): void {
    if (!model || !model.id || model.id.length <= 0) {
      const message = this.translate.instant(
        'MESSAGE.category_of_information_is_not_clear'
      );
      this.cmsToastrService.typeWarningSelected(message);
      return;
    }
    this.dataModel.linkPropertyTypeUsageId = model.id;
  }
  onActionSelectorEstateAgency(model: EstateAccountAgencyModel | null): void {
    this.dataModel.linkEstateAgencyId = null;
    if (!model || !model.id || model.id.length <= 0) {
      return;
    }
    this.dataModel.linkEstateAgencyId = model.id;
  }
  onActionSelectorSelectLanduse(
    model: EstatePropertyTypeLanduseModel | null
  ): void {
    this.PropertyTypeSelected = null;
    this.dataModel.linkPropertyTypeLanduseId = null;
    if (!model || !model.id || model.id.length <= 0) {
      const message = this.translate.instant(
        'MESSAGE.category_of_information_is_not_clear'
      );
      this.cmsToastrService.typeWarningSelected(message);
      return;
    }
    this.PropertyTypeSelected = model;
    this.dataModel.linkPropertyTypeLanduseId = model.id;
    this.DataGetPropertyDetailGroup(model.id);
  }
  onActionSelectorEstateUser(model: EstateAccountUserModel | null): void {
    this.dataModel.linkEstateUserId = null;
    if (!model || !model.id || model.id.length <= 0) {
      return;
    }
    this.dataModel.linkEstateUserId = model.id;
  }

  onActionSelectorContarctType(model: EstateContractTypeModel | null): void {
    this.contractTypeSelected = null;
    this.dataModel.linkContractTypeId = null;
    if (!model || !model.id || model.id.length <= 0) {
      const message = this.translate.instant(
        'MESSAGE.Type_of_property_transaction_is_not_known'
      );
      this.cmsToastrService.typeWarningSelected(message);
      return;
    }
    this.contractTypeSelected = model;
    this.dataModel.linkContractTypeId = model.id;
  }
  onActionSelectorLocation(model: number[] | null): void {
    this.dataModel.linkLocationIds = model;
  }
  onActionSelectorProperty(model: string[] | null): void {
    this.dataModel.linkPropertyIds = model;
    if (
      this.dataModel.linkPropertyIds &&
      this.dataModel.linkPropertyIds.length > 0
    ) {
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
  onActoinSubmit(): void {
    // ** Save Value */
    this.dataModel.propertyDetailValues = [];
    if (this.dataModel.propertyDetailGroups)
      this.dataModel.propertyDetailGroups.forEach((itemGroup) => {
        itemGroup.propertyDetails.forEach((element) => {
          const value = new EstatePropertyDetailValueModel();
          value.linkPropertyDetailId = element.id;
          value.value = this.propertyDetails[element.id];
          this.dataModel.propertyDetailValues.push(value);
        });
      });
    // ** Save Value */

    this.DataEditContent(true);
  }

  onActionSelectorSelect(model: EstateCustomerCategoryModel | null): void {
    if (!model || model.id.length <= 0) {
      const message = this.translate.instant(
        'MESSAGE.category_of_information_is_not_clear'
      );
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }
    this.dataModel.linkEstateCustomerCategoryId = model.id;
  }
  onFormCancel(): void {
    this.router.navigate(['/estate/customer-order/']);
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
  onActionSelectorCmsUser(model: CoreUserModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      //  const message = this.translate.instant('MESSAGE.Information_user_is_not_clear');
      //  this.cmsToastrService.typeErrorSelected(message);
      this.dataModel.linkCmsUserId = null;
      return;
    }
    this.dataModel.linkCmsUserId = model.id;
  }
  onActionSortArrow() {
    if (this.dataModel.resultSortType == SortTypeEnum.Ascending)
      this.dataModel.resultSortType = SortTypeEnum.Descending;
    else if (this.dataModel.resultSortType == SortTypeEnum.Descending)
      this.dataModel.resultSortType = SortTypeEnum.Random;
    else if (this.dataModel.resultSortType == SortTypeEnum.Random)
      this.dataModel.resultSortType = SortTypeEnum.Ascending;
    else this.dataModel.resultSortType = SortTypeEnum.Ascending;
  }
  onActoinSelectStepNext(step: string): void {
    if (step === 'selectYear') {
      if (
        this.PropertyTypeSelected?.createdYearActive ||
        this.PropertyTypeSelected?.partitionActive
      ) {
        step = 'selectYear';
      } else {
        step = 'selectLocation';
      }
    }
    if (step === 'result1' || step === 'result2' || step === 'result3') {
      this.DataEditContent();
    }
    this.stepContent = step;
  }
  onActoinSelectStepBefor(step: string): void {
    if (step === 'selectYear') {
      if (
        this.PropertyTypeSelected?.createdYearActive ||
        this.PropertyTypeSelected?.partitionActive
      ) {
        step = 'selectYear';
      } else {
        step = 'selectLocation';
      }
    }
    this.stepContent = step;
  }
}
