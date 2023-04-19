import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeModeSwitcherComponent } from './theme-mode-switcher.component';

@NgModule({
  declarations: [ThemeModeSwitcherComponent],
  imports: [CommonModule, InlineSVGModule, SharedModule.forRoot(),],
  exports: [ThemeModeSwitcherComponent],
})
export class ThemeModeModule { }
