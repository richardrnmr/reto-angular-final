import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('user');

  if (isAuthenticated) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
