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

interface Task {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: ProjectMember | null;
  dueDate: string;
  milestoneId: string;
  createdAt: string;
  updatedAt: string;
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

interface Milestone {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  projectId: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
  projectName?: string;
}

@Component({
  selector: 'app-pm-milestones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './milestones.html',
  styleUrls: ['./milestones.scss']
})
export class PmMilestones implements OnInit {
  milestoneToDelete: Milestone | null = null;
  showDeleteConfirmModal: boolean = false;

  confirmDeleteMilestone(milestone: Milestone) {
    this.milestoneToDelete = milestone;
    this.showDeleteConfirmModal = true;
  }

  cancelDeleteMilestone() {
    this.milestoneToDelete = null;
    this.showDeleteConfirmModal = false;
  }

  deleteMilestoneConfirmed() {
    if (!this.milestoneToDelete) return;
    this.milestones = this.milestones.filter(m => m.id !== this.milestoneToDelete!.id);
    this.cancelDeleteMilestone();
  }
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projectId: string | null = null;
  currentProject: Project | null = null;
  isProjectSpecific = false;

  // Modal states
  showAddDocumentModal = false;
  showAddTaskModal = false;
  showTasksModal = false;
  showEditMilestoneModal = false;
  showMilestoneDetailsModal = false;

  // Selected items for modals
  selectedMilestone: Milestone | null = null;
  selectedMilestoneForDetails: Milestone | null = null;
  selectedMilestoneForEdit: Milestone | null = null;

  // Edit form data
  editMilestoneForm = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'pending' as 'pending' | 'in-progress' | 'completed' | 'delayed',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent'
  };
  selectedFile: File | null = null;
  documentName = '';
  documentDescription = '';

  // Task modal states
  newTask = {
    name: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    assignedTo: null as ProjectMember | null,
    dueDate: ''
  };

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

  // Mock data for tasks by milestone
  milestoneTasks: { [key: string]: Task[] } = {
    '1': [
      {
        id: '1',
        name: 'Thiết kế wireframes',
        description: 'Tạo wireframes cho các trang chính của website',
        status: 'completed',
        priority: 'high',
        assignedTo: this.availableMembers[2], // Lê Văn C - UI/UX Designer
        dueDate: '2024-01-30',
        milestoneId: '1',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-30'
      },
      {
        id: '2',
        name: 'Thiết kế mockups',
        description: 'Tạo mockups chi tiết với màu sắc và typography',
        status: 'completed',
        priority: 'high',
        assignedTo: this.availableMembers[2], // Lê Văn C - UI/UX Designer
        dueDate: '2024-02-10',
        milestoneId: '1',
        createdAt: '2024-01-15',
        updatedAt: '2024-02-10'
      },
      {
        id: '3',
        name: 'Tạo style guide',
        description: 'Xây dựng style guide cho design system',
        status: 'completed',
        priority: 'medium',
        assignedTo: this.availableMembers[2], // Lê Văn C - UI/UX Designer
        dueDate: '2024-02-15',
        milestoneId: '1',
        createdAt: '2024-02-01',
        updatedAt: '2024-02-15'
      }
    ],
    '2': [
      {
        id: '4',
        name: 'Setup React project',
        description: 'Khởi tạo dự án React với TypeScript và các dependencies',
        status: 'completed',
        priority: 'high',
        assignedTo: this.availableMembers[0], // Nguyễn Văn A - Frontend Developer
        dueDate: '2024-02-20',
        milestoneId: '2',
        createdAt: '2024-02-16',
        updatedAt: '2024-02-20'
      },
      {
        id: '5',
        name: 'Implement responsive layout',
        description: 'Xây dựng layout responsive cho các trang chính',
        status: 'in-progress',
        priority: 'high',
        assignedTo: this.availableMembers[0], // Nguyễn Văn A - Frontend Developer
        dueDate: '2024-03-15',
        milestoneId: '2',
        createdAt: '2024-02-21',
        updatedAt: '2024-03-01'
      },
      {
        id: '6',
        name: 'Build component library',
        description: 'Tạo thư viện components tái sử dụng',
        status: 'in-progress',
        priority: 'medium',
        assignedTo: this.availableMembers[0], // Nguyễn Văn A - Frontend Developer
        dueDate: '2024-03-30',
        milestoneId: '2',
        createdAt: '2024-02-25',
        updatedAt: '2024-03-01'
      },
      {
        id: '7',
        name: 'Implement user authentication',
        description: 'Xây dựng hệ thống đăng nhập/đăng ký',
        status: 'pending',
        priority: 'high',
        assignedTo: this.availableMembers[0], // Nguyễn Văn A - Frontend Developer
        dueDate: '2024-04-15',
        milestoneId: '2',
        createdAt: '2024-03-01',
        updatedAt: '2024-03-01'
      }
    ],
    '3': [
      {
        id: '8',
        name: 'Setup Node.js backend',
        description: 'Khởi tạo server Node.js với Express và TypeScript',
        status: 'completed',
        priority: 'high',
        assignedTo: this.availableMembers[1], // Trần Thị B - Backend Developer
        dueDate: '2024-03-10',
        milestoneId: '3',
        createdAt: '2024-03-01',
        updatedAt: '2024-03-10'
      },
      {
        id: '9',
        name: 'Design database schema',
        description: 'Thiết kế cấu trúc cơ sở dữ liệu',
        status: 'completed',
        priority: 'high',
        assignedTo: this.availableMembers[1], // Trần Thị B - Backend Developer
        dueDate: '2024-03-20',
        milestoneId: '3',
        createdAt: '2024-03-05',
        updatedAt: '2024-03-20'
      },
      {
        id: '10',
        name: 'Implement REST APIs',
        description: 'Xây dựng các API endpoints cho frontend',
        status: 'in-progress',
        priority: 'high',
        assignedTo: this.availableMembers[1], // Trần Thị B - Backend Developer
        dueDate: '2024-04-30',
        milestoneId: '3',
        createdAt: '2024-03-15',
        updatedAt: '2024-03-25'
      }
    ],
    '4': [
      {
        id: '11',
        name: 'Write unit tests',
        description: 'Viết unit tests cho các components và functions',
        status: 'pending',
        priority: 'medium',
        assignedTo: this.availableMembers[3], // Phạm Thị D - QA Engineer
        dueDate: '2024-05-30',
        milestoneId: '4',
        createdAt: '2024-05-01',
        updatedAt: '2024-05-01'
      },
      {
        id: '12',
        name: 'Integration testing',
        description: 'Thực hiện integration testing cho toàn bộ hệ thống',
        status: 'pending',
        priority: 'high',
        assignedTo: this.availableMembers[3], // Phạm Thị D - QA Engineer
        dueDate: '2024-06-10',
        milestoneId: '4',
        createdAt: '2024-05-01',
        updatedAt: '2024-05-01'
      }
    ]
  };

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
  projectMilestones: { [key: string]: Milestone[] } = {
    '1': [
      {
        id: '1',
        name: 'Thiết Kế UI/UX',
        description: 'Thiết kế giao diện người dùng và trải nghiệm người dùng',
        startDate: '2024-01-01',
        endDate: '2024-02-15',
        status: 'completed',
        priority: 'high',
        projectId: '1',
        createdAt: '2024-01-01',
        updatedAt: '2024-02-15',
        progress: 100,
        projectName: 'Website E-commerce'
      },
      {
        id: '2',
        name: 'Phát Triển Frontend',
        description: 'Xây dựng giao diện người dùng với React/Angular',
        startDate: '2024-02-16',
        endDate: '2024-04-30',
        status: 'in-progress',
        priority: 'medium',
        projectId: '1',
        createdAt: '2024-02-16',
        updatedAt: '2024-04-30',
        progress: 75,
        projectName: 'Website E-commerce'
      },
      {
        id: '3',
        name: 'Phát Triển Backend',
        description: 'Xây dựng hệ thống backend và API',
        startDate: '2024-03-01',
        endDate: '2024-05-31',
        status: 'in-progress',
        priority: 'high',
        projectId: '1',
        createdAt: '2024-03-01',
        updatedAt: '2024-05-31',
        progress: 60,
        projectName: 'Website E-commerce'
      },
      {
        id: '4',
        name: 'Testing & QA',
        description: 'Kiểm thử và đảm bảo chất lượng',
        startDate: '2024-05-01',
        endDate: '2024-06-15',
        status: 'pending',
        priority: 'low',
        projectId: '1',
        createdAt: '2024-05-01',
        updatedAt: '2024-06-15',
        progress: 0,
        projectName: 'Website E-commerce'
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
        priority: 'medium',
        projectId: '2',
        createdAt: '2024-03-01',
        updatedAt: '2024-04-15',
        progress: 30,
        projectName: 'Mobile App'
      },
      {
        id: '6',
        name: 'Phát Triển iOS',
        description: 'Xây dựng phiên bản iOS',
        startDate: '2024-04-16',
        endDate: '2024-06-30',
        status: 'pending',
        priority: 'low',
        projectId: '2',
        createdAt: '2024-04-16',
        updatedAt: '2024-06-30',
        progress: 0,
        projectName: 'Mobile App'
      },
      {
        id: '7',
        name: 'Phát Triển Android',
        description: 'Xây dựng phiên bản Android',
        startDate: '2024-04-16',
        endDate: '2024-06-30',
        status: 'pending',
        priority: 'low',
        projectId: '2',
        createdAt: '2024-04-16',
        updatedAt: '2024-06-30',
        progress: 0,
        projectName: 'Mobile App'
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
        priority: 'high',
        projectId: '3',
        createdAt: '2024-02-01',
        updatedAt: '2024-03-15',
        progress: 100,
        projectName: 'CRM System'
      },
      {
        id: '9',
        name: 'Thiết Kế Hệ Thống',
        description: 'Thiết kế kiến trúc hệ thống CRM',
        startDate: '2024-03-16',
        endDate: '2024-04-30',
        status: 'in-progress',
        priority: 'medium',
        projectId: '3',
        createdAt: '2024-03-16',
        updatedAt: '2024-04-30',
        progress: 80,
        projectName: 'CRM System'
      },
      {
        id: '10',
        name: 'Phát Triển Module',
        description: 'Phát triển các module chính của CRM',
        startDate: '2024-05-01',
        endDate: '2024-07-31',
        status: 'pending',
        priority: 'low',
        projectId: '3',
        createdAt: '2024-05-01',
        updatedAt: '2024-07-31',
        progress: 0,
        projectName: 'CRM System'
      }
    ]
  };

  // All milestones for overview page
  allMilestones: Milestone[] = [
    {
      id: '1',
      name: 'Thiết Kế UI/UX',
      description: 'Thiết kế giao diện người dùng và trải nghiệm người dùng',
      startDate: '2024-01-01',
      endDate: '2024-02-15',
      status: 'completed' as const,
      priority: 'high' as const,
      progress: 100,
      projectId: '1',
      projectName: 'Website E-commerce',
      createdAt: '2024-01-01',
      updatedAt: '2024-02-15'
    },
    {
      id: '2',
      name: 'Phát Triển Frontend',
      description: 'Xây dựng giao diện người dùng với React/Angular',
      startDate: '2024-02-16',
      endDate: '2024-04-30',
      status: 'in-progress' as const,
      priority: 'medium' as const,
      progress: 75,
      projectId: '1',
      projectName: 'Website E-commerce',
      createdAt: '2024-02-16',
      updatedAt: '2024-04-30'
    },
    {
      id: '3',
      name: 'Phát Triển Backend',
      description: 'Xây dựng hệ thống backend và API',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      status: 'in-progress' as const,
      priority: 'high' as const,
      progress: 60,
      projectId: '1',
      projectName: 'Website E-commerce',
      createdAt: '2024-03-01',
      updatedAt: '2024-05-31'
    },
    {
      id: '4',
      name: 'Testing & QA',
      description: 'Kiểm thử và đảm bảo chất lượng',
      startDate: '2024-05-01',
      endDate: '2024-06-15',
      status: 'pending' as const,
      priority: 'low' as const,
      progress: 0,
      projectId: '1',
      projectName: 'Website E-commerce',
      createdAt: '2024-05-01',
      updatedAt: '2024-06-15'
    },
    {
      id: '5',
      name: 'Thiết Kế App',
      description: 'Thiết kế giao diện ứng dụng di động',
      startDate: '2024-03-01',
      endDate: '2024-04-15',
      status: 'in-progress' as const,
      priority: 'medium' as const,
      progress: 30,
      projectId: '2',
      projectName: 'Mobile App',
      createdAt: '2024-03-01',
      updatedAt: '2024-04-15'
    },
    {
      id: '6',
      name: 'Phát Triển iOS',
      description: 'Xây dựng phiên bản iOS',
      startDate: '2024-04-16',
      endDate: '2024-06-30',
      status: 'pending' as const,
      priority: 'low' as const,
      progress: 0,
      projectId: '2',
      projectName: 'Mobile App',
      createdAt: '2024-04-16',
      updatedAt: '2024-06-30'
    },
    {
      id: '7',
      name: 'Phát Triển Android',
      description: 'Xây dựng phiên bản Android',
      startDate: '2024-04-16',
      endDate: '2024-06-30',
      status: 'pending' as const,
      priority: 'low' as const,
      progress: 0,
      projectId: '2',
      projectName: 'Mobile App',
      createdAt: '2024-04-16',
      updatedAt: '2024-06-30'
    },
    {
      id: '8',
      name: 'Phân Tích Yêu Cầu',
      description: 'Phân tích và thu thập yêu cầu từ khách hàng',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      status: 'completed' as const,
      priority: 'high' as const,
      progress: 100,
      projectId: '3',
      projectName: 'CRM System',
      createdAt: '2024-02-01',
      updatedAt: '2024-03-15'
    },
    {
      id: '9',
      name: 'Thiết Kế Hệ Thống',
      description: 'Thiết kế kiến trúc hệ thống CRM',
      startDate: '2024-03-16',
      endDate: '2024-04-30',
      status: 'in-progress' as const,
      priority: 'medium' as const,
      progress: 80,
      projectId: '3',
      projectName: 'CRM System',
      createdAt: '2024-03-16',
      updatedAt: '2024-04-30'
    },
    {
      id: '10',
      name: 'Phát Triển Module',
      description: 'Phát triển các module chính của CRM',
      startDate: '2024-05-01',
      endDate: '2024-07-31',
      status: 'pending' as const,
      priority: 'low' as const,
      progress: 0,
      projectId: '3',
      projectName: 'CRM System',
      createdAt: '2024-05-01',
      updatedAt: '2024-07-31'
    }
  ];

  milestones: Milestone[] = [];

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
    this.selectedMilestoneForEdit = null;
    this.editMilestoneForm = {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'pending',
      priority: 'medium'
    };
    this.showEditMilestoneModal = true;
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

  // Task management methods
  openTasksModal(milestone: Milestone) {
    this.selectedMilestone = milestone;
    this.showTasksModal = true;
  }

  closeTasksModal() {
    this.showTasksModal = false;
    this.selectedMilestone = null;
  }

  openAddTaskModal() {
    this.showAddTaskModal = true;
    this.resetTaskForm();
  }

  closeAddTaskModal() {
    this.showAddTaskModal = false;
    this.resetTaskForm();
  }

  resetTaskForm() {
    this.newTask = {
      name: '',
      description: '',
      priority: 'medium',
      assignedTo: null,
      dueDate: ''
    };
  }

  addTaskToMilestone() {
    if (!this.selectedMilestone || !this.newTask.name.trim() || !this.newTask.dueDate) {
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      name: this.newTask.name.trim(),
      description: this.newTask.description.trim() || 'Không có mô tả',
      status: 'pending',
      priority: this.newTask.priority,
      assignedTo: this.newTask.assignedTo,
      dueDate: this.newTask.dueDate,
      milestoneId: this.selectedMilestone.id,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (!this.milestoneTasks[this.selectedMilestone.id]) {
      this.milestoneTasks[this.selectedMilestone.id] = [];
    }
    this.milestoneTasks[this.selectedMilestone.id].push(newTask);

    console.log(`Added task ${newTask.name} to milestone ${this.selectedMilestone.name}`);
    this.closeAddTaskModal();
  }

  removeTaskFromMilestone(taskId: string) {
    if (!this.selectedMilestone) return;
    
    const tasks = this.milestoneTasks[this.selectedMilestone.id];
    if (tasks) {
      const index = tasks.findIndex(t => t.id === taskId);
      if (index > -1) {
        const removedTask = tasks.splice(index, 1)[0];
        console.log(`Removed task ${removedTask.name} from milestone ${this.selectedMilestone.name}`);
      }
    }
  }

  onTaskStatusChange(taskId: string, event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.updateTaskStatus(taskId, target.value);
    }
  }

  updateTaskStatus(taskId: string, newStatus: string) {
    if (!this.selectedMilestone) return;
    
    // Validate the status value
    const validStatuses = ['pending', 'in-progress', 'completed', 'blocked'] as const;
    if (!validStatuses.includes(newStatus as any)) {
      console.error(`Invalid status: ${newStatus}`);
      return;
    }
    
    const tasks = this.milestoneTasks[this.selectedMilestone.id];
    if (tasks) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.status = newStatus as 'pending' | 'in-progress' | 'completed' | 'blocked';
        task.updatedAt = new Date().toISOString().split('T')[0];
        console.log(`Updated task ${task.name} status to ${newStatus}`);
      }
    }
  }

  getTasksForMilestone(milestoneId: string): Task[] {
    return this.milestoneTasks[milestoneId] || [];
  }

  getTaskStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Chờ thực hiện',
      'in-progress': 'Đang thực hiện',
      'completed': 'Hoàn thành',
      'blocked': 'Bị chặn'
    };
    return statusMap[status] || status;
  }

  getPriorityText(priority: string): string {
    const priorityMap: { [key: string]: string } = {
      'low': 'Thấp',
      'medium': 'Trung bình',
      'high': 'Cao',
      'urgent': 'Khẩn cấp'
    };
    return priorityMap[priority] || priority;
  }

  getPriorityColor(priority: string): string {
    const colorMap: { [key: string]: string } = {
      'low': '#10b981',
      'medium': '#f59e0b',
      'high': '#ef4444',
      'urgent': '#dc2626'
    };
    return colorMap[priority] || '#6b7280';
  }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'pending': '#6b7280',
      'in-progress': '#f59e0b',
      'completed': '#10b981',
      'blocked': '#ef4444'
    };
    return colorMap[status] || '#6b7280';
  }

  getTasksCount(milestoneId: string): number {
    return this.getTasksForMilestone(milestoneId).length;
  }

  getCompletedTasksCount(milestoneId: string): number {
    return this.getTasksForMilestone(milestoneId).filter(t => t.status === 'completed').length;
  }

  getInProgressTasksCount(milestoneId: string): number {
    return this.getTasksForMilestone(milestoneId).filter(t => t.status === 'in-progress').length;
  }

  getTasksByStatus(milestoneId: string, status: string): Task[] {
    return this.getTasksForMilestone(milestoneId).filter(t => t.status === status);
  }

  // Helper methods to safely handle undefined milestone IDs
  getTasksCountSafe(milestoneId: string | undefined): number {
    if (!milestoneId) return 0;
    return this.getTasksCount(milestoneId);
  }

  getCompletedTasksCountSafe(milestoneId: string | undefined): number {
    if (!milestoneId) return 0;
    return this.getCompletedTasksCount(milestoneId);
  }

  getInProgressTasksCountSafe(milestoneId: string | undefined): number {
    if (!milestoneId) return 0;
    return this.getInProgressTasksCount(milestoneId);
  }

  getTasksForMilestoneSafe(milestoneId: string | undefined): Task[] {
    if (!milestoneId) return [];
    return this.getTasksForMilestone(milestoneId);
  }

  backToProjects(): void {
    this.router.navigate(['/pm/projects']);
  }

  // Milestone actions
  viewMilestoneDetails(milestone: Milestone) {
    this.selectedMilestoneForDetails = milestone;
    this.showMilestoneDetailsModal = true;
  }

  openEditMilestone(milestone: Milestone) {
    this.selectedMilestoneForEdit = milestone;
    this.editMilestoneForm = {
      name: milestone.name,
      description: milestone.description || '',
      startDate: milestone.startDate || '',
      endDate: milestone.endDate || '',
      status: milestone.status,
      priority: milestone.priority || 'medium'
    };
    this.showEditMilestoneModal = true;
  }

  closeEditMilestone() {
    this.showEditMilestoneModal = false;
    this.selectedMilestoneForEdit = null;
    this.resetEditMilestoneForm();
  }

  resetEditMilestoneForm() {
    this.editMilestoneForm = {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'pending',
      priority: 'medium'
    };
  }

  saveMilestoneEdit() {
    if (!this.editMilestoneForm.name.trim()) {
      return;
    }
    if (!this.selectedMilestoneForEdit) {
      // Tạo mới milestone
      const newMilestone: Milestone = {
        id: Date.now().toString(),
        name: this.editMilestoneForm.name.trim(),
        description: this.editMilestoneForm.description.trim(),
        startDate: this.editMilestoneForm.startDate,
        endDate: this.editMilestoneForm.endDate,
        status: this.editMilestoneForm.status,
        priority: this.editMilestoneForm.priority,
        progress: 0,
        projectId: this.currentProject?.id || '',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        projectName: this.currentProject?.name || ''
      };
      this.milestones.push(newMilestone);
      this.closeEditMilestone();
      return;
    }
    // Update milestone data
    const milestoneIndex = this.milestones.findIndex(m => m.id === this.selectedMilestoneForEdit!.id);
    if (milestoneIndex !== -1) {
      this.milestones[milestoneIndex] = {
        ...this.milestones[milestoneIndex],
        ...this.editMilestoneForm
      };
    }
    this.closeEditMilestone();
  }

  closeMilestoneDetails() {
    this.showMilestoneDetailsModal = false;
    this.selectedMilestoneForDetails = null;
  }
}
