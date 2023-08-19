import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IApiCmsServerBase } from 'ntk-cms-api';
import { Observable, Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { ContentInfoModel } from 'src/app/core/models/contentInfoModel';
import { CmsDataCommentComponent } from 'src/app/shared/cms-data-comment/cms-data-comment.component';
import { CmsDataMemoComponent } from 'src/app/shared/cms-data-memo/cms-data-memo.component';
import { CmsDataPinComponent } from 'src/app/shared/cms-data-pin/cms-data-pin.component';
import { CmsDataTaskComponent } from 'src/app/shared/cms-data-task/cms-data-task.component';
import { CmsShowKeyComponent } from 'src/app/shared/cms-show-key/cms-show-key.component';
import { LayoutService } from '../../../core/layout.service';
import { PageInfoService, PageLink } from '../../../core/page-info.service';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  showTitle: boolean = true;
  showBC: boolean = true;
  title$: Observable<string>;
  description$: Observable<string>;
  bc$: Observable<Array<PageLink>>;

  contentService: IApiCmsServerBase;
  contentInfo: ContentInfoModel;
  pageTitleCssClass: string = '';
  pageTitleDirection: string = 'row';

  constructor(
    private pageInfo: PageInfoService,
    private layout: LayoutService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private publicHelper: PublicHelper,
  ) {

  }

  ngOnInit(): void {
    this.title$ = this.pageInfo.title.asObservable();
    this.description$ = this.pageInfo.description.asObservable();
    this.bc$ = this.pageInfo.breadcrumbs.asObservable();
    this.showTitle = this.layout.getProp('pageTitle.display') as boolean;
    this.showBC = this.layout.getProp('pageTitle.breadCrumbs') as boolean;
    this.pageTitleCssClass = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleDirection = this.layout.getProp(
      'pageTitle.direction'
    ) as string;
    this.pageInfo.contentService.asObservable().subscribe((next) => {
      this.contentService = next;
      this.cdr.detectChanges();
    });
    this.pageInfo.contentInfo.asObservable().subscribe((next) => {
      this.contentInfo = next;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onActionbuttonMemo(): void {
    //open popup
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-wide';
    const dialogRef = this.dialog.open(CmsDataMemoComponent, {
      height: "70%",
      panelClass: panelClass,
      data: {
        service: this.contentService,
        id: this.contentInfo?.id,
        title: this.contentInfo?.title
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
  onActionbuttonPin(): void {
    //open popup
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-wide';

    const dialogRef = this.dialog.open(CmsDataPinComponent, {
      height: "70%",
      panelClass: panelClass,
      data: {
        service: this.contentService,
        id: this.contentInfo?.id,
        title: this.contentInfo?.title
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
  onActionbuttonTask(): void {

    //open popup
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-wide';
    const dialogRef = this.dialog.open(CmsDataTaskComponent, {
      height: "70%",
      panelClass: panelClass,
      data: {
        service: this.contentService,
        id: this.contentInfo?.id,
        title: this.contentInfo?.title
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
  onActionbuttonComment(): void {
    //open popup
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-wide';
    const dialogRef = this.dialog.open(CmsDataCommentComponent, {
      height: "70%",
      panelClass: panelClass,
      data: {
        service: this.contentService,
        id: this.contentInfo?.id,
        title: this.contentInfo?.title
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
  onActionbuttonShowKey(): void {
    if (!this.contentInfo || this.contentInfo.id?.length == 0)
      return;
    //open popup

    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(CmsShowKeyComponent, {
      height: "70%",
      panelClass: panelClass,
      data: {
        service: this.contentService,
        id: this.contentInfo?.id,
        title: this.contentInfo?.title,
        contentUrl: this.contentInfo?.contentUrl
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }

}
