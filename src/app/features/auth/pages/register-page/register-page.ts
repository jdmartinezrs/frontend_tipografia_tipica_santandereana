import { Component } from '@angular/core';
import { AuthCard } from '../../components/auth-card/auth-card';
import { RegisterForm, RegisterValue } from '../../components/register-form/register-form';

@Component({
  selector: 'app-register-page',
  imports: [AuthCard, RegisterForm],
  template: `
    <app-auth-card [maxWidth]="680">
      <app-register-form (submitted)="onRegister($event)" />
    </app-auth-card>
  `,
})
export class RegisterPage {
  onRegister(value: RegisterValue) {
    // TODO: conectar con AuthService (features/auth/services)
    console.log(value);
  }
}