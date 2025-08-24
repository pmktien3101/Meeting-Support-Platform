import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  manager: string;
  deadline: string;
  totalTasks: number;
  completedTasks: number;
  teamSize: number;
  milestones: Milestone[];
}

interface Milestone {
  id: number;
  title: string;
  date: string;
  completed: boolean;
}

@Component({
  selector: 'app-member-project-progress',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-progress.component.html',
  styleUrls: ['./project-progress.component.scss']
})
export class MemberProjectProgressComponent {
  // Project stats
  projectStats = signal({
    total: 5,
    inProgress: 3,
    completed: 1,
    averageProgress: 68
  });

  // All projects data
  projects = signal<Project[]>([
    {
      id: 1,
      name: 'E-commerce Platform',
      status: 'active',
      priority: 'high',
      progress: 75,
      manager: 'PM Nguyễn Văn B',
      deadline: '15/12/2024',
      totalTasks: 24,
      completedTasks: 18,
      teamSize: 8,
      milestones: [
        {
          id: 1,
          title: 'Thiết kế UI/UX',
          date: '01/12/2024',
          completed: true
        },
        {
          id: 2,
          title: 'Frontend Development',
          date: '10/12/2024',
          completed: true
        },
        {
          id: 3,
          title: 'Backend API',
          date: '20/12/2024',
          completed: false
        }
      ]
    },
    {
      id: 2,
      name: 'Mobile App',
      status: 'active',
      priority: 'medium',
      progress: 45,
      manager: 'Tech Lead Lê Văn D',
      deadline: '20/12/2024',
      totalTasks: 18,
      completedTasks: 8,
      teamSize: 5,
      milestones: [
        {
          id: 1,
          title: 'App Design',
          date: '05/12/2024',
          completed: true
        },
        {
          id: 2,
          title: 'Core Features',
          date: '15/12/2024',
          completed: false
        }
      ]
    },
    {
      id: 3,
      name: 'Backend Service',
      status: 'completed',
      priority: 'low',
      progress: 100,
      manager: 'PM Nguyễn Văn B',
      deadline: '10/12/2024',
      totalTasks: 12,
      completedTasks: 12,
      teamSize: 4,
      milestones: [
        {
          id: 1,
          title: 'API Development',
          date: '01/12/2024',
          completed: true
        },
        {
          id: 2,
          title: 'Testing & Deployment',
          date: '10/12/2024',
          completed: true
        }
      ]
    }
  ]);

  // Helper methods
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'Đang thực hiện',
      'completed': 'Hoàn thành',
      'on-hold': 'Tạm dừng',
      'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
  }

  getPriorityText(priority: string): string {
    const priorityMap: { [key: string]: string } = {
      'high': 'Cao',
      'medium': 'Trung bình',
      'low': 'Thấp'
    };
    return priorityMap[priority] || priority;
  }

  isOverdue(deadline: string): boolean {
    // TODO: Implement proper date comparison logic
    return deadline === 'Quá hạn';
  }

  // Action methods
  refreshProgress(): void {
    console.log('Refreshing project progress...');
    // TODO: Implement API call to refresh project progress
  }

  exportProgress(): void {
    console.log('Exporting project progress...');
    // TODO: Implement export functionality
  }

  viewProjectDetails(project: Project): void {
    console.log('Viewing project details:', project.name);
    // TODO: Navigate to project details page
  }

  viewProjectTasks(project: Project): void {
    console.log('Viewing project tasks:', project.name);
    // TODO: Navigate to project tasks page
  }

  viewProjectTimeline(project: Project): void {
    console.log('Viewing project timeline:', project.name);
    // TODO: Navigate to project timeline page
  }

  viewActiveProjects(): void {
    console.log('Viewing active projects');
    // TODO: Filter to show only active projects
  }

  viewCompletedProjects(): void {
    console.log('Viewing completed projects');
    // TODO: Filter to show only completed projects
  }

  viewProjectReports(): void {
    console.log('Viewing project reports');
    // TODO: Navigate to project reports page
  }

  viewTeamPerformance(): void {
    console.log('Viewing team performance');
    // TODO: Navigate to team performance page
  }
}
