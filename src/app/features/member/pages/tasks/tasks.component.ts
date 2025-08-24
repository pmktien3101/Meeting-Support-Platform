import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  project: string;
  assignee: string;
  estimatedHours: number;
  actualHours?: number;
  tags: string[];
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-member-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class MemberTasksComponent {
  // Search and filters
  searchTerm = '';
  statusFilter = '';
  priorityFilter = '';
  projectFilter = '';

  // Task stats
  taskStats = signal({
    total: 15,
    inProgress: 6,
    completed: 8,
    overdue: 1
  });

  // Projects list
  projects = signal([
    'E-commerce Platform',
    'Mobile App',
    'Backend Service',
    'AI Chatbot',
    'Data Analytics'
  ]);

  // All tasks data
  allTasks = signal<Task[]>([
    {
      id: 1,
      title: 'Thiết kế giao diện trang chủ',
      description: 'Tạo mockup cho trang chủ mới với responsive design và tối ưu UX',
      status: 'in-progress',
      priority: 'high',
      dueDate: 'Hôm nay',
      project: 'E-commerce Platform',
      assignee: 'Nguyễn Văn A',
      estimatedHours: 8,
      actualHours: 4,
      tags: ['UI/UX', 'Frontend', 'Design'],
      comments: [
        {
          id: 1,
          author: 'PM Nguyễn Văn B',
          content: 'Cần hoàn thành trước cuối tuần',
          timestamp: '2 giờ trước'
        }
      ]
    },
    {
      id: 2,
      title: 'Implement user authentication',
      description: 'Xây dựng hệ thống đăng nhập/đăng ký với JWT và refresh token',
      status: 'done',
      priority: 'medium',
      dueDate: 'Hôm qua',
      project: 'Mobile App',
      assignee: 'Nguyễn Văn A',
      estimatedHours: 12,
      actualHours: 10,
      tags: ['Backend', 'Security', 'API'],
      comments: []
    },
    {
      id: 3,
      title: 'Viết unit tests cho API',
      description: 'Tạo test cases cho các endpoint chính với coverage > 80%',
      status: 'todo',
      priority: 'low',
      dueDate: 'Tuần sau',
      project: 'Backend Service',
      assignee: 'Nguyễn Văn A',
      estimatedHours: 6,
      tags: ['Testing', 'Backend', 'Quality'],
      comments: []
    }
  ]);

  // Filtered tasks
  filteredTasks = signal<Task[]>([]);

  constructor() {
    this.filterTasks();
  }

  // Filter tasks based on search and filters
  filterTasks(): void {
    let filtered = this.allTasks();

    if (this.searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.project.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.statusFilter) {
      filtered = filtered.filter(task => task.status === this.statusFilter);
    }

    if (this.priorityFilter) {
      filtered = filtered.filter(task => task.priority === this.priorityFilter);
    }

    if (this.projectFilter) {
      filtered = filtered.filter(task => task.project === this.projectFilter);
    }

    this.filteredTasks.set(filtered);
  }

  // Get status text in Vietnamese
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'todo': 'Chưa bắt đầu',
      'in-progress': 'Đang thực hiện',
      'done': 'Hoàn thành'
    };
    return statusMap[status] || status;
  }

  // Get priority text in Vietnamese
  getPriorityText(priority: string): string {
    const priorityMap: { [key: string]: string } = {
      'high': 'Cao',
      'medium': 'Trung bình',
      'low': 'Thấp'
    };
    return priorityMap[priority] || priority;
  }

  // Check if task is overdue
  isOverdue(dueDate: string): boolean {
    return dueDate === 'Quá hạn' || dueDate === 'Hôm qua';
  }

  // Calculate progress percentage
  getProgressPercentage(task: Task): number {
    if (task.status === 'done') return 100;
    if (task.status === 'todo') return 0;
    if (task.actualHours && task.estimatedHours) {
      return Math.min(Math.round((task.actualHours / task.estimatedHours) * 100), 100);
    }
    return 50; // Default for in-progress without actual hours
  }

  // Action methods
  refreshTasks(): void {
    console.log('Refreshing tasks...');
    // TODO: Implement API call to refresh tasks
  }

  createTask(): void {
    console.log('Create task clicked');
    // TODO: Navigate to task creation page
  }

  startTask(task: Task): void {
    console.log('Starting task:', task.title);
    // TODO: Update task status to in-progress
  }

  completeTask(task: Task): void {
    console.log('Completing task:', task.title);
    // TODO: Update task status to done
  }

  editTask(task: Task): void {
    console.log('Editing task:', task.title);
    // TODO: Navigate to task edit page
  }

  addComment(task: Task): void {
    console.log('Adding comment to task:', task.title);
    // TODO: Show comment input modal
  }

  viewMyTasks(): void {
    console.log('Viewing my tasks');
    // TODO: Filter to show only current user's tasks
  }

  viewOverdueTasks(): void {
    console.log('Viewing overdue tasks');
    // TODO: Filter to show only overdue tasks
  }

  exportTasks(): void {
    console.log('Exporting tasks');
    // TODO: Implement export functionality
  }
}
