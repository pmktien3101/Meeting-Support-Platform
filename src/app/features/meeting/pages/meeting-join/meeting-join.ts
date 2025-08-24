import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface MeetingJoinForm {
  meetingCode: string;
  name: string;
  email: string;
  joinAsGuest: boolean;
}

interface MeetingInfo {
  id: string;
  title: string;
  host: string;
  startTime: string;
  duration: number;
  meetingType: 'zoom' | 'teams' | 'google-meet' | 'custom';
  meetingLink: string;
  meetingCode: string;
  status: 'waiting' | 'started' | 'ended';
  participants: number;
  maxParticipants: number;
}

@Component({
  selector: 'app-meeting-join',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meeting-join.html',
  styleUrls: ['./meeting-join.scss']
})
export class MeetingJoin implements OnInit {
  // Form data
  joinForm = signal<MeetingJoinForm>({
    meetingCode: '',
    name: '',
    email: '',
    joinAsGuest: false
  });

  // UI state
  isLoading = signal(false);
  isJoining = signal(false);
  showMeetingInfo = signal(false);
  meetingInfo = signal<MeetingInfo | null>(null);
  errorMessage = signal('');

  // Meeting ID from route
  meetingId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  navigateToList(): void {
    this.router.navigate(['/meeting/list']);
  }

  ngOnInit(): void {
    this.meetingId = this.route.snapshot.paramMap.get('id') || '';
    
    if (this.meetingId) {
      this.loadMeetingInfo();
    }
  }

  async loadMeetingInfo(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // Simulate API call to get meeting info
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock meeting data
      const mockMeeting: MeetingInfo = {
        id: this.meetingId,
        title: 'Weekly Team Standup',
        host: 'John Doe',
        startTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
        duration: 60,
        meetingType: 'zoom',
        meetingLink: 'https://zoom.us/j/123456789',
        meetingCode: '123-456-789',
        status: 'waiting',
        participants: 3,
        maxParticipants: 50
      };

      this.meetingInfo.set(mockMeeting);
      this.showMeetingInfo.set(true);
    } catch (error) {
      this.errorMessage.set('Failed to load meeting information');
      console.error('Error loading meeting info:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async joinWithCode(): Promise<void> {
    const code = this.joinForm().meetingCode.trim();
    if (!code) {
      this.errorMessage.set('Please enter a meeting code');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // Simulate API call to validate meeting code
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock meeting data for the code
      const mockMeeting: MeetingInfo = {
        id: 'mock-' + code,
        title: 'Team Meeting',
        host: 'Jane Smith',
        startTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        duration: 45,
        meetingType: 'teams',
        meetingLink: 'https://teams.microsoft.com/l/meetup-join/123',
        meetingCode: code,
        status: 'waiting',
        participants: 2,
        maxParticipants: 25
      };

      this.meetingInfo.set(mockMeeting);
      this.showMeetingInfo.set(true);
    } catch (error) {
      this.errorMessage.set('Invalid meeting code or meeting not found');
      console.error('Error joining with code:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async joinMeeting(): Promise<void> {
    const form = this.joinForm();
    
    if (!form.name.trim()) {
      this.errorMessage.set('Please enter your name');
      return;
    }

    if (!form.joinAsGuest && !form.email.trim()) {
      this.errorMessage.set('Please enter your email address');
      return;
    }

    this.isJoining.set(true);
    this.errorMessage.set('');

    try {
      // Simulate API call to join meeting
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success - redirect to meeting room or show success message
      console.log('Successfully joined meeting:', this.meetingInfo()?.title);
      alert('Successfully joined the meeting!');
      
      // In a real app, this would redirect to the actual meeting interface
      // this.router.navigate(['/meeting/room', this.meetingInfo()?.id]);
      
    } catch (error) {
      this.errorMessage.set('Failed to join meeting. Please try again.');
      console.error('Error joining meeting:', error);
    } finally {
      this.isJoining.set(false);
    }
  }

  copyMeetingLink(): void {
    const link = this.meetingInfo()?.meetingLink;
    if (link) {
      navigator.clipboard.writeText(link).then(() => {
        console.log('Meeting link copied to clipboard');
        // You could show a toast notification here
      }).catch(err => {
        console.error('Failed to copy link:', err);
      });
    }
  }

  copyMeetingCode(): void {
    const code = this.meetingInfo()?.meetingCode;
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        console.log('Meeting code copied to clipboard');
        // You could show a toast notification here
      }).catch(err => {
        console.error('Failed to copy code:', err);
      });
    }
  }

  getMeetingTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'zoom': '🔵',
      'teams': '🔷',
      'google-meet': '🟢',
      'custom': '⚫'
    };
    return icons[type] || '📹';
  }

  getMeetingTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'zoom': 'Zoom Meeting',
      'teams': 'Microsoft Teams',
      'google-meet': 'Google Meet',
      'custom': 'Custom Platform'
    };
    return labels[type] || 'Meeting';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'waiting': '#10B981',
      'started': '#3B82F6',
      'ended': '#6B7280'
    };
    return colors[status] || '#6B7280';
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      'waiting': 'Waiting to Start',
      'started': 'In Progress',
      'ended': 'Ended'
    };
    return texts[status] || 'Unknown';
  }

  getTimeUntilMeeting(startTime: string): string {
    const now = new Date();
    const meetingTime = new Date(startTime);
    const diffMs = meetingTime.getTime() - now.getTime();
    
    if (diffMs <= 0) {
      return 'Meeting has started';
    }
    
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    }
  }
}
