import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  CoreAuthService,
  EnumDeviceType,
  EnumManageUserAccessUserTypes,
  EnumOperatingSystemType,
  NtkCmsApiStoreService,
  SET_TOKEN_INFO,
  TokenDeviceClientInfoDtoModel,
  TokenInfoModel
} from 'ntk-cms-api';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { TranslationService } from '../i18n/translation.service';
import { CmsStoreService } from '../reducers/cmsStore.service';

@Injectable({
  providedIn: 'root',
})
export class TokenHelper implements OnDestroy {
  constructor(
    public coreAuthService: CoreAuthService,
    private cmsApiStore: NtkCmsApiStoreService,
    private translationService: TranslationService,
    private cmsStoreService: CmsStoreService,
    private router: Router,
  ) {

  }

  tokenInfo: TokenInfoModel = new TokenInfoModel();
  cmsApiStoreSubscribe: Subscription;
  isAdminSite = false;
  isSupportSite = false;


  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
  async getCurrentToken(): Promise<TokenInfoModel> {
    const storeSnapshot = this.cmsApiStore.getStateSnapshot();
    if (storeSnapshot?.ntkCmsAPiState?.tokenInfo) {
      this.tokenInfo = storeSnapshot.ntkCmsAPiState.tokenInfo;
      if (this.tokenInfo)
        this.setDirectionThemeBylanguage(this.tokenInfo.language);
      this.CheckIsAdmin();
      return storeSnapshot.ntkCmsAPiState.tokenInfo;
    }
    return await this.coreAuthService.ServiceCurrentToken()
      .pipe(map(ret => {
        this.cmsApiStore.setState({ type: SET_TOKEN_INFO, payload: ret.item });
        this.tokenInfo = ret.item;
        if (this.tokenInfo)
          this.setDirectionThemeBylanguage(this.tokenInfo.language);
        this.CheckIsAdmin();
        return ret.item;
      })).toPromise();
  }
  getCurrentTokenOnChange(): Observable<TokenInfoModel> {
    return this.cmsApiStore.getState((state) => {
      this.cmsStoreService.setState({ EnumRecordStatusResultStore: null });
      this.tokenInfo = state.ntkCmsAPiState.tokenInfo;
      this.setDirectionThemeBylanguage(this.tokenInfo.language);
      this.CheckIsAdmin();
      return state.ntkCmsAPiState.tokenInfo;
    });
  }
  setDirectionThemeBylanguage(language) {
    if (language === 'ar' || language === 'fa') {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      document.getElementsByTagName('html')[0].setAttribute('direction', 'rtl');
      document.getElementsByTagName('html')[0].setAttribute('style', 'direction: rtl');
      //   this.document.getElementById('cssdir').setAttribute('href', './assets/sass/style.angular.rtl.css');
    } else {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      document.getElementsByTagName('html')[0].setAttribute('direction', 'ltr');
      document.getElementsByTagName('html')[0].setAttribute('style', 'direction: ltr');
      //   this.document.getElementById('cssdir').setAttribute('href', './assets/sass/style.angular.css');
    }
    document.getElementsByTagName('html')[0].setAttribute('lang', language);
  }
  CurrentTokenInfoRenew(): void {
    this.coreAuthService.CurrentTokenInfoRenew();
  }
  CheckIsAdmin(): boolean {
    if (this.tokenInfo.userAccessUserType === EnumManageUserAccessUserTypes.AdminCpSite
      || this.tokenInfo.userAccessUserType === EnumManageUserAccessUserTypes.AdminMainCms

      || this.tokenInfo.userAccessUserType === EnumManageUserAccessUserTypes.SupportCpSite
      || this.tokenInfo.userAccessUserType === EnumManageUserAccessUserTypes.SupportMainCms
    ) {
      this.isAdminSite = true;
      return true;
    }
    this.isAdminSite = false;
    return false;
  }
  CheckIsSupport(): boolean {
    if (this.tokenInfo.userAccessUserType === EnumManageUserAccessUserTypes.SupportCpSite
      || this.tokenInfo.userAccessUserType === EnumManageUserAccessUserTypes.SupportMainCms
    ) {
      this.isSupportSite = true;
      return true;
    }
    this.isSupportSite = false;
    return false;
  }
  getDeviceToken(): void {
    const DeviceToken = this.coreAuthService.getDeviceToken();
    if (!DeviceToken || DeviceToken.length === 0) {
      const model: TokenDeviceClientInfoDtoModel = {
        securityKey: environment.cmsTokenConfig.SecurityKey,
        clientMACAddress: '',
        oSType: EnumOperatingSystemType.none,
        deviceType: EnumDeviceType.WebSite,
        packageName: '',
        appBuildVer: 0,
        appSourceVer: '',
        country: '',
        deviceBrand: '',
        language: this.translationService.getSelectedLanguage(),
        locationLat: '',
        locationLong: '',
        simCard: '',
        notificationId: ''

      };
      this.translationService.setLanguage(this.translationService.getSelectedLanguage());
      this.coreAuthService.ServiceGetTokenDevice(model).toPromise();
    }
  }
  CheckRouteByToken(): void {
    const storeSnapshot = this.cmsApiStore.getStateSnapshot();
    if (storeSnapshot?.ntkCmsAPiState?.tokenInfo) {
      this.tokenInfo = storeSnapshot.ntkCmsAPiState.tokenInfo;
    }
    this.cmsApiStoreSubscribe = this.cmsApiStore.getState((state) => state.ntkCmsAPiState.tokenInfo).subscribe((value) => {
      this.tokenInfo = value;

      if (!this.tokenInfo || !this.tokenInfo.token || this.tokenInfo.token.length === 0) {
        if (this.router && this.router.url.indexOf('/auth/singin') < 0) {
          this.router.navigate(['/auth/singin']);
        }
      } else if (this.tokenInfo.userId <= 0) {

        if (this.router && this.router.url.indexOf('/auth/singin') < 0) {
          this.router.navigate(['/auth/singin']);
        }
      } else if (this.tokenInfo.userId > 0 && this.tokenInfo.siteId <= 0) {
        if (this.router && this.router.url.indexOf('/core/site/selection') < 0) {
          this.router.navigate(['/core/site/selection']);
        }
      }
      if (this.tokenInfo && this.tokenInfo.userId <= 0) {
        if (this.router && this.router.url.indexOf('/auth/singin') < 0) {
          this.router.navigate(['/auth/singin']);
        }
      }

      if (this.tokenInfo && this.tokenInfo.userId > 0 && this.tokenInfo.siteId <= 0) {
        if (this.router && this.router.url.indexOf('/core/site/selection') < 0) {
          this.router.navigate(['/core/site/selection']);
        }
      }
      // this.inputSiteId = this.tokenInfo.siteId;
      // this.inputUserId = this.tokenInfo.userId;
    });
  }

}
