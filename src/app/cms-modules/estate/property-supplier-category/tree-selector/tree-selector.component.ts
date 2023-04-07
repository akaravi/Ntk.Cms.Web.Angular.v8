
import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatTreeNestedDataSource
} from '@angular/material/tree';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService,
  ErrorExceptionResult, EstatePropertySupplierCategoryModel,
  EstatePropertySupplierCategoryService, FilterModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
@Component({
  selector: 'app-estate-property-supplier-category-treeselector',
  templateUrl: './tree-selector.component.html',
})
export class EstatePropertySupplierCategoryTreeSelectorComponent implements OnInit, OnDestroy {
  constructor(
    private cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: EstatePropertySupplierCategoryService,
    private cdr: ChangeDetectorRef,
    private tokenHelper: TokenHelper,
    public dialog: MatDialog,
    public translate: TranslateService,
  ) {
    this.loading.cdr = this.cdr;
    this.loading.message = this.translate.instant('MESSAGE.Receiving_information');
    this.checklistSelection.changed.subscribe(x => {
      if (!this.runComplate) {
        return;
      }
      const listId = [];
      this.checklistSelection.selected.forEach(element => {
        listId.push(element.id);
      });
      this.optionModelChange.emit(listId);
      if (x.added && x.added.length > 0) {
        x.added.forEach(element => {
          this.optionSelectChecked.emit(element.id);
        });
      }
      if (x.removed && x.removed.length > 0) {
        x.removed.forEach(element => {
          this.optionSelectDisChecked.emit(element.id);
        });
      }
    });
  }
  @Input()
  set optionModel(model: string[]) {
    this.dataModelSelect = model;
    this.loadCheked();
  }
  dataModelSelect: string[] = [];
  dataModelResult: ErrorExceptionResult<EstatePropertySupplierCategoryModel> = new ErrorExceptionResult<EstatePropertySupplierCategoryModel>();
  filterModel = new FilterModel();
  loading = new ProgressSpinnerModel();
  treeControl = new NestedTreeControl<EstatePropertySupplierCategoryModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<EstatePropertySupplierCategoryModel>();
  runComplate = false;
  @Output() optionSelectChecked = new EventEmitter<string>();
  @Output() optionSelectDisChecked = new EventEmitter<string>();
  @Output() optionModelChange = new EventEmitter<string[]>();
  cmsApiStoreSubscribe: Subscription;
  checklistSelection = new SelectionModel<EstatePropertySupplierCategoryModel>(true /* multiple */);
  hasChild = (_: string, node: EstatePropertySupplierCategoryModel) => !!node.children && node.children.length > 0;
  hasNoContent = (_: string, nodeData: EstatePropertySupplierCategoryModel) => nodeData.children;
  ngOnInit(): void {
    this.DataGetAll();
    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((value) => {
      this.DataGetAll();
    });
  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
  loadCheked(model: EstatePropertySupplierCategoryModel[] = this.treeControl.dataNodes): void {
    this.runComplate = false;
    if (this.treeControl.dataNodes && this.dataModelSelect && this.dataModelSelect.length > 0) {
      model.forEach(element => {
        const fItem = this.dataModelSelect.find(z => z === element.id);
        if (fItem) {
          this.checklistSelection.select(element);
        }
        if (element.children && element.children.length > 0) {
          this.loadCheked(element.children);
        }
      });
    }
    this.runComplate = true;
  }
  DataGetAll(): void {
    this.filterModel.rowPerPage = 200;
    this.filterModel.accessLoad = true;
    const pName = this.constructor.name + 'main';
    this.loading.Start(pName);
    this.categoryService.ServiceGetAll(this.filterModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.dataSource.data = this.dataModelResult.listItems;
          this.treeControl.dataNodes = this.dataModelResult.listItems;
          this.loadCheked();
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.loading.Stop(pName);
      },
      error: (er) => {
        this.loading.Stop(pName);

        this.cmsToastrService.typeError(er);
      }
    }
    );
  }
  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: EstatePropertySupplierCategoryModel): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }
  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: EstatePropertySupplierCategoryModel): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }
  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: EstatePropertySupplierCategoryModel): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }
}
