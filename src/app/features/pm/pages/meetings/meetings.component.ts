import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

@Component({
  selector: 'app-pm-meetings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meetings.html',
  styleUrls: ['./meetings.scss']
})
export class PmMeetings {
  private layoutComponent = inject(PmLayoutComponent);

  meetings = [
    {
      id: '1',
      title: 'Kick-off Dự Án Website E-commerce',
      description: 'Cuộc họp khởi động dự án, thảo luận về mục tiêu và kế hoạch thực hiện',
      date: '2024-01-15',
      time: '09:00',
      duration: 90,
      type: 'online',
      status: 'completed',
      participants: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D']
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
      participants: ['Lê Văn C', 'Nguyễn Văn A', 'Trần Thị B']
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
      participants: ['Nguyễn Văn A', 'Lê Văn C', 'Phạm Thị D']
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
      participants: ['Phạm Thị D', 'Trần Thị B', 'Nguyễn Văn A']
    }
  ];

  // Delegate methods to layout component
  openCreateMeeting() { return this.layoutComponent.openCreateMeeting(); }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'scheduled': 'Đã lên lịch',
      'ongoing': 'Đang diễn ra',
      'completed': 'Đã hoàn thành',
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
}
