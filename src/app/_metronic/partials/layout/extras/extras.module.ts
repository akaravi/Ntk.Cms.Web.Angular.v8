import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationsInnerComponent } from './dropdown-inner/notifications-inner/notifications-inner.component';
import { QuickLinksInnerComponent } from './dropdown-inner/quick-links-inner/quick-links-inner.component';
import { SearchResultInnerComponent } from "./dropdown-inner/search-result-inner/search-result-inner.component";
import { UserInnerComponent } from './dropdown-inner/user-inner/user-inner.component';
import { LayoutScrollTopComponent } from './scroll-top/scroll-top.component';

@NgModule({
  declarations: [
    NotificationsInnerComponent,
    QuickLinksInnerComponent,
    SearchResultInnerComponent,
    UserInnerComponent,
    LayoutScrollTopComponent,
  ],
  imports: [CommonModule, FormsModule, InlineSVGModule, RouterModule, SharedModule.forRoot(), NgbTooltipModule,
  ],
  exports: [
    NotificationsInnerComponent,
    QuickLinksInnerComponent,
    SearchResultInnerComponent,
    UserInnerComponent,
    LayoutScrollTopComponent,
  ],
})
export class ExtrasModule {
}
