import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Meeting {
  id: number;
  title: string;
  date: string;
}

interface Feedback {
  meetingId: string;
  rating: number;
  comment: string;
  positivePoints: string;
  improvementPoints: string;
}

@Component({
  selector: 'app-member-communication',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class MemberCommunicationComponent {
  // Chat data
  newMessage = '';
  messages = signal<Message[]>([
    {
      id: 1,
      author: 'PM Nguyễn Văn B',
      content: 'Chào team! Hôm nay chúng ta sẽ họp lúc 14:00 để review sprint 2',
      timestamp: '09:00',
      isOwn: false
    },
    {
      id: 2,
      author: 'Nguyễn Văn A',
      content: 'Chào PM! Tôi đã chuẩn bị sẵn sàng cho cuộc họp',
      timestamp: '09:05',
      isOwn: true
    },
    {
      id: 3,
      author: 'Trần Thị C',
      content: 'Tôi cũng đã hoàn thành phần UI/UX design, sẵn sàng demo',
      timestamp: '09:08',
      isOwn: false
    },
    {
      id: 4,
      author: 'Lê Văn D',
      content: 'Backend API đã hoàn thành 80%, còn lại là testing',
      timestamp: '09:10',
      isOwn: false
    }
  ]);

  // Recent meetings for feedback
  recentMeetings = signal<Meeting[]>([
    {
      id: 1,
      title: 'Họp Review Sprint 2',
      date: '15/12/2024'
    },
    {
      id: 2,
      title: 'Daily Standup',
      date: '14/12/2024'
    },
    {
      id: 3,
      title: 'Họp thiết kế UI/UX',
      date: '13/12/2024'
    }
  ]);

  // Feedback form data
  feedback: Feedback = {
    meetingId: '',
    rating: 0,
    comment: '',
    positivePoints: '',
    improvementPoints: ''
  };

  // Action methods
  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        author: 'Nguyễn Văn A',
        content: this.newMessage,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };

      this.messages.update(messages => [...messages, message]);
      this.newMessage = '';
    }
  }

  setRating(rating: number): void {
    this.feedback.rating = rating;
  }

  submitFeedback(): void {
    if (this.feedback.meetingId && this.feedback.rating > 0) {
      console.log('Submitting feedback:', this.feedback);
      // TODO: Implement API call to submit feedback
      
      // Reset form
      this.clearFeedback();
    } else {
      console.log('Please select a meeting and provide a rating');
    }
  }

  clearFeedback(): void {
    this.feedback = {
      meetingId: '',
      rating: 0,
      comment: '',
      positivePoints: '',
      improvementPoints: ''
    };
  }

  refreshMessages(): void {
    console.log('Refreshing messages...');
    // TODO: Implement API call to refresh messages
  }

  startNewChat(): void {
    console.log('Starting new chat...');
    // TODO: Implement new chat functionality
  }

  viewChatHistory(): void {
    console.log('Viewing chat history...');
    // TODO: Navigate to chat history page
  }

  searchMessages(): void {
    console.log('Searching messages...');
    // TODO: Implement message search functionality
  }

  viewAllFeedback(): void {
    console.log('Viewing all feedback...');
    // TODO: Navigate to feedback history page
  }

  viewTeamDirectory(): void {
    console.log('Viewing team directory...');
    // TODO: Navigate to team directory page
  }

  viewMeetingNotes(): void {
    console.log('Viewing meeting notes...');
    // TODO: Navigate to meeting notes page
  }

  viewNotifications(): void {
    console.log('Viewing notifications...');
    // TODO: Navigate to notifications page
  }

  viewSharedFiles(): void {
    console.log('Viewing shared files...');
    // TODO: Navigate to shared files page
  }
}
