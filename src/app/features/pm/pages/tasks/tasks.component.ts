import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

@Component({
  selector: 'app-pm-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss']
})
export class PmTasks {
  private layoutComponent = inject(PmLayoutComponent);
  tasks = [
    {
      id: '1',
      title: 'Thiết kế trang chủ',
      description: 'Thiết kế giao diện trang chủ website với responsive design',
      assigneeId: '3',
      priority: 'high',
      startDate: '2024-02-01',
      dueDate: '2024-02-15',
      projectId: '1',
      milestoneId: '1',
      status: 'done'
    },
    {
      id: '2',
      title: 'Implement navigation menu',
      description: 'Xây dựng menu điều hướng chính với dropdown và mobile menu',
      assigneeId: '1',
      priority: 'medium',
      startDate: '2024-02-16',
      dueDate: '2024-02-28',
      projectId: '1',
      milestoneId: '2',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Setup database schema',
      description: 'Thiết kế và tạo cấu trúc cơ sở dữ liệu cho hệ thống',
      assigneeId: '2',
      priority: 'high',
      startDate: '2024-03-01',
      dueDate: '2024-03-15',
      projectId: '1',
      milestoneId: '3',
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Write API documentation',
      description: 'Viết tài liệu API cho các endpoint của hệ thống',
      assigneeId: '2',
      priority: 'low',
      startDate: '2024-03-20',
      dueDate: '2024-04-05',
      projectId: '1',
      milestoneId: '3',
      status: 'todo'
    },
    {
      id: '5',
      title: 'Create unit tests',
      description: 'Viết unit test cho các component và service',
      assigneeId: '4',
      priority: 'medium',
      startDate: '2024-04-01',
      dueDate: '2024-04-20',
      projectId: '1',
      milestoneId: '4',
      status: 'todo'
    },
    {
      id: '6',
      title: 'Performance optimization',
      description: 'Tối ưu hóa hiệu suất website và database queries',
      assigneeId: '1',
      priority: 'urgent',
      startDate: '2024-04-15',
      dueDate: '2024-05-01',
      projectId: '1',
      milestoneId: '2',
      status: 'review'
    }
  ];

  teamMembers = [
    { id: '1', name: 'Nguyễn Văn A' },
    { id: '2', name: 'Trần Thị B' },
    { id: '3', name: 'Lê Văn C' },
    { id: '4', name: 'Phạm Thị D' }
  ];

  projects = [
    { id: '1', name: 'Website E-commerce' },
    { id: '2', name: 'Mobile App' }
  ];

  documents = [
    { id: '1', name: 'Design Document.pdf', size: '1.2 MB' },
    { id: '2', name: 'API Specification.docx', size: '0.5 MB' },
    { id: '3', name: 'Database Schema.sql', size: '2.0 MB' }
  ];

  getPriorityText(priority: string): string {
    const priorityMap: { [key: string]: string } = {
      'low': 'Thấp',
      'medium': 'Trung bình',
      'high': 'Cao',
      'urgent': 'Khẩn cấp'
    };
    return priorityMap[priority] || priority;
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'todo': 'To-do',
      'in-progress': 'Đang thực hiện',
      'review': 'Đang review',
      'done': 'Hoàn thành'
    };
    return statusMap[status] || status;
  }

  getAssigneeName(assigneeId: string): string {
    const member = this.teamMembers.find(m => m.id === assigneeId);
    return member ? member.name : 'Chưa giao';
  }

  getProjectName(projectId: string): string {
    const project = this.projects.find(p => p.id === projectId);
    return project ? project.name : 'Không xác định';
  }

  updateTaskStatus(taskId: string): void {
    console.log('Updating task status for:', taskId);
    // TODO: Implement task status update logic
  }

  getTotalSize(): string {
    // Simple size calculation - in real app, you'd parse actual file sizes
    const totalMB = this.documents.reduce((total, doc) => {
      const size = doc.size;
      if (size.includes('MB')) {
        return total + parseFloat(size.replace(' MB', ''));
      } else if (size.includes('KB')) {
        return total + (parseFloat(size.replace(' KB', '')) / 1024);
      }
      return total;
    }, 0);
    return `${totalMB.toFixed(1)} MB`;
  }

  // Additional methods for tasks
  openCreateTask(): void {
    console.log('Opening create task modal');
    // TODO: Implement create task functionality
  }

  isOverdue(dueDate: string): boolean {
    const due = new Date(dueDate);
    const today = new Date();
    return due < today;
  }

  getTaskProgress(taskId: string): number {
    // Mock progress calculation - in real app this would come from actual data
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return 0;
    
    // Simple progress based on status
    switch (task.status) {
      case 'todo': return 0;
      case 'in-progress': return 50;
      case 'review': return 80;
      case 'done': return 100;
      default: return 0;
    }
  }

  getInProgressCount(): number {
    return this.tasks.filter(task => task.status === 'in-progress').length;
  }

  getCompletedCount(): number {
    return this.tasks.filter(task => task.status === 'done').length;
  }

  getDueSoonCount(): number {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return this.tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate >= today && dueDate <= nextWeek;
    }).length;
  }
}
