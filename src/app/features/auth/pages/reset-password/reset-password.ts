import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPassword {
  resetForm = {
    email: '',
    newPassword: '',
    confirmPassword: '',
    token: ''
  };

  showNewPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  isEmailSent = false;
  isResetComplete = false;

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSendResetEmail() {
    if (this.resetForm.email) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Reset email sent to:', this.resetForm.email);
        this.isLoading = false;
        this.isEmailSent = true;
      }, 2000);
    }
  }

  onResetPassword() {
    if (this.resetForm.newPassword && this.resetForm.confirmPassword && this.resetForm.token) {
      if (this.resetForm.newPassword !== this.resetForm.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Password reset completed');
        this.isLoading = false;
        this.isResetComplete = true;
      }, 2000);
    }
  }
}
