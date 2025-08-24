import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface MeetingHistory {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  status: 'completed' | 'cancelled' | 'ongoing';
  project: string;
  organizer: string;
  participants: string[];
  tags: string[];
}

@Component({
  selector: 'app-member-meeting-history',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './meeting-history.component.html',
  styleUrls: ['./meeting-history.component.scss']
})
export class MemberMeetingHistoryComponent {
  // Search and filters
  searchTerm = '';
  projectFilter = '';
  dateFilter = '';

  // Projects list
  projects = signal([
    'E-commerce Platform',
    'Mobile App',
    'Backend Service',
    'AI Chatbot',
    'Data Analytics'
  ]);

  // All meetings data
  meetings = signal<MeetingHistory[]>([
    {
      id: 1,
      title: 'Họp Review Sprint 2',
      description: 'Review kết quả sprint 2 và lên kế hoạch cho sprint 3',
      date: '15/12/2024',
      time: '14:00',
      duration: '1h 30m',
      status: 'completed',
      project: 'E-commerce Platform',
      organizer: 'PM Nguyễn Văn B',
      participants: ['Nguyễn Văn A', 'Trần Thị C', 'Lê Văn D'],
      tags: ['Sprint Review', 'Planning']
    },
    {
      id: 2,
      title: 'Daily Standup',
      description: 'Cập nhật tiến độ công việc hàng ngày của team',
      date: '14/12/2024',
      time: '09:00',
      duration: '15m',
      status: 'completed',
      project: 'Mobile App',
      organizer: 'Tech Lead Lê Văn D',
      participants: ['Nguyễn Văn A', 'Trần Thị C'],
      tags: ['Daily', 'Standup']
    },
    {
      id: 3,
      title: 'Họp thiết kế UI/UX',
      description: 'Thảo luận về thiết kế giao diện mới cho ứng dụng',
      date: '13/12/2024',
      time: '10:00',
      duration: '2h',
      status: 'completed',
      project: 'E-commerce Platform',
      organizer: 'Designer Phạm Thị E',
      participants: ['Nguyễn Văn A', 'Trần Thị C', 'Lê Văn D'],
      tags: ['Design', 'UI/UX']
    }
  ]);

  // Filtered meetings
  filteredMeetings = signal<MeetingHistory[]>([]);

  constructor() {
    this.filterMeetings();
  }

  // Filter meetings based on search and filters
  filterMeetings(): void {
    let filtered = this.meetings();

    if (this.searchTerm) {
      filtered = filtered.filter(meeting =>
        meeting.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        meeting.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        meeting.project.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.projectFilter) {
      filtered = filtered.filter(meeting => meeting.project === this.projectFilter);
    }

    if (this.dateFilter) {
      // TODO: Implement date filtering logic
      console.log('Date filter:', this.dateFilter);
    }

    this.filteredMeetings.set(filtered);
  }

  // Get status text in Vietnamese
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'completed': 'Hoàn thành',
      'cancelled': 'Đã hủy',
      'ongoing': 'Đang diễn ra'
    };
    return statusMap[status] || status;
  }

  // Action methods
  refreshHistory(): void {
    console.log('Refreshing meeting history...');
    // TODO: Implement API call to refresh meeting history
  }

  exportHistory(): void {
    console.log('Exporting meeting history...');
    // TODO: Implement export functionality
  }

  viewTranscript(meeting: MeetingHistory): void {
    console.log('Viewing transcript for:', meeting.title);
    // TODO: Navigate to transcript view
  }

  viewSummary(meeting: MeetingHistory): void {
    console.log('Viewing summary for:', meeting.title);
    // TODO: Navigate to summary view
  }

  viewTodoList(meeting: MeetingHistory): void {
    console.log('Viewing todo list for:', meeting.title);
    // TODO: Navigate to todo list view
  }

  viewMeetingDetails(meeting: MeetingHistory): void {
    console.log('Viewing details for:', meeting.title);
    // TODO: Navigate to meeting details
  }

  viewTodayMeetings(): void {
    console.log('Viewing today\'s meetings');
    // TODO: Filter to show today's meetings
  }

  viewRecentMeetings(): void {
    console.log('Viewing recent meetings');
    // TODO: Filter to show recent meetings
  }

  searchByKeywords(): void {
    console.log('Searching by keywords');
    // TODO: Show keyword search modal
  }

  viewProjectMeetings(): void {
    console.log('Viewing project meetings');
    // TODO: Show project filter
  }
}
