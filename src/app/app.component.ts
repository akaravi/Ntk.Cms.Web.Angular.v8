import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
//start change title when route happened
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
//end change title when route happened
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CoreAuthService, CoreSiteService, CoreSiteSupportModel, ErrorExceptionResult } from 'ntk-cms-api';
import { environment } from 'src/environments/environment';
import { PublicHelper } from './core/helpers/publicHelper';
import { TokenHelper } from './core/helpers/tokenHelper';
import { CmsSignalrService } from './core/services/cmsSignalr.service';
import { SplashScreenService } from './shared/splash-screen/splash-screen.service';
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private coreAuthService: CoreAuthService,
    private coreSiteService: CoreSiteService,
    private modeService: ThemeModeService,
    private publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private splashScreenService: SplashScreenService,
    private singlarService: CmsSignalrService
  ) {
    this.singlarService.startConnection(null);
    this.singlarService.addListenerMessage(null);
    this.singlarService.addListenerActionLogin();
    this.singlarService.addListenerActionLogout();
    //start change title when route happened
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = environment.mainTitle;
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(`${this.translate.instant(title)}`);
        } //set title that defines in routing's files
      });
    //end change title when route happened
    if (
      environment.cmsServerConfig.configApiServerPath &&
      environment.cmsServerConfig.configApiServerPath.length > 0
    ) {
      this.coreAuthService.setConfig(
        environment.cmsServerConfig.configApiServerPath
      );
      this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {
        if (next.siteId > 0 && next.userId > 0)
          this.getSupport();
      });
    }
  }
  cmsApiStoreSubscribe: Subscription;
  dataSupportModelResult: ErrorExceptionResult<CoreSiteSupportModel>;
  ngOnInit() {
    this.modeService.init();
    const url = window.location.href;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      const site = httpParams.get('site');
      const siteId = +site;
      if (siteId > 0) {
        localStorage.setItem('siteId', site);
      }
      const siteType = httpParams.get('sitetype');
      const siteTypeId = +siteType;
      if (siteTypeId > 0) {
        localStorage.setItem('siteTypeId', siteType);
      }
      const ResellerSite = httpParams.get('rsite');
      const ResellerSiteId = +ResellerSite;
      if (ResellerSiteId > 0) {
        localStorage.setItem('ResellerSiteId', ResellerSite);
      }
      const ResellerUser = httpParams.get('ruser');
      const ResellerUserId = +ResellerUser;
      if (ResellerUserId > 0) {
        localStorage.setItem('ResellerUserId', ResellerUser);
      }
    }
    this.tokenHelper.getDeviceToken();
    this.publicHelper.getEnumRecordStatus();
  }
  getSupport() {
    this.coreSiteService.ServiceSupportSite()
      .subscribe({
        next: (ret) => {
          this.dataSupportModelResult = ret;
        },
        error: (er) => {

        }
      }
      );
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event?.key === 'F9') {
      if (localStorage.getItem('KeyboardEventF9'))
        localStorage.removeItem('KeyboardEventF9');
      else localStorage.setItem('KeyboardEventF9', 'F9');
    }
  }
  ngOnDestroy() {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
}
