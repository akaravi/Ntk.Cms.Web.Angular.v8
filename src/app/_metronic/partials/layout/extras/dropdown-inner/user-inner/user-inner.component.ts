import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { AuthService, UserType } from '../../../../../../modules/auth';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { AuthRenewTokenModel, CoreAuthService, CoreSiteModel, TokenInfoModel } from 'ntk-cms-api';
import { TranslateService } from '@ngx-translate/core';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language: LanguageFlag;
  //user$: Observable<UserType>;
  langs = languages;
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private coreAuthService: CoreAuthService,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private cmsToastrService: CmsToastrService,
    private translationService: TranslationService
  ) {
    this.loading.cdr = this.cdr;
  }
  @Input()
  loading = new ProgressSpinnerModel();
  tokenInfo: TokenInfoModel;
  cmsApiStoreSubscribe: Subscription;
  inputSiteId?: number;
  inputUserId?: number;
  loadingStatus = false;
  disabledAllow = false;
  ngOnInit(): void {
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
    });
    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((value) => {
      this.tokenInfo = value;
      this.cdr.detectChanges();
    });

    //this.user$ = this.auth.currentUserSubject.asObservable();
    this.setLanguage(this.translationService.getSelectedLanguage());
  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  async logout() {
    this.auth.logout();
     const pName = this.constructor.name + 'main';
    this.loading.Start(pName, this.translate.instant('MESSAGE.Sign_out_of_user_account'));
    this.cmsToastrService.typeOrderActionLogout();
    const retOut = await this.coreAuthService.ServiceLogout().pipe(map(next => {
      this.loading.Stop(pName);
      if (next.isSuccess) {
        this.cmsToastrService.typeSuccessLogout();
      } else {
        this.cmsToastrService.typeErrorLogout();
      }
      return;
    })).toPromise();
    document.location.reload();
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }
  onActionSiteSelect(model: CoreSiteModel): void {
    if (model && model.id > 0) {
      if (model.id !== this.tokenInfo.siteId) {
        this.inputSiteId = model.id;
        this.onActionbuttonSelectSite();
      }
    }
  }
  onActionbuttonSelectSite(): void {
    if (this.inputSiteId === this.tokenInfo.siteId) {
      const etitle = this.translate.instant('TITLE.Warrning');
      const emessage = this.translate.instant('MESSAGE.The_ID_of_this_website_is_the_same_as_the_website_you_are_on');
      if (this.cmsToastrService) this.cmsToastrService.toastr.warning(emessage, etitle);
      return;
    }
    const authModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    authModel.userAccessAdminAllowToProfessionalData = this.tokenInfo.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToAllData = this.tokenInfo.userAccessAdminAllowToAllData;
    authModel.userId = this.tokenInfo.userId;
    authModel.siteId = this.inputSiteId;
    authModel.lang = this.tokenInfo.language;

    const title = this.translate.instant('TITLE.Information');
    const message = this.translate.instant('MESSAGE.Request_to_change_site_was_sent_to_the_server');
    if (this.cmsToastrService) this.cmsToastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.coreAuthService.ServiceRenewToken(authModel).subscribe({
      next: (ret) => {
        this.loadingStatus = false;
        if (ret.isSuccess) {
          if (ret.item.siteId === +this.inputSiteId) {
            if (this.cmsToastrService) this.cmsToastrService.toastr.success(this.translate.instant('MESSAGE.New_site_acess_confirmed'), title);
            this.inputSiteId = null;
            this.inputUserId = null;
          } else {
            if (this.cmsToastrService) this.cmsToastrService.toastr.warning(this.translate.instant('ERRORMESSAGE.MESSAGE.New_site_acess_denied'), title);
          }
        } else {
          this.inputSiteId = this.tokenInfo.siteId;
          if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }

      },
      error: (err) => {
        this.loadingStatus = false;
        if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(err);
      }
    }
    );
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'Mandarin',
    flag: './assets/media/flags/china.svg',
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: './assets/media/flags/spain.svg',
  },
  {
    lang: 'ja',
    name: 'Japanese',
    flag: './assets/media/flags/japan.svg',
  },
  {
    lang: 'de',
    name: 'German',
    flag: './assets/media/flags/germany.svg',
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/media/flags/france.svg',
  },
];
