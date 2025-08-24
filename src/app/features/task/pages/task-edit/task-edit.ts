import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface TaskEditForm {
  title: string;
  description: string;
  assigneeId: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'done' | 'cancelled';
  dueDate: string;
  projectId?: number;
  tags: string[];
  estimatedHours?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface Project {
  id: number;
  name: string;
  status: string;
}

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-edit.html',
  styleUrls: ['./task-edit.scss']
})
export class TaskEdit implements OnInit {
  // Form controls
  title = new FormControl('');
  description = new FormControl('');
  assigneeId = new FormControl(0);
  priority = new FormControl<'low' | 'medium' | 'high' | 'urgent'>('medium');
  status = new FormControl<'todo' | 'in-progress' | 'done' | 'cancelled'>('todo');
  dueDate = new FormControl('');
  projectId = new FormControl<number | undefined>(undefined);
  estimatedHours = new FormControl<number | undefined>(undefined);
  
  // Tags as signal
  tags = signal<string[]>([]);

  isLoading = signal(true);
  isSubmitting = signal(false);
  errorMessage = signal('');

  // Mock data
  users: User[] = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', avatar: 'JS' },
    { id: 2, name: 'Emily Davis', email: 'emily.davis@company.com', avatar: 'ED' },
    { id: 3, name: 'Michael Chen', email: 'michael.chen@company.com', avatar: 'MC' },
    { id: 4, name: 'Lisa Johnson', email: 'lisa.johnson@company.com', avatar: 'LJ' },
    { id: 5, name: 'David Kim', email: 'david.kim@company.com', avatar: 'DK' }
  ];

  projects: Project[] = [
    { id: 1, name: 'Website Redesign', status: 'active' },
    { id: 2, name: 'Mobile App Development', status: 'active' },
    { id: 3, name: 'Customer Portal', status: 'completed' },
    { id: 4, name: 'API Integration', status: 'active' }
  ];

  availableTags = ['frontend', 'backend', 'design', 'testing', 'documentation', 'bug-fix', 'feature', 'urgent'];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTaskData();
  }

  async loadTaskData(): Promise<void> {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      this.errorMessage.set('Task ID is required');
      this.isLoading.set(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock task data
      const mockTask = {
        id: parseInt(taskId),
        title: 'Implement User Authentication System',
        description: 'Create a comprehensive user authentication system including login, registration, password reset, and OAuth integration.',
        status: 'in-progress',
        priority: 'high',
        assigneeId: 2,
        dueDate: '2024-02-15',
        projectId: 1,
        tags: ['frontend', 'backend', 'security'],
        estimatedHours: 16
      };

      this.title.setValue(mockTask.title);
      this.description.setValue(mockTask.description);
      this.assigneeId.setValue(mockTask.assigneeId);
      this.priority.setValue(mockTask.priority as 'low' | 'medium' | 'high' | 'urgent');
      this.status.setValue(mockTask.status as 'todo' | 'in-progress' | 'done' | 'cancelled');
      this.dueDate.setValue(mockTask.dueDate);
      this.projectId.setValue(mockTask.projectId);
      this.tags.set(mockTask.tags);
      this.estimatedHours.setValue(mockTask.estimatedHours);
    } catch (error) {
      this.errorMessage.set('Failed to load task data');
      console.error('Error loading task:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  addTag(tag: string): void {
    const currentTags = this.tags();
    if (!currentTags.includes(tag)) {
      this.tags.set([...currentTags, tag]);
    }
  }

  removeTag(tag: string): void {
    const currentTags = this.tags();
    this.tags.set(currentTags.filter(t => t !== tag));
  }

  toggleTag(tag: string): void {
    const currentTags = this.tags();
    if (currentTags.includes(tag)) {
      this.removeTag(tag);
    } else {
      this.addTag(tag);
    }
  }

  addCustomTag(input: HTMLInputElement): void {
    const tag = input.value.trim();
    if (tag && !this.tags().includes(tag)) {
      this.tags.set([...this.tags(), tag]);
      input.value = '';
    }
  }

  validateForm(): boolean {
    if (!this.title.value?.trim()) {
      this.errorMessage.set('Task title is required');
      return false;
    }

    if (!this.description.value?.trim()) {
      this.errorMessage.set('Task description is required');
      return false;
    }

    if (!this.assigneeId.value) {
      this.errorMessage.set('Please select an assignee');
      return false;
    }

    if (!this.dueDate.value) {
      this.errorMessage.set('Due date is required');
      return false;
    }

    this.errorMessage.set('');
    return true;
  }

  async updateTask(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const updatedTask = {
        id: parseInt(this.route.snapshot.paramMap.get('id') || '0'),
        title: this.title.value || '',
        description: this.description.value || '',
        status: this.status.value || 'todo',
        priority: this.priority.value || 'medium',
        assigneeId: this.assigneeId.value || 0,
        assigneeName: this.users.find(u => u.id === this.assigneeId.value)?.name || '',
        dueDate: new Date(this.dueDate.value || ''),
        projectId: this.projectId.value,
        projectName: this.projectId.value ? this.projects.find(p => p.id === this.projectId.value)?.name || '' : '',
        tags: this.tags(),
        estimatedHours: this.estimatedHours.value,
        updatedAt: new Date()
      };

      console.log('Updated task:', updatedTask);

      // In a real app, this would be an API call
      // await this.taskService.updateTask(updatedTask);

      // Navigate to task detail
      this.router.navigate(['/task', updatedTask.id]);
    } catch (error) {
      this.errorMessage.set('Failed to update task. Please try again.');
      console.error('Error updating task:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  cancel(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/task', taskId]);
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
}
