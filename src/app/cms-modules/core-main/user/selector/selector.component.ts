import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService, CoreUserModel,
  CoreUserService, EnumClauseType, EnumFilterDataModelSearchTypes, ErrorExceptionResult,
  FilterDataModel,
  FilterModel
} from 'ntk-cms-api';
import { Observable, firstValueFrom } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';


@Component({
  selector: 'app-core-user-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class CoreUserSelectorComponent implements OnInit {

  constructor(
    public coreEnumService: CoreEnumService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public categoryService: CoreUserService) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
  }
  dataModelResult: ErrorExceptionResult<CoreUserModel> = new ErrorExceptionResult<CoreUserModel>();
  dataModelSelect: CoreUserModel = new CoreUserModel();
  formControl = new FormControl();
  filteredOptions: Observable<CoreUserModel[]>;
  @Input() optionDisabled = false;
  @Input() optionSelectFirstItem = false;
  @Input() optionPlaceholder = '';

  @Output() optionChange = new EventEmitter<CoreUserModel>();
  @Input() optionReload = () => this.onActionReload();
  @Input() set optionSelectForce(x: number | CoreUserModel) {
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

  displayFn(model?: CoreUserModel): string | undefined {
    return model ? (model.username + ' # ' + model.name + ' # ' + model.lastName) : undefined;
  }
  displayOption(model?: CoreUserModel): string | undefined {
    return model ? (model.username + ' # ' + model.name + ' # ' + model.lastName) : undefined;
  }
  async DataGetAll(text: string | number | any): Promise<CoreUserModel[]> {
    const filterModel = new FilterModel();
    filterModel.rowPerPage = 20;
    filterModel.accessLoad = true;
    // this.loading.backdropEnabled = false;
    if (text && text.length > 0) {
      let filter = new FilterDataModel();
      /*Filters */
      filter = new FilterDataModel();
      filter.propertyName = 'username';
      filter.value = text;
      filter.searchType = EnumFilterDataModelSearchTypes.Contains;
      filter.clauseType = EnumClauseType.Or;
      filterModel.filters.push(filter);
      /*Filters */
      /*Filters */
      filter = new FilterDataModel();
      filter.propertyName = 'name';
      filter.value = text;
      filter.searchType = EnumFilterDataModelSearchTypes.Contains;
      filter.clauseType = EnumClauseType.Or;
      filterModel.filters.push(filter);
      /*Filters */
      filter = new FilterDataModel();
      filter.propertyName = 'email';
      filter.value = text;
      filter.searchType = EnumFilterDataModelSearchTypes.Contains;
      filter.clauseType = EnumClauseType.Or;
      filterModel.filters.push(filter);
      /*Filters */
      filter = new FilterDataModel();
      filter.propertyName = 'lastname';
      filter.value = text;
      filter.searchType = EnumFilterDataModelSearchTypes.Contains;
      filter.clauseType = EnumClauseType.Or;
      filterModel.filters.push(filter);

      if (text && typeof +text === 'number' && +text > 0) {
        /*Filters */
        filter = new FilterDataModel();
        filter.propertyName = 'Id';
        filter.value = text;
        filter.searchType = EnumFilterDataModelSearchTypes.Equal;
        filter.clauseType = EnumClauseType.Or;
        filterModel.filters.push(filter);

      }
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
  onActionSelect(model: CoreUserModel): void {
    if (this.optionDisabled) {
      return;
    }
    this.dataModelSelect = model;
    this.optionChange.emit(this.dataModelSelect);
  }
  onActionSelectClear(): void {
    if (this.optionDisabled) {
      return;
    }
    this.dataModelSelect = null;
    this.formControl.setValue(null);
    this.optionChange.emit(null);
  }

  push(newvalue: CoreUserModel): Observable<CoreUserModel[]> {
    return this.filteredOptions.pipe(map(items => {
      if (items.find(x => x.id === newvalue.id)) {
        return items;
      }
      items.push(newvalue);
      return items;
    }));

  }
  onActionSelectForce(id: number | CoreUserModel): void {
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
      this.categoryService.ServiceGetOneById(id).subscribe((next) => {
        if (next.isSuccess) {
          this.filteredOptions = this.push(next.item);
          this.dataModelSelect = next.item;
          this.formControl.setValue(next.item);
          this.optionChange.emit(next.item);
        }
      });
      return;
    }
    if (typeof id === typeof CoreUserModel) {
      this.filteredOptions = this.push((id as CoreUserModel));
      this.dataModelSelect = (id as CoreUserModel);
      this.formControl.setValue(id);
      return;
    }
    this.formControl.setValue(null);
  }

  onActionReload(): void {
    // if (this.dataModelSelect && this.dataModelSelect.id > 0) {
    //   this.onActionSelect(null);
    // }
    this.dataModelSelect = new CoreUserModel();
    // this.optionsData.Select = new CoreUserModel();
    this.loadOptions();
  }
}
