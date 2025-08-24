import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class MemberChangePasswordComponent {
  // Password fields
  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');

  // Password visibility toggles
  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);

  // Form state
  isSubmitting = signal(false);
  showSuccessMessage = signal(false);

  constructor(private router: Router) {}

  // Toggle password visibility
  toggleCurrentPassword(): void {
    this.showCurrentPassword.update(show => !show);
  }

  toggleNewPassword(): void {
    this.showNewPassword.update(show => !show);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(show => !show);
  }

  // Password strength validation
  getPasswordStrength(): number {
    const password = this.newPassword();
    if (!password) return 0;

    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;

    return strength;
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    
    if (strength <= 40) return 'weak';
    if (strength <= 60) return 'medium';
    if (strength <= 80) return 'strong';
    return 'very-strong';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    
    if (strength <= 40) return 'Yếu';
    if (strength <= 60) return 'Trung bình';
    if (strength <= 80) return 'Mạnh';
    return 'Rất mạnh';
  }

  // Password requirements validation
  hasMinLength(): boolean {
    return this.newPassword().length >= 8;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.newPassword());
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.newPassword());
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.newPassword());
  }

  hasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword());
  }

  // Password match validation
  passwordsMatch(): boolean {
    return this.newPassword() === this.confirmPassword() && this.newPassword() !== '';
  }

  // Form validation
  canSubmit(): boolean {
    return this.currentPassword() !== '' && 
           this.newPassword() !== '' && 
           this.confirmPassword() !== '' &&
           this.passwordsMatch() &&
           this.getPasswordStrength() >= 60 &&
           !this.isSubmitting();
  }

  // Submit form
  async changePassword(): Promise<void> {
    if (!this.canSubmit()) return;

    this.isSubmitting.set(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      this.showSuccessMessage.set(true);

      // Reset form after success
      setTimeout(() => {
        this.resetForm();
        this.router.navigate(['/member/settings']);
      }, 2000);

    } catch (error) {
      console.error('Error changing password:', error);
      // Handle error (show error message, etc.)
    } finally {
      this.isSubmitting.set(false);
    }
  }

  // Reset form
  resetForm(): void {
    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');
    this.showCurrentPassword.set(false);
    this.showNewPassword.set(false);
    this.showConfirmPassword.set(false);
    this.showSuccessMessage.set(false);
  }

  // Cancel action
  cancel(): void {
    this.router.navigate(['/member/settings']);
  }
}
