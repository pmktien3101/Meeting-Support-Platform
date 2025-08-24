import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface TaskDetailModel {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId: number;
  assigneeName: string;
  assigneeAvatar: string;
  assignerName: string;
  dueDate: Date;
  completedAt?: Date;
  projectId?: number;
  projectName?: string;
  tags: string[];
  estimatedHours?: number;
  actualHours?: number;
  attachments: string[];
  comments: TaskComment[];
  createdAt: Date;
  updatedAt: Date;
}

interface TaskComment {
  id: number;
  taskId: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
}

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.scss']
})
export class TaskDetail implements OnInit {
  task = signal<TaskDetailModel | null>(null);
  isLoading = signal(true);
  error = signal('');
  newComment = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTaskDetail();
  }

  async loadTaskDetail(): Promise<void> {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      this.error.set('Task ID is required');
      this.isLoading.set(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock task data
      const mockTask: TaskDetailModel = {
        id: parseInt(taskId),
        title: 'Implement User Authentication System',
        description: 'Create a comprehensive user authentication system including login, registration, password reset, and OAuth integration. The system should support multiple authentication methods and provide secure session management.',
        status: 'in-progress',
        priority: 'high',
        assigneeId: 2,
        assigneeName: 'Emily Davis',
        assigneeAvatar: 'ED',
        assignerName: 'John Smith',
        dueDate: new Date('2024-02-15T00:00:00Z'),
        projectId: 1,
        projectName: 'Website Redesign',
        tags: ['frontend', 'backend', 'security', 'authentication'],
        estimatedHours: 16,
        actualHours: 8,
        attachments: [
          'auth-requirements.pdf',
          'design-mockups.fig',
          'api-specification.json'
        ],
        comments: [
          {
            id: 1,
            taskId: parseInt(taskId),
            userId: 1,
            userName: 'John Smith',
            userAvatar: 'JS',
            content: 'Started working on the login form component. The basic structure is ready.',
            createdAt: new Date('2024-01-20T09:00:00Z')
          },
          {
            id: 2,
            taskId: parseInt(taskId),
            userId: 2,
            userName: 'Emily Davis',
            userAvatar: 'ED',
            content: 'Completed the login form validation and error handling. Moving on to the registration form.',
            createdAt: new Date('2024-01-21T14:30:00Z')
          },
          {
            id: 3,
            taskId: parseInt(taskId),
            userId: 3,
            userName: 'Michael Chen',
            userAvatar: 'MC',
            content: 'Great progress! The UI looks clean and user-friendly. Any issues with the backend integration?',
            createdAt: new Date('2024-01-22T11:15:00Z')
          }
        ],
        createdAt: new Date('2024-01-15T10:00:00Z'),
        updatedAt: new Date('2024-01-22T11:15:00Z')
      };

      this.task.set(mockTask);
    } catch (error) {
      this.error.set('Failed to load task details');
      console.error('Error loading task:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  updateStatus(newStatus: string): void {
    if (this.task()) {
      this.task.update(task => ({
        ...task!,
        status: newStatus as any,
        completedAt: newStatus === 'done' ? new Date() : undefined,
        updatedAt: new Date()
      }));
    }
  }

  updatePriority(newPriority: string): void {
    if (this.task()) {
      this.task.update(task => ({
        ...task!,
        priority: newPriority as any,
        updatedAt: new Date()
      }));
    }
  }

  addComment(): void {
    if (!this.newComment().trim() || !this.task()) {
      return;
    }

    const comment: TaskComment = {
      id: Math.floor(Math.random() * 1000) + 100,
      taskId: this.task()!.id,
      userId: 1, // Current user ID
      userName: 'Current User',
      userAvatar: 'CU',
      content: this.newComment(),
      createdAt: new Date()
    };

    this.task.update(task => ({
      ...task!,
      comments: [...task!.comments, comment],
      updatedAt: new Date()
    }));

    this.newComment.set('');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'todo': return '#6B7280';
      case 'in-progress': return '#F59E0B';
      case 'done': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  }

  getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#F97316';
      case 'urgent': return '#EF4444';
      default: return '#6B7280';
    }
  }

  getPriorityText(priority: string): string {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  }

  isOverdue(): boolean {
    if (!this.task()) return false;
    return this.task()!.status !== 'done' && 
           this.task()!.status !== 'cancelled' && 
           this.task()!.dueDate < new Date();
  }

  getDaysUntilDue(): number {
    if (!this.task()) return 0;
    const now = new Date();
    const dueDate = new Date(this.task()!.dueDate);
    const diffTime = dueDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateTime(date: Date): string {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  navigateToEdit(): void {
    if (this.task()) {
      this.router.navigate(['/task', this.task()!.id, 'edit']);
    }
  }

  navigateToList(): void {
    this.router.navigate(['/task/list']);
  }
}
