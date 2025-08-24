import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm = {
    email: '',
    password: '',
    rememberMe: false
  };

  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginForm.email && this.loginForm.password) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.loginForm).subscribe({
        next: (user: any) => {
          console.log('✅ Login thành công:', user);
          this.isLoading = false;
          if (user.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else if (user.role === 'business-owner') {
            this.router.navigate(['/business-owner/dashboard']);
          } else if (user.role === 'pm') {
            this.router.navigate(['/pm/dashboard']);
          } else {
            this.router.navigate(['/member/dashboard']);
          }
        },
        error: (err: any) => {
          console.error('❌ Login error:', err);
          this.isLoading = false;
          this.errorMessage = err.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
        }
      });
    } else {
      this.errorMessage = 'Vui lòng nhập đầy đủ email và mật khẩu.';
    }
  }
}
