import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
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
}

interface Milestone {
  id: string;
  name: string;
  projectId: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  progress: number;
}

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  type: 'online' | 'offline' | 'hybrid';
  projectId?: string;
  milestoneId?: string;
  participants: string[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  dueDate: string;
  projectId?: string;
  milestoneId?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  icon: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

interface BreadcrumbItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-pm-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './pm-layout.component.html',
  styleUrls: ['./pm-layout.component.scss']
})
export class PmLayoutComponent implements OnInit {
  // Services
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  public router = inject(Router);
  private route = inject(ActivatedRoute);

  // UI state
  sidebarCollapsed = signal(false);
  userMenuOpen = signal(false);
  notificationsOpen = signal(false);
  
  // Modal states
  showCreateProjectModal = signal(false);
  showCreateMeetingModal = signal(false);
  showCreateTaskModal = signal(false);
  
  // Forms
  projectForm!: FormGroup;
  meetingForm!: FormGroup;
  taskForm!: FormGroup;
  
  // Data
  currentUser = signal({
    name: 'Project Manager',
    email: 'pm@company.com',
    avatar: 'PM',
    role: 'Quản Lý Dự Án'
  });

  // Mock data
  projects: Project[] = [
    {
      id: '1',
      name: 'Website E-commerce',
      description: 'Phát triển website bán hàng trực tuyến',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      manager: 'PM001',
      status: 'active',
      progress: 65
    },
    {
      id: '2',
      name: 'Mobile App',
      description: 'Ứng dụng di động cho khách hàng',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      manager: 'PM002',
      status: 'planning',
      progress: 15
    }
  ];

  milestones: Milestone[] = [
    {
      id: '1',
      name: 'Thiết Kế UI/UX',
      projectId: '1',
      description: 'Thiết kế giao diện người dùng',
      startDate: '2024-01-01',
      endDate: '2024-02-15',
      status: 'completed',
      progress: 100
    },
    {
      id: '2',
      name: 'Phát Triển Frontend',
      projectId: '1',
      description: 'Xây dựng giao diện người dùng',
      startDate: '2024-02-16',
      endDate: '2024-04-30',
      status: 'in-progress',
      progress: 75
    },
    {
      id: '3',
      name: 'Phát Triển Backend',
      projectId: '1',
      description: 'Xây dựng hệ thống backend',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      status: 'in-progress',
      progress: 60
    }
  ];

  teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@company.com',
      avatar: 'NA',
      role: 'Frontend Developer',
      department: 'Development'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@company.com',
      avatar: 'TB',
      role: 'Backend Developer',
      department: 'Development'
    },
    {
      id: '3',
      name: 'Lê Văn C',
      email: 'levanc@company.com',
      avatar: 'LC',
      role: 'UI/UX Designer',
      department: 'Design'
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      email: 'phamthid@company.com',
      avatar: 'PD',
      role: 'QA Engineer',
      department: 'Testing'
    }
  ];

  notifications: Notification[] = [
    {
      id: '1',
      title: 'Cuộc họp sắp diễn ra',
      message: 'Cuộc họp "Review thiết kế UI" sẽ bắt đầu sau 30 phút',
      icon: '📅',
      time: '5 phút trước',
      read: false,
      type: 'info'
    },
    {
      id: '2',
      title: 'Task hoàn thành',
      message: 'Task "Thiết kế trang chủ" đã được hoàn thành bởi Lê Văn C',
      icon: '✅',
      time: '1 giờ trước',
      read: false,
      type: 'success'
    },
    {
      id: '3',
      title: 'Milestone cập nhật',
      message: 'Milestone "Thiết kế UI/UX" đã đạt 100% tiến độ',
      icon: '🎯',
      time: '2 giờ trước',
      read: true,
      type: 'success'
    }
  ];

  selectedParticipants: string[] = [];

  // Navigation menu
  menuItems: MenuItem[] = [
    {
      label: 'Bảng Điều Khiển',
      icon: '📊',
      route: '/pm/dashboard',
      badge: '3'
    },
    {
      label: 'Dự Án',
      icon: '📁',
      route: '/pm/projects',
      badge: '2'
    },
    {
      label: 'Cuộc Họp',
      icon: '📅',
      route: '/pm/meetings',
      badge: '5'
    },
    {
      label: 'Công Việc',
      icon: '✅',
      route: '/pm/tasks',
      badge: '12'
    },
    {
      label: 'Nhóm',
      icon: '👥',
      route: '/pm/team',
      badge: '4'
    },
    {
      label: 'Tài Liệu',
      icon: '📄',
      route: '/pm/documents',
      badge: '8'
    },
    {
      label: 'Báo Cáo',
      icon: '📈',
      route: '/pm/reports'
    }
  ];

  constructor() {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.setupRouteListener();
  }

  private initializeForms(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      manager: [''],
      status: ['planning']
    });

    this.meetingForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: [60, [Validators.min(15), Validators.max(480)]],
      type: ['online'],
      projectId: [''],
      milestoneId: ['']
    });

    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      assigneeId: [''],
      priority: ['medium'],
      startDate: [''],
      dueDate: [''],
      projectId: [''],
      milestoneId: [''],
      status: ['todo']
    });
  }

  private setupRouteListener(): void {
    this.router.events.subscribe(() => {
      // Update breadcrumb based on current route
    });
  }

  // UI Methods
  toggleSidebar(): void {
    this.sidebarCollapsed.update(collapsed => !collapsed);
  }

  toggleUserMenu(): void {
    this.userMenuOpen.update(open => !open);
  }

  toggleNotifications(): void {
    this.notificationsOpen.update(open => !open);
  }

  // Modal Methods
  openCreateProject(): void {
    this.showCreateProjectModal.set(true);
    this.projectForm.reset({
      status: 'planning'
    });
  }

  closeCreateProject(): void {
    this.showCreateProjectModal.set(false);
    this.projectForm.reset();
  }

  openCreateMeeting(): void {
    this.showCreateMeetingModal.set(true);
    this.meetingForm.reset({
      duration: 60,
      type: 'online'
    });
    this.selectedParticipants = [];
  }

  closeCreateMeeting(): void {
    this.showCreateMeetingModal.set(false);
    this.meetingForm.reset();
    this.selectedParticipants = [];
  }

  openCreateTask(): void {
    this.showCreateTaskModal.set(true);
    this.taskForm.reset({
      priority: 'medium',
      status: 'todo'
    });
  }

  closeCreateTask(): void {
    this.showCreateTaskModal.set(false);
    this.taskForm.reset();
  }

  // Form Submission Methods
  submitProject(): void {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      console.log('Creating project:', projectData);
      
      // TODO: Call API to create project
      this.closeCreateProject();
      // Show success message
    }
  }

  submitMeeting(): void {
    if (this.meetingForm.valid) {
      const meetingData = {
        ...this.meetingForm.value,
        participants: this.selectedParticipants
      };
      console.log('Creating meeting:', meetingData);
      
      // TODO: Call API to create meeting
      this.closeCreateMeeting();
      // Show success message
    }
  }

  submitTask(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      console.log('Creating task:', taskData);
      
      // TODO: Call API to create task
      this.closeCreateTask();
      // Show success message
    }
  }

  // Participant Methods
  toggleParticipant(memberId: string): void {
    const index = this.selectedParticipants.indexOf(memberId);
    if (index > -1) {
      this.selectedParticipants.splice(index, 1);
    } else {
      this.selectedParticipants.push(memberId);
    }
  }

  isParticipantSelected(memberId: string): boolean {
    return this.selectedParticipants.includes(memberId);
  }

  // Data Methods
  getProjects(): Project[] {
    return this.projects;
  }

  getMilestones(): Milestone[] {
    return this.milestones;
  }

  getTeamMembers(): TeamMember[] {
    return this.teamMembers;
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }

  // Notification Methods
  hasUnreadNotifications(): boolean {
    return this.notifications.some(n => !n.read);
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  // Navigation Methods
  getPageTitle(): string {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/dashboard')) return 'Bảng Điều Khiển';
    if (currentRoute.includes('/projects') && currentRoute.includes('/milestones')) {
      // Extract project ID from URL
      const projectId = currentRoute.split('/')[3]; // /pm/projects/{projectId}/milestones
      const project = this.projects.find(p => p.id === projectId);
      return project ? `Milestones - ${project.name}` : 'Milestones';
    }
    if (currentRoute.includes('/projects')) return 'Quản Lý Dự Án';
    if (currentRoute.includes('/milestones')) return 'Quản Lý Milestone';
    if (currentRoute.includes('/meetings')) return 'Quản Lý Cuộc Họp';
    if (currentRoute.includes('/tasks')) return 'Quản Lý Công Việc';
    if (currentRoute.includes('/team')) return 'Quản Lý Nhóm';
    if (currentRoute.includes('/documents')) return 'Quản Lý Tài Liệu';
    if (currentRoute.includes('/reports')) return 'Báo Cáo & Thống Kê';
    return 'Cổng Quản Lý Dự Án';
  }

  getBreadcrumb(): BreadcrumbItem[] | null {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/projects') && currentRoute.includes('/milestones')) {
      // Project-specific milestones
      const projectId = currentRoute.split('/')[3];
      const project = this.projects.find(p => p.id === projectId);
      return [
        { label: 'Dự Án', route: '/pm/projects' },
        { label: project ? project.name : 'Dự Án', route: `/pm/projects/${projectId}` },
        { label: 'Milestones', route: `/pm/projects/${projectId}/milestones` }
      ];
    }
    if (currentRoute.includes('/projects')) {
      return [
        { label: 'Dự Án', route: '/pm/projects' }
      ];
    }
    if (currentRoute.includes('/milestones')) {
      return [
        { label: 'Dự Án', route: '/pm/projects' },
        { label: 'Milestone', route: '/pm/milestones' }
      ];
    }
    if (currentRoute.includes('/meetings')) {
      return [
        { label: 'Cuộc Họp', route: '/pm/meetings' }
      ];
    }
    if (currentRoute.includes('/tasks')) {
      return [
        { label: 'Công Việc', route: '/pm/tasks' }
      ];
    }
    return null;
  }

  // User Menu Methods
  openProfile(): void {
    console.log('Opening profile...');
    // TODO: Navigate to profile page
  }

  openSettings(): void {
    console.log('Opening settings...');
    // TODO: Navigate to settings page
  }

  openHelp(): void {
    console.log('Opening help...');
    // TODO: Open help modal or navigate to help page
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }
}


