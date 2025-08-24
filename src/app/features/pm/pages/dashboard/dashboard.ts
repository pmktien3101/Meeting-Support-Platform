import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

@Component({
  selector: 'app-pm-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class PmDashboard {
  private layoutComponent = inject(PmLayoutComponent);

  // Delegate methods to layout component
  getProjects() { return this.layoutComponent.getProjects(); }
  getMilestones() { return this.layoutComponent.getMilestones(); }
  getTeamMembers() { return this.layoutComponent.getTeamMembers(); }
  getNotifications() { return this.layoutComponent.getNotifications(); }
  openCreateProject() { return this.layoutComponent.openCreateProject(); }
  openCreateMeeting() { return this.layoutComponent.openCreateMeeting(); }
  markAsRead(id: string) { return this.layoutComponent.markAsRead(id); }
  markAllAsRead() { return this.layoutComponent.markAllAsRead(); }

  getProjectStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'planning': 'Lập kế hoạch',
      'active': 'Đang thực hiện',
      'on-hold': 'Tạm dừng',
      'completed': 'Hoàn thành'
    };
    return statusMap[status] || status;
  }

  getMilestoneStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Chờ thực hiện',
      'in-progress': 'Đang thực hiện',
      'completed': 'Hoàn thành',
      'delayed': 'Bị trễ'
    };
    return statusMap[status] || status;
  }
}
