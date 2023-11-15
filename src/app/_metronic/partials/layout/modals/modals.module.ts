import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [

    ModalComponent,
  ],
  imports: [CommonModule, InlineSVGModule, RouterModule, NgbModalModule],
  exports: [

    ModalComponent,
  ],
})
export class ModalsModule { }
