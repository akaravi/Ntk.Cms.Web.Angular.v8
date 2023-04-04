import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
//import { TranslationService } from './modules/i18n';
// language list
import { HttpParams } from '@angular/common/http';
import { CoreAuthService } from 'ntk-cms-api';
import { environment } from 'src/environments/environment';
import { PublicHelper } from './core/helpers/publicHelper';
import { TokenHelper } from './core/helpers/tokenHelper';
import { locale as chLang } from './modules/i18n/vocabs/ch';
import { locale as deLang } from './modules/i18n/vocabs/de';
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as esLang } from './modules/i18n/vocabs/es';
import { locale as frLang } from './modules/i18n/vocabs/fr';
import { locale as jpLang } from './modules/i18n/vocabs/jp';
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
import { TranslationService } from './core/i18n/translation.service';

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
    private coreAuthService: CoreAuthService,
    private translationService: TranslationService,
    private modeService: ThemeModeService,
    private publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
  ) {
    if (environment.cmsServerConfig.configApiServerPath && environment.cmsServerConfig.configApiServerPath.length > 0) {
      this.coreAuthService.setConfig(environment.cmsServerConfig.configApiServerPath);
    }
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

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
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event?.key === "F9") {
      if (localStorage.getItem('KeyboardEventF9'))
        localStorage.removeItem('KeyboardEventF9')
      else
        localStorage.setItem('KeyboardEventF9', "F9");
    }
  }
}
