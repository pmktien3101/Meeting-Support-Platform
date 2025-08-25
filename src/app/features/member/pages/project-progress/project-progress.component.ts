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

interface ProjectTaskItem {
  id: number;
  title: string;
  assignee?: string;
  done: boolean;
  due?: string;
}

interface TimelineEvent {
  id: number;
  date: string;
  label: string;
  type: 'milestone' | 'task' | 'note';
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

  // Modal states + data
  isDetailsOpen = false;
  isTasksOpen = false;
  isTimelineOpen = false;

  activeProject: Project | null = null;
  taskItems: ProjectTaskItem[] = [];
  timelineEvents: TimelineEvent[] = [];

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

  // Open modals
  viewProjectDetails(project: Project): void {
    this.activeProject = project;
    this.isDetailsOpen = true;
  }

  viewProjectTasks(project: Project): void {
    this.activeProject = project;
    this.taskItems = [
      { id: 1, title: 'Xác định yêu cầu chi tiết', done: true, assignee: 'BA Trần C', due: 'Hôm qua' },
      { id: 2, title: 'Xây dựng API Users', done: false, assignee: 'Dev A', due: 'Tuần này' },
      { id: 3, title: 'Thiết kế UI Dashboard', done: false, assignee: 'Designer E', due: 'Thứ 6' }
    ];
    this.isTasksOpen = true;
  }

  viewProjectTimeline(project: Project): void {
    this.activeProject = project;
    this.timelineEvents = [
      { id: 1, date: '01/12', label: 'Milestone: Thiết kế UI/UX', type: 'milestone' },
      { id: 2, date: '05/12', label: 'Task: Hoàn tất App Design', type: 'task' },
      { id: 3, date: '10/12', label: 'Milestone: Frontend Development', type: 'milestone' }
    ];
    this.isTimelineOpen = true;
  }

  // Close modals
  closeDetails(): void { this.isDetailsOpen = false; }
  closeTasks(): void { this.isTasksOpen = false; }
  closeTimeline(): void { this.isTimelineOpen = false; }

  // Quick actions (stubs)
  viewActiveProjects(): void { console.log('QuickAction: Active projects'); }
  viewCompletedProjects(): void { console.log('QuickAction: Completed projects'); }
  viewProjectReports(): void { console.log('QuickAction: Project reports'); }
  viewTeamPerformance(): void { console.log('QuickAction: Team performance'); }
}