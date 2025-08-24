import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

@Component({
  selector: 'app-pm-milestones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './milestones.html',
  styleUrls: ['./milestones.scss']
})
export class PmMilestones {
  private layoutComponent = inject(PmLayoutComponent);

  milestones = [
    {
      id: '1',
      name: 'Thiết Kế UI/UX',
      description: 'Thiết kế giao diện người dùng và trải nghiệm người dùng',
      startDate: '2024-01-01',
      endDate: '2024-02-15',
      status: 'completed',
      progress: 100
    },
    {
      id: '2',
      name: 'Phát Triển Frontend',
      description: 'Xây dựng giao diện người dùng với React/Angular',
      startDate: '2024-02-16',
      endDate: '2024-04-30',
      status: 'in-progress',
      progress: 75
    },
    {
      id: '3',
      name: 'Phát Triển Backend',
      description: 'Xây dựng hệ thống backend và API',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      status: 'in-progress',
      progress: 60
    },
    {
      id: '4',
      name: 'Testing & QA',
      description: 'Kiểm thử và đảm bảo chất lượng',
      startDate: '2024-05-01',
      endDate: '2024-06-15',
      status: 'pending',
      progress: 0
    }
  ];

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Chờ thực hiện',
      'in-progress': 'Đang thực hiện',
      'completed': 'Hoàn thành',
      'delayed': 'Bị trễ'
    };
    return statusMap[status] || status;
  }

  openCreateMilestone(): void {
    console.log('Opening create milestone modal...');
    // TODO: Implement create milestone modal
  }

  getInProgressCount(): number {
    return this.milestones.filter(m => m.status === 'in-progress').length;
  }

  getCompletedCount(): number {
    return this.milestones.filter(m => m.status === 'completed').length;
  }

  getAverageProgress(): number {
    const totalProgress = this.milestones.reduce((sum, m) => sum + m.progress, 0);
    return Math.round(totalProgress / this.milestones.length);
  }
}
