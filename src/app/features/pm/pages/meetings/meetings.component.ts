import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PmLayoutComponent } from '../../layout/pm-layout.component';
import { Router, RouterModule } from '@angular/router';

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  type: 'online' | 'offline' | 'hybrid';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  participants: string[];
  projectId: string;
  projectName: string;
  milestoneId?: string;
  milestoneName?: string;
  location?: string;
  meetingLink?: string;
}

interface Project {
  id: string;
  name: string;
}

interface Milestone {
  id: string;
  name: string;
  projectId: string;
}

interface MeetingNotes {
  meetingId: string;
  summary: string;
  todoList: TodoItem[];
  manualNotes: ManualNote[];
  createdAt: string;
  updatedAt: string;
}

interface TodoItem {
  id: string;
  task: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}

interface ManualNote {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'general' | 'action-item' | 'decision' | 'question';
}

@Component({
  selector: 'app-pm-meetings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meetings.html',
  styleUrls: ['./meetings.scss']
})
export class PmMeetings {
  constructor(private router: Router,  @Inject(PLATFORM_ID) private platformId: Object) {
  }
  private layoutComponent = inject(PmLayoutComponent);

  // Filter states
  selectedProjectFilter = '';
  selectedStatusFilter = '';
  selectedTypeFilter = '';
  searchTerm = '';
  sortBy = 'date'; // 'date', 'title', 'project'

  // Notes modal state
  showNotesModal = false;
  selectedMeetingForNotes: Meeting | null = null;
  meetingNotes: MeetingNotes | null = null;
  newManualNote = {
    content: '',
    type: 'general' as 'general' | 'action-item' | 'decision' | 'question'
  };
  
  // Tab state
  activeTab = 'summary'; // 'summary', 'todos', 'notes'
  
  // Edit state for todos
  editingTodo: TodoItem | null = null;
  editTodoForm = {
    task: '',
    assignee: '',
    dueDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    status: 'pending' as 'pending' | 'in-progress' | 'completed'
  };

  // Mock data for projects and milestones
  projects: Project[] = [
    { id: '1', name: 'Website E-commerce' },
    { id: '2', name: 'Mobile App' },
    { id: '3', name: 'CRM System' }
  ];

  milestones: Milestone[] = [
    { id: '1', name: 'Planning Phase', projectId: '1' },
    { id: '2', name: 'Design Phase', projectId: '1' },
    { id: '3', name: 'Development Phase', projectId: '1' },
    { id: '4', name: 'Testing Phase', projectId: '1' },
    { id: '5', name: 'Requirements Analysis', projectId: '2' },
    { id: '6', name: 'UI/UX Design', projectId: '2' },
    { id: '7', name: 'Database Design', projectId: '3' },
    { id: '8', name: 'API Development', projectId: '3' }
  ];

  // Mock meeting notes data
  meetingNotesData: MeetingNotes[] = [
    {
      meetingId: '1',
      summary: 'Cuộc họp khởi động dự án Website E-commerce đã diễn ra thành công. Team đã thống nhất về mục tiêu dự án, timeline và phân chia công việc. Các thành viên đã được phân công vai trò cụ thể và cam kết hoàn thành đúng tiến độ.',
      todoList: [
        {
          id: '1',
          task: 'Tạo wireframe cho trang chủ',
          assignee: 'Nguyễn Văn A',
          dueDate: '2024-01-25',
          priority: 'high',
          status: 'completed'
        },
        {
          id: '2',
          task: 'Thiết kế database schema',
          assignee: 'Lê Văn C',
          dueDate: '2024-01-30',
          priority: 'high',
          status: 'completed'
        },
        {
          id: '3',
          task: 'Chuẩn bị tài liệu yêu cầu chi tiết',
          assignee: 'Trần Thị B',
          dueDate: '2024-01-28',
          priority: 'medium',
          status: 'completed'
        }
      ],
      manualNotes: [
        {
          id: '1',
          author: 'Nguyễn Văn A',
          content: 'Cần xem xét thêm tính năng thanh toán qua ví điện tử',
          timestamp: '2024-01-15T09:30:00Z',
          type: 'action-item'
        },
        {
          id: '2',
          author: 'Trần Thị B',
          content: 'Quyết định sử dụng React cho frontend và Node.js cho backend',
          timestamp: '2024-01-15T10:15:00Z',
          type: 'decision'
        },
        {
          id: '3',
          author: 'Lê Văn C',
          content: 'Cần làm rõ yêu cầu về bảo mật và quyền truy cập',
          timestamp: '2024-01-15T10:45:00Z',
          type: 'question'
        }
      ],
      createdAt: '2024-01-15T11:00:00Z',
      updatedAt: '2024-01-15T11:00:00Z'
    },
    {
      meetingId: '6',
      summary: 'Cuộc họp thảo luận về kiến trúc hệ thống CRM đã diễn ra thành công. Team đã thống nhất về việc sử dụng microservices architecture và database design. Các thành viên đã được phân công trách nhiệm cụ thể cho từng module.',
      todoList: [
        {
          id: '4',
          task: 'Thiết kế database schema cho module User Management',
          assignee: 'Hoàng Văn E',
          dueDate: '2024-06-25',
          priority: 'high',
          status: 'in-progress'
        },
        {
          id: '5',
          task: 'Tạo API documentation cho các endpoints',
          assignee: 'Vũ Thị F',
          dueDate: '2024-06-30',
          priority: 'medium',
          status: 'pending'
        }
      ],
      manualNotes: [
        {
          id: '4',
          author: 'Hoàng Văn E',
          content: 'Quyết định sử dụng PostgreSQL cho database chính',
          timestamp: '2024-06-20T16:30:00Z',
          type: 'decision'
        },
        {
          id: '5',
          author: 'Vũ Thị F',
          content: 'Cần xem xét thêm tính năng backup và recovery',
          timestamp: '2024-06-20T17:00:00Z',
          type: 'action-item'
        }
      ],
      createdAt: '2024-06-20T17:30:00Z',
      updatedAt: '2024-06-20T17:30:00Z'
    }
  ];

  meetings: Meeting[] = [
    {
      id: '1',
      title: 'Kick-off Dự Án Website E-commerce',
      description: 'Cuộc họp khởi động dự án, thảo luận về mục tiêu và kế hoạch thực hiện',
      date: '2024-01-15',
      time: '09:00',
      duration: 90,
      type: 'online',
      status: 'completed',
      participants: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'],
      projectId: '1',
      projectName: 'Website E-commerce',
      milestoneId: '1',
      milestoneName: 'Planning Phase',
      location: 'Zoom Meeting'
    },
    {
      id: '2',
      title: 'Review Thiết Kế UI/UX',
      description: 'Đánh giá và thảo luận về thiết kế giao diện người dùng',
      date: '2024-02-20',
      time: '14:00',
      duration: 60,
      type: 'hybrid',
      status: 'scheduled',
      participants: ['Lê Văn C', 'Nguyễn Văn A', 'Trần Thị B'],
      projectId: '1',
      projectName: 'Website E-commerce',
      milestoneId: '2',
      milestoneName: 'Design Phase',
      location: 'Phòng họp A - Tầng 3'
    },
    {
      id: '3',
      title: 'Demo Frontend Development',
      description: 'Trình bày tiến độ phát triển frontend và nhận feedback',
      date: '2024-03-25',
      time: '10:00',
      duration: 75,
      type: 'online',
      status: 'scheduled',
      participants: ['Nguyễn Văn A', 'Lê Văn C', 'Phạm Thị D'],
      projectId: '1',
      projectName: 'Website E-commerce',
      milestoneId: '3',
      milestoneName: 'Development Phase',
      location: 'Google Meet'
    },
    {
      id: '4',
      title: 'Testing Strategy Discussion',
      description: 'Thảo luận về chiến lược kiểm thử và QA cho dự án',
      date: '2024-04-10',
      time: '15:30',
      duration: 45,
      type: 'offline',
      status: 'scheduled',
      participants: ['Phạm Thị D', 'Trần Thị B', 'Nguyễn Văn A'],
      projectId: '1',
      projectName: 'Website E-commerce',
      milestoneId: '4',
      milestoneName: 'Testing Phase',
      location: 'Phòng họp B - Tầng 2'
    },
    {
      id: '5',
      title: 'Mobile App Requirements Review',
      description: 'Xem xét và thống nhất các yêu cầu cho ứng dụng di động',
      date: '2024-05-15',
      time: '13:00',
      duration: 120,
      type: 'online',
      status: 'scheduled',
      participants: ['Hoàng Văn E', 'Vũ Thị F', 'Nguyễn Văn A'],
      projectId: '2',
      projectName: 'Mobile App',
      milestoneId: '5',
      milestoneName: 'Requirements Analysis',
      location: 'Microsoft Teams'
    },
    {
      id: '6',
      title: 'CRM System Architecture Discussion',
      description: 'Thảo luận về kiến trúc hệ thống CRM và database design',
      date: '2024-06-20',
      time: '16:00',
      duration: 90,
      type: 'online',
      status: 'completed',
      participants: ['Hoàng Văn E', 'Vũ Thị F', 'Nguyễn Văn A'],
      projectId: '3',
      projectName: 'CRM System',
      milestoneId: '7',
      milestoneName: 'Database Design',
      location: 'Microsoft Teams'
    },
    {
      id: '7',
      title: 'Mobile App UI/UX Review',
      description: 'Đánh giá thiết kế giao diện ứng dụng di động',
      date: '2024-07-15',
      time: '14:30',
      duration: 60,
      type: 'hybrid',
      status: 'completed',
      participants: ['Vũ Thị F', 'Hoàng Văn E', 'Trần Thị B'],
      projectId: '2',
      projectName: 'Mobile App',
      milestoneId: '6',
      milestoneName: 'UI/UX Design',
      location: 'Phòng họp C - Tầng 4'
    }
  ];

  // Get filtered and sorted meetings
  get filteredMeetings(): Meeting[] {
    let filtered = this.meetings;

    // Filter by project
    if (this.selectedProjectFilter) {
      filtered = filtered.filter(m => m.projectId === this.selectedProjectFilter);
    }

    // Filter by status
    if (this.selectedStatusFilter) {
      filtered = filtered.filter(m => m.status === this.selectedStatusFilter);
    }

    // Filter by type
    if (this.selectedTypeFilter) {
      filtered = filtered.filter(m => m.type === this.selectedTypeFilter);
    }

    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(term) ||
        m.description.toLowerCase().includes(term) ||
        m.projectName.toLowerCase().includes(term) ||
        (m.milestoneName && m.milestoneName.toLowerCase().includes(term))
      );
    }

    // Sort meetings
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'date':
          return new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'project':
          return a.projectName.localeCompare(b.projectName);
        default:
          return 0;
      }
    });

    return filtered;
  }

  // Get available projects for filter
  get availableProjects(): Project[] {
    return this.projects;
  }

  // Get milestones for a specific project
  getMilestonesForProject(projectId: string): Milestone[] {
    return this.milestones.filter(m => m.projectId === projectId);
  }

  // Clear all filters
  clearFilters() {
    this.selectedProjectFilter = '';
    this.selectedStatusFilter = '';
    this.selectedTypeFilter = '';
    this.searchTerm = '';
    this.sortBy = 'date';
  }

  // Notes modal methods
  openMeetingNotes(meeting: Meeting) {
    console.log('Opening meeting notes for:', meeting);
    this.selectedMeetingForNotes = meeting;
    this.meetingNotes = this.meetingNotesData.find(notes => notes.meetingId === meeting.id) || null;
    console.log('Found meeting notes:', this.meetingNotes);
    this.resetNewNote();
    this.activeTab = 'summary';
    this.showNotesModal = true;
    console.log('Modal should be visible:', this.showNotesModal);
  }

  closeMeetingNotes() {
    this.showNotesModal = false;
    this.selectedMeetingForNotes = null;
    this.meetingNotes = null;
    this.resetNewNote();
    this.activeTab = 'summary';
    this.editingTodo = null;
  }

  resetNewNote() {
    this.newManualNote = {
      content: '',
      type: 'general'
    };
  }
  // joinMeeting(meeting: Meeting): void {
  //   console.log('Joining meeting:', meeting.title);
  //   if (meeting.meetingLink) {
  //     if (isPlatformBrowser(this.platformId)) {
  //       this.router.navigate(['/meeting', meeting.id]);
  //     } else {
  //       console.warn('Browser environment not available, cannot open meeting link.');
  //     }
  //   }
  // }
  addManualNote() {
    if (!this.newManualNote.content.trim() || !this.selectedMeetingForNotes) {
      return;
    }

    const note: ManualNote = {
      id: Date.now().toString(),
      author: 'Nguyễn Văn A', // Mock current user
      content: this.newManualNote.content,
      timestamp: new Date().toISOString(),
      type: this.newManualNote.type
    };

    if (!this.meetingNotes) {
      // Create new meeting notes if doesn't exist
      this.meetingNotes = {
        meetingId: this.selectedMeetingForNotes.id,
        summary: '',
        todoList: [],
        manualNotes: [note],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.meetingNotesData.push(this.meetingNotes);
    } else {
      // Add note to existing meeting notes
      this.meetingNotes.manualNotes.push(note);
      this.meetingNotes.updatedAt = new Date().toISOString();
    }

    this.resetNewNote();
  }

  getNoteTypeText(type: string): string {
    const typeMap: { [key: string]: string } = {
      'general': 'Ghi chú chung',
      'action-item': 'Hành động',
      'decision': 'Quyết định',
      'question': 'Câu hỏi'
    };
    return typeMap[type] || type;
  }

  getNoteTypeIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'general': '📝',
      'action-item': '✅',
      'decision': '🎯',
      'question': '❓'
    };
    return iconMap[type] || '📝';
  }

  getPriorityText(priority: string): string {
    const priorityMap: { [key: string]: string } = {
      'low': 'Thấp',
      'medium': 'Trung bình',
      'high': 'Cao'
    };
    return priorityMap[priority] || priority;
  }

  getPriorityColor(priority: string): string {
    const colorMap: { [key: string]: string } = {
      'low': '#10b981',
      'medium': '#f59e0b',
      'high': '#ef4444'
    };
    return colorMap[priority] || '#6b7280';
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Chờ thực hiện',
      'in-progress': 'Đang thực hiện',
      'completed': 'Hoàn thành',
      'scheduled': 'Đã lên lịch',
      'ongoing': 'Đang diễn ra',
      'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
  }

  getTypeText(type: string): string {
    const typeMap: { [key: string]: string } = {
      'online': 'Trực tuyến',
      'offline': 'Trực tiếp',
      'hybrid': 'Kết hợp'
    };
    return typeMap[type] || type;
  }

  getSortText(sortBy: string): string {
    const sortMap: { [key: string]: string } = {
      'date': 'Thời gian gần nhất',
      'title': 'Tên cuộc họp',
      'project': 'Tên dự án'
    };
    return sortMap[sortBy] || sortBy;
  }

  getScheduledCount(): number {
    return this.meetings.filter(m => m.status === 'scheduled').length;
  }

  getCompletedCount(): number {
    return this.meetings.filter(m => m.status === 'completed').length;
  }

  getAverageParticipants(): number {
    const totalParticipants = this.meetings.reduce((sum, m) => sum + m.participants.length, 0);
    return Math.round(totalParticipants / this.meetings.length);
  }

  // Get upcoming meetings (next 7 days)
  getUpcomingMeetings(): Meeting[] {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return this.meetings.filter(m => {
      const meetingDate = new Date(m.date);
      return meetingDate >= today && meetingDate <= nextWeek && m.status === 'scheduled';
    });
  }

  // Delegate methods to layout component
  openCreateMeeting() { return this.layoutComponent.openCreateMeeting(); }

  // Tab methods
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Todo editing methods
  startEditTodo(todo: TodoItem) {
    this.editingTodo = todo;
    this.editTodoForm = {
      task: todo.task,
      assignee: todo.assignee,
      dueDate: todo.dueDate,
      priority: todo.priority,
      status: todo.status
    };
  }

  cancelEditTodo() {
    this.editingTodo = null;
    this.resetEditTodoForm();
  }

  saveEditTodo() {
    if (!this.editingTodo || !this.meetingNotes) return;

    const todoIndex = this.meetingNotes.todoList.findIndex(t => t.id === this.editingTodo!.id);
    if (todoIndex !== -1) {
      this.meetingNotes.todoList[todoIndex] = {
        ...this.editingTodo,
        ...this.editTodoForm
      };
      this.meetingNotes.updatedAt = new Date().toISOString();
    }

    this.editingTodo = null;
    this.resetEditTodoForm();
  }

  resetEditTodoForm() {
    this.editTodoForm = {
      task: '',
      assignee: '',
      dueDate: '',
      priority: 'medium',
      status: 'pending'
    };
  }

  // Generate tasks from edited todos
  generateTasksFromTodos() {
    if (!this.meetingNotes) return;
    
    // Filter only completed todos that can be converted to tasks
    const completedTodos = this.meetingNotes.todoList.filter(todo => todo.status === 'completed');
    
    if (completedTodos.length === 0) {
      alert('Không có công việc hoàn thành để tạo task!');
      return;
    }

    // Here you would typically send the data to backend
    // For now, we'll just show a success message
    console.log('Generating tasks from todos:', completedTodos);
    alert(`Đã tạo ${completedTodos.length} task từ danh sách công việc!`);
    
    // Reset the todos after generating tasks
    this.meetingNotes.todoList = this.meetingNotes.todoList.filter(todo => todo.status !== 'completed');
    this.meetingNotes.updatedAt = new Date().toISOString();
  }
}
