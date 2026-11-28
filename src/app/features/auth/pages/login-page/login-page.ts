import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCard } from '../../components/auth-card/auth-card';
import { LoginForm, LoginValue } from '../../components/login-form/login-form';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [AuthCard, LoginForm],
  template: `
    <app-auth-card>
      @if (error()) {
        <p role="alert" class="mb-4 text-sm font-medium text-[#7a1f1f]">{{ error() }}</p>
      }
      <app-login-form [submitting]="submitting()" (submitted)="onLogin($event)" />
    </app-auth-card>
  `,
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);
  submitting = signal(false);
  error = signal('');

  onLogin(value: LoginValue) {
    if (this.submitting()) return;
    this.submitting.set(true);
    this.error.set('');

    this.auth.login({ username: value.username.trim(), password: value.password }, value.remember)
      .subscribe({
        next: () => {
          this.submitting.set(false);
          void this.router.navigateByUrl('/fuentes');
        },
        error: (error: HttpErrorResponse) => {
          const message = error.error && typeof error.error === 'object' && 'message' in error.error
            ? error.error.message
            : null;
          this.error.set(typeof message === 'string' && message.trim()
            ? message
            : 'No fue posible iniciar sesión. Verifica tus datos e inténtalo de nuevo.');
          this.submitting.set(false);
        },
      });
  }
}
