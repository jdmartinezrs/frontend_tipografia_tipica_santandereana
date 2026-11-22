import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { formError } from '../../utils/form-errors';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-field',
  imports: [ReactiveFormsModule],
  templateUrl: './select-field.html',
})
export class SelectField {
  id = input.required<string>();
  label = input('');
  ariaLabel = input('');
  control = input.required<FormControl<string>>();
  options = input.required<SelectOption[]>();
  placeholder = input('Selecciona una opción');

  get showError() {
    return this.control().touched && this.control().invalid;
  }
  get message() {
    return formError(this.control());
  }
}