import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Meeting } from '../../../../shared/models/meeting.model';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './meeting-list.html',
  styleUrl: './meeting-list.scss'
})
export class MeetingList implements OnInit {
  meetings: Meeting[] = [];
  filteredMeetings: Meeting[] = [];
  searchTerm = '';
  statusFilter = 'all';
  typeFilter = 'all';
  isLoading = true;

  ngOnInit() {
    this.loadMeetings();
  }

  loadMeetings() {
    // Simulate API call
    setTimeout(() => {
      this.meetings = [
        {
          id: 1,
          projectId: 1,
          title: "E-commerce Platform - Design Review Meeting",
          description: "Review the completed UI/UX designs and gather feedback from stakeholders",
          startTime: new Date("2024-01-20T10:00:00Z"),
          endTime: new Date("2024-01-20T11:30:00Z"),
          status: "completed",
          meetingType: "zoom",
          meetingLink: "https://zoom.us/j/123456789",
          meetingCode: "123456789",
          hostId: 3,
          attendees: [2, 5, 6, 7],
          isRecorded: true,
          recordingUrl: "https://zoom.us/recording/123456789",
          transcriptUrl: "/api/meetings/1/transcript",
          summary: "Design review completed successfully. All stakeholders approved the new UI/UX design.",
          createdAt: new Date("2024-01-15T10:30:00Z"),
          updatedAt: new Date("2024-01-20T11:30:00Z")
        },
        {
          id: 2,
          projectId: 1,
          title: "Frontend Development - Sprint Planning",
          description: "Plan the upcoming sprint for frontend development tasks and assign responsibilities",
          startTime: new Date("2024-01-25T14:00:00Z"),
          endTime: new Date("2024-01-25T15:00:00Z"),
          status: "scheduled",
          meetingType: "zoom",
          meetingLink: "https://zoom.us/j/987654321",
          meetingCode: "987654321",
          hostId: 3,
          attendees: [5, 6, 7],
          isRecorded: false,
          createdAt: new Date("2024-01-15T10:30:00Z"),
          updatedAt: new Date("2024-01-15T10:30:00Z")
        },
        {
          id: 3,
          projectId: 2,
          title: "Mobile App - Requirements Gathering",
          description: "Gather detailed requirements for the mobile application features and functionality",
          startTime: new Date("2024-01-18T09:00:00Z"),
          endTime: new Date("2024-01-18T10:30:00Z"),
          status: "completed",
          meetingType: "teams",
          meetingLink: "https://teams.microsoft.com/l/meetup-join/123456789",
          hostId: 4,
          attendees: [2, 5, 7],
          isRecorded: true,
          recordingUrl: "https://teams.microsoft.com/recording/123456789",
          transcriptUrl: "/api/meetings/3/transcript",
          summary: "Requirements gathering session completed. Key features identified.",
          createdAt: new Date("2024-01-15T11:20:00Z"),
          updatedAt: new Date("2024-01-18T10:30:00Z")
        },
        {
          id: 4,
          projectId: 2,
          title: "Mobile App - UI/UX Design Kickoff",
          description: "Kickoff meeting for the mobile app UI/UX design phase",
          startTime: new Date("2024-01-30T13:00:00Z"),
          endTime: new Date("2024-01-30T14:00:00Z"),
          status: "scheduled",
          meetingType: "google-meet",
          meetingLink: "https://meet.google.com/abc-defg-hij",
          hostId: 4,
          attendees: [5, 7],
          isRecorded: false,
          createdAt: new Date("2024-01-15T11:20:00Z"),
          updatedAt: new Date("2024-01-15T11:20:00Z")
        }
      ];
      this.filteredMeetings = [...this.meetings];
      this.isLoading = false;
    }, 1000);
  }

  onSearch() {
    this.filterMeetings();
  }

  onStatusFilterChange() {
    this.filterMeetings();
  }

  onTypeFilterChange() {
    this.filterMeetings();
  }

  filterMeetings() {
    this.filteredMeetings = this.meetings.filter(meeting => {
      const matchesSearch = meeting.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           meeting.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || meeting.status === this.statusFilter;
      const matchesType = this.typeFilter === 'all' || meeting.meetingType === this.typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'scheduled': return '#3B82F6';
      case 'in-progress': return '#F59E0B';
      case 'completed': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  }

  getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  }

  getMeetingTypeIcon(type: string): string {
    switch (type) {
      case 'zoom': return '🎥';
      case 'teams': return '💼';
      case 'google-meet': return '📹';
      case 'in-person': return '👥';
      default: return '📞';
    }
  }

  getMeetingTypeText(type: string): string {
    switch (type) {
      case 'zoom': return 'Zoom';
      case 'teams': return 'Microsoft Teams';
      case 'google-meet': return 'Google Meet';
      case 'in-person': return 'In Person';
      default: return type;
    }
  }

  isUpcoming(meeting: Meeting): boolean {
    return meeting.status === 'scheduled' && meeting.startTime > new Date();
  }

  isToday(meeting: Meeting): boolean {
    const today = new Date();
    const meetingDate = new Date(meeting.startTime);
    return meetingDate.toDateString() === today.toDateString();
  }

  getTimeUntilMeeting(meeting: Meeting): string {
    if (meeting.status !== 'scheduled') return '';
    
    const now = new Date();
    const meetingTime = new Date(meeting.startTime);
    const diff = meetingTime.getTime() - now.getTime();
    
    if (diff < 0) return '';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  openMeetingLink(meeting: Meeting): void {
    if (meeting.meetingLink) {
      window.open(meeting.meetingLink, '_blank');
    }
  }
}
