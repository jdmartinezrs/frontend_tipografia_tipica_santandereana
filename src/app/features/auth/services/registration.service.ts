import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

export interface RegisterRequest {
  nombre: string;
  apellidos?: string;
  username: string;
  email: string;
  password: string;
  telefono?: string;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private http = inject(HttpClient);

  register(request: RegisterRequest) {
    return this.http.post(`${environment.apiUrl}/usuarios`, request);
  }
}
