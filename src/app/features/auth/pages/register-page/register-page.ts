import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthCard } from '../../components/auth-card/auth-card';
import { RegisterForm, RegisterValue } from '../../components/register-form/register-form';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-register-page',
  imports: [AuthCard, RegisterForm, RouterLink],
  template: `
    <app-auth-card [maxWidth]="680">
      @if (success()) {
        <div role="status" class="text-center text-[#2a1a05]">
          <p class="mb-4">Tu cuenta se creó correctamente. Ya puedes iniciar sesión.</p>
          <a routerLink="/auth/login" class="font-semibold text-[#2b1b3d] hover:underline">Ir a iniciar sesión</a>
        </div>
      } @else {
        @if (error()) {
          <p role="alert" class="mb-4 text-sm font-medium text-[#7a1f1f]">{{ error() }}</p>
        }
        <app-register-form [submitting]="submitting()" (submitted)="onRegister($event)" />
      }
    </app-auth-card>
  `,
})
export class RegisterPage {
  private registration = inject(RegistrationService);
  submitting = signal(false);
  success = signal(false);
  error = signal('');

  onRegister(value: RegisterValue) {
    if (this.submitting()) return;
    this.submitting.set(true);
    this.error.set('');

    const phone = value.phone ? `${value.dialCode}${value.phone}` : undefined;
    this.registration.register({
      nombre: value.firstName.trim(),
      ...(value.lastName.trim() ? { apellidos: value.lastName.trim() } : {}),
      username: value.username.trim(),
      email: value.email.trim(),
      password: value.password,
      ...(phone ? { telefono: phone } : {}),
    }).subscribe({
      next: () => {
        this.success.set(true);
        this.submitting.set(false);
      },
      error: (error: HttpErrorResponse) => {
        const message = error.error && typeof error.error === 'object' && 'message' in error.error
          ? error.error.message
          : null;
        this.error.set(typeof message === 'string' && message.trim()
          ? message
          : 'No fue posible crear la cuenta. Verifica tus datos e inténtalo de nuevo.');
        this.submitting.set(false);
      },
    });
  }
}
