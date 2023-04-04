import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit,
  ViewChild
} from '@angular/core';
import { TokenInfoModel } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { environment } from 'src/environments/environment';
import { LayoutInitService } from './core/layout-init.service';
import { LayoutService } from './core/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  // Public variables
  selfLayout = 'default';
  asideSelfDisplay: true;
  asideMenuStatic: true;
  contentClasses = '';
  contentContainerClasses = '';
  toolbarDisplay = true;
  contentExtended: false;
  asideCSSClasses: string;
  asideHTMLAttributes: any = {};
  headerMobileClasses = '';
  headerMobileAttributes = {};
  footerDisplay: boolean;
  footerCSSClasses: string;
  headerCSSClasses: string;
  headerHTMLAttributes: any = {};
  // offcanvases
  extrasSearchOffcanvasDisplay = false;
  extrasNotificationsOffcanvasDisplay = false;
  extrasQuickActionsOffcanvasDisplay = false;
  extrasCartOffcanvasDisplay = false;
  extrasUserOffcanvasDisplay = false;
  extrasQuickPanelDisplay = false;
  extrasScrollTopDisplay = false;
  asideDisplay: boolean;
  @ViewChild('ktAside', { static: true }) ktAside: ElementRef;
  @ViewChild('ktHeaderMobile', { static: true }) ktHeaderMobile: ElementRef;
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

  constructor(
    private initService: LayoutInitService,
    private layout: LayoutService,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
  ) {

    this.initService.init();
  }
  tokenInfo = new TokenInfoModel();
  cmsApiStoreSubscribe: Subscription;

  loadDemoTheme = environment.loadDemoTheme;
  ngOnInit(): void {
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
      document.body.classList.replace('aside-fixed-ltr', 'aside-fixed-' + this.tokenInfo.direction);
      document.body.classList.replace('aside-fixed-rtl', 'aside-fixed-' + this.tokenInfo.direction);
      this.cdr.detectChanges();
    });
    this.cmsApiStoreSubscribe = this.tokenHelper
      .getCurrentTokenOnChange()
      .subscribe((next) => {
        this.tokenInfo = next;
        document.body.classList.replace('aside-fixed-ltr', 'aside-fixed-' + this.tokenInfo.direction);
        document.body.classList.replace('aside-fixed-rtl', 'aside-fixed-' + this.tokenInfo.direction);
        this.cdr.detectChanges();
      });
    // build view by layout config settings
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.toolbarDisplay = this.layout.getProp('toolbar.display') as boolean;
    this.contentContainerClasses = this.layout.getStringCSSClasses('contentContainer');
    this.asideCSSClasses = this.layout.getStringCSSClasses('aside');
    this.headerCSSClasses = this.layout.getStringCSSClasses('header');
    this.headerHTMLAttributes = this.layout.getHTMLAttributes('headerMenu');
  }

  ngAfterViewInit(): void {
    if (this.ktHeader) {
      for (const key in this.headerHTMLAttributes) {
        if (this.headerHTMLAttributes.hasOwnProperty(key)) {
          this.ktHeader.nativeElement.attributes[key] =
            this.headerHTMLAttributes[key];
        }
      }
    }
  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
}
