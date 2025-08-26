import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';

interface ProjectOverview {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  progress: number;
  startDate: string;
  endDate: string;
  manager: string;
  teamSize: number;
  completedMilestones: number;
  totalMilestones: number;
  completedTasks: number;
  totalTasks: number;
  budget: number;
  priority: 'high' | 'medium' | 'low';
}

interface Milestone {
  id: number;
  projectId: number;
  name: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'pending' | 'overdue';
  progress: number;
  assignedTo: string;
}

interface Meeting {
  id: number;
  projectId: number;
  title: string;
  type: 'kickoff' | 'review' | 'status' | 'milestone' | 'stakeholder';
  date: string;
  duration: number;
  participants: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  agenda: string;
}

interface ProjectManager {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'available' | 'busy' | 'unavailable';
  managedProjects: number;
  maxProjects: number;
  expertise: string[];
  rating: number;
}

interface ProjectMetrics {
  milestonesCompleted: number;
  totalMilestones: number;
  tasksCompleted: number;
  totalTasks: number;
  overallProgress: number;
  upcomingMilestones: number;
  overdueMilestones: number;
  nextMeetings: number;
}

interface NewPMForm {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  startDate: string;
}

@Component({
  selector: 'app-business-owner-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class BusinessOwnerDashboard implements OnInit {
  @ViewChild('milestonesSection') milestonesSectionRef?: ElementRef<HTMLElement>;
  @ViewChild('meetingsSection') meetingsSectionRef?: ElementRef<HTMLElement>;
  // Dashboard data
  projects = signal<ProjectOverview[]>([]);
  milestones = signal<Milestone[]>([]);
  meetings = signal<Meeting[]>([]);
  projectManagers = signal<ProjectManager[]>([]);
  projectMetrics = signal<ProjectMetrics>({
    milestonesCompleted: 0,
    totalMilestones: 0,
    tasksCompleted: 0,
    totalTasks: 0,
    overallProgress: 0,
    upcomingMilestones: 0,
    overdueMilestones: 0,
    nextMeetings: 0
  });

  // UI state
  isLoading = signal(true);
  selectedProject = signal<ProjectOverview | null>(null);
  showAssignPMModal = signal(false);
  showProjectDetailsModal = signal(false);
  showCreatePMModal = signal(false);
  showCreateProjectModal = signal(false);
  
  // PM Form data
  newPMForm = signal<NewPMForm>({
    name: '', email: '', phone: '', position: '', department: '', startDate: ''
  });
  
  // Project Form data
  newProjectForm = signal<{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    budget: number | null;
    priority: 'high' | 'medium' | 'low';
    pmId: number | null;
  }>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: null,
    priority: 'medium',
    pmId: null
  });
  
  // Form validation
  isSubmitting = signal(false);
  formErrors = signal<{[key: string]: string}>({});

  // Summary stats
  summaryStats = signal({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalMilestones: 0,
    completedMilestones: 0,
    upcomingMeetings: 0,
    availablePMs: 0,
    totalPMs: 0
  });

  constructor() {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  async loadDashboardData(): Promise<void> {
    this.isLoading.set(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock project data
      const mockProjects: ProjectOverview[] = [
        {
          id: 1,
          name: 'Phát Triển Website Mới',
          status: 'active',
          progress: 75,
          startDate: '2024-01-15',
          endDate: '2024-04-15',
          manager: 'Nguyễn Văn A',
          teamSize: 8,
          completedMilestones: 3,
          totalMilestones: 5,
          completedTasks: 45,
          totalTasks: 60,
          budget: 50000,
          priority: 'high'
        },
        {
          id: 2,
          name: 'Ứng Dụng Di Động',
          status: 'active',
          progress: 45,
          startDate: '2024-02-01',
          endDate: '2024-06-30',
          manager: 'Trần Thị B',
          teamSize: 12,
          completedMilestones: 2,
          totalMilestones: 6,
          completedTasks: 38,
          totalTasks: 85,
          budget: 80000,
          priority: 'high'
        },
        {
          id: 3,
          name: 'Chiến Dịch Marketing Q1',
          status: 'completed',
          progress: 100,
          startDate: '2024-01-01',
          endDate: '2024-03-31',
          manager: 'Lê Văn C',
          teamSize: 6,
          completedMilestones: 4,
          totalMilestones: 4,
          completedTasks: 52,
          totalTasks: 52,
          budget: 30000,
          priority: 'medium'
        },
        {
          id: 4,
          name: 'Ra Mắt Sản Phẩm Mới',
          status: 'active',
          progress: 30,
          startDate: '2024-03-01',
          endDate: '2024-08-31',
          manager: '',
          teamSize: 15,
          completedMilestones: 1,
          totalMilestones: 8,
          completedTasks: 25,
          totalTasks: 120,
          budget: 120000,
          priority: 'high'
        }
      ];

      // Mock milestone data
      const mockMilestones: Milestone[] = [
        {
          id: 1,
          projectId: 1,
          name: 'Thiết Kế UI/UX',
          description: 'Hoàn thành thiết kế giao diện người dùng',
          dueDate: '2024-02-15',
          status: 'completed',
          progress: 100,
          assignedTo: 'Nguyễn Văn A'
        },
        {
          id: 2,
          projectId: 1,
          name: 'Phát Triển Frontend',
          description: 'Xây dựng giao diện người dùng',
          dueDate: '2024-03-15',
          status: 'in-progress',
          progress: 75,
          assignedTo: 'Nguyễn Văn A'
        },
        {
          id: 3,
          projectId: 2,
          name: 'Thiết Kế Kiến Trúc',
          description: 'Thiết kế kiến trúc ứng dụng',
          dueDate: '2024-02-28',
          status: 'completed',
          progress: 100,
          assignedTo: 'Trần Thị B'
        },
        {
          id: 4,
          projectId: 2,
          name: 'Phát Triển Backend',
          description: 'Xây dựng hệ thống backend',
          dueDate: '2024-04-15',
          status: 'in-progress',
          progress: 45,
          assignedTo: 'Trần Thị B'
        },
        {
          id: 5,
          projectId: 4,
          name: 'Nghiên Cứu Thị Trường',
          description: 'Phân tích thị trường và đối thủ cạnh tranh',
          dueDate: '2024-03-31',
          status: 'overdue',
          progress: 60,
          assignedTo: 'Chưa gán'
        }
      ];

      // Mock meeting data
      const mockMeetings: Meeting[] = [
        {
          id: 1,
          projectId: 1,
          title: 'Họp Đánh Giá Sprint 2',
          type: 'status',
          date: '2024-03-20T09:00:00',
          duration: 60,
          participants: ['Nguyễn Văn A', 'Trưởng nhóm Dev', 'QA Lead'],
          status: 'scheduled',
          agenda: 'Đánh giá tiến độ sprint 2 và lập kế hoạch sprint 3'
        },
        {
          id: 2,
          projectId: 2,
          title: 'Họp Đánh Giá Milestone 2',
          type: 'milestone',
          date: '2024-03-25T14:00:00',
          duration: 90,
          participants: ['Trần Thị B', 'Product Owner', 'Stakeholder'],
          status: 'scheduled',
          agenda: 'Đánh giá milestone 2 và thảo luận kế hoạch tiếp theo'
        },
        {
          id: 3,
          projectId: 4,
          title: 'Họp Khởi Động Dự Án',
          type: 'kickoff',
          date: '2024-03-28T10:00:00',
          duration: 120,
          participants: ['Chủ dự án', 'Stakeholder', 'Team Lead'],
          status: 'scheduled',
          agenda: 'Giới thiệu dự án, mục tiêu và kế hoạch thực hiện'
        }
      ];

      // Mock project managers data
      const mockProjectManagers: ProjectManager[] = [
        {
          id: 1,
          name: 'Nguyễn Văn A',
          role: 'Senior Project Manager',
          avatar: 'NVA',
          status: 'busy',
          managedProjects: 2,
          maxProjects: 3,
          expertise: ['Web Development', 'Agile', 'Team Management'],
          rating: 4.8
        },
        {
          id: 2,
          name: 'Trần Thị B',
          role: 'Project Manager',
          avatar: 'TTB',
          status: 'busy',
          managedProjects: 1,
          maxProjects: 2,
          expertise: ['Mobile Development', 'Scrum', 'Risk Management'],
          rating: 4.6
        },
        {
          id: 3,
          name: 'Lê Văn C',
          role: 'Lead Project Manager',
          avatar: 'LVC',
          status: 'available',
          managedProjects: 0,
          maxProjects: 2,
          expertise: ['Marketing', 'Digital Campaigns', 'Analytics'],
          rating: 4.9
        },
        {
          id: 4,
          name: 'Phạm Thị D',
          role: 'Project Manager',
          avatar: 'PTD',
          status: 'available',
          managedProjects: 0,
          maxProjects: 2,
          expertise: ['Product Development', 'User Research', 'Design Thinking'],
          rating: 4.7
        }
      ];

      // Calculate metrics
      const totalProjects = mockProjects.length;
      const activeProjects = mockProjects.filter(p => p.status === 'active').length;
      const completedProjects = mockProjects.filter(p => p.status === 'completed').length;
      const totalMilestones = mockMilestones.length;
      const completedMilestones = mockMilestones.filter(m => m.status === 'completed').length;
      const upcomingMeetings = mockMeetings.filter(m => m.status === 'scheduled').length;
      const availablePMs = mockProjectManagers.filter(pm => pm.status === 'available').length;
      const totalPMs = mockProjectManagers.length;

      // Set data
      this.projects.set(mockProjects);
      this.milestones.set(mockMilestones);
      this.meetings.set(mockMeetings);
      this.projectManagers.set(mockProjectManagers);
      this.summaryStats.set({
        totalProjects,
        activeProjects,
        completedProjects,
        totalMilestones,
        completedMilestones,
        upcomingMeetings,
        availablePMs,
        totalPMs
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  // Action methods
  onAssignPM(projectId: number): void {
    const project = this.projects().find(p => p.id === projectId);
    this.selectedProject.set(project || null);
    this.showAssignPMModal.set(true);
  }

  onViewProjectDetails(projectId: number): void {
    const project = this.projects().find(p => p.id === projectId);
    this.selectedProject.set(project || null);
    this.showProjectDetailsModal.set(true);
  }

  onAssignProjectToPM(projectId: number, pmId: number): void {
    console.log('Assigning project', projectId, 'to PM', pmId);
    // Update project manager assignment
    const updatedProjects = this.projects().map(p => 
      p.id === projectId ? { ...p, manager: this.projectManagers().find(pm => pm.id === pmId)?.name || '' } : p
    );
    this.projects.set(updatedProjects);
    this.showAssignPMModal.set(false);
  }

  onCloseModal(): void {
    this.showAssignPMModal.set(false);
    this.showProjectDetailsModal.set(false);
    this.selectedProject.set(null);
  }

  openCreateProjectModal(): void {
    if (this.showCreateProjectModal() || this.isSubmitting()) return;
    this.showCreateProjectModal.set(true);
    this.resetProjectForm();
  }

  closeCreateProjectModal(): void {
    this.showCreateProjectModal.set(false);
    this.resetProjectForm();
  }

  resetProjectForm(): void {
    this.newProjectForm.set({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      budget: null,
      priority: 'medium',
      pmId: null
    });
    this.formErrors.set({});
  }

  openCreatePMModal(): void {
    if (this.showCreatePMModal() || this.isSubmitting()) return;
    this.showCreatePMModal.set(true);
    this.resetPMForm();
  }

  closeCreatePMModal(): void {
    this.showCreatePMModal.set(false);
    this.resetPMForm();
  }

  resetPMForm(): void {
    this.newPMForm.set({
      name: '', email: '', phone: '', position: '', department: '', startDate: ''
    });
    this.formErrors.set({});
  }

  async createNewPM(): Promise<void> {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.formErrors.set({});

    const errors: {[key: string]: string} = {};
    const form = this.newPMForm();

    if (!form.name.trim()) errors['name'] = 'Họ tên là bắt buộc';
    if (!form.email.trim()) errors['email'] = 'Email là bắt buộc';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors['email'] = 'Email không hợp lệ';
    if (!form.phone.trim()) errors['phone'] = 'Số điện thoại là bắt buộc';
    if (!form.position.trim()) errors['position'] = 'Chức vụ là bắt buộc';
    if (!form.department.trim()) errors['department'] = 'Phòng ban là bắt buộc';
    if (!form.startDate) errors['startDate'] = 'Ngày bắt đầu là bắt buộc';

    if (Object.keys(errors).length > 0) {
      this.formErrors.set(errors);
      this.isSubmitting.set(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add new PM to project managers
      const newPM: ProjectManager = {
        id: this.projectManagers().length + 1,
        name: form.name,
        role: 'Project Manager',
        avatar: form.name.split(' ').map(n => n[0]).join(''),
        status: 'available',
        managedProjects: 0,
        maxProjects: 5,
        expertise: [form.department],
        rating: 0
      };

      const updatedPMs = [...this.projectManagers(), newPM];
      this.projectManagers.set(updatedPMs);

      this.closeCreatePMModal();
      console.log('New PM created successfully');
    } catch (error) {
      console.error('Error creating PM:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async createNewProject(): Promise<void> {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.formErrors.set({});

    const p = this.newProjectForm();
    const errors: {[key: string]: string} = {};

    if (!p.name.trim()) errors['project.name'] = 'Tên dự án là bắt buộc';
    if (!p.description.trim()) errors['project.description'] = 'Mô tả là bắt buộc';
    if (!p.startDate) errors['project.startDate'] = 'Ngày bắt đầu là bắt buộc';
    if (!p.endDate) errors['project.endDate'] = 'Ngày kết thúc là bắt buộc';
    if (p.startDate && p.endDate && new Date(p.endDate) < new Date(p.startDate)) {
      errors['project.dateRange'] = 'Ngày kết thúc phải sau ngày bắt đầu';
    }
    if (p.budget === null || p.budget < 0) errors['project.budget'] = 'Ngân sách không hợp lệ';

    if (Object.keys(errors).length > 0) {
      this.formErrors.set(errors);
      this.isSubmitting.set(false);
      return;
    }

    try {
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1200));

      const nextId = (this.projects().reduce((max, cur) => Math.max(max, cur.id), 0) || 0) + 1;
      const pmName = p.pmId ? (this.projectManagers().find(pm => pm.id === p.pmId)?.name || '') : '';

      const newProject: ProjectOverview = {
        id: nextId,
        name: p.name,
        status: 'active',
        progress: 0,
        startDate: p.startDate,
        endDate: p.endDate,
        manager: pmName,
        teamSize: 0,
        completedMilestones: 0,
        totalMilestones: 0,
        completedTasks: 0,
        totalTasks: 0,
        budget: p.budget ?? 0,
        priority: p.priority
      };

      this.projects.set([newProject, ...this.projects()]);

      // Update PM capacity if assigned
      if (p.pmId) {
        const updatedPMs = this.projectManagers().map(pm =>
          pm.id === p.pmId ? { ...pm, managedProjects: pm.managedProjects + 1, status: (pm.managedProjects + 1) >= pm.maxProjects ? 'busy' : pm.status } : pm
        );
        this.projectManagers.set(updatedPMs);
      }

      // Update summary stats
      const s = this.summaryStats();
      this.summaryStats.set({
        ...s,
        totalProjects: s.totalProjects + 1,
        activeProjects: s.activeProjects + 1
      });

      this.closeCreateProjectModal();
      console.log('Project created');
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }



  onEditProject(projectId: number): void {
    console.log('Edit project clicked:', projectId);
    // Open edit project modal
  }

  onViewAllMilestones(): void {
    const el = this.milestonesSectionRef?.nativeElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onViewAllMeetings(): void {
    const el = this.meetingsSectionRef?.nativeElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Utility methods
  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return '#38a169';
      case 'completed': return '#3182ce';
      case 'on-hold': return '#d69e2e';
      case 'cancelled': return '#e53e3e';
      default: return '#718096';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'Đang Hoạt Động';
      case 'completed': return 'Hoàn Thành';
      case 'on-hold': return 'Tạm Dừng';
      case 'cancelled': return 'Đã Hủy';
      default: return 'Không Xác Định';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return '#e53e3e';
      case 'medium': return '#d69e2e';
      case 'low': return '#38a169';
      default: return '#718096';
    }
  }

  getPriorityText(priority: string): string {
    switch (priority) {
      case 'high': return 'Cao';
      case 'medium': return 'Trung Bình';
      case 'low': return 'Thấp';
      default: return 'Không Xác Định';
    }
  }

  getMilestoneStatusColor(status: string): string {
    switch (status) {
      case 'completed': return '#38a169';
      case 'in-progress': return '#3182ce';
      case 'pending': return '#d69e2e';
      case 'overdue': return '#e53e3e';
      default: return '#718096';
    }
  }

  getMilestoneStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Hoàn Thành';
      case 'in-progress': return 'Đang Thực Hiện';
      case 'pending': return 'Chờ Thực Hiện';
      case 'overdue': return 'Quá Hạn';
      default: return 'Không Xác Định';
    }
  }

  getMeetingTypeText(type: string): string {
    switch (type) {
      case 'kickoff': return 'Khởi Động';
      case 'review': return 'Đánh Giá';
      case 'status': return 'Trạng Thái';
      case 'milestone': return 'Milestone';
      case 'stakeholder': return 'Stakeholder';
      default: return 'Không Xác Định';
    }
  }

  getProjectName(projectId: number): string {
    const project = this.projects().find(p => p.id === projectId);
    return project?.name || 'Không xác định';
  }

  getProjectMilestones(projectId: number): Milestone[] {
    return this.milestones().filter(m => m.projectId === projectId);
  }

  getProjectMeetings(projectId: number): Meeting[] {
    return this.meetings().filter(m => m.projectId === projectId);
  }

  getAvailablePMs(): ProjectManager[] {
    return this.projectManagers().filter(pm => 
      pm.status === 'available' && pm.managedProjects < pm.maxProjects
    );
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('vi-VN');
  }

  formatDateTime(dateTimeString: string): string {
    return new Date(dateTimeString).toLocaleString('vi-VN');
  }
}
