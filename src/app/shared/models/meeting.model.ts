export interface Meeting {
  id: number;
  projectId: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  meetingType: 'zoom' | 'teams' | 'google-meet' | 'in-person';
  meetingLink?: string;
  meetingCode?: string;
  hostId: number;
  attendees: number[];
  isRecorded: boolean;
  recordingUrl?: string;
  transcriptUrl?: string;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingTranscript {
  id: number;
  meetingId: number;
  content: string;
  speakerSegments: SpeakerSegment[];
  wordCount: number;
  duration: number; // in seconds
  createdAt: Date;
}

export interface SpeakerSegment {
  speaker: string;
  startTime: number;
  endTime: number;
  text: string;
}

export interface MeetingSummary {
  id: number;
  meetingId: number;
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  decisions: string[];
  nextSteps: string[];
  createdAt: Date;
}
