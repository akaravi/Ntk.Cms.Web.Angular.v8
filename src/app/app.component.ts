import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  isDevMode,
  OnInit
} from '@angular/core';
//start change title when route happened
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
//end change title when route happened
import { HttpClient, HttpParams } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { CoreAuthService, CoreSiteService, CoreSiteSupportModel, DeviceTypeEnum, ErrorExceptionResult, OperatingSystemTypeEnum, TokenDeviceClientInfoDtoModel, TokenDeviceSetNotificationIdDtoModel } from 'ntk-cms-api';
import { environment } from 'src/environments/environment';
import { PublicHelper } from './core/helpers/publicHelper';
import { TokenHelper } from './core/helpers/tokenHelper';
import { TranslationService } from './core/i18n/translation.service';
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
    private translationService: TranslationService,
    private singlarService: CmsSignalrService,
    private swPush: SwPush,
    private httpClient: HttpClient
  ) {
    /**singlarService */
    this.singlarService.startConnection(null);
    this.singlarService.addListenerMessage(null);
    //this.singlarService.addListenerActionLogin();
    //this.singlarService.addListenerActionLogout();
    /**singlarService */

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
        if (next.userId > 0) {
          this.singlarService.login(next.token);
        } else {
          this.singlarService.logout();
        }
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


    this.getDeviceToken();
    this.publicHelper.getEnumRecordStatus();
    // if (this.coreAuthService.deviceToken && this.coreAuthService.deviceToken.length > 0)
    //   this.coreAuthService.ServiceCurrentDeviceToken().subscribe({
    //     next: (ret) => {
    //       if (ret.isSuccess && ret.item.notificationFCMPublicKey.length > 0)
    //         this.subscribeToNotifications(ret.item.notificationFCMPublicKey);
    //     },
    //     error: (er) => {

    //     }
    //   });

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyA3lqa_xiaWGm5rh-IHNQaTt8FN67Y828g",
      authDomain: "ntk-cms.firebaseapp.com",
      databaseURL: "https://ntk-cms.firebaseio.com",
      projectId: "ntk-cms",
      storageBucket: "ntk-cms.appspot.com",
      messagingSenderId: "893852902485",
      appId: "1:893852902485:web:b58b55c1510532e9d2e0dc",
      measurementId: "G-45G43ESXQJ"
    };

    // Initialize Firebase
    if (!isDevMode()) {
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
    }
  }
  getDeviceToken(): void {
    const DeviceToken = this.coreAuthService.getDeviceToken();
    if (!DeviceToken || DeviceToken.length === 0) {
      const model: TokenDeviceClientInfoDtoModel = {
        securityKey: environment.cmsTokenConfig.SecurityKey,
        clientMACAddress: '',
        oSType: OperatingSystemTypeEnum.none,
        deviceType: DeviceTypeEnum.WebSite,
        packageName: environment.appName,
        appBuildVer: 0,
        appSourceVer: environment.appVersion,
        country: '',
        deviceBrand: '',
        language: this.translationService.getSelectedLanguage(),
        locationLat: '',
        locationLong: '',
        simCard: '',
        notificationId: ''
      };
      this.translationService.setLanguage(this.translationService.getSelectedLanguage());
      this.coreAuthService.ServiceGetTokenDevice(model).subscribe({
        next: (ret) => {
          if (ret.isSuccess && ret.item.notificationFCMPublicKey.length > 0)
            this.subscribeToNotifications(ret.item.notificationFCMPublicKey);
        },
        error: (er) => {

        }
      });
    } else {
      this.coreAuthService.ServiceCurrentDeviceToken().subscribe({
        next: (ret) => {
          if (ret.isSuccess && ret.item.notificationFCMPublicKey.length > 0)
            this.subscribeToNotifications(ret.item.notificationFCMPublicKey);
        },
        error: (er) => {

        }
      });
    }
  }
  subscribeToNotifications(notificationFCMPublicKey) {

    this.swPush.requestSubscription({ serverPublicKey: notificationFCMPublicKey })
      .then(sub => {
        var model = new TokenDeviceSetNotificationIdDtoModel();
        this.pushSubscription = sub;
        model.notificationId = sub.getKey + "",
          model.ClientMACAddress = ''
        this.coreAuthService.ServiceSetTokenDeviceNotificationId(model).subscribe({
          next: (ret) => {

          },
          error: (er) => {

          }
        });
      })
      .catch(err => console.error("Could not subscribe to notifications", err));

  }
  pushSubscription: PushSubscription;
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
