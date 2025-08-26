import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface ProjectDocument {
  id: string;
  name: string;
  description: string;
  fileType: string;
  fileSize: string;
  uploadedBy: string;
  uploadedDate: string;
  downloadUrl: string;
  projectId: string;
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
  documents: ProjectDocument[];
}

@Component({
  selector: 'app-pm-milestones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './milestones.html',
  styleUrls: ['./milestones.scss']
})
export class PmMilestones implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projectId: string | null = null;
  currentProject: Project | null = null;
  isProjectSpecific = false;

  // Modal states
  showAddDocumentModal = false;
  selectedFile: File | null = null;
  documentName = '';
  documentDescription = '';

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

  // Mock data for projects with members and documents
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
      ],
      documents: [
        {
          id: '1',
          name: 'Yêu cầu thiết kế UI/UX',
          description: 'Tài liệu mô tả chi tiết về thiết kế giao diện người dùng',
          fileType: 'PDF',
          fileSize: '2.5 MB',
          uploadedBy: 'Lê Văn C',
          uploadedDate: '2024-01-15',
          downloadUrl: '/documents/ui-ux-requirements.pdf',
          projectId: '1'
        },
        {
          id: '2',
          name: 'API Documentation',
          description: 'Tài liệu API cho backend system',
          fileType: 'DOCX',
          fileSize: '1.8 MB',
          uploadedBy: 'Trần Thị B',
          uploadedDate: '2024-02-20',
          downloadUrl: '/documents/api-docs.docx',
          projectId: '1'
        },
        {
          id: '3',
          name: 'Database Schema',
          description: 'Sơ đồ cơ sở dữ liệu cho hệ thống',
          fileType: 'PNG',
          fileSize: '850 KB',
          uploadedBy: 'Trần Thị B',
          uploadedDate: '2024-01-25',
          downloadUrl: '/documents/db-schema.png',
          projectId: '1'
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
      ],
      documents: [
        {
          id: '4',
          name: 'Mobile App Wireframes',
          description: 'Wireframes cho ứng dụng di động',
          fileType: 'Figma',
          fileSize: '3.2 MB',
          uploadedBy: 'Nguyễn Văn A',
          uploadedDate: '2024-03-10',
          downloadUrl: '/documents/mobile-wireframes.fig',
          projectId: '2'
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
      ],
      documents: [
        {
          id: '5',
          name: 'Business Requirements',
          description: 'Yêu cầu nghiệp vụ chi tiết cho CRM',
          fileType: 'PDF',
          fileSize: '4.1 MB',
          uploadedBy: 'Vũ Thị F',
          uploadedDate: '2024-02-05',
          downloadUrl: '/documents/crm-requirements.pdf',
          projectId: '3'
        },
        {
          id: '6',
          name: 'System Architecture',
          description: 'Kiến trúc hệ thống CRM',
          fileType: 'PDF',
          fileSize: '2.8 MB',
          uploadedBy: 'Hoàng Văn E',
          uploadedDate: '2024-02-15',
          downloadUrl: '/documents/crm-architecture.pdf',
          projectId: '3'
        }
      ]
    }
  ];

  // Mock data for milestones by project
  projectMilestones: { [key: string]: any[] } = {
    '1': [
      {
        id: '1',
        name: 'Thiết Kế UI/UX',
        description: 'Thiết kế giao diện người dùng và trải nghiệm người dùng',
        startDate: '2024-01-01',
        endDate: '2024-02-15',
        status: 'completed',
        progress: 100,
        projectId: '1'
      },
      {
        id: '2',
        name: 'Phát Triển Frontend',
        description: 'Xây dựng giao diện người dùng với React/Angular',
        startDate: '2024-02-16',
        endDate: '2024-04-30',
        status: 'in-progress',
        progress: 75,
        projectId: '1'
      },
      {
        id: '3',
        name: 'Phát Triển Backend',
        description: 'Xây dựng hệ thống backend và API',
        startDate: '2024-03-01',
        endDate: '2024-05-31',
        status: 'in-progress',
        progress: 60,
        projectId: '1'
      },
      {
        id: '4',
        name: 'Testing & QA',
        description: 'Kiểm thử và đảm bảo chất lượng',
        startDate: '2024-05-01',
        endDate: '2024-06-15',
        status: 'pending',
        progress: 0,
        projectId: '1'
      }
    ],
    '2': [
      {
        id: '5',
        name: 'Thiết Kế App',
        description: 'Thiết kế giao diện ứng dụng di động',
        startDate: '2024-03-01',
        endDate: '2024-04-15',
        status: 'in-progress',
        progress: 30,
        projectId: '2'
      },
      {
        id: '6',
        name: 'Phát Triển iOS',
        description: 'Xây dựng phiên bản iOS',
        startDate: '2024-04-16',
        endDate: '2024-06-30',
        status: 'pending',
        progress: 0,
        projectId: '2'
      },
      {
        id: '7',
        name: 'Phát Triển Android',
        description: 'Xây dựng phiên bản Android',
        startDate: '2024-04-16',
        endDate: '2024-06-30',
        status: 'pending',
        progress: 0,
        projectId: '2'
      }
    ],
    '3': [
      {
        id: '8',
        name: 'Phân Tích Yêu Cầu',
        description: 'Phân tích và thu thập yêu cầu từ khách hàng',
        startDate: '2024-02-01',
        endDate: '2024-03-15',
        status: 'completed',
        progress: 100,
        projectId: '3'
      },
      {
        id: '9',
        name: 'Thiết Kế Hệ Thống',
        description: 'Thiết kế kiến trúc hệ thống CRM',
        startDate: '2024-03-16',
        endDate: '2024-04-30',
        status: 'in-progress',
        progress: 80,
        projectId: '3'
      },
      {
        id: '10',
        name: 'Phát Triển Module',
        description: 'Phát triển các module chính của CRM',
        startDate: '2024-05-01',
        endDate: '2024-07-31',
        status: 'pending',
        progress: 0,
        projectId: '3'
      }
    ]
  };

  // All milestones for overview page
  allMilestones = [
    {
      id: '1',
      name: 'Thiết Kế UI/UX',
      description: 'Thiết kế giao diện người dùng và trải nghiệm người dùng',
      startDate: '2024-01-01',
      endDate: '2024-02-15',
      status: 'completed',
      progress: 100,
      projectId: '1',
      projectName: 'Website E-commerce'
    },
    {
      id: '2',
      name: 'Phát Triển Frontend',
      description: 'Xây dựng giao diện người dùng với React/Angular',
      startDate: '2024-02-16',
      endDate: '2024-04-30',
      status: 'in-progress',
      progress: 75,
      projectId: '1',
      projectName: 'Website E-commerce'
    },
    {
      id: '3',
      name: 'Phát Triển Backend',
      description: 'Xây dựng hệ thống backend và API',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      status: 'in-progress',
      progress: 60,
      projectId: '1',
      projectName: 'Website E-commerce'
    },
    {
      id: '4',
      name: 'Testing & QA',
      description: 'Kiểm thử và đảm bảo chất lượng',
      startDate: '2024-05-01',
      endDate: '2024-06-15',
      status: 'pending',
      progress: 0,
      projectId: '1',
      projectName: 'Website E-commerce'
    },
    {
      id: '5',
      name: 'Thiết Kế App',
      description: 'Thiết kế giao diện ứng dụng di động',
      startDate: '2024-03-01',
      endDate: '2024-04-15',
      status: 'in-progress',
      progress: 30,
      projectId: '2',
      projectName: 'Mobile App'
    },
    {
      id: '6',
      name: 'Phát Triển iOS',
      description: 'Xây dựng phiên bản iOS',
      startDate: '2024-04-16',
      endDate: '2024-06-30',
      status: 'pending',
      progress: 0,
      projectId: '2',
      projectName: 'Mobile App'
    },
    {
      id: '7',
      name: 'Phát Triển Android',
      description: 'Xây dựng phiên bản Android',
      startDate: '2024-04-16',
      endDate: '2024-06-30',
      status: 'pending',
      progress: 0,
      projectId: '2',
      projectName: 'Mobile App'
    },
    {
      id: '8',
      name: 'Phân Tích Yêu Cầu',
      description: 'Phân tích và thu thập yêu cầu từ khách hàng',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      status: 'completed',
      progress: 100,
      projectId: '3',
      projectName: 'CRM System'
    },
    {
      id: '9',
      name: 'Thiết Kế Hệ Thống',
      description: 'Thiết kế kiến trúc hệ thống CRM',
      startDate: '2024-03-16',
      endDate: '2024-04-30',
      status: 'in-progress',
      progress: 80,
      projectId: '3',
      projectName: 'CRM System'
    },
    {
      id: '10',
      name: 'Phát Triển Module',
      description: 'Phát triển các module chính của CRM',
      startDate: '2024-05-01',
      endDate: '2024-07-31',
      status: 'pending',
      progress: 0,
      projectId: '3',
      projectName: 'CRM System'
    }
  ];

  milestones: any[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'] || null;
      this.isProjectSpecific = !!this.projectId;
      
      if (this.projectId) {
        this.currentProject = this.projects.find(p => p.id === this.projectId) || null;
        this.milestones = this.projectMilestones[this.projectId] || [];
      } else {
        this.milestones = this.allMilestones;
      }
    });
  }

  // Member management methods
  getAvailableMembersForProject(project: Project): ProjectMember[] {
    const projectMemberIds = project.members.map(m => m.id);
    return this.availableMembers.filter(member => !projectMemberIds.includes(member.id));
  }

  addMemberToProject(project: Project, member: ProjectMember) {
    if (!project.members.find(m => m.id === member.id)) {
      project.members.push(member);
      console.log(`Added ${member.name} to project ${project.name}`);
    }
  }

  onMemberSelect(project: Project, event: any) {
    const memberId = event.target.value;
    if (memberId) {
      const member = this.availableMembers.find(m => m.id === memberId);
      if (member) {
        this.addMemberToProject(project, member);
        // Reset select to default option
        event.target.value = '';
      }
    }
  }

  removeMemberFromProject(project: Project, memberId: string) {
    const index = project.members.findIndex(m => m.id === memberId);
    if (index > -1) {
      const removedMember = project.members.splice(index, 1)[0];
      console.log(`Removed ${removedMember.name} from project ${project.name}`);
    }
  }

  // Document management methods
  openAddDocumentModal() {
    this.showAddDocumentModal = true;
    this.resetDocumentForm();
  }

  closeAddDocumentModal() {
    this.showAddDocumentModal = false;
    this.resetDocumentForm();
  }

  resetDocumentForm() {
    this.selectedFile = null;
    this.documentName = '';
    this.documentDescription = '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      if (!this.documentName) {
        this.documentName = file.name.split('.')[0]; // Use filename without extension
      }
    }
  }

  addDocumentToProject() {
    if (!this.currentProject || !this.selectedFile || !this.documentName.trim()) {
      return;
    }

    const newDocument: ProjectDocument = {
      id: Date.now().toString(), // Simple ID generation
      name: this.documentName.trim(),
      description: this.documentDescription.trim() || 'Không có mô tả',
      fileType: this.selectedFile.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      fileSize: this.formatFileSize(this.selectedFile.size),
      uploadedBy: 'Current User', // In real app, get from auth service
      uploadedDate: new Date().toISOString().split('T')[0],
      downloadUrl: URL.createObjectURL(this.selectedFile), // In real app, upload to server
      projectId: this.currentProject.id
    };

    this.currentProject.documents.push(newDocument);
    console.log(`Added document ${newDocument.name} to project ${this.currentProject.name}`);
    this.closeAddDocumentModal();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  downloadDocument(doc: ProjectDocument) {
    // In real app, this would trigger a download from server
    console.log(`Downloading document: ${doc.name}`);
    // For demo, create a temporary link
    const link = document.createElement('a');
    link.href = doc.downloadUrl;
    link.download = doc.name;
    link.click();
  }

  removeDocumentFromProject(documentId: string) {
    if (!this.currentProject) return;
    
    const index = this.currentProject.documents.findIndex(d => d.id === documentId);
    if (index > -1) {
      const removedDocument = this.currentProject.documents.splice(index, 1)[0];
      console.log(`Removed document ${removedDocument.name} from project ${this.currentProject.name}`);
    }
  }

  getFileIcon(fileType: string): string {
    const iconMap: { [key: string]: string } = {
      'PDF': '📄',
      'DOCX': '📝',
      'DOC': '📝',
      'XLSX': '📊',
      'XLS': '📊',
      'PPTX': '📽️',
      'PPT': '📽️',
      'PNG': '🖼️',
      'JPG': '🖼️',
      'JPEG': '🖼️',
      'GIF': '🖼️',
      'Figma': '🎨',
      'SKETCH': '🎨',
      'ZIP': '📦',
      'RAR': '📦',
      'TXT': '📄',
      'UNKNOWN': '📄'
    };
    return iconMap[fileType] || iconMap['UNKNOWN'];
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Chờ thực hiện',
      'in-progress': 'Đang thực hiện',
      'completed': 'Hoàn thành',
      'delayed': 'Bị trễ'
    };
    return statusMap[status] || status;
  }

  openCreateMilestone(): void {
    console.log('Opening create milestone modal...');
    // TODO: Implement create milestone modal
  }

  getInProgressCount(): number {
    return this.milestones.filter(m => m.status === 'in-progress').length;
  }

  getCompletedCount(): number {
    return this.milestones.filter(m => m.status === 'completed').length;
  }

  getAverageProgress(): number {
    const totalProgress = this.milestones.reduce((sum, m) => sum + m.progress, 0);
    return Math.round(totalProgress / this.milestones.length);
  }

  backToProjects(): void {
    this.router.navigate(['/pm/projects']);
  }
}
