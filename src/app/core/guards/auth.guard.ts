import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean | UrlTree {
    return this.authService.isAuthenticated()
      ? true
      : this.router.createUrlTree(['/login']);
  }
}

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: any): boolean | UrlTree {
    const requiredRoles = route.data?.['roles'] as string[];
    const user = this.authService.getCurrentUser();

    if (!user) return this.router.createUrlTree(['/login']);
    if (!requiredRoles?.length || requiredRoles.includes(user.role)) {
      return true;
    }
    return this.router.createUrlTree(['/unauthorized']);
  }
}
