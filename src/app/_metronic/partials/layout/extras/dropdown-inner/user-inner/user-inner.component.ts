import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthRenewTokenModel, CoreAuthService, CoreSiteModel, TokenInfoModel } from 'ntk-cms-api';
import { map, Subscription } from 'rxjs';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { TranslationService } from 'src/app/core/i18n/translation.service';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../../../../modules/auth';
//import { TranslationService } from '../../../../../../modules/i18n';

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
  loadDemoTheme = environment.loadDemoTheme;
  ngOnInit(): void {
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
      /** Action */
      this.translationService.setLanguage(this.tokenInfo.language);
      this.setLanguage(this.tokenInfo.language);
      /** Action */
      this.cdr.detectChanges();
    });
    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((value) => {
      this.tokenInfo = value;
      /** Action */
      this.translationService.setLanguage(this.tokenInfo.language);
      this.setLanguage(this.tokenInfo.language);
      /** Action */
      this.cdr.detectChanges();
    });

    //this.user$ = this.auth.currentUserSubject.asObservable();
    //this.setLanguage(this.translationService.getSelectedLanguage());
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
    /** */
    if (this.tokenInfo && this.tokenInfo.userId > 0) {
      const authModel: AuthRenewTokenModel = new AuthRenewTokenModel();
      authModel.userAccessAdminAllowToProfessionalData = this.tokenInfo.userAccessAdminAllowToProfessionalData;
      authModel.userAccessAdminAllowToAllData = this.tokenInfo.userAccessAdminAllowToAllData;
      authModel.userId = this.tokenInfo.userId;
      authModel.siteId = this.tokenInfo.siteId;
      authModel.lang = lang;

      const title = this.translate.instant('TITLE.Information');
      const message = this.translate.instant('MESSAGE.Request_to_change_language_was_sent_to_the_server');
      this.cmsToastrService.toastr.info(message, title);
      // this.loadingStatus = true;
      this.coreAuthService.ServiceRenewToken(authModel).subscribe(
        {
          next: (ret) => {
            // this.loadingStatus = false;
            if (ret.isSuccess) {
              if (ret.item.language === lang) {
                this.cmsToastrService.toastr.success(this.translate.instant('MESSAGE.New_language_acess_confirmed'), title);

                this.translate.use(ret.item.language);
                this.tokenHelper.setDirectionThemeBylanguage(ret.item);
              } else {
                this.cmsToastrService.toastr.warning(this.translate.instant('ERRORMESSAGE.MESSAGE.New_language_acess_denied'), title);
              }
            } else {
              this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
            }
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.cmsToastrService.typeErrorAccessChange(err);
          }
        }
      );
    }
    /** */

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
  onActionbuttonUserAccessAdminAllowToAllData(): void {
    const authModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    const NewToall = !this.tokenInfo.userAccessAdminAllowToAllData;
    authModel.userAccessAdminAllowToProfessionalData = this.tokenInfo.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToAllData = NewToall;
    authModel.siteId = this.tokenInfo.siteId;
    authModel.userId = this.tokenInfo.userId;
    authModel.lang = this.tokenInfo.language;

    const title = this.translate.instant('TITLE.Information');
    let message = '';
    if (authModel.userAccessAdminAllowToAllData) {
      message = this.translate.instant('MESSAGE.Request_to_access_all_information_has_been_sent_to_the_server');
    } else {
      message = this.translate.instant('MESSAGE.Request_to_terminate_access_to_all_information_has been_sent_to_the_server');
    }
    if (this.cmsToastrService) this.cmsToastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.disabledAllow = true;
    this.coreAuthService.ServiceRenewToken(authModel).subscribe({
      next: (ret) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (ret.isSuccess) {
          const etitle = this.translate.instant('TITLE.Information');
          let emessage = '';
          if (ret.item.userAccessAdminAllowToAllData === NewToall) {
            emessage = this.translate.instant('MESSAGE.Access_is_approved');
            if (this.cmsToastrService) this.cmsToastrService.toastr.success(emessage, etitle);
          } else {
            emessage = this.translate.instant('MESSAGE.New_access_not_approved');
            if (this.cmsToastrService) this.cmsToastrService.toastr.warning(emessage, etitle);
          }
        } else {
          if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }
      },
      error: (er) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(er);
      }
    }
    );
  }

  onActionbuttonUserAccessAdminAllowToProfessionalData(): void {
    const authModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    const NewToPerf = !this.tokenInfo.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToProfessionalData = NewToPerf;
    authModel.userAccessAdminAllowToAllData = this.tokenInfo.userAccessAdminAllowToAllData;
    authModel.siteId = this.tokenInfo.siteId;
    authModel.userId = this.tokenInfo.userId;
    authModel.lang = this.tokenInfo.language;

    const title = this.translate.instant('TITLE.Information');
    let message = '';
    if (authModel.userAccessAdminAllowToProfessionalData) {
      message = this.translate.instant('MESSAGE.Request_for_professional_access_to_the_server_has_been_sent');
    } else {
      message = this.translate.instant('MESSAGE.Request_to_terminate_professional_access_has_been_sent_to_the_server');
    }
    if (this.cmsToastrService) this.cmsToastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.disabledAllow = true;
    this.coreAuthService.ServiceRenewToken(authModel).subscribe({
      next: (ret) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (ret.isSuccess) {
          const etitle = this.translate.instant('TITLE.Information');
          if (ret.item.userAccessAdminAllowToProfessionalData === NewToPerf) {
            const emessage = this.translate.instant('MESSAGE.Access_is_approved');
            if (this.cmsToastrService) this.cmsToastrService.toastr.success(emessage, etitle);
          } else {
            const emessage = this.translate.instant('MESSAGE.New_access_not_approved');
            if (this.cmsToastrService) this.cmsToastrService.toastr.warning(emessage, etitle);
          }
        } else {
          if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }
      },
      error: (er) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(er);
      }
    }
    );
  }

  onActionbuttonSelectUser(): void {
    if (this.inputUserId === this.tokenInfo.userId) {
      const etitle = this.translate.instant('TITLE.Warrning');
      const emessage = this.translate.instant('MESSAGE.The_ID_of_this_website_is_the_same_as_the_website_you_are_on');
      if (this.cmsToastrService) this.cmsToastrService.toastr.warning(emessage, etitle);
      return;
    }
    const authModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    authModel.userAccessAdminAllowToProfessionalData = this.tokenInfo.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToAllData = this.tokenInfo.userAccessAdminAllowToAllData;
    authModel.siteId = this.tokenInfo.siteId;
    authModel.userId = this.inputUserId;
    authModel.lang = this.tokenInfo.language;

    const title = this.translate.instant('TITLE.Information');
    const message = this.translate.instant('MESSAGE.Request_to_change_user_was_sent_to_the_server');
    if (this.cmsToastrService) this.cmsToastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.coreAuthService.ServiceRenewToken(authModel).subscribe(
      {
        next: (ret) => {
          this.loadingStatus = false;
          if (ret.isSuccess) {
            if (ret.item.userId === +this.inputUserId) {

              if (this.cmsToastrService) this.cmsToastrService.toastr.success(this.translate.instant('MESSAGE.Access_to_the_new_user_has_been_approved'), title);
              this.inputSiteId = null;
              this.inputUserId = null;
            } else {
              if (this.cmsToastrService) this.cmsToastrService.toastr.warning(this.translate.instant('MESSAGE.Access_to_the_new_user_was_not_approved'), title);
            }
          } else {
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
  onActionSiteSelect(model: CoreSiteModel): void {
    if (model && model.id > 0) {
      if (model.id !== this.tokenInfo.siteId) {
        this.inputSiteId = model.id;
        this.onActionbuttonSelectSite();
      }
    }
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
    lang: 'fa',
    name: 'فارسی',
    flag: './assets/media/flags/iran.svg',
  },
  {
    lang: 'ar',
    name: 'عربی',
    flag: './assets/media/flags/united-arab-emirates.svg',
  },
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'China',// 'Mandarin',
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
  }
];
