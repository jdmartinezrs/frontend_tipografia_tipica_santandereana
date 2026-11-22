import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule],
  templateUrl: './form-field.html',
})
export class FormField {
  id = input.required<string>();
  label = input.required<string>();
  control = input.required<FormControl<string>>();
  type = input<'text' | 'password' | 'email' | 'tel'>('text');
  placeholder = input('');
  autocomplete = input('off');

  get showError(): boolean {
    return this.control().touched && this.control().invalid;
  }

  get message(): string {
    const errors = this.control().errors;
    if (!errors) return '';
    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'Ingresa un correo válido';
    if (errors['minlength']) {
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    }
    return 'Valor no válido';
  }
}
