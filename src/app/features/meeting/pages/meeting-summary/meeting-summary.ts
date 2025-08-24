import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export interface MeetingSummaryData {
  id: string;
  title: string;
  date: string;
  duration: number;
  participants: string[];
  summary: string;
  keyPoints: string[];
  actionItems: ActionItem[];
  decisions: string[];
  nextSteps: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  engagement: number;
  topics: Topic[];
}

interface ActionItem {
  id: number;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
}

interface Topic {
  name: string;
  duration: number;
  importance: number;
  participants: string[];
}

@Component({
  selector: 'app-meeting-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-summary.html',
  styleUrls: ['./meeting-summary.scss']
})
export class MeetingSummary implements OnInit {
  meetingSummary = signal<MeetingSummaryData | null>(null);
  isLoading = signal(true);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMeetingSummary();
  }

  async loadMeetingSummary(): Promise<void> {
    this.isLoading.set(true);
    
    try {
      const meetingId = this.route.snapshot.paramMap.get('id');
      if (!meetingId) {
        this.error.set('Meeting ID not found');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSummary: MeetingSummaryData = {
        id: meetingId,
        title: 'Q4 Project Review Meeting',
        date: '2024-01-25T10:00:00Z',
        duration: 90,
        participants: ['John Smith', 'Emily Davis', 'Michael Chen', 'Lisa Johnson'],
        summary: 'The Q4 project review meeting focused on evaluating progress across all ongoing projects and planning for Q1. The team successfully completed 85% of Q4 objectives, with the customer portal launch being the major achievement. Mobile app development is progressing well and on track for beta release next month. Budget allocation for Q1 was discussed and approved.',
        keyPoints: [
          'Customer portal successfully launched with 40% increase in user engagement',
          'Mobile app development 70% complete, beta release scheduled for next month',
          'Q4 objectives 85% completed overall',
          'Budget allocation for Q1 approved and distributed',
          'Team performance evaluation completed with positive results'
        ],
        actionItems: [
          {
            id: 1,
            description: 'Finalize mobile app beta testing plan',
            assignee: 'Michael Chen',
            dueDate: '2024-02-15',
            priority: 'high',
            status: 'pending'
          },
          {
            id: 2,
            description: 'Prepare Q1 budget breakdown document',
            assignee: 'Emily Davis',
            dueDate: '2024-02-01',
            priority: 'high',
            status: 'in-progress'
          },
          {
            id: 3,
            description: 'Schedule customer feedback sessions for portal',
            assignee: 'Lisa Johnson',
            dueDate: '2024-02-10',
            priority: 'medium',
            status: 'pending'
          },
          {
            id: 4,
            description: 'Update project timeline for Q1 milestones',
            assignee: 'John Smith',
            dueDate: '2024-01-30',
            priority: 'medium',
            status: 'completed'
          }
        ],
        decisions: [
          'Approved additional budget allocation for mobile app development',
          'Decided to extend customer portal beta testing phase',
          'Agreed to implement new project management workflow',
          'Approved hiring two additional developers for Q1'
        ],
        nextSteps: [
          'Begin Q1 project planning and milestone setting',
          'Start mobile app beta testing preparation',
          'Implement new project management tools',
          'Schedule follow-up meeting for Q1 progress review'
        ],
        sentiment: 'positive',
        engagement: 87,
        topics: [
          {
            name: 'Q4 Progress Review',
            duration: 25,
            importance: 9,
            participants: ['John Smith', 'Michael Chen']
          },
          {
            name: 'Customer Portal Launch',
            duration: 20,
            importance: 10,
            participants: ['Michael Chen', 'Lisa Johnson']
          },
          {
            name: 'Mobile App Development',
            duration: 15,
            importance: 8,
            participants: ['Michael Chen', 'Emily Davis']
          },
          {
            name: 'Q1 Budget Planning',
            duration: 20,
            importance: 9,
            participants: ['Emily Davis', 'John Smith']
          },
          {
            name: 'Team Performance',
            duration: 10,
            importance: 7,
            participants: ['John Smith', 'All']
          }
        ]
      };
      
      this.meetingSummary.set(mockSummary);
    } catch (error) {
      this.error.set('Failed to load meeting summary');
    } finally {
      this.isLoading.set(false);
    }
  }

  getSentimentColor(sentiment: string): string {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-danger';
      default: return 'text-warning';
    }
  }

  getSentimentIcon(sentiment: string): string {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      default: return '😐';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'badge-danger';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-success';
      default: return 'badge-secondary';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-primary';
      case 'pending': return 'text-warning';
      default: return 'text-muted';
    }
  }

  getEngagementColor(engagement: number): string {
    if (engagement >= 80) return 'text-success';
    if (engagement >= 60) return 'text-warning';
    return 'text-danger';
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  copySummary(): void {
    const summary = this.meetingSummary();
    if (!summary) return;
    
    const text = `Meeting Summary: ${summary.title}\n\n` +
      `Summary: ${summary.summary}\n\n` +
      `Key Points:\n${summary.keyPoints.map(point => `• ${point}`).join('\n')}\n\n` +
      `Action Items:\n${summary.actionItems.map(item => `• ${item.description} (${item.assignee})`).join('\n')}\n\n` +
      `Decisions:\n${summary.decisions.map(decision => `• ${decision}`).join('\n')}\n\n` +
      `Next Steps:\n${summary.nextSteps.map(step => `• ${step}`).join('\n')}`;
    
    navigator.clipboard.writeText(text).then(() => {
      alert('Summary copied to clipboard!');
    });
  }

  downloadSummary(): void {
    const summary = this.meetingSummary();
    if (!summary) return;
    
    const text = `Meeting Summary: ${summary.title}\n\n` +
      `Summary: ${summary.summary}\n\n` +
      `Key Points:\n${summary.keyPoints.map(point => `• ${point}`).join('\n')}\n\n` +
      `Action Items:\n${summary.actionItems.map(item => `• ${item.description} (${item.assignee})`).join('\n')}\n\n` +
      `Decisions:\n${summary.decisions.map(decision => `• ${decision}`).join('\n')}\n\n` +
      `Next Steps:\n${summary.nextSteps.map(step => `• ${step}`).join('\n')}`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${summary.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  navigateToTranscript(): void {
    const meetingId = this.meetingSummary()?.id;
    if (meetingId) {
      this.router.navigate(['/meeting', meetingId, 'transcript']);
    }
  }

  navigateToDetail(): void {
    const meetingId = this.meetingSummary()?.id;
    if (meetingId) {
      this.router.navigate(['/meeting', meetingId]);
    }
  }
}
