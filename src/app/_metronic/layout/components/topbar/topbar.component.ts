import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TokenInfoModel } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ProgressSpinnerModel } from 'src/app/core/models/progressSpinnerModel';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';

  constructor(private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    public tokenHelper: TokenHelper,
    public publicHelper: PublicHelper,
    ) {
    this.loading.cdr = this.cdr;
  }
  tokenInfo: TokenInfoModel;
  loading = new ProgressSpinnerModel();
  cmsApiStoreSubscribe: Subscription;
  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
    });
    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((value) => {
      this.tokenInfo = value;
      this.cdr.detectChanges();
    });
  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
}
