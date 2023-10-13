
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  ClauseTypeEnum, CoreEnumService, ErrorExceptionResult,
  FilterDataModel, FilterDataModelSearchTypesEnum, FilterModel,
  InfoEnumModel,
  LinkManagementBillboardPatternModel,
  LinkManagementBillboardPatternService,
  LinkManagementEnumService
} from 'ntk-cms-api';
import { Observable, firstValueFrom } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';


@Component({
  selector: 'app-linkmanagement-billboard-pattern-selector',
  templateUrl: './selector.component.html',
})
export class LinkManagementBillboardPatternSelectorComponent implements OnInit {
  constructor(
    public coreEnumService: CoreEnumService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private linkManagementEnumService: LinkManagementEnumService,
    public categoryService: LinkManagementBillboardPatternService) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    this.getManagementContentSettingTypeEnum();
  }
  dataModelResult: ErrorExceptionResult<LinkManagementBillboardPatternModel> = new ErrorExceptionResult<LinkManagementBillboardPatternModel>();
  dataModelSelect: LinkManagementBillboardPatternModel = new LinkManagementBillboardPatternModel();
  formControl = new FormControl();
  filteredOptions: Observable<LinkManagementBillboardPatternModel[]>;
  dataModelManagementContentSettingTypeEnumResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();
  getManagementContentSettingTypeEnum(): void {
    this.linkManagementEnumService.ServiceManagementContentSettingTypeEnum().subscribe((next) => {
      this.dataModelManagementContentSettingTypeEnumResult = next;
    });
  }
  @Input() optionPlaceholder = '';
  @Input() optionSelectFirstItem = false;
  @Output() optionChange = new EventEmitter<LinkManagementBillboardPatternModel>();
  @Input() optionReload = () => this.onActionReload();
  @Input() set optionSelectForce(x: number | LinkManagementBillboardPatternModel) {
    this.onActionSelectForce(x);
  }

  loading: ProgressSpinnerModel = new ProgressSpinnerModel();
  get optionLoading(): ProgressSpinnerModel {
    return this.loading;
  }
  @Input() set optionLoading(value: ProgressSpinnerModel) {
    this.loading = value;
  }

  ngOnInit(): void {
    this.loadOptions();

  }
  loadOptions(): void {
    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(1500),
        distinctUntilChanged(),
        switchMap(val => {
          if (typeof val === 'string' || typeof val === 'number') {
            return this.DataGetAll(val || '');
          }
          return [];
        }),
        // tap(() => this.myControl.setValue(this.options[0]))
      );
  }

  displayFn(model?: LinkManagementBillboardPatternModel): string | undefined {
    if (this.dataModelManagementContentSettingTypeEnumResult?.listItems && this.dataModelManagementContentSettingTypeEnumResult.listItems.length > 0) {
      const find = this.dataModelManagementContentSettingTypeEnumResult.listItems.find(x => x.key === model.settingType.toString() || x.value === model.settingType);
      if (find)
        return model ? model.title + '-' + find.description : undefined;
    }
    return model ? model.title : undefined;
  }
  displayOption(model?: LinkManagementBillboardPatternModel): string | undefined {
    if (this.dataModelManagementContentSettingTypeEnumResult?.listItems && this.dataModelManagementContentSettingTypeEnumResult.listItems.length > 0) {
      const find = this.dataModelManagementContentSettingTypeEnumResult.listItems.find(x => x.key === model.settingType.toString() || x.value === model.settingType);
      if (find)
        return model ? model.title + '-' + find.description : undefined;
    }
    return model ? model.title : undefined;
  }
  async DataGetAll(text: string | number | any): Promise<LinkManagementBillboardPatternModel[]> {
    const filterModel = new FilterModel();
    filterModel.rowPerPage = 20;
    filterModel.accessLoad = true;
    // this.loading.backdropEnabled = false;
    let filter = new FilterDataModel();
    filter.propertyName = 'Title';
    filter.value = text;
    filter.searchType = FilterDataModelSearchTypesEnum.Contains;
    filter.clauseType = ClauseTypeEnum.Or;
    filterModel.filters.push(filter);
    if (text && typeof +text === 'number' && +text > 0) {
      filter = new FilterDataModel();
      filter.propertyName = 'Id';
      filter.value = text;
      filter.searchType = FilterDataModelSearchTypesEnum.Equal;
      filter.clauseType = ClauseTypeEnum.Or;
      filterModel.filters.push(filter);
    }

    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);

    return await firstValueFrom(this.categoryService.ServiceGetAll(filterModel))
      .then(
        (response) => {
          this.dataModelResult = response;
          /*select First Item */
          if (this.optionSelectFirstItem &&
            (!this.dataModelSelect || !this.dataModelSelect.id || this.dataModelSelect.id <= 0) &&
            this.dataModelResult.listItems.length > 0) {
            this.optionSelectFirstItem = false;
            setTimeout(() => { this.formControl.setValue(this.dataModelResult.listItems[0]); }, 1000);
            this.onActionSelect(this.dataModelResult.listItems[0]);
          }
          /*select First Item */
          this.loading.Stop(pName);

          return response.listItems;
        });
  }
  onActionSelect(model: LinkManagementBillboardPatternModel): void {
    this.dataModelSelect = model;
    this.optionChange.emit(this.dataModelSelect);

  }
  onActionSelectClear(): void {
    this.dataModelSelect = null;
    this.formControl.setValue(null);
    this.optionChange.emit(null);
  }
  push(newvalue: LinkManagementBillboardPatternModel): Observable<LinkManagementBillboardPatternModel[]> {
    return this.filteredOptions.pipe(map(items => {
      if (items.find(x => x.id === newvalue.id)) {
        return items;
      }
      items.push(newvalue);
      return items;
    }));

  }
  onActionSelectForce(id: number | LinkManagementBillboardPatternModel): void {
    if (typeof id === 'number' && id > 0) {
      if (this.dataModelSelect && this.dataModelSelect.id === id) {
        return;
      }
      if (this.dataModelResult && this.dataModelResult.listItems && this.dataModelResult.listItems.find(x => x.id === id)) {
        const item = this.dataModelResult.listItems.find(x => x.id === id);
        this.dataModelSelect = item;
        this.formControl.setValue(item);
        return;
      }
      this.categoryService.ServiceGetOneById(id).subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.filteredOptions = this.push(ret.item);
            this.dataModelSelect = ret.item;
            this.formControl.setValue(ret.item);
            this.optionChange.emit(ret.item);
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
        }
      });
      return;
    }
    if (typeof id === typeof LinkManagementBillboardPatternModel) {
      this.filteredOptions = this.push((id as LinkManagementBillboardPatternModel));
      this.dataModelSelect = (id as LinkManagementBillboardPatternModel);
      this.formControl.setValue(id);
      return;
    }
    this.formControl.setValue(null);
  }

  onActionReload(): void {
    this.dataModelSelect = new LinkManagementBillboardPatternModel();
    this.loadOptions();
  }
}
