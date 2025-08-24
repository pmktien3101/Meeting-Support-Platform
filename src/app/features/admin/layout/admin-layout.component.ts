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
  template: `
    <div class="admin-layout">
      <!-- Sidebar -->
      <aside class="sidebar" [class.collapsed]="sidebarCollapsed()">
        <div class="sidebar-header">
          <div class="logo">
            <span class="logo-icon">⚙️</span>
            <span class="logo-text" *ngIf="!sidebarCollapsed()">Admin</span>
          </div>
          <button 
            class="sidebar-toggle"
            (click)="toggleSidebar()"
            title="Toggle sidebar"
          >
            <span class="toggle-icon">{{ sidebarCollapsed() ? '→' : '←' }}</span>
          </button>
        </div>

        <nav class="sidebar-nav">
          <ul class="nav-list">
            <li 
              *ngFor="let item of menuItems" 
              class="nav-item"
            >
              <a 
                [routerLink]="item.route"
                routerLinkActive="active"
                class="nav-link"
                [title]="sidebarCollapsed() ? item.label : ''"
              >
                <span class="nav-icon">{{ item.icon }}</span>
                <span class="nav-label" *ngIf="!sidebarCollapsed()">{{ item.label }}</span>
                <span 
                  class="nav-badge" 
                  *ngIf="item.badge && !sidebarCollapsed()"
                >
                  {{ item.badge }}
                </span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="sidebar-footer" *ngIf="!sidebarCollapsed()">
          <div class="user-info">
            <div class="user-avatar">{{ currentUser().avatar }}</div>
            <div class="user-details">
              <div class="user-name">{{ currentUser().name }}</div>
              <div class="user-role">{{ currentUser().role }}</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <h1 class="page-title">Cổng Quản Trị</h1>
          </div>
          
          <div class="topbar-right">
            <!-- User Menu -->
            <div class="user-menu">
              <button 
                class="user-menu-toggle"
                (click)="toggleUserMenu()"
                title="Menu người dùng"
              >
                <div class="user-avatar-small">{{ currentUser().avatar }}</div>
                <span class="user-name-small" *ngIf="!sidebarCollapsed()">{{ currentUser().name }}</span>
                <span class="dropdown-icon">▼</span>
              </button>

              <div class="user-dropdown" *ngIf="userMenuOpen()">
                <div class="dropdown-header">
                  <div class="dropdown-avatar">{{ currentUser().avatar }}</div>
                  <div class="dropdown-user-info">
                    <div class="dropdown-name">{{ currentUser().name }}</div>
                    <div class="dropdown-email">{{ currentUser().email }}</div>
                  </div>
                </div>
                
                <div class="dropdown-menu">
                  <a href="#" class="dropdown-item">
                    <span class="item-icon">👤</span>
                    Hồ Sơ
                  </a>
                  <a href="#" class="dropdown-item">
                    <span class="item-icon">⚙️</span>
                    Cài Đặt
                  </a>
                  <div class="dropdown-divider"></div>
                  <button 
                    class="dropdown-item logout-item"
                    (click)="logout()"
                  >
                    <span class="item-icon">🚪</span>
                    Đăng Xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
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
      label: 'Dự Án',
      icon: '📁',
      route: '/admin/projects'
    },
    {
      label: 'Cài Đặt',
      icon: '⚙️',
      route: '/admin/settings'
    },
    {
      label: 'Người Dùng',
      icon: '👥',
      route: '/admin/users'
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


