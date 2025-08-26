import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  manager: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  progress: number;
  members: ProjectMember[];
}

@Component({
  selector: 'app-pm-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class PmProjects {
  private layoutComponent = inject(PmLayoutComponent);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // UI state
  showEditProjectModal = false;
  selectedProject: Project | null = null;
  editProjectForm!: FormGroup;

  // Available team members for adding to projects
  availableMembers: ProjectMember[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@company.com',
      role: 'Frontend Developer',
      avatar: 'NA'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@company.com',
      role: 'Backend Developer',
      avatar: 'TB'
    },
    {
      id: '3',
      name: 'Lê Văn C',
      email: 'levanc@company.com',
      role: 'UI/UX Designer',
      avatar: 'LC'
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      email: 'phamthid@company.com',
      role: 'QA Engineer',
      avatar: 'PD'
    },
    {
      id: '5',
      name: 'Hoàng Văn E',
      email: 'hoangvane@company.com',
      role: 'DevOps Engineer',
      avatar: 'HE'
    },
    {
      id: '6',
      name: 'Vũ Thị F',
      email: 'vuthif@company.com',
      role: 'Business Analyst',
      avatar: 'VF'
    }
  ];

  // Mock data for projects with members
  projects: Project[] = [
    {
      id: '1',
      name: 'Website E-commerce',
      description: 'Phát triển website bán hàng trực tuyến với đầy đủ tính năng',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      manager: 'PM001',
      status: 'active',
      progress: 65,
      members: [
        {
          id: '1',
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@company.com',
          role: 'Frontend Developer',
          avatar: 'NA'
        },
        {
          id: '2',
          name: 'Trần Thị B',
          email: 'tranthib@company.com',
          role: 'Backend Developer',
          avatar: 'TB'
        },
        {
          id: '3',
          name: 'Lê Văn C',
          email: 'levanc@company.com',
          role: 'UI/UX Designer',
          avatar: 'LC'
        }
      ]
    },
    {
      id: '2',
      name: 'Mobile App',
      description: 'Ứng dụng di động đa nền tảng cho khách hàng',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      manager: 'PM002',
      status: 'planning',
      progress: 15,
      members: [
        {
          id: '1',
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@company.com',
          role: 'Frontend Developer',
          avatar: 'NA'
        },
        {
          id: '4',
          name: 'Phạm Thị D',
          email: 'phamthid@company.com',
          role: 'QA Engineer',
          avatar: 'PD'
        }
      ]
    },
    {
      id: '3',
      name: 'CRM System',
      description: 'Hệ thống quản lý quan hệ khách hàng tích hợp',
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      manager: 'PM003',
      status: 'active',
      progress: 45,
      members: [
        {
          id: '2',
          name: 'Trần Thị B',
          email: 'tranthib@company.com',
          role: 'Backend Developer',
          avatar: 'TB'
        },
        {
          id: '5',
          name: 'Hoàng Văn E',
          email: 'hoangvane@company.com',
          role: 'DevOps Engineer',
          avatar: 'HE'
        },
        {
          id: '6',
          name: 'Vũ Thị F',
          email: 'vuthif@company.com',
          role: 'Business Analyst',
          avatar: 'VF'
        }
      ]
    }
  ];

  constructor() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.editProjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  // Delegate methods to layout component
  openCreateProject() { return this.layoutComponent.openCreateProject(); }

  // Navigate to project milestones
  viewProjectMilestones(projectId: string) {
    this.router.navigate(['/pm/projects', projectId, 'milestones']);
  }

  // Edit project methods
  openEditProject(project: Project) {
    this.selectedProject = project;
    this.editProjectForm.patchValue({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status
    });
    this.showEditProjectModal = true;
  }

  closeEditProject() {
    this.showEditProjectModal = false;
    this.selectedProject = null;
    this.editProjectForm.reset();
  }

  submitEditProject() {
    if (this.editProjectForm.valid && this.selectedProject) {
      const formData = this.editProjectForm.value;
      
      // Update project data
      this.selectedProject.name = formData.name;
      this.selectedProject.description = formData.description;
      this.selectedProject.startDate = formData.startDate;
      this.selectedProject.endDate = formData.endDate;
      this.selectedProject.status = formData.status;

      console.log('Project updated:', this.selectedProject);
      this.closeEditProject();
      // TODO: Call API to update project
    }
  }

  getProjectStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'planning': 'Lập kế hoạch',
      'active': 'Đang thực hiện',
      'on-hold': 'Tạm dừng',
      'completed': 'Hoàn thành'
    };
    return statusMap[status] || status;
  }

  getActiveProjectsCount(): number {
    return this.projects.filter(p => p.status === 'active').length;
  }

  getCompletedProjectsCount(): number {
    return this.projects.filter(p => p.status === 'completed').length;
  }

  getAverageProgress(): number {
    const totalProgress = this.projects.reduce((sum, p) => sum + p.progress, 0);
    return Math.round(totalProgress / this.projects.length);
  }
}
