import { Component } from '@angular/core';
import { AuthCard } from '../../components/auth-card/auth-card';
import { LoginForm, LoginValue } from '../../components/login-form/login-form';

@Component({
  selector: 'app-login-page',
  imports: [AuthCard, LoginForm],
  template: `
    <app-auth-card>
      <app-login-form (submitted)="onLogin($event)" />
    </app-auth-card>
  `,
})
export class LoginPage {
  onLogin(value: LoginValue) {
    // TODO: conectar con AuthService (features/auth/services)
    console.log(value);
  }
}