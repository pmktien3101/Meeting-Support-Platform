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
  selector: 'app-member-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './member-layout.component.html',
  styleUrls: ['./member-layout.component.scss']
})
export class MemberLayoutComponent {
  // UI state
  sidebarCollapsed = signal(false);
  userMenuOpen = signal(false);
  authService = inject(AuthService);
  router = inject(Router);
  
  // User data
  currentUser = signal({
    name: 'Team Member',
    email: 'member@company.com',
    avatar: 'TM',
    role: 'Thành Viên Nhóm'
  });

  // Notification count
  notificationCount = signal(3);

  // Navigation menu with all required features
  menuItems: MenuItem[] = [
    {
      label: 'Bảng Điều Khiển',
      icon: '📊',
      route: '/member/dashboard'
    },
    {
      label: 'Cuộc Họp',
      icon: '📅',
      route: '/member/meetings',
      badge: '2'
    },
    {
      label: 'Nhiệm Vụ',
      icon: '✅',
      route: '/member/tasks',
      badge: '5'
    },
    {
      label: 'Lịch Sử Họp',
      icon: '📋',
      route: '/member/meeting-history'
    },
    {
      label: 'Tiến Độ Dự Án',
      icon: '📈',
      route: '/member/project-progress'
    },
    {
      label: 'Giao Tiếp',
      icon: '💬',
      route: '/member/communication'
    },
    {
      label: 'Hồ Sơ',
      icon: '👤',
      route: '/member/profile'
    },
    {
      label: 'Cài Đặt',
      icon: '⚙️',
      route: '/member/settings'
    }
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed.update(collapsed => !collapsed);
  }

  toggleUserMenu(): void {
    this.userMenuOpen.update(open => !open);
  }

  toggleNotifications(): void {
    // TODO: Implement notifications panel
    console.log('Toggle notifications');
  }

  getPageTitle(): string {
    const currentRoute = this.router.url;
    if (currentRoute.includes('dashboard')) return 'Bảng Điều Khiển';
    if (currentRoute.includes('meetings')) return 'Quản Lý Cuộc Họp';
    if (currentRoute.includes('tasks')) return 'Quản Lý Nhiệm Vụ';
    if (currentRoute.includes('meeting-history')) return 'Lịch Sử Cuộc Họp';
    if (currentRoute.includes('project-progress')) return 'Tiến Độ Dự Án';
    if (currentRoute.includes('communication')) return 'Giao Tiếp & Phản Hồi';
    if (currentRoute.includes('profile')) return 'Hồ Sơ Cá Nhân';
    if (currentRoute.includes('settings')) return 'Cài Đặt';
    if (currentRoute.includes('change-password')) return 'Đổi Mật Khẩu';
    return 'Cổng Thành Viên';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }
}


