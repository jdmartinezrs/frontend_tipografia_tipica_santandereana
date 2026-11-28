import { Component, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { FormField } from '../../../../shared/components/form-field/form-field';
import { SelectField, SelectOption } from '../../../../shared/components/select-field/select-field';
import { LocationsService } from '../../services/locations.service';

export interface RegisterValue {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dialCode: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const matchesPassword: ValidatorFn = (control) =>
  control.parent && control.value !== control.parent.get('password')?.value
    ? { mismatch: true }
    : null;

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterLink, FormField, SelectField, AppButton],
  templateUrl: './register-form.html',
})
export class RegisterForm {
  private fb = inject(NonNullableFormBuilder);
  private locations = inject(LocationsService);

  submitted = output<RegisterValue>();
  submitting = input(false);

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', Validators.maxLength(100)],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    username: ['', [Validators.required, Validators.maxLength(50)]],
    dialCode: ['+57'],
    phone: ['', [Validators.maxLength(20), Validators.pattern(/^\d{0,12}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]],
    confirmPassword: ['', [Validators.required, matchesPassword]],
  });

  dialOptions: SelectOption[] = this.locations.countries.map((country) => ({
    value: country.dialCode,
    label: `${country.code} ${country.dialCode}`,
  }));

  constructor() {
    const { password, confirmPassword } = this.form.controls;
    password.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => confirmPassword.updateValueAndValidity());
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}
