import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface AccountSettings {
  displayName: string;
  email: string;
  phone: string;
  timezone: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  meetingReminder: string;
  deadlineReminder: string;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  density: string;
}

interface PrivacySettings {
  showOnlineStatus: boolean;
  showEmail: boolean;
  showPhone: boolean;
}

@Component({
  selector: 'app-member-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class MemberSettingsComponent {
  // Account settings
  accountSettings: AccountSettings = {
    displayName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '+84 123 456 789',
    timezone: 'Asia/Ho_Chi_Minh'
  };

  // Notification settings
  notificationSettings: NotificationSettings = {
    email: true,
    push: true,
    meetingReminder: '15',
    deadlineReminder: '3'
  };

  // Appearance settings
  appearanceSettings: AppearanceSettings = {
    theme: 'light',
    language: 'vi',
    density: 'comfortable'
  };

  // Privacy settings
  privacySettings: PrivacySettings = {
    showOnlineStatus: true,
    showEmail: false,
    showPhone: false
  };

  // Action methods
  saveSettings(): void {
    console.log('Saving settings...');
    console.log('Account:', this.accountSettings);
    console.log('Notifications:', this.notificationSettings);
    console.log('Appearance:', this.appearanceSettings);
    console.log('Privacy:', this.privacySettings);
    
    // TODO: Implement API call to save settings
    alert('Cài đặt đã được lưu thành công!');
  }

  resetSettings(): void {
    if (confirm('Bạn có chắc chắn muốn khôi phục cài đặt mặc định?')) {
      // Reset to default values
      this.accountSettings = {
        displayName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '+84 123 456 789',
        timezone: 'Asia/Ho_Chi_Minh'
      };

      this.notificationSettings = {
        email: true,
        push: true,
        meetingReminder: '15',
        deadlineReminder: '3'
      };

      this.appearanceSettings = {
        theme: 'light',
        language: 'vi',
        density: 'comfortable'
      };

      this.privacySettings = {
        showOnlineStatus: true,
        showEmail: false,
        showPhone: false
      };

      console.log('Settings reset to default values');
      alert('Đã khôi phục cài đặt mặc định!');
    }
  }

  exportSettings(): void {
    console.log('Exporting settings...');
    // TODO: Implement export functionality
    const settingsData = {
      account: this.accountSettings,
      notifications: this.notificationSettings,
      appearance: this.appearanceSettings,
      privacy: this.privacySettings
    };
    
    const dataStr = JSON.stringify(settingsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'member-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  importSettings(): void {
    console.log('Importing settings...');
    // TODO: Implement import functionality
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const settings = JSON.parse(e.target.result);
            // TODO: Validate and apply imported settings
            console.log('Imported settings:', settings);
            alert('Đã nhập cài đặt thành công!');
          } catch (error) {
            alert('Lỗi khi nhập cài đặt. Vui lòng kiểm tra file!');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  viewAccountActivity(): void {
    console.log('Viewing account activity...');
    // TODO: Navigate to account activity page
  }

  manageDevices(): void {
    console.log('Managing devices...');
    // TODO: Navigate to device management page
  }
}
