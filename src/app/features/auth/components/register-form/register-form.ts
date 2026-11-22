import { Component, computed, inject, output } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
  country: string;
  department: string;
  city: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
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

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    dialCode: ['+57'],
    phone: ['', [Validators.required, Validators.pattern(/^\d{7,12}$/)]],
    country: ['CO', Validators.required],
    department: ['', Validators.required],
    city: [{ value: '', disabled: true }, Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, matchesPassword]],
    terms: [false, Validators.requiredTrue],
  });

  private country = toSignal(this.form.controls.country.valueChanges, {
    initialValue: this.form.controls.country.value,
  });
  private department = toSignal(this.form.controls.department.valueChanges, {
    initialValue: '',
  });

  countryOptions: SelectOption[] = this.locations.countries.map((c) => ({
    value: c.code,
    label: c.name,
  }));

  dialOptions: SelectOption[] = this.locations.countries.map((c) => ({
    value: c.dialCode,
    label: `${c.code} ${c.dialCode}`,
  }));

  departmentOptions = computed<SelectOption[]>(() =>
    this.locations.departmentsOf(this.country()).map((d) => ({ value: d.name, label: d.name })),
  );

  cityOptions = computed<SelectOption[]>(() =>
    this.locations
      .citiesOf(this.country(), this.department())
      .map((name) => ({ value: name, label: name })),
  );

  constructor() {
    const { country, department, city, dialCode, password, confirmPassword } = this.form.controls;

    // País cambia → limpia departamento (y por cascada ciudad) y ajusta el indicativo
    country.valueChanges.pipe(takeUntilDestroyed()).subscribe((code) => {
      department.reset('');
      const dial = this.locations.dialCodeOf(code);
      if (dial) dialCode.setValue(dial);
    });

    // Departamento cambia → limpia ciudad y la habilita solo si hay departamento
    department.valueChanges.pipe(takeUntilDestroyed()).subscribe((name) => {
      city.reset('');
      if (name) city.enable();
      else city.disable();
    });

    // Si cambia la contraseña, revalida la confirmación
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