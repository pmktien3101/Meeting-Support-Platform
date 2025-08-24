import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface MeetingScheduleForm {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  meetingType: 'zoom' | 'teams' | 'google-meet' | 'custom';
  projectId?: number;
  attendees: string[];
  agenda: string;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  recurrenceEndDate?: string;
}

interface Project {
  id: number;
  name: string;
  status: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-meeting-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meeting-schedule.html',
  styleUrls: ['./meeting-schedule.scss']
})
export class MeetingSchedule implements OnInit {
  // Form data
  meetingForm = signal<MeetingScheduleForm>({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    meetingType: 'zoom',
    projectId: undefined,
    attendees: [],
    agenda: '',
    isRecurring: false,
    recurrencePattern: undefined,
    recurrenceEndDate: undefined
  });

  // UI state
  isLoading = signal(false);
  isSubmitting = signal(false);
  showAttendeeModal = signal(false);
  showRecurrenceOptions = signal(false);

  // Available options
  meetingTypes = [
    { value: 'zoom', label: 'Zoom Meeting', icon: '🎥' },
    { value: 'teams', label: 'Microsoft Teams', icon: '💼' },
    { value: 'google-meet', label: 'Google Meet', icon: '📹' },
    { value: 'custom', label: 'Custom Link', icon: '🔗' }
  ];

  durationOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
    { value: 180, label: '3 hours' }
  ];

  recurrencePatterns = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  // Mock data
  projects: Project[] = [
    { id: 1, name: 'Website Redesign', status: 'active' },
    { id: 2, name: 'Mobile App Development', status: 'active' },
    { id: 3, name: 'Marketing Campaign', status: 'planning' },
    { id: 4, name: 'Product Launch', status: 'active' }
  ];

  availableUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Project Manager' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Designer' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Marketing' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'QA' }
  ];

  // Selected attendees
  selectedAttendees: User[] = [];
  newAttendeeEmail = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setDefaultDateTime();
  }

  setDefaultDateTime(): void {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.meetingForm.update(form => ({
      ...form,
      date: tomorrow.toISOString().split('T')[0],
      time: '09:00'
    }));
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  toggleRecurrenceOptions(): void {
    this.showRecurrenceOptions.set(!this.showRecurrenceOptions());
  }

  selectMeetingType(type: string): void {
    this.meetingForm.update(form => ({
      ...form,
      meetingType: type as 'zoom' | 'teams' | 'google-meet' | 'custom'
    }));
  }

  isUserSelected(user: User): boolean {
    return this.selectedAttendees.some(attendee => attendee.id === user.id);
  }

  toggleUserSelection(user: User): void {
    if (this.isUserSelected(user)) {
      this.removeAttendee(user);
    } else {
      this.selectedAttendees.push(user);
      this.meetingForm.update(form => ({
        ...form,
        attendees: [...form.attendees, user.email]
      }));
    }
  }

  addAttendee(): void {
    const email = this.newAttendeeEmail.trim();
    if (!email) return;

    // Check if user already exists in available users
    const existingUser = this.availableUsers.find(user => user.email === email);
    if (existingUser && !this.selectedAttendees.find(a => a.id === existingUser.id)) {
      this.selectedAttendees.push(existingUser);
      this.meetingForm.update(form => ({
        ...form,
        attendees: [...form.attendees, email]
      }));
    } else if (!existingUser) {
      // Add as new attendee
      const newAttendee: User = {
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        role: 'Guest'
      };
      this.selectedAttendees.push(newAttendee);
      this.meetingForm.update(form => ({
        ...form,
        attendees: [...form.attendees, email]
      }));
    }

    this.newAttendeeEmail = '';
  }

  removeAttendee(attendee: User): void {
    this.selectedAttendees = this.selectedAttendees.filter(a => a.id !== attendee.id);
    this.meetingForm.update(form => ({
      ...form,
      attendees: form.attendees.filter(email => email !== attendee.email)
    }));
  }

  addTag(tag: string): void {
    // This method would be implemented if tags were part of the meeting form
    console.log('Adding tag:', tag);
  }

  addCustomTag(event: any): void {
    const input = event.target.previousElementSibling;
    const tag = input.value.trim();
    if (tag) {
      this.addTag(tag);
      input.value = '';
    }
  }

  async scheduleMeeting(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting.set(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const form = this.meetingForm();
      const meetingData = {
        ...form,
        startDateTime: new Date(`${form.date}T${form.time}`).toISOString(),
        attendees: this.selectedAttendees.map(a => a.email)
      };

      console.log('Scheduling meeting:', meetingData);

      // Success - redirect to meeting list
      alert('Meeting scheduled successfully!');
      this.navigateToList();

    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Failed to schedule meeting. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  validateForm(): boolean {
    const form = this.meetingForm();
    
    if (!form.title.trim()) {
      alert('Please enter a meeting title');
      return false;
    }

    if (!form.date) {
      alert('Please select a meeting date');
      return false;
    }

    if (!form.time) {
      alert('Please select a meeting time');
      return false;
    }

    if (form.isRecurring && !form.recurrencePattern) {
      alert('Please select a recurrence pattern');
      return false;
    }

    if (form.isRecurring && form.recurrencePattern && !form.recurrenceEndDate) {
      alert('Please select an end date for recurring meetings');
      return false;
    }

    return true;
  }

  navigateToList(): void {
    this.router.navigate(['/meeting/list']);
  }

  cancel(): void {
    this.navigateToList();
  }
}
