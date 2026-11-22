import { AbstractControl } from '@angular/forms';

export function formError(control: AbstractControl): string {
  const e = control.errors;
  if (!e) return '';
  if (e['required']) return 'Este campo es obligatorio';
  if (e['email']) return 'Ingresa un correo válido';
  if (e['minlength']) return `Mínimo ${e['minlength'].requiredLength} caracteres`;
  if (e['pattern']) return 'Formato no válido';
  if (e['mismatch']) return 'Las contraseñas no coinciden';
  return 'Valor no válido';
}