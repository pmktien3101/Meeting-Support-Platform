import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

@Component({
  selector: 'app-pm-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class PmProjects {
  private layoutComponent = inject(PmLayoutComponent);

  // Mock data for projects
  projects = [
    {
      id: '1',
      name: 'Website E-commerce',
      description: 'Phát triển website bán hàng trực tuyến với đầy đủ tính năng',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      manager: 'PM001',
      status: 'active',
      progress: 65
    },
    {
      id: '2',
      name: 'Mobile App',
      description: 'Ứng dụng di động đa nền tảng cho khách hàng',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      manager: 'PM002',
      status: 'planning',
      progress: 15
    },
    {
      id: '3',
      name: 'CRM System',
      description: 'Hệ thống quản lý quan hệ khách hàng tích hợp',
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      manager: 'PM003',
      status: 'active',
      progress: 45
    }
  ];

  // Delegate methods to layout component
  openCreateProject() { return this.layoutComponent.openCreateProject(); }

  getProjectStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'planning': 'Lập kế hoạch',
      'active': 'Đang thực hiện',
      'on-hold': 'Tạm dừng',
      'completed': 'Hoàn thành'
    };
    return statusMap[status] || status;
  }

  getActiveProjectsCount(): number {
    return this.projects.filter(p => p.status === 'active').length;
  }

  getCompletedProjectsCount(): number {
    return this.projects.filter(p => p.status === 'completed').length;
  }

  getAverageProgress(): number {
    const totalProgress = this.projects.reduce((sum, p) => sum + p.progress, 0);
    return Math.round(totalProgress / this.projects.length);
  }
}
