import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: string[]) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    // Kiểm tra xem user có đăng nhập không
    if (!authService.isAuthenticated()) {
      // Nếu chưa đăng nhập thì redirect về login
      router.navigate(['/auth/login']);
      return false;
    }
    
    // Kiểm tra role của user
    const userRole = authService.getUserRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Nếu không có quyền thì redirect về landing
      router.navigate(['/public/landing']);
      return false;
    }
    
    return true;
  };
};
