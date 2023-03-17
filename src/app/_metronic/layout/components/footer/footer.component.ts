import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreConfigurationService } from 'ntk-cms-api';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerContainerCssClasses: string = '';
  currentDateStr: string = new Date().getFullYear().toString();
  constructor(
    private configService: CoreConfigurationService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    private cmsToastrService: CmsToastrService,
    public translate: TranslateService,
    public publicHelper: PublicHelper) {

    this.loading.cdr = this.cdr;
  }
  loading = new ProgressSpinnerModel();

  ngOnInit(): void {
    this.footerContainerCssClasses =
      this.layout.getStringCSSClasses('footerContainer');
    this.GetServiceVer();
  }
  GetServiceVer(): void {
    const pName = this.constructor.name + 'ServiceIp';
    this.loading.Start(pName, this.translate.instant('MESSAGE.get_information_from_the_server'));
    this.configService.ServiceIp().subscribe({
      next: (ret) => {
        this.publicHelper.appServerVersion = ret.appVersion
        this.loading.Stop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.loading.Stop(pName);
      }
    }
    );
  }
}
