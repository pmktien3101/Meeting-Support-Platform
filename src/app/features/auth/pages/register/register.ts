import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  };

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getPasswordStrengthClass(): string {
    const password = this.registerForm.password;
    if (!password) return '';
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrengthClass();
    switch (strength) {
      case 'weak': return 'Weak password';
      case 'medium': return 'Medium strength';
      case 'strong': return 'Strong password';
      default: return '';
    }
  }

  isFormValid(): boolean {
    return !!(this.registerForm.firstName && 
           this.registerForm.lastName && 
           this.registerForm.email && 
           this.registerForm.phone && 
           this.registerForm.password && 
           this.registerForm.confirmPassword && 
           this.registerForm.agreeTerms &&
           this.registerForm.password === this.registerForm.confirmPassword);
  }

  onRegister() {
    if (this.isFormValid()) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Register attempt:', this.registerForm);
        this.isLoading = false;
      }, 2000);
    }
  }
}
