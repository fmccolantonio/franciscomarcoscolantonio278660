import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  // Clona a requisição e adiciona o cabeçalho se tiver token
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((err) => {
      // Se der erro 401 (Não autorizado), manda pro login
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
