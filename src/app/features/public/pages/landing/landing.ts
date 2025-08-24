import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class Landing {
  isYearlyBilling = false;

  stats = [
    { number: '10K+', label: 'Người Dùng Doanh Nghiệp' },
    { number: '50K+', label: 'Cuộc Họp Được Tổ Chức' },
    { number: '95%', label: 'Tỷ Lệ Hài Lòng' },
    { number: '24/7', label: 'Hỗ Trợ' }
  ];

  features = [
    {
      icon: '📅',
      title: 'Lập Lịch Thông Minh',
      description: 'Lập lịch được hỗ trợ AI tìm thời gian hoàn hảo cho nhóm và khách hàng của bạn.'
    },
    {
      icon: '🎯',
      title: 'Theo Dõi Mục Tiêu Kinh Doanh',
      description: 'Thiết lập mục tiêu kinh doanh và theo dõi tiến độ với cập nhật thời gian thực và KPIs.'
    },
    {
      icon: '🤝',
      title: 'Hợp Tác Nhóm',
      description: 'Công cụ hợp tác liền mạch cho các nhóm kinh doanh từ xa và kết hợp.'
    },
    {
      icon: '📊',
      title: 'Phân Tích Kinh Doanh',
      description: 'Thông tin chi tiết toàn diện để cải thiện hiệu quả cuộc họp và kết quả kinh doanh.'
    },
    {
      icon: '🔔',
      title: 'Thông Báo Thông Minh',
      description: 'Không bao giờ bỏ lỡ cập nhật kinh doanh quan trọng với cảnh báo và nhắc nhở thông minh.'
    },
    {
      icon: '📱',
      title: 'Ưu Tiên Di Động',
      description: 'Truy cập cuộc họp kinh doanh từ mọi nơi, trên mọi thiết bị.'
    }
  ];

  pricingPlans = [
    {
      name: 'Khởi Đầu',
      price: 29,
      description: 'Hoàn hảo cho doanh nghiệp nhỏ mới bắt đầu',
      features: [
        'Tối đa 10 thành viên nhóm',
        'Lập lịch cuộc họp cơ bản',
        'Quản lý công việc',
        'Hỗ trợ qua email',
        'Phân tích cơ bản'
      ],
      featured: false
    },
    {
      name: 'Chuyên Nghiệp',
      price: 79,
      description: 'Lý tưởng cho doanh nghiệp đang phát triển',
      features: [
        'Tối đa 50 thành viên nhóm',
        'Lập lịch nâng cao',
        'Quản lý công việc đầy đủ',
        'Hỗ trợ ưu tiên',
        'Phân tích nâng cao',
        'Công cụ hợp tác nhóm',
        'Tích hợp tùy chỉnh'
      ],
      featured: true
    },
    {
      name: 'Doanh Nghiệp',
      price: 199,
      description: 'Cho tổ chức lớn',
      features: [
        'Không giới hạn thành viên nhóm',
        'Lập lịch doanh nghiệp',
        'Quản lý dự án nâng cao',
        'Hỗ trợ qua điện thoại 24/7',
        'Báo cáo tùy chỉnh',
        'Bảo mật nâng cao',
        'Truy cập API',
        'Quản lý tài khoản chuyên dụng'
      ],
      featured: false
    }
  ];

  testimonials = [
    {
      content: 'MeetingPro đã hoàn toàn thay đổi cách nhóm kinh doanh của chúng tôi hợp tác. Việc lập lịch rất liền mạch và theo dõi tiến độ giữ mọi người có trách nhiệm.',
      avatar: '👨‍💼',
      name: 'David Chen',
      role: 'Chủ Doanh Nghiệp',
      company: 'TechCorp'
    },
    {
      content: 'Là một nhóm kinh doanh từ xa, chúng tôi cần một thứ gì đó có thể thu hẹp khoảng cách. MeetingPro đã vượt quá mong đợi với giao diện trực quan.',
      avatar: '👩‍💻',
      name: 'Sarah Johnson',
      role: 'Quản Lý Kinh Doanh',
      company: 'RemoteWorks'
    },
    {
      content: 'Tính năng phân tích một mình đã tiết kiệm cho chúng tôi hàng giờ báo cáo thủ công. Giống như có một trợ lý kinh doanh không bao giờ ngủ.',
      avatar: '👨‍🔬',
      name: 'Michael Rodriguez',
      role: 'Giám Đốc Kinh Doanh',
      company: 'InnovateLab'
    }
  ];

  toggleBilling() {
    // Update pricing when billing cycle changes
    this.pricingPlans.forEach(plan => {
      if (this.isYearlyBilling) {
        plan.price = Math.round(plan.price * 12 * 0.8); // 20% discount for yearly
      } else {
        // Reset to monthly prices
        const monthlyPrices = [29, 79, 199];
        const index = this.pricingPlans.indexOf(plan);
        plan.price = monthlyPrices[index];
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}


