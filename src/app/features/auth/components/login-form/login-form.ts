import { Component, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormField } from '../../../../shared/components/form-field/form-field';
import { AppButton } from '../../../../shared/components/app-button/app-button';

export interface LoginValue {
  username: string;
  password: string;
  remember: boolean;
}

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink, FormField, AppButton],
  templateUrl: './login-form.html',
})
export class LoginForm {
  private fb = inject(NonNullableFormBuilder);

  submitted = output<LoginValue>();
  submitting = input(false);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}
