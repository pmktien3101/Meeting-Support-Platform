import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface ProfileData {
  displayName: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  department: string;
  manager: string;
  startDate: string;
  employeeId: string;
  bio: string;
  avatar: string;
  skills: Skill[];
}

interface ProfileStats {
  meetingsAttended: number;
  tasksCompleted: number;
  projectsInvolved: number;
}

interface Activity {
  icon: string;
  text: string;
  time: string;
}

@Component({
  selector: 'app-member-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class MemberProfileComponent {
  // Profile data
  profileData = signal<ProfileData>({
    displayName: 'Nguyễn Văn A',
    firstName: 'Văn A',
    lastName: 'Nguyễn',
    title: 'Frontend Developer',
    email: 'nguyenvana@company.com',
    phone: '+84 90 123 4567',
    dateOfBirth: '1990-01-01',
    location: 'Hà Nội, Việt Nam',
    department: 'Phát triển phần mềm',
    manager: 'Trần Thị B',
    startDate: '2022-01-15',
    employeeId: 'EMP001',
    bio: 'Là một Frontend Developer có kinh nghiệm trong việc phát triển ứng dụng web sử dụng Angular, React và các công nghệ hiện đại khác.',
    avatar: '',
    skills: [
      { name: 'Angular', level: 'expert' },
      { name: 'TypeScript', level: 'advanced' },
      { name: 'JavaScript', level: 'expert' },
      { name: 'HTML/CSS', level: 'expert' },
      { name: 'React', level: 'intermediate' },
      { name: 'Node.js', level: 'intermediate' }
    ]
  });

  // Profile statistics
  profileStats = signal<ProfileStats>({
    meetingsAttended: 45,
    tasksCompleted: 128,
    projectsInvolved: 12
  });

  // Recent activities
  recentActivities = signal<Activity[]>([
    {
      icon: '📅',
      text: 'Tham gia cuộc họp dự án mới',
      time: '2 giờ trước'
    },
    {
      icon: '✅',
      text: 'Hoàn thành nhiệm vụ "Cập nhật UI dashboard"',
      time: '1 ngày trước'
    },
    {
      icon: '📝',
      text: 'Cập nhật thông tin hồ sơ cá nhân',
      time: '3 ngày trước'
    },
    {
      icon: '👥',
      text: 'Tham gia team meeting hàng tuần',
      time: '1 tuần trước'
    }
  ]);

  // Form state
  isSaving = signal(false);
  hasChanges = signal(false);
  originalData: ProfileData;

  constructor(private router: Router) {
    // Store original data for comparison
    this.originalData = JSON.parse(JSON.stringify(this.profileData()));
    
    // Watch for changes using effect
    effect(() => {
      this.checkForChanges();
    });
  }

  // Check if profile data has changed
  checkForChanges(): void {
    const current = JSON.stringify(this.profileData());
    const original = JSON.stringify(this.originalData);
    this.hasChanges.set(current !== original);
  }

  // Add new skill
  addSkill(): void {
    const newSkill: Skill = { name: '', level: 'beginner' };
    this.profileData.update(data => ({
      ...data,
      skills: [...data.skills, newSkill]
    }));
  }

  // Remove skill by index
  removeSkill(index: number): void {
    this.profileData.update(data => ({
      ...data,
      skills: data.skills.filter((_, i) => i !== index)
    }));
  }

  // Upload avatar
  uploadAvatar(): void {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        // Simulate file upload
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profileData.update(data => ({
            ...data,
            avatar: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }

  // Save profile changes
  async saveProfile(): Promise<void> {
    if (!this.hasChanges()) return;

    this.isSaving.set(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update original data
      this.originalData = JSON.parse(JSON.stringify(this.profileData()));
      this.hasChanges.set(false);

      // Show success message (you can implement a toast service)
      console.log('Profile saved successfully!');

    } catch (error) {
      console.error('Error saving profile:', error);
      // Handle error (show error message, etc.)
    } finally {
      this.isSaving.set(false);
    }
  }

  // Reset profile to original data
  resetProfile(): void {
    this.profileData.set(JSON.parse(JSON.stringify(this.originalData)));
    this.hasChanges.set(false);
  }

  // Navigate to change password page
  changePassword(): void {
    this.router.navigate(['/member/change-password']);
  }

  // Export profile data
  exportProfile(): void {
    const dataStr = JSON.stringify(this.profileData(), null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'profile-data.json';
    link.click();
  }

  // View activity log
  viewActivityLog(): void {
    // Navigate to activity log page or show modal
    console.log('Viewing activity log...');
  }
}


