import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  // UI state
  sidebarCollapsed = signal(false);
  userMenuOpen = signal(false);
  authService = inject(AuthService);
  router = inject(Router);
  
  // User data
  currentUser = signal({
    name: 'Admin User',
    email: 'admin@company.com',
    avatar: 'AU',
    role: 'Quản Trị Viên Hệ Thống'
  });

  // Navigation menu
  menuItems: MenuItem[] = [
    {
      label: 'Bảng Điều Khiển',
      icon: '📊',
      route: '/admin/dashboard'
    },
    {
      label: 'Quản Lý Doanh Nghiệp',
      icon: '🏢',
      route: '/admin/business',
    },
    {
      label: 'Doanh Thu',
      icon: '💰',
      route: '/admin/revenue'
    },
    {
      label: 'Hệ Thống & Cấu Hình',
      icon: '⚙️',
      route: '/admin/system'
    }
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed.update(collapsed => !collapsed);
  }

  toggleUserMenu(): void {
    this.userMenuOpen.update(open => !open);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }
}


