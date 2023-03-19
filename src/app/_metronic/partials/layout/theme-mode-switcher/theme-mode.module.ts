import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ThemeModeSwitcherComponent } from './theme-mode-switcher.component';
import { TranslationModule } from 'src/app/modules/i18n';

@NgModule({
  declarations: [ThemeModeSwitcherComponent],
  imports: [CommonModule, InlineSVGModule,TranslationModule,],
  exports: [ThemeModeSwitcherComponent],
})
export class ThemeModeModule {}
