import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Usa o método isLogged() que criamos no AuthService
  if (authService.isLogged()) {
    return true;
  }

  // Se não estiver logado, manda pro login
  router.navigate(['/login']);
  return false;
};