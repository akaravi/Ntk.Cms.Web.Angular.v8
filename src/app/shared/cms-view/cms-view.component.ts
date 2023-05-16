import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
  selector: 'app-cms-view',
  templateUrl: './cms-view.component.html',
})
export class CmsViewComponent implements OnInit, OnDestroy {
  static nextId = 0;
  id = ++CmsViewComponent.nextId;
  constructor(
    private cmsToastrService: CmsToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public http: HttpClient,
  ) {
    if (data) {
      this.optionMethod = data.optionMethod;
      this.optionListItems = data.optionListItems;
      this.optionItem = data.optionItem;
      this.optionTitle = data.optionTitle;
    }
  }
  @Input() optionMethod = 1;
  @Input() optionListItems: any[];
  @Input() optionItem: any;
  @Input() optionTitle: "";
  ngOnInit(): void {
  }
  ngOnDestroy(): void {

  }
  
}

