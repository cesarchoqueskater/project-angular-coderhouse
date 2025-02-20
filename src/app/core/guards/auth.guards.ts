import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    console.log('[authGuard] Se disparo authGuard');

    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.isAuthenticated().pipe(
        map((isAuthenticated) => {
            if (!isAuthenticated) {
                return router.createUrlTree(['auth', 'login']);
            }
            return isAuthenticated;
        })
    );
};