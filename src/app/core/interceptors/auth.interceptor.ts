import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const isPublicAuthRequest = request.url === `${environment.apiUrl}/auth/login`
    || (request.method === 'POST' && request.url === `${environment.apiUrl}/usuarios`);
  const accessToken = isPublicAuthRequest ? null : inject(AuthService).accessToken();

  if (!accessToken) return next(request);

  return next(request.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` },
  }));
};
