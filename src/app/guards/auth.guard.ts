import { CanActivateFn, Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
   const authService = inject(UsuariosService);
  const router = inject(Router);

  const token = localStorage.getItem(authService.tokenkey);

  if (token && authService.isTokenValid(token)) {
    return true;
  }

  authService.logout();
  router.navigate(['/login']);
  return true;
};
