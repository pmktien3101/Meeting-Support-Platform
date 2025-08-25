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

  // Edit status modal state
  isEditModalOpen = false;
  taskBeingEdited: Task | null = null;
  editStatus: Task['status'] = 'todo';

  // Note modal state
  isNoteModalOpen = false;
  taskBeingNoted: Task | null = null;
  noteContent = '';

  constructor() {
    this.filterTasks();
    this.updateStats();
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
  }

  createTask(): void {
    console.log('Create task clicked');
  }

  startTask(task: Task): void {
    this.updateTask(task.id, { status: 'in-progress' });
  }

  completeTask(task: Task): void {
    this.updateTask(task.id, { status: 'done' });
  }

  editTask(task: Task): void {
    this.openEditStatusModal(task);
  }

  addComment(task: Task): void {
    this.openNoteModal(task);
  }

  viewMyTasks(): void {
    console.log('Viewing my tasks');
  }

  viewOverdueTasks(): void {
    console.log('Viewing overdue tasks');
  }

  exportTasks(): void {
    console.log('Exporting tasks');
  }

  // Status Modal helpers
  openEditStatusModal(task: Task): void {
    this.taskBeingEdited = task;
    this.editStatus = (task.status ?? 'todo');
    this.isEditModalOpen = true;
  }

  closeEditStatusModal(): void {
    this.isEditModalOpen = false;
    this.taskBeingEdited = null;
  }

  confirmEditStatus(): void {
    if (!this.taskBeingEdited) return;
    const targetId = this.taskBeingEdited.id;
    const newStatus = this.editStatus;
    this.closeEditStatusModal();
    if (this.taskBeingEdited.status !== newStatus) {
      this.updateTask(targetId, { status: newStatus });
    }
  }

  // Note Modal helpers
  openNoteModal(task: Task): void {
    this.taskBeingNoted = task;
    this.noteContent = '';
    this.isNoteModalOpen = true;
  }

  closeNoteModal(): void {
    this.isNoteModalOpen = false;
    this.taskBeingNoted = null;
    this.noteContent = '';
  }

  confirmAddNote(): void {
    if (!this.taskBeingNoted) return;
    const content = this.noteContent.trim();
    if (!content) { this.closeNoteModal(); return; }

    const nowLabel = 'Vừa xong';
    const newComment: Comment = {
      id: this.generateCommentId(this.taskBeingNoted),
      author: 'Bạn',
      content,
      timestamp: nowLabel
    };

    const updated = this.allTasks().map(t => {
      if (t.id !== this.taskBeingNoted!.id) return t;
      return { ...t, comments: [...t.comments, newComment] };
    });
    this.allTasks.set(updated);
    this.filterTasks();
    this.closeNoteModal();
  }

  private updateTask(taskId: number, changes: Partial<Task>): void {
    const updated = this.allTasks().map(t => t.id === taskId ? { ...t, ...changes } : t);
    this.allTasks.set(updated);
    this.filterTasks();
    this.updateStats();
  }

  private updateStats(): void {
    const tasks = this.allTasks();
    const total = tasks.length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const completed = tasks.filter(t => t.status === 'done').length;
    const overdue = tasks.filter(t => this.isOverdue(t.dueDate)).length;
    this.taskStats.set({ total, inProgress, completed, overdue });
  }

  private generateCommentId(task: Task): number {
    if (task.comments.length === 0) return 1;
    return Math.max(...task.comments.map(c => c.id)) + 1;
  }
}
