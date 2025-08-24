import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Task {
  id: number;
  title: string;
  project: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface Meeting {
  id: number;
  title: string;
  project: string;
  time: string;
  duration: string;
  organizer: string;
  participants: string[];
}

interface Project {
  id: number;
  name: string;
  status: string;
  progress: number;
  deadline: string;
  tasks: number;
  completedTasks: number;
}

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class MemberDashboardComponent {
  // User data
  userName = signal('Nguyễn Văn A');

  // Dashboard stats
  stats = signal({
    meetings: 3,
    tasks: 8,
    overdue: 1,
    progress: 75
  });

  // Upcoming meetings
  upcomingMeetings = signal<Meeting[]>([
    {
      id: 1,
      title: 'Họp dự án E-commerce',
      project: 'E-commerce Platform',
      time: '09:00',
      duration: '1h',
      organizer: 'PM Nguyễn Văn B',
      participants: ['Nguyễn Văn A', 'Trần Thị C', 'Lê Văn D']
    },
    {
      id: 2,
      title: 'Review code mobile app',
      project: 'Mobile App',
      time: '14:00',
      duration: '45m',
      organizer: 'Tech Lead Lê Văn D',
      participants: ['Nguyễn Văn A', 'Trần Thị C']
    },
    {
      id: 3,
      title: 'Họp tuần team',
      project: 'Team Meeting',
      time: '16:00',
      duration: '30m',
      organizer: 'PM Nguyễn Văn B',
      participants: ['Nguyễn Văn A', 'Trần Thị C', 'Lê Văn D', 'Phạm Thị E']
    }
  ]);

  // Recent tasks
  recentTasks = signal<Task[]>([
    {
      id: 1,
      title: 'Thiết kế giao diện trang chủ',
      project: 'E-commerce Platform',
      status: 'in-progress',
      priority: 'high',
      dueDate: 'Hôm nay'
    },
    {
      id: 2,
      title: 'Implement user authentication',
      project: 'Mobile App',
      status: 'done',
      priority: 'medium',
      dueDate: 'Hôm qua'
    },
    {
      id: 3,
      title: 'Viết unit tests cho API',
      project: 'Backend Service',
      status: 'todo',
      priority: 'low',
      dueDate: 'Tuần sau'
    }
  ]);

  // Project progress
  projectProgress = signal<Project[]>([
    {
      id: 1,
      name: 'E-commerce Platform',
      status: 'Đang thực hiện',
      progress: 75,
      deadline: '15/12/2024',
      tasks: 24,
      completedTasks: 18
    },
    {
      id: 2,
      name: 'Mobile App',
      status: 'Đang thực hiện',
      progress: 45,
      deadline: '20/12/2024',
      tasks: 18,
      completedTasks: 8
    },
    {
      id: 3,
      name: 'Backend Service',
      status: 'Hoàn thành',
      progress: 100,
      deadline: '10/12/2024',
      tasks: 12,
      completedTasks: 12
    }
  ]);

  // Helper methods
  isUrgent(dueDate: string): boolean {
    return dueDate === 'Hôm nay' || dueDate === 'Quá hạn';
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'todo': 'Chưa bắt đầu',
      'in-progress': 'Đang thực hiện',
      'done': 'Hoàn thành'
    };
    return statusMap[status] || status;
  }

  getPriorityText(priority: string): string {
    const priorityMap: { [key: string]: string } = {
      'high': 'Cao',
      'medium': 'Trung bình',
      'low': 'Thấp'
    };
    return priorityMap[priority] || priority;
  }

  // Action methods
  joinMeeting(): void {
    console.log('Join meeting clicked');
    // TODO: Navigate to meeting join page
  }

  viewTasks(): void {
    console.log('View tasks clicked');
    // TODO: Navigate to tasks page
  }

  scheduleMeeting(): void {
    console.log('Schedule meeting clicked');
    // TODO: Navigate to meeting schedule page
  }

  createTask(): void {
    console.log('Create task clicked');
    // TODO: Navigate to task creation page
  }

  viewReports(): void {
    console.log('View reports clicked');
    // TODO: Navigate to reports page
  }

  teamChat(): void {
    console.log('Team chat clicked');
    // TODO: Navigate to team chat page
  }

  addToCalendar(meeting: Meeting): void {
    console.log('Add to calendar:', meeting.title);
    // TODO: Add meeting to calendar
  }

  updateTaskStatus(task: Task): void {
    console.log('Update task status:', task.title);
    // TODO: Update task status
  }

  viewAllMeetings(): void {
    console.log('View all meetings clicked');
    // TODO: Navigate to meetings page
  }

  viewAllTasks(): void {
    console.log('View all tasks clicked');
    // TODO: Navigate to tasks page
  }

  viewProjectDetails(project: Project): void {
    console.log('View project details:', project.name);
    // TODO: Navigate to project details page
  }
}
