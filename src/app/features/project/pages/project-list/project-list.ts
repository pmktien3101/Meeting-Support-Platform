import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectWithMilestones } from '../../../../shared/models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss'
})
export class ProjectList implements OnInit {
  projects: ProjectWithMilestones[] = [];
  filteredProjects: ProjectWithMilestones[] = [];
  searchTerm = '';
  statusFilter = 'all';
  isLoading = true;

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    // Simulate API call
    setTimeout(() => {
      this.projects = [
        {
          id: 1,
          name: "E-commerce Platform Redesign",
          description: "Complete redesign of the company's e-commerce platform with modern UI/UX and improved performance",
          status: "active",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-06-30"),
          businessOwnerId: 2,
          projectManagerId: 3,
          members: [5, 6, 7],
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-15"),
          milestones: [
            {
              id: 1,
              projectId: 1,
              name: "Design Phase",
              description: "Complete UI/UX design and wireframes",
              dueDate: new Date("2024-02-15"),
              status: "completed",
              progress: 100,
              createdAt: new Date("2024-01-01"),
              updatedAt: new Date("2024-02-15")
            },
            {
              id: 2,
              projectId: 1,
              name: "Frontend Development",
              description: "Implement the new frontend components and pages",
              dueDate: new Date("2024-04-15"),
              status: "in-progress",
              progress: 65,
              createdAt: new Date("2024-01-01"),
              updatedAt: new Date("2024-01-15")
            }
          ],
          progress: 55,
          totalTasks: 24,
          completedTasks: 13
        },
        {
          id: 2,
          name: "Mobile App Development",
          description: "Develop a native mobile application for iOS and Android platforms",
          status: "active",
          startDate: new Date("2024-02-01"),
          endDate: new Date("2024-08-31"),
          businessOwnerId: 2,
          projectManagerId: 4,
          members: [5, 7],
          createdAt: new Date("2024-02-01"),
          updatedAt: new Date("2024-01-15"),
          milestones: [
            {
              id: 4,
              projectId: 2,
              name: "Requirements Analysis",
              description: "Gather and document all requirements for the mobile app",
              dueDate: new Date("2024-02-28"),
              status: "completed",
              progress: 100,
              createdAt: new Date("2024-02-01"),
              updatedAt: new Date("2024-02-28")
            }
          ],
          progress: 35,
          totalTasks: 18,
          completedTasks: 6
        },
        {
          id: 3,
          name: "Data Analytics Dashboard",
          description: "Build a comprehensive analytics dashboard for business intelligence",
          status: "planning",
          startDate: new Date("2024-03-01"),
          endDate: new Date("2024-07-31"),
          businessOwnerId: 2,
          projectManagerId: 3,
          members: [6],
          createdAt: new Date("2024-03-01"),
          updatedAt: new Date("2024-01-15"),
          milestones: [],
          progress: 0,
          totalTasks: 0,
          completedTasks: 0
        }
      ];
      this.filteredProjects = [...this.projects];
      this.isLoading = false;
    }, 1000);
  }

  onSearch() {
    this.filterProjects();
  }

  onStatusFilterChange() {
    this.filterProjects();
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || project.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return '#10B981';
      case 'completed': return '#3B82F6';
      case 'planning': return '#F59E0B';
      case 'on-hold': return '#EF4444';
      default: return '#6B7280';
    }
  }

  getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return '#10B981';
    if (progress >= 60) return '#F59E0B';
    if (progress >= 40) return '#F97316';
    return '#EF4444';
  }
}
