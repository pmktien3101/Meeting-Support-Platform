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
    businessName: '',
    businessType: '',
    industry: '',
    taxCode: '',
    businessAddress: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedPlan: '',
    yearlyBilling: false,
    licenseFile: null as File | null,
    agreeTerms: false
  };

  availablePlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 500000,
      description: 'Phù hợp cho doanh nghiệp nhỏ mới bắt đầu',
      features: [
        'Tối đa 10 thành viên',
        'Lập lịch họp cơ bản',
        'Quản lý công việc',
        'Hỗ trợ qua email',
        'Báo cáo cơ bản'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 1500000,
      description: 'Lý tưởng cho doanh nghiệp đang phát triển',
      features: [
        'Tối đa 50 thành viên',
        'Lập lịch họp nâng cao',
        'Quản lý công việc đầy đủ',
        'Hỗ trợ ưu tiên',
        'Báo cáo nâng cao',
        'Công cụ cộng tác nhóm',
        'Tích hợp tùy chỉnh'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 4000000,
      description: 'Dành cho tổ chức lớn',
      features: [
        'Không giới hạn thành viên',
        'Lập lịch họp doanh nghiệp',
        'Quản lý dự án nâng cao',
        'Hỗ trợ 24/7 qua điện thoại',
        'Báo cáo tùy chỉnh',
        'Bảo mật nâng cao',
        'Truy cập API',
        'Quản lý tài khoản chuyên dụng'
      ]
    }
  ];

  isLoading = false;

  selectPlan(planId: string) {
    this.registerForm.selectedPlan = planId;
  }

  toggleBilling() {
    // Update plan prices when billing cycle changes
    this.availablePlans.forEach(plan => {
      if (this.registerForm.yearlyBilling) {
        plan.price = Math.round(plan.price * 12 * 0.8); // 20% discount for yearly
      } else {
        // Reset to monthly prices
        const monthlyPrices = [500000, 1500000, 4000000];
        const index = this.availablePlans.indexOf(plan);
        plan.price = monthlyPrices[index];
      }
    });
  }

  triggerFileUpload() {
    const fileInput = document.getElementById('licenseFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File quá lớn. Vui lòng chọn file nhỏ hơn 10MB.');
        return;
      }
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Chỉ chấp nhận file PDF, JPG, PNG.');
        return;
      }
      
      this.registerForm.licenseFile = file;
    }
  }

  removeFile() {
    this.registerForm.licenseFile = null;
    const fileInput = document.getElementById('licenseFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  isFormValid(): boolean {
    return !!(this.registerForm.businessName && 
           this.registerForm.businessType && 
           this.registerForm.industry &&
           this.registerForm.taxCode &&
           this.registerForm.businessAddress &&
           this.registerForm.firstName && 
           this.registerForm.lastName && 
           this.registerForm.email && 
           this.registerForm.phone && 
           this.registerForm.selectedPlan &&
           this.registerForm.licenseFile &&
           this.registerForm.agreeTerms);
  }

  onRegister() {
    if (this.isFormValid()) {
      this.isLoading = true;
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('businessName', this.registerForm.businessName);
      formData.append('businessType', this.registerForm.businessType);
      formData.append('industry', this.registerForm.industry);
      formData.append('taxCode', this.registerForm.taxCode);
      formData.append('businessAddress', this.registerForm.businessAddress);
      formData.append('firstName', this.registerForm.firstName);
      formData.append('lastName', this.registerForm.lastName);
      formData.append('email', this.registerForm.email);
      formData.append('phone', this.registerForm.phone);
      formData.append('selectedPlan', this.registerForm.selectedPlan);
      formData.append('yearlyBilling', this.registerForm.yearlyBilling.toString());
      if (this.registerForm.licenseFile) {
        formData.append('licenseFile', this.registerForm.licenseFile);
      }

      // Simulate API call
      setTimeout(() => {
        console.log('Business registration submitted:', {
          ...this.registerForm,
          licenseFile: this.registerForm.licenseFile?.name
        });
        
        // Show success message
        alert('Đăng ký thành công! Admin sẽ xem xét và gửi thông tin tài khoản về email của bạn trong vòng 24-48 giờ.');
        
        this.isLoading = false;
        // Reset form
        this.registerForm = {
          businessName: '',
          businessType: '',
          industry: '',
          taxCode: '',
          businessAddress: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          selectedPlan: '',
          yearlyBilling: false,
          licenseFile: null,
          agreeTerms: false
        };
      }, 2000);
    }
  }
}
