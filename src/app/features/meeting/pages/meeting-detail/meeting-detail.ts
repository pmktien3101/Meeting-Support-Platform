import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export interface MeetingDetailData {
  id: string;
  title: string;
  description: string;
  host: string;
  startTime: string;
  endTime: string;
  duration: number;
  meetingType: 'zoom' | 'teams' | 'google-meet' | 'custom';
  meetingLink: string;
  meetingCode: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  participants: Participant[];
  agenda: string[];
  projectId?: number;
  projectName?: string;
  recordingUrl?: string;
  transcriptUrl?: string;
  summaryUrl?: string;
}

interface Participant {
  id: number;
  name: string;
  email: string;
  role: 'host' | 'attendee';
  status: 'invited' | 'accepted' | 'declined' | 'attended' | 'no-show';
  joinTime?: string;
  leaveTime?: string;
}

@Component({
  selector: 'app-meeting-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-detail.html',
  styleUrls: ['./meeting-detail.scss']
})
export class MeetingDetail implements OnInit {
  meeting = signal<MeetingDetailData | null>(null);
  isLoading = signal(true);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMeetingDetail();
  }

  async loadMeetingDetail(): Promise<void> {
    this.isLoading.set(true);
    
    try {
      const meetingId = this.route.snapshot.paramMap.get('id');
      if (!meetingId) {
        this.error.set('Meeting ID not found');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockMeeting: MeetingDetailData = {
        id: meetingId,
        title: 'Q4 Project Review Meeting',
        description: 'Review progress on all Q4 projects and discuss next quarter planning',
        host: 'John Smith',
        startTime: '2024-01-25T10:00:00Z',
        endTime: '2024-01-25T11:30:00Z',
        duration: 90,
        meetingType: 'zoom',
        meetingLink: 'https://zoom.us/j/123456789',
        meetingCode: '123-456-789',
        status: 'completed',
        participants: [
          {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@company.com',
            role: 'host',
            status: 'attended',
            joinTime: '2024-01-25T10:02:00Z',
            leaveTime: '2024-01-25T11:28:00Z'
          },
          {
            id: 2,
            name: 'Emily Davis',
            email: 'emily.davis@company.com',
            role: 'attendee',
            status: 'attended',
            joinTime: '2024-01-25T10:01:00Z',
            leaveTime: '2024-01-25T11:30:00Z'
          },
          {
            id: 3,
            name: 'Michael Chen',
            email: 'michael.chen@company.com',
            role: 'attendee',
            status: 'attended',
            joinTime: '2024-01-25T10:05:00Z',
            leaveTime: '2024-01-25T11:25:00Z'
          }
        ],
        agenda: [
          'Review Q4 project milestones',
          'Discuss budget allocation for Q1',
          'Team performance evaluation',
          'Next quarter planning',
          'Open discussion and Q&A'
        ],
        projectId: 1,
        projectName: 'Q4 Strategic Planning',
        recordingUrl: '/recordings/meeting-123.mp4',
        transcriptUrl: '/transcripts/meeting-123.txt',
        summaryUrl: '/summaries/meeting-123.pdf'
      };
      
      this.meeting.set(mockMeeting);
    } catch (error) {
      this.error.set('Failed to load meeting details');
    } finally {
      this.isLoading.set(false);
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'scheduled': return 'badge-warning';
      case 'in-progress': return 'badge-primary';
      case 'completed': return 'badge-success';
      case 'cancelled': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }

  getParticipantStatusClass(status: string): string {
    switch (status) {
      case 'attended': return 'text-success';
      case 'no-show': return 'text-danger';
      case 'accepted': return 'text-primary';
      case 'declined': return 'text-muted';
      default: return 'text-warning';
    }
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  }

  openRecording(): void {
    if (this.meeting()?.recordingUrl) {
      window.open(this.meeting()!.recordingUrl, '_blank');
    }
  }

  navigateToTranscript(): void {
    const meeting = this.meeting();
    if (meeting) {
      this.router.navigate(['/meeting', meeting.id, 'transcript']);
    }
  }

  navigateToSummary(): void {
    const meeting = this.meeting();
    if (meeting) {
      this.router.navigate(['/meeting', meeting.id, 'summary']);
    }
  }

  joinMeeting(): void {
    const meeting = this.meeting();
    if (meeting && meeting.meetingLink) {
      window.open(meeting.meetingLink, '_blank');
    }
  }
}
