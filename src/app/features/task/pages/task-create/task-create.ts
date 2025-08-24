import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface TaskCreateForm {
  title: string;
  description: string;
  assigneeId: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
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
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreate implements OnInit {
  taskForm = signal<TaskCreateForm>({
    title: '',
    description: '',
    assigneeId: 0,
    priority: 'medium',
    dueDate: '',
    projectId: undefined,
    tags: [],
    estimatedHours: undefined
  });

  isLoading = signal(false);
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set default due date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.taskForm.update(form => ({
      ...form,
      dueDate: tomorrow.toISOString().split('T')[0]
    }));
  }

  addTag(tag: string): void {
    const currentTags = this.taskForm().tags;
    if (!currentTags.includes(tag)) {
      this.taskForm.update(form => ({
        ...form,
        tags: [...currentTags, tag]
      }));
    }
  }

  removeTag(tag: string): void {
    const currentTags = this.taskForm().tags;
    this.taskForm.update(form => ({
      ...form,
      tags: currentTags.filter(t => t !== tag)
    }));
  }

  addCustomTag(event: any): void {
    const input = event.target.previousElementSibling;
    const tag = input.value.trim();
    
    if (tag && !this.availableTags.includes(tag)) {
      this.availableTags.push(tag);
      this.addTag(tag);
      input.value = '';
    }
  }

  async createTask(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const form = this.taskForm();
      const taskData = {
        ...form,
        id: Date.now(),
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Creating task:', taskData);

      // Success - redirect to task list
      alert('Task created successfully!');
      this.router.navigate(['/task/list']);

    } catch (error) {
      console.error('Error creating task:', error);
      this.errorMessage.set('Failed to create task. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  validateForm(): boolean {
    const form = this.taskForm();
    
    if (!form.title.trim()) {
      this.errorMessage.set('Please enter a task title');
      return false;
    }

    if (!form.description.trim()) {
      this.errorMessage.set('Please enter a task description');
      return false;
    }

    if (!form.assigneeId) {
      this.errorMessage.set('Please select an assignee');
      return false;
    }

    if (!form.dueDate) {
      this.errorMessage.set('Please select a due date');
      return false;
    }

    // Check if due date is not in the past
    const selectedDate = new Date(form.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      this.errorMessage.set('Due date cannot be in the past');
      return false;
    }

    return true;
  }

  cancel(): void {
    this.router.navigate(['/task/list']);
  }
}
