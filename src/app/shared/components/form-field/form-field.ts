import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { formError } from '../../utils/form-errors';

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule],
  templateUrl: './form-field.html',
})
export class FormField {
  passwordVisible = signal(false);
  id = input.required<string>();
  label = input('');
  control = input.required<FormControl<string>>();
  type = input<'text' | 'password' | 'email' | 'tel'>('text');
  placeholder = input('');
  autocomplete = input('off');

  togglePasswordVisibility() {
    this.passwordVisible.update((visible) => !visible);
  }

  get showError() {
    return this.control().touched && this.control().invalid;
  }
  get message() {
    return formError(this.control());
  }
}
