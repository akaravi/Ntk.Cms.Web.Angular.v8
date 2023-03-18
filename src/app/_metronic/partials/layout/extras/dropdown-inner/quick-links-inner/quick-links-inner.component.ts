import { Component, HostBinding } from '@angular/core';
import { TokenInfoModel } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quick-links-inner',
  templateUrl: './quick-links-inner.component.html',
})
export class QuickLinksInnerComponent {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';


  constructor(
    public tokenHelper: TokenHelper,
  ) {
    this.tokenHelper.getCurrentToken().then((value) => {
      this.tokenInfo = value;
    });
    this.cmsApiStoreSubscribe = this.tokenHelper.getCurrentTokenOnChange().subscribe((next) => {
      this.tokenInfo = next;
    });
  }
  tokenInfo: TokenInfoModel;
  cmsApiStoreSubscribe: Subscription;
  loadDemoDashboard = environment.loadDemoDashboard;
  ngOnDestroy() {
    this.cmsApiStoreSubscribe.unsubscribe();
  }

}
