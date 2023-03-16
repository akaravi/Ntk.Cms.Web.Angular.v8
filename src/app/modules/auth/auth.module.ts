import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import { AuthSingInComponent } from './singin/singin.component';
import { SharedModule } from 'src/app/shared.module';
import { CoreAuthService, CoreConfigurationService, CoreModuleService } from 'ntk-cms-api';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    AuthSingInComponent
  ],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    CoreModuleService,
    CoreConfigurationService,
    CoreAuthService
  ]
})
export class AuthModule {}
