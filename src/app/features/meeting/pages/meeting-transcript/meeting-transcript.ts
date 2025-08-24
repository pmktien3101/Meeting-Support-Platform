import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface TranscriptEntry {
  id: number;
  speaker: string;
  text: string;
  timestamp: string;
  duration: number;
  confidence: number;
}

interface MeetingInfo {
  id: string;
  title: string;
  date: string;
  duration: number;
  participants: string[];
}

@Component({
  selector: 'app-meeting-transcript',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meeting-transcript.html',
  styleUrls: ['./meeting-transcript.scss']
})
export class MeetingTranscript implements OnInit {
  meetingInfo = signal<MeetingInfo | null>(null);
  transcript = signal<TranscriptEntry[]>([]);
  isLoading = signal(true);
  error = signal('');
  
  // UI state
  searchTerm = signal('');
  selectedSpeaker = signal('all');
  showTimestamps = signal(true);
  autoScroll = signal(true);

  // Computed properties
  speakers = computed(() => {
    const entries = this.transcript();
    const uniqueSpeakers = [...new Set(entries.map(entry => entry.speaker))];
    return uniqueSpeakers.sort();
  });

  filteredTranscript = computed(() => {
    const entries = this.transcript();
    const search = this.searchTerm();
    const speaker = this.selectedSpeaker();

    let filtered = entries;

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.text.toLowerCase().includes(searchLower) ||
        entry.speaker.toLowerCase().includes(searchLower)
      );
    }

    if (speaker !== 'all') {
      filtered = filtered.filter(entry => entry.speaker === speaker);
    }

    return filtered;
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTranscript();
  }

  async loadTranscript(): Promise<void> {
    this.isLoading.set(true);
    
    try {
      const meetingId = this.route.snapshot.paramMap.get('id');
      if (!meetingId) {
        this.error.set('Meeting ID not found');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockMeetingInfo: MeetingInfo = {
        id: meetingId,
        title: 'Q4 Project Review Meeting',
        date: '2024-01-25T10:00:00Z',
        duration: 90,
        participants: ['John Smith', 'Emily Davis', 'Michael Chen', 'Lisa Johnson']
      };

      const mockTranscript: TranscriptEntry[] = [
        {
          id: 1,
          speaker: 'John Smith',
          text: 'Good morning everyone, welcome to our Q4 project review meeting. I hope you all had a great weekend.',
          timestamp: '00:00:15',
          duration: 8,
          confidence: 0.95
        },
        {
          id: 2,
          speaker: 'Emily Davis',
          text: 'Good morning John, thanks for organizing this. I\'m looking forward to reviewing our progress.',
          timestamp: '00:00:25',
          duration: 6,
          confidence: 0.92
        },
        {
          id: 3,
          speaker: 'John Smith',
          text: 'Great! Let\'s start with the agenda. First, we\'ll review our Q4 milestones and see where we stand.',
          timestamp: '00:00:35',
          duration: 10,
          confidence: 0.94
        },
        {
          id: 4,
          speaker: 'Michael Chen',
          text: 'I have the project dashboard ready. We\'ve completed 85% of our Q4 objectives so far.',
          timestamp: '00:00:50',
          duration: 12,
          confidence: 0.89
        },
        {
          id: 5,
          speaker: 'Lisa Johnson',
          text: 'That\'s excellent progress! What are the remaining 15% items we need to focus on?',
          timestamp: '00:01:05',
          duration: 8,
          confidence: 0.91
        },
        {
          id: 6,
          speaker: 'John Smith',
          text: 'Great question Lisa. The main remaining items are the final testing phase and documentation updates.',
          timestamp: '00:01:18',
          duration: 15,
          confidence: 0.93
        },
        {
          id: 7,
          speaker: 'Emily Davis',
          text: 'I can handle the documentation updates. I\'ll start working on that this week.',
          timestamp: '00:01:38',
          duration: 7,
          confidence: 0.88
        },
        {
          id: 8,
          speaker: 'Michael Chen',
          text: 'Perfect! I\'ll coordinate the testing phase with the QA team. We should be ready by next Friday.',
          timestamp: '00:01:50',
          duration: 11,
          confidence: 0.90
        }
      ];

      this.meetingInfo.set(mockMeetingInfo);
      this.transcript.set(mockTranscript);
      this.error.set('');
    } catch (err) {
      this.error.set('Failed to load transcript. Please try again.');
      console.error('Error loading transcript:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  copyTranscript(): void {
    const transcriptText = this.filteredTranscript()
      .map(entry => `${entry.speaker}: ${entry.text}`)
      .join('\n\n');

    navigator.clipboard.writeText(transcriptText).then(() => {
      console.log('Transcript copied to clipboard');
      // You could show a toast notification here
    }).catch(err => {
      console.error('Failed to copy transcript:', err);
    });
  }

  downloadTranscript(): void {
    const transcriptText = this.filteredTranscript()
      .map(entry => `${entry.speaker}: ${entry.text}`)
      .join('\n\n');

    const blob = new Blob([transcriptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${this.meetingInfo()?.title || 'meeting'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  navigateToDetail(): void {
    const meetingId = this.meetingInfo()?.id;
    if (meetingId) {
      this.router.navigate(['/meeting', meetingId]);
    }
  }

  navigateToSummary(): void {
    const meetingId = this.meetingInfo()?.id;
    if (meetingId) {
      this.router.navigate(['/meeting', meetingId, 'summary']);
    }
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
  }

  getConfidenceColor(confidence: number): string {
    if (confidence >= 0.9) return 'confidence-high';
    if (confidence >= 0.8) return 'confidence-medium';
    return 'confidence-low';
  }
}
