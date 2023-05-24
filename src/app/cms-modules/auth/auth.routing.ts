import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthSingInBySmsComponent } from './singin-bysms/singin-bysms.component';
import { AuthSingInComponent } from './singin/singin.component';
import { AuthSingoutComponent } from './singout/singout.component';
import { AuthSingUpComponent } from './singup/singup.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'singin',
        component: AuthSingInComponent,
        data: { title: 'ROUTE.REGISTER.SIGNIN' },
      },
      {
        path: 'singinbysms',
        component: AuthSingInBySmsComponent,
        data: { title: 'ROUTE.REGISTER.SIGNINBYSMS' },
      },
      {
        path: 'singout',
        component: AuthSingoutComponent,
        data: { title: 'ROUTE.REGISTER.SIGNOUT' },
      },
      {
        path: 'singup',
        component: AuthSingUpComponent,
        data: {
          title: 'ROUTE.REGISTER.SIGNUP',
        },
      },
      {
        path: 'forgot-password',
        component: AuthForgotPasswordComponent,
        data: { title: 'AUTH.REGISTER.FORGETPASSWORD' },
      },
      { path: '', redirectTo: 'singinbysms', pathMatch: 'full' },
      { path: '**', redirectTo: 'singinbysms', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
