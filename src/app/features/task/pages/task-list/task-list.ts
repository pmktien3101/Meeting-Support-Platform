import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskWithAssignee } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskList implements OnInit {
  tasks: TaskWithAssignee[] = [];
  filteredTasks: TaskWithAssignee[] = [];
  searchTerm = '';
  statusFilter = 'all';
  priorityFilter = 'all';
  isLoading = true;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    // Simulate API call
    setTimeout(() => {
      this.tasks = [
        {
          id: 1,
          projectId: 1,
          meetingId: 1,
          title: "Implement Homepage Design",
          description: "Create the new homepage layout with modern design components and responsive behavior",
          status: "in-progress",
          priority: "high",
          assignedTo: 5,
          assignedBy: 3,
          dueDate: new Date("2024-02-10T00:00:00Z"),
          tags: ["frontend", "ui", "responsive"],
          attachments: ["homepage-design.fig", "wireframes.pdf"],
          comments: [
            {
              id: 1,
              taskId: 1,
              userId: 5,
              content: "Started working on the homepage layout. Will complete the hero section by tomorrow.",
              createdAt: new Date("2024-01-16T09:00:00Z")
            }
          ],
          createdAt: new Date("2024-01-15T10:30:00Z"),
          updatedAt: new Date("2024-01-16T14:30:00Z"),
          assigneeName: "David Kim",
          assigneeAvatar: "https://ui-avatars.com/api/?name=David+Kim&background=7C3AED&color=fff",
          assignerName: "Michael Chen",
          projectName: "E-commerce Platform Redesign",
          meetingTitle: "E-commerce Platform - Design Review Meeting"
        },
        {
          id: 2,
          projectId: 1,
          meetingId: 1,
          title: "Design Product Catalog Page",
          description: "Create wireframes and design mockups for the product catalog page with filtering and search functionality",
          status: "todo",
          priority: "medium",
          assignedTo: 6,
          assignedBy: 3,
          dueDate: new Date("2024-02-15T00:00:00Z"),
          tags: ["design", "wireframes", "ui"],
          attachments: ["catalog-requirements.pdf"],
          comments: [],
          createdAt: new Date("2024-01-15T10:30:00Z"),
          updatedAt: new Date("2024-01-15T10:30:00Z"),
          assigneeName: "Lisa Wang",
          assigneeAvatar: "https://ui-avatars.com/api/?name=Lisa+Wang&background=EA580C&color=fff",
          assignerName: "Michael Chen",
          projectName: "E-commerce Platform Redesign",
          meetingTitle: "E-commerce Platform - Design Review Meeting"
        },
        {
          id: 3,
          projectId: 1,
          meetingId: 1,
          title: "Set up Development Environment",
          description: "Configure the development environment with all necessary tools and dependencies for the project",
          status: "done",
          priority: "high",
          assignedTo: 7,
          assignedBy: 3,
          dueDate: new Date("2024-01-20T00:00:00Z"),
          completedAt: new Date("2024-01-18T16:00:00Z"),
          tags: ["setup", "environment", "devops"],
          attachments: ["setup-guide.md", "dependencies.json"],
          comments: [
            {
              id: 3,
              taskId: 3,
              userId: 7,
              content: "Environment setup completed. All tools are working correctly.",
              createdAt: new Date("2024-01-18T16:00:00Z")
            }
          ],
          createdAt: new Date("2024-01-15T10:30:00Z"),
          updatedAt: new Date("2024-01-18T16:00:00Z"),
          assigneeName: "Alex Rodriguez",
          assigneeAvatar: "https://ui-avatars.com/api/?name=Alex+Rodriguez&background=059669&color=fff",
          assignerName: "Michael Chen",
          projectName: "E-commerce Platform Redesign",
          meetingTitle: "E-commerce Platform - Design Review Meeting"
        }
      ];
      
      this.filteredTasks = [...this.tasks];
      this.isLoading = false;
    }, 1000);
  }

  onSearch() {
    this.applyFilters();
  }

  onStatusFilterChange() {
    this.applyFilters();
  }

  onPriorityFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.tasks;

    // Search filter
    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search) ||
        task.assigneeName.toLowerCase().includes(search) ||
        task.projectName.toLowerCase().includes(search)
      );
    }

    // Status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === this.statusFilter);
    }

    // Priority filter
    if (this.priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === this.priorityFilter);
    }

    this.filteredTasks = filtered;
  }

  updateTaskStatus(taskId: number, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as "todo" | "in-progress" | "done" | "cancelled";
    
    // Update the task status
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      if (newStatus === 'done') {
        task.completedAt = new Date();
      }
      task.updatedAt = new Date();
    }

    // Reapply filters
    this.applyFilters();
  }

  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      'low': '#10B981',
      'medium': '#F59E0B',
      'high': '#EF4444',
      'urgent': '#DC2626'
    };
    return colors[priority] || '#6B7280';
  }

  getPriorityText(priority: string): string {
    const texts: { [key: string]: string } = {
      'low': 'Low',
      'medium': 'Medium',
      'high': 'High',
      'urgent': 'Urgent'
    };
    return texts[priority] || 'Unknown';
  }

  isOverdue(task: TaskWithAssignee): boolean {
    return new Date() > task.dueDate && task.status !== 'done';
  }

  getDaysUntilDue(task: TaskWithAssignee): number {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
