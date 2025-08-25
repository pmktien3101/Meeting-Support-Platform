import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
}

@Component({
  selector: 'app-system-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './system.html',
  styleUrls: ['./system.scss']
})
export class SystemManagement implements OnInit {
  // UI State
  activeTab = signal('email');
  showTemplateModal = signal(false);
  selectedTemplate = signal<EmailTemplate | null>(null);

  // Status signals
  emailStatus = signal<'active' | 'inactive' | 'pending'>('active');
  openaiStatus = signal<'active' | 'inactive' | 'pending'>('active');
  whisperStatus = signal<'active' | 'inactive' | 'pending'>('inactive');
  zoomStatus = signal<'active' | 'inactive' | 'pending'>('pending');

  // Forms
  emailForm: FormGroup;
  openaiForm: FormGroup;
  whisperForm: FormGroup;
  zoomForm: FormGroup;
  systemForm: FormGroup;
  templateForm: FormGroup;

  // Data
  emailTemplates = signal<EmailTemplate[]>([]);
  lastBackupDate = signal<string | null>(null);
  lastBackupSize = signal<string | null>(null);

  // Tabs configuration
  tabs: Tab[] = [
    { id: 'email', label: 'Email Server', icon: '📧' },
    { id: 'ai', label: 'AI API', icon: '🤖' },
    { id: 'zoom', label: 'Zoom API', icon: '📹' },
    { id: 'templates', label: 'Email Templates', icon: '📝' },
    { id: 'system', label: 'System Settings', icon: '⚙️' }
  ];

  constructor(private fb: FormBuilder) {
    // Email form
    this.emailForm = this.fb.group({
      smtpHost: ['smtp.gmail.com', [Validators.required]],
      smtpPort: [587, [Validators.required, Validators.min(1), Validators.max(65535)]],
      smtpUsername: ['', [Validators.required, Validators.email]],
      smtpPassword: ['', [Validators.required]],
      smtpFromEmail: ['noreply@yourcompany.com', [Validators.required, Validators.email]],
      smtpFromName: ['Your Company Name', [Validators.required]]
    });

    // OpenAI form
    this.openaiForm = this.fb.group({
      openaiApiKey: ['', [Validators.required]],
      openaiModel: ['gpt-4', [Validators.required]]
    });

    // Whisper form
    this.whisperForm = this.fb.group({
      whisperApiKey: [''],
      whisperModel: ['whisper-1']
    });

    // Zoom form
    this.zoomForm = this.fb.group({
      zoomApiKey: ['', [Validators.required]],
      zoomApiSecret: ['', [Validators.required]],
      zoomSdkKey: [''],
      zoomSdkSecret: ['']
    });

    // System form
    this.systemForm = this.fb.group({
      systemName: ['Meeting Support Platform'],
      timezone: ['Asia/Ho_Chi_Minh'],
      dateFormat: ['DD/MM/YYYY'],
      sessionTimeout: [120, [Validators.min(15), Validators.max(480)]],
      enableAuditLog: [true],
      enableNotifications: [true]
    });

    // Template form
    this.templateForm = this.fb.group({
      subject: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadSettings();
    this.loadEmailTemplates();
    this.loadBackupInfo();
  }

  // Tab Management
  setActiveTab(tabId: string): void {
    this.activeTab.set(tabId);
  }

  // Settings Loading
  loadSettings(): void {
    // Mock data - replace with actual API calls
    this.emailForm.patchValue({
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: 'admin@yourcompany.com',
      smtpPassword: '',
      smtpFromEmail: 'noreply@yourcompany.com',
      smtpFromName: 'Meeting Support Platform'
    });

    this.openaiForm.patchValue({
      openaiApiKey: '',
      openaiModel: 'gpt-4'
    });

    this.whisperForm.patchValue({
      whisperApiKey: '',
      whisperModel: 'whisper-1'
    });

    this.zoomForm.patchValue({
      zoomApiKey: '',
      zoomApiSecret: '',
      zoomSdkKey: '',
      zoomSdkSecret: ''
    });

    this.systemForm.patchValue({
      systemName: 'Meeting Support Platform',
      timezone: 'Asia/Ho_Chi_Minh',
      dateFormat: 'DD/MM/YYYY',
      sessionTimeout: 120,
      enableAuditLog: true,
      enableNotifications: true
    });
  }

  loadEmailTemplates(): void {
    // Mock data - replace with actual API call
    const mockTemplates: EmailTemplate[] = [
      {
        id: '1',
        name: 'OTP Verification',
        subject: 'Your OTP Code: {{otp}}',
        content: `Hello {{userName}},

Your OTP code is: {{otp}}

This code will expire in {{expiryTime}} minutes.

If you didn't request this code, please ignore this email.

Best regards,
{{companyName}}`,
        variables: ['{{userName}}', '{{otp}}', '{{expiryTime}}', '{{companyName}}']
      },
      {
        id: '2',
        name: 'Meeting Invitation',
        subject: 'Meeting Invitation: {{meetingTitle}}',
        content: `Hello {{userName}},

You have been invited to join a meeting:

Meeting: {{meetingTitle}}
Date: {{meetingDate}}
Time: {{meetingTime}}
Duration: {{meetingDuration}}
Host: {{hostName}}

Join link: {{joinLink}}

Please click the link above to join the meeting.

Best regards,
{{companyName}}`,
        variables: ['{{userName}}', '{{meetingTitle}}', '{{meetingDate}}', '{{meetingTime}}', '{{meetingDuration}}', '{{hostName}}', '{{joinLink}}', '{{companyName}}']
      },
      {
        id: '3',
        name: 'Meeting Summary',
        subject: 'Meeting Summary: {{meetingTitle}}',
        content: `Hello {{userName}},

Here is the summary of your recent meeting:

Meeting: {{meetingTitle}}
Date: {{meetingDate}}
Duration: {{meetingDuration}}

Summary:
{{meetingSummary}}

Action Items:
{{actionItems}}

Next Meeting: {{nextMeeting}}

Best regards,
{{companyName}}`,
        variables: ['{{userName}}', '{{meetingTitle}}', '{{meetingDate}}', '{{meetingDuration}}', '{{meetingSummary}}', '{{actionItems}}', '{{nextMeeting}}', '{{companyName}}']
      },
      {
        id: '4',
        name: 'Account Activation',
        subject: 'Welcome to {{companyName}} - Activate Your Account',
        content: `Hello {{userName}},

Welcome to {{companyName}}! Your account has been created successfully.

To activate your account, please click the link below:
{{activationLink}}

Your login credentials:
Email: {{userEmail}}
Temporary Password: {{tempPassword}}

Please change your password after your first login.

Best regards,
{{companyName}} Team`,
        variables: ['{{userName}}', '{{companyName}}', '{{activationLink}}', '{{userEmail}}', '{{tempPassword}}']
      }
    ];

    this.emailTemplates.set(mockTemplates);
  }

  loadBackupInfo(): void {
    // Mock data - replace with actual API call
    this.lastBackupDate.set('2024-02-15 14:30:00');
    this.lastBackupSize.set('2.5 GB');
  }

  // Email Settings
  testEmailConnection(): void {
    console.log('Testing email connection...');
    // Implement email connection test
    setTimeout(() => {
      alert('Email connection test completed successfully!');
    }, 2000);
  }

  saveEmailSettings(): void {
    if (this.emailForm.valid) {
      console.log('Saving email settings:', this.emailForm.value);
      // Implement save email settings
      this.emailStatus.set('active');
      alert('Email settings saved successfully!');
    }
  }

  // OpenAI Settings
  testOpenAIConnection(): void {
    console.log('Testing OpenAI connection...');
    // Implement OpenAI connection test
    setTimeout(() => {
      alert('OpenAI connection test completed successfully!');
    }, 2000);
  }

  saveOpenAISettings(): void {
    if (this.openaiForm.valid) {
      console.log('Saving OpenAI settings:', this.openaiForm.value);
      // Implement save OpenAI settings
      this.openaiStatus.set('active');
      alert('OpenAI settings saved successfully!');
    }
  }

  // Whisper Settings
  testWhisperConnection(): void {
    console.log('Testing Whisper connection...');
    // Implement Whisper connection test
    setTimeout(() => {
      alert('Whisper connection test completed successfully!');
    }, 2000);
  }

  saveWhisperSettings(): void {
    console.log('Saving Whisper settings:', this.whisperForm.value);
    // Implement save Whisper settings
    this.whisperStatus.set('active');
    alert('Whisper settings saved successfully!');
  }

  // Zoom Settings
  testZoomConnection(): void {
    console.log('Testing Zoom connection...');
    // Implement Zoom connection test
    setTimeout(() => {
      alert('Zoom connection test completed successfully!');
    }, 2000);
  }

  saveZoomSettings(): void {
    if (this.zoomForm.valid) {
      console.log('Saving Zoom settings:', this.zoomForm.value);
      // Implement save Zoom settings
      this.zoomStatus.set('active');
      alert('Zoom settings saved successfully!');
    }
  }

  // System Settings
  saveSystemSettings(): void {
    console.log('Saving system settings:', this.systemForm.value);
    // Implement save system settings
    alert('System settings saved successfully!');
  }

  // Backup & Restore
  createBackup(): void {
    console.log('Creating backup...');
    // Implement backup creation
    setTimeout(() => {
      this.lastBackupDate.set(new Date().toLocaleString());
      this.lastBackupSize.set('2.8 GB');
      alert('Backup created successfully!');
    }, 3000);
  }

  restoreBackup(): void {
    if (confirm('Are you sure you want to restore from backup? This will overwrite current data.')) {
      console.log('Restoring from backup...');
      // Implement backup restoration
      setTimeout(() => {
        alert('Backup restored successfully!');
      }, 3000);
    }
  }

  // Template Management
  editTemplate(template: EmailTemplate): void {
    this.selectedTemplate.set(template);
    this.templateForm.patchValue({
      subject: template.subject,
      content: template.content
    });
    this.showTemplateModal.set(true);
  }

  closeTemplateModal(): void {
    this.showTemplateModal.set(false);
    this.selectedTemplate.set(null);
    this.templateForm.reset();
  }

  saveTemplate(): void {
    if (this.templateForm.valid && this.selectedTemplate()) {
      const formValue = this.templateForm.value;
      const template = this.selectedTemplate();
      
      if (template) {
        this.emailTemplates.update(templates =>
          templates.map(t =>
            t.id === template.id
              ? { ...t, subject: formValue.subject, content: formValue.content }
              : t
          )
        );
      }
      
      this.closeTemplateModal();
      alert('Template saved successfully!');
    }
  }

  // Save All Settings
  saveAllSettings(): void {
    console.log('Saving all settings...');
    
    // Save all forms
    const allSettings = {
      email: this.emailForm.value,
      openai: this.openaiForm.value,
      whisper: this.whisperForm.value,
      zoom: this.zoomForm.value,
      system: this.systemForm.value
    };
    
    console.log('All settings:', allSettings);
    
    // Implement save all settings
    setTimeout(() => {
      alert('All settings saved successfully!');
    }, 2000);
  }

  // Utility Methods
  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  }
}
