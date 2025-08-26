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
  selector: 'app-business-owner-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './business-owner-layout.component.html',
  styleUrls: ['./business-owner-layout.component.scss']
})
export class BusinessOwnerLayoutComponent {
  // UI state
  sidebarCollapsed = signal(false);
  userMenuOpen = signal(false);
  authService = inject(AuthService);
  router = inject(Router);
  
  // User data
  currentUser = signal({
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    avatar: 'SJ',
    role: 'Chủ Doanh Nghiệp'
  });

  // Navigation menu - Updated with correct structure
  menuItems: MenuItem[] = [
    {
      label: 'Quản Lý Tài Khoản',
      icon: '👥',
      route: '/business-owner/team'
    },
    {
      label: 'Tổng Quan Dự Án',
      icon: '📊',
      route: '/business-owner/dashboard'
    },
    {
      label: 'Dashboard Thống Kê',
      icon: '📈',
      route: '/business-owner/analytics'
    },
    {
      label: 'Báo Cáo AI & Phân Tích',
      icon: '🤖',
      route: '/business-owner/reports'
    },
    {
      label: 'Quản Lý Tổ Chức',
      icon: '🏢',
      route: '/business-owner/organization'
    }
  ];

  // Quick stats - Updated to reflect new structure
  quickStats = signal([
    {
      label: 'Dự Án Đang Hoạt Động',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: '📁'
    },
    {
      label: 'Thành Viên Nhóm',
      value: '45',
      change: '+5',
      changeType: 'positive',
      icon: '👥'
    },
    {
      label: 'Báo Cáo AI',
      value: '23',
      change: '+8',
      changeType: 'positive',
      icon: '🤖'
    },
    {
      label: 'Phòng Ban',
      value: '8',
      change: '+1',
      changeType: 'positive',
      icon: '🏢'
    }
  ]);

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

  getChangeColor(changeType: string): string {
    return changeType === 'positive' ? '#38a169' : '#e53e3e';
  }
}
