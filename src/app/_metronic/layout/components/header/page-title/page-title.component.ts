import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IApiCmsServerBase } from 'ntk-cms-api';
import { Observable, Subscription } from 'rxjs';
import { ContentInfoModel } from 'src/app/core/models/contentInfoModel';
import { CmsMemoComponent } from 'src/app/shared/cms-memo/cms-memo.component';
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
    const dialogRef = this.dialog.open(CmsMemoComponent, {
      height: "70%",
      width: "50%",
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
    const dialogRef = this.dialog.open(CmsShowKeyComponent, {
      height: "70%",
      width: "50%",
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
