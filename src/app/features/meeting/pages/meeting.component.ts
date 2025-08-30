import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isMuted: boolean;
  hasVideo: boolean;
  handRaised: boolean;
  isSpeaking: boolean;
  videoStream?: MediaStream;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  imports: [CommonModule, DatePipe, FormsModule]  
})
export class MeetingRoomComponent implements OnInit, OnDestroy {
  @ViewChild('chatMessagesContainer') chatMessagesRef!: ElementRef;

  meetingId: string = '';
  meetingTitle: string = 'Cuộc họp trực tuyến';
  currentTime: Date = new Date();
  currentUserId: string = 'user-1';

  // Meeting state
  isMuted: boolean = false;
  hasVideo: boolean = true;
  handRaised: boolean = false;
  isScreenSharing: boolean = false;
  screenShareStream?: MediaStream;
  screenShareParticipant: string = '';

  // UI state
  sidePanelOpen: boolean = false;
  activePanel: 'chat' | 'participants' | null = null;
  unreadMessages: number = 0;

  // Data
  participants: Participant[] = [
    {
      id: 'user-1',
      name: 'Bạn',
      avatar: '/placeholder.svg?height=40&width=40',
      isHost: true,
      isMuted: false,
      hasVideo: true,
      handRaised: false,
      isSpeaking: false
    },
    {
      id: 'user-2',
      name: 'Nguyễn Văn A',
      avatar: '/placeholder.svg?height=40&width=40',
      isHost: false,
      isMuted: true,
      hasVideo: true,
      handRaised: false,
      isSpeaking: false
    },
    {
      id: 'user-3',
      name: 'Trần Thị B',
      avatar: '/placeholder.svg?height=40&width=40',
      isHost: false,
      isMuted: false,
      hasVideo: false,
      handRaised: true,
      isSpeaking: true
    }
  ];

  chatMessages: ChatMessage[] = [
    {
      id: '1',
      senderId: 'user-2',
      senderName: 'Nguyễn Văn A',
      content: 'Chào mọi người!',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      senderId: 'user-1',
      senderName: 'Bạn',
      content: 'Xin chào! Chúng ta bắt đầu cuộc họp nhé.',
      timestamp: new Date(Date.now() - 240000)
    }
  ];

  newMessage: string = '';
  private timeInterval?: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.meetingId = this.route.snapshot.params['id'] || 'demo-meeting';
    this.startTimeUpdate();
    this.initializeMediaDevices();
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private startTimeUpdate(): void {
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  private async initializeMediaDevices(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      // Handle user media stream
      const currentUser = this.participants.find(p => p.id === this.currentUserId);
      if (currentUser) {
        currentUser.videoStream = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  }

  // Meeting controls
  toggleMute(): void {
    this.isMuted = !this.isMuted;
    const currentUser = this.participants.find(p => p.id === this.currentUserId);
    if (currentUser) {
      currentUser.isMuted = this.isMuted;
    }
  }

  toggleVideo(): void {
    this.hasVideo = !this.hasVideo;
    const currentUser = this.participants.find(p => p.id === this.currentUserId);
    if (currentUser) {
      currentUser.hasVideo = this.hasVideo;
    }
  }

  async toggleScreenShare(): Promise<void> {
    if (this.isScreenSharing) {
      this.stopScreenShare();
    } else {
      await this.startScreenShare();
    }
  }

  private async startScreenShare(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ 
        video: true, 
        audio: true 
      });
      this.screenShareStream = stream;
      this.isScreenSharing = true;
      this.screenShareParticipant = 'Bạn';
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  }

  private stopScreenShare(): void {
    if (this.screenShareStream) {
      this.screenShareStream.getTracks().forEach(track => track.stop());
      this.screenShareStream = undefined;
    }
    this.isScreenSharing = false;
    this.screenShareParticipant = '';
  }

  toggleHandRaise(): void {
    this.handRaised = !this.handRaised;
    const currentUser = this.participants.find(p => p.id === this.currentUserId);
    if (currentUser) {
      currentUser.handRaised = this.handRaised;
    }
  }

  // UI controls
  openPanel(panel: 'chat' | 'participants'): void {
    if (this.activePanel === panel) {
      this.closeSidePanel();
    } else {
      this.activePanel = panel;
      this.sidePanelOpen = true;
      if (panel === 'chat') {
        this.unreadMessages = 0;
        setTimeout(() => this.scrollChatToBottom(), 100);
      }
    }
  }

  closeSidePanel(): void {
    this.sidePanelOpen = false;
    this.activePanel = null;
  }

  // Chat functionality
  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: this.currentUserId,
      senderName: 'Bạn',
      content: this.newMessage.trim(),
      timestamp: new Date()
    };

    this.chatMessages.push(message);
    this.newMessage = '';
    setTimeout(() => this.scrollChatToBottom(), 100);
  }

  private scrollChatToBottom(): void {
    if (this.chatMessagesRef) {
      const element = this.chatMessagesRef.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  // Utility methods
  getGridClass(): string {
    const count = this.participants.length;
    if (count <= 1) return 'grid-1';
    if (count <= 4) return 'grid-2x2';
    if (count <= 6) return 'grid-2x3';
    if (count <= 9) return 'grid-3x3';
    return 'grid-auto';
  }

  trackByParticipant(index: number, participant: Participant): string {
    return participant.id;
  }

  leaveMeeting(): void {
    if (confirm('Bạn có chắc chắn muốn rời khỏi cuộc họp?')) {
      this.router.navigate(['/']);
    }
  }
}