import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

@Component({
  selector: 'app-pm-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']
})
export class Reports {
  private layoutComponent = inject(PmLayoutComponent);

  // Mock data for reports
  projects = [
    { id: '1', name: 'Website E-commerce', status: 'completed', progress: 100 },
    { id: '2', name: 'Mobile App', status: 'in-progress', progress: 75 },
    { id: '3', name: 'CRM System', status: 'in-progress', progress: 45 },
    { id: '4', name: 'Data Analytics', status: 'planning', progress: 20 },
    { id: '5', name: 'API Gateway', status: 'completed', progress: 100 },
    { id: '6', name: 'User Portal', status: 'in-progress', progress: 60 }
  ];

  teamMembers = [
    { id: '1', name: 'Nguyễn Văn A', performance: 95, tasksCompleted: 45 },
    { id: '2', name: 'Trần Thị B', performance: 88, tasksCompleted: 38 },
    { id: '3', name: 'Lê Văn C', performance: 92, tasksCompleted: 42 },
    { id: '4', name: 'Phạm Thị D', performance: 85, tasksCompleted: 35 },
    { id: '5', name: 'Hoàng Văn E', performance: 90, tasksCompleted: 40 }
  ];

  timelineData = {
    onSchedule: 78,
    delayed: 15,
    ahead: 7,
    riskLevel: 12
  };

  resourceData = {
    budgetUsed: 65,
    currentResources: 8,
    efficiency: 82,
    costForecast: '2.5M VND'
  };

  // Helper methods for overview cards
  getTotalProjects(): number {
    return this.projects.length;
  }

  getCompletedProjects(): number {
    return this.projects.filter(p => p.status === 'completed').length;
  }

  getInProgressProjects(): number {
    return this.projects.filter(p => p.status === 'in-progress').length;
  }

  getTeamMembers(): number {
    return this.teamMembers.length;
  }

  // Helper methods for progress report
  getCompletionRate(): number {
    const completed = this.getCompletedProjects();
    const total = this.getTotalProjects();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  // Helper methods for performance report
  getAveragePerformance(): number {
    const total = this.teamMembers.reduce((sum, member) => sum + member.performance, 0);
    return Math.round(total / this.teamMembers.length);
  }

  getCompletedTasks(): number {
    return this.teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0);
  }

  getOnTimeRate(): number {
    // Mock calculation - in real app this would come from actual data
    return 87;
  }

  // Helper methods for timeline report
  getOnScheduleRate(): number {
    return this.timelineData.onSchedule;
  }

  getDelayedRate(): number {
    return this.timelineData.delayed;
  }

  getAheadRate(): number {
    return this.timelineData.ahead;
  }

  getRiskRate(): number {
    return this.timelineData.riskLevel;
  }

  // Helper methods for resource report
  getBudgetUsed(): number {
    return this.resourceData.budgetUsed;
  }

  getCurrentResources(): number {
    return this.resourceData.currentResources;
  }

  getResourceEfficiency(): number {
    return this.resourceData.efficiency;
  }

  getCostForecast(): string {
    return this.resourceData.costForecast;
  }

  // Action methods
  generateReport(): void {
    console.log('Generating new report...');
    // TODO: Implement report generation logic
  }

  exportData(): void {
    console.log('Exporting data...');
    // TODO: Implement data export logic
  }

  refreshReport(reportType: string): void {
    console.log('Refreshing report:', reportType);
    // TODO: Implement report refresh logic
  }

  exportReport(reportType: string): void {
    console.log('Exporting report:', reportType);
    // TODO: Implement report export logic
  }

  scheduleReport(): void {
    console.log('Scheduling report...');
    // TODO: Implement report scheduling logic
  }

  customizeReport(): void {
    console.log('Customizing report...');
    // TODO: Implement report customization logic
  }

  shareReport(): void {
    console.log('Sharing report...');
    // TODO: Implement report sharing logic
  }
}


