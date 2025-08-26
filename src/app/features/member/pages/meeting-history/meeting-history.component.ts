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

  // Modal states and data
  isTranscriptOpen = false;
  isSummaryOpen = false;
  isTodoOpen = false;
  isDetailsOpen = false;

  activeMeeting: MeetingHistory | null = null;
  transcriptSections: { speaker: string; text: string }[] = [];
  summaryBlocks: { title: string; content: string }[] = [];
  todoItems: { id: number; text: string; done: boolean; assignee?: string; due?: string }[] = [];

  // Transcript filter
  transcriptQuery = '';

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
  }

  exportHistory(): void {
    console.log('Exporting meeting history...');
  }

  // Openers
  viewTranscript(meeting: MeetingHistory): void {
    this.activeMeeting = meeting;
    this.transcriptSections = [
      { speaker: meeting.organizer, text: 'Xin chào mọi người, chúng ta bắt đầu họp.' },
      { speaker: 'Nguyễn Văn A', text: 'Tiến độ sprint hiện 80%, còn 2 ticket.' },
      { speaker: 'Trần Thị C', text: 'UI đã xong phần header và landing.' }
    ];
    this.transcriptQuery = '';
    this.isTranscriptOpen = true;
  }

  viewSummary(meeting: MeetingHistory): void {
    this.activeMeeting = meeting;
    this.summaryBlocks = [
      { title: 'Mục tiêu', content: 'Đánh giá kết quả sprint và lập kế hoạch sprint tiếp theo.' },
      { title: 'Kết luận chính', content: 'Hoàn thành 80% backlog; cần tập trung vào tính năng thanh toán.' },
      { title: 'Hành động tiếp theo', content: 'Tạo task tối ưu API, cập nhật thiết kế mobile.' }
    ];
    this.isSummaryOpen = true;
  }

  viewTodoList(meeting: MeetingHistory): void {
    this.activeMeeting = meeting;
    this.todoItems = [
      { id: 1, text: 'Viết test cho endpoint /orders', done: false, assignee: 'Nguyễn Văn A', due: 'Tuần này' },
      { id: 2, text: 'Cập nhật UI màn hình thanh toán', done: true, assignee: 'Trần Thị C', due: 'Hôm qua' },
      { id: 3, text: 'Chuẩn bị tài liệu release', done: false, assignee: 'PM Nguyễn Văn B', due: 'Thứ 6' }
    ];
    this.isTodoOpen = true;
  }

  viewMeetingDetails(meeting: MeetingHistory): void {
    this.activeMeeting = meeting;
    this.isDetailsOpen = true;
  }

  // Quick actions (stubs to avoid template errors)
  viewTodayMeetings(): void {
    console.log('Viewing today\'s meetings');
  }

  viewRecentMeetings(): void {
    console.log('Viewing recent meetings');
  }

  searchByKeywords(): void {
    console.log('Searching by keywords');
  }

  viewProjectMeetings(): void {
    console.log('Viewing project meetings');
  }

  // Modal close helpers
  closeTranscript(): void { this.isTranscriptOpen = false; }
  closeSummary(): void { this.isSummaryOpen = false; }
  closeTodo(): void { this.isTodoOpen = false; }
  closeDetails(): void { this.isDetailsOpen = false; }

  // Interactions
  toggleTodoDone(id: number): void {
    this.todoItems = this.todoItems.map(i => i.id === id ? { ...i, done: !i.done } : i);
  }

  get filteredTranscript() {
    const q = this.transcriptQuery.trim().toLowerCase();
    if (!q) return this.transcriptSections;
    return this.transcriptSections.filter(x =>
      x.text.toLowerCase().includes(q) || x.speaker.toLowerCase().includes(q)
    );
  }

  async copyTranscript(): Promise<void> {
    const text = this.transcriptSections.map(l => `${l.speaker}: ${l.text}`).join('\n');
    await navigator.clipboard.writeText(text);
  }

  async copySummary(): Promise<void> {
    const text = this.summaryBlocks.map(b => `# ${b.title}\n${b.content}`).join('\n\n');
    await navigator.clipboard.writeText(text);
  }

  async copyTodos(): Promise<void> {
    const text = this.todoItems.map(t => `- [${t.done ? 'x' : ' '}] ${t.text}${t.assignee ? ' @' + t.assignee : ''}${t.due ? ' (' + t.due + ')' : ''}`).join('\n');
    await navigator.clipboard.writeText(text);
  }

  exportAsFile(filename: string, content: string): void {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  exportTranscript(): void {
    const text = this.transcriptSections.map(l => `${l.speaker}: ${l.text}`).join('\n');
    this.exportAsFile('transcript.txt', text);
  }

  exportSummary(): void {
    const text = this.summaryBlocks.map(b => `# ${b.title}\n${b.content}`).join('\n\n');
    this.exportAsFile('summary.txt', text);
  }

  exportTodos(): void {
    const text = this.todoItems.map(t => `- [${t.done ? 'x' : ' '}] ${t.text}${t.assignee ? ' @' + t.assignee : ''}${t.due ? ' (' + t.due + ')' : ''}`).join('\n');
    this.exportAsFile('todos.txt', text);
  }
}
