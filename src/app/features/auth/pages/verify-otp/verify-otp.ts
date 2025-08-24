import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss'
})
export class VerifyOtp implements OnInit, OnDestroy {
  otpDigits: string[] = ['', '', '', '', '', ''];
  countdown: number = 300; // 5 minutes
  resendCountdown: number = 60; // 1 minute
  isLoading: boolean = false;
  isVerified: boolean = false;
  canResend: boolean = false;
  private countdownInterval: any;
  private resendInterval: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
    }
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      this.otpDigits[index] = '';
      return;
    }

    this.otpDigits[index] = value;

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onOtpKeydown(event: any, index: number) {
    // Handle backspace
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  isOtpComplete(): boolean {
    return this.otpDigits.every(digit => digit !== '');
  }

  onVerifyOTP() {
    if (!this.isOtpComplete()) {
      return;
    }

    this.isLoading = true;
    const otp = this.otpDigits.join('');

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.isVerified = true;
    }, 2000);
  }

  onResendOTP() {
    if (this.canResend) {
      return;
    }

    this.canResend = true;
    this.resendCountdown = 60;
    this.startResendCountdown();

    // Reset OTP inputs
    this.otpDigits = ['', '', '', '', '', ''];
    
    // Simulate resend
    console.log('Resending OTP...');
  }

  private startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.countdownInterval);
        // Handle expired OTP
        console.log('OTP expired');
      }
    }, 1000);
  }

  private startResendCountdown() {
    this.resendInterval = setInterval(() => {
      if (this.resendCountdown > 0) {
        this.resendCountdown--;
      } else {
        clearInterval(this.resendInterval);
        this.canResend = false;
      }
    }, 1000);
  }
}
