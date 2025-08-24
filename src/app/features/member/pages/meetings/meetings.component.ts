import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Meeting {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  type: 'online' | 'offline';
  project: string;
  organizer: string;
  participants: string[];
  meetingLink?: string;
  accessCode?: string;
  transcript?: string;
  summary?: string;
  todoList?: string[];
}

@Component({
  selector: 'app-member-meetings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MemberMeetingsComponent {
  // Search and filters
  searchTerm = '';
  statusFilter = '';
  typeFilter = '';
  projectFilter = '';

  // Meeting stats
  meetingStats = signal({
    total: 12,
    upcoming: 3,
    ongoing: 1,
    completed: 8
  });

  // Projects list
  projects = signal([
    'E-commerce Platform',
    'Mobile App',
    'Backend Service',
    'AI Chatbot',
    'Data Analytics'
  ]);

  // All meetings data
  allMeetings = signal<Meeting[]>([
    {
      id: 1,
      title: 'Họp Review Sprint 2',
      description: 'Đánh giá kết quả sprint 2 và lập kế hoạch cho sprint 3',
      date: 'Hôm nay',
      time: '14:00',
      duration: '1 giờ',
      status: 'upcoming',
      type: 'online',
      project: 'E-commerce Platform',
      organizer: 'PM Nguyễn Văn B',
      participants: ['Member A', 'Member B', 'Member C'],
      meetingLink: 'https://zoom.us/j/123456789',
      accessCode: '123456'
    },
    {
      id: 2,
      title: 'Daily Standup',
      description: 'Cập nhật tiến độ công việc hàng ngày',
      date: 'Hôm nay',
      time: '09:00',
      duration: '15 phút',
      status: 'ongoing',
      type: 'online',
      project: 'Mobile App',
      organizer: 'Scrum Master',
      participants: ['Team Member 1', 'Team Member 2', 'Team Member 3'],
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...'
    },
    {
      id: 3,
      title: 'Planning Meeting',
      description: 'Lập kế hoạch cho sprint mới',
      date: 'Ngày mai',
      time: '10:00',
      duration: '2 giờ',
      status: 'upcoming',
      type: 'offline',
      project: 'Backend Service',
      organizer: 'Tech Lead',
      participants: ['Developer A', 'Developer B', 'QA Engineer'],
      accessCode: 'PLAN2024'
    },
    {
      id: 4,
      title: 'Sprint Retrospective',
      description: 'Rút kinh nghiệm từ sprint vừa qua',
      date: 'Hôm qua',
      time: '16:00',
      duration: '1 giờ',
      status: 'completed',
      type: 'online',
      project: 'AI Chatbot',
      organizer: 'Scrum Master',
      participants: ['Team Member 1', 'Team Member 2'],
      transcript: 'transcript_20241201.txt',
      summary: 'summary_20241201.md',
      todoList: ['Cải thiện CI/CD pipeline', 'Thêm unit tests', 'Cập nhật documentation']
    }
  ]);

  // Filtered meetings
  filteredMeetings = signal<Meeting[]>([]);

  constructor() {
    this.filterMeetings();
  }

  // Filter meetings based on search and filters
  filterMeetings(): void {
    let filtered = this.allMeetings();

    if (this.searchTerm) {
      filtered = filtered.filter(meeting =>
        meeting.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        meeting.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        meeting.project.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.statusFilter) {
      filtered = filtered.filter(meeting => meeting.status === this.statusFilter);
    }

    if (this.typeFilter) {
      filtered = filtered.filter(meeting => meeting.type === this.typeFilter);
    }

    if (this.projectFilter) {
      filtered = filtered.filter(meeting => meeting.project === this.projectFilter);
    }

    this.filteredMeetings.set(filtered);
  }

  // Get status text in Vietnamese
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'upcoming': 'Sắp diễn ra',
      'ongoing': 'Đang diễn ra',
      'completed': 'Đã hoàn thành',
      'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
  }

  // Action methods
  refreshMeetings(): void {
    console.log('Refreshing meetings...');
    // TODO: Implement API call to refresh meetings
  }

  scheduleMeeting(): void {
    console.log('Schedule meeting clicked');
    // TODO: Navigate to meeting schedule page
  }

  joinMeeting(meeting: Meeting): void {
    console.log('Joining meeting:', meeting.title);
    if (meeting.meetingLink) {
      window.open(meeting.meetingLink, '_blank');
    }
  }

  addToCalendar(meeting: Meeting): void {
    console.log('Adding to calendar:', meeting.title);
    // TODO: Implement calendar integration
  }

  viewMeetingDetails(meeting: Meeting): void {
    console.log('Viewing meeting details:', meeting.title);
    // TODO: Navigate to meeting details page
  }

  viewTranscript(meeting: Meeting): void {
    console.log('Viewing transcript for:', meeting.title);
    // TODO: Show transcript modal or navigate to transcript page
  }

  viewSummary(meeting: Meeting): void {
    console.log('Viewing summary for:', meeting.title);
    // TODO: Show summary modal or navigate to summary page
  }

  viewTodoList(meeting: Meeting): void {
    console.log('Viewing todo list for:', meeting.title);
    // TODO: Show todo list modal or navigate to todo list page
  }

  joinRandomMeeting(): void {
    console.log('Joining random meeting');
    // TODO: Implement random meeting selection
  }

  viewTodayMeetings(): void {
    console.log('Viewing today meetings');
    // TODO: Filter to show only today's meetings
  }

  exportMeetings(): void {
    console.log('Exporting meetings');
    // TODO: Implement export functionality
  }
}
