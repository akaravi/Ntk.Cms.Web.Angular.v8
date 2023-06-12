import {
  Component, Inject, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  DataFieldInfoModel,
  EstatePropertyActionSendSmsDtoModel,
  EstatePropertyModel, FormInfoModel
} from 'ntk-cms-api';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';

@Component({
  selector: 'app-estate-property-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class EstatePropertyActionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstatePropertyActionComponent>,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    if (data) {
      this.dataModelProperty = data.model;
    }
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();

  dataModelProperty: EstatePropertyModel = new EstatePropertyModel();
  dataModel: EstatePropertyActionSendSmsDtoModel = new EstatePropertyActionSendSmsDtoModel();
  formInfo: FormInfoModel = new FormInfoModel();
  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.formInfo.formTitle = this.translate.instant('TITLE.Activities');
  }

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.formSubmitAllow = false;
    this.dialogRef.close({
      dialogChangedDate: true,
      model: this.dataModel
    });
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }

}
