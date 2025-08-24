import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ReportData {
  id: number;
  title: string;
  type: 'project' | 'team' | 'meeting' | 'financial';
  period: string;
  generatedDate: string;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
  size: string;
}

interface AnalyticsData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalMeetings: number;
  totalTeamMembers: number;
  averageProjectDuration: number;
  completionRate: number;
  revenue: number;
  expenses: number;
}

@Component({
  selector: 'app-business-owner-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']
})
export class BusinessOwnerReports implements OnInit {
  // Reports data
  reports = signal<ReportData[]>([]);
  filteredReports = signal<ReportData[]>([]);
  
  // Analytics data
  analytics = signal<AnalyticsData>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalMeetings: 0,
    totalTeamMembers: 0,
    averageProjectDuration: 0,
    completionRate: 0,
    revenue: 0,
    expenses: 0
  });
  
  // UI state
  isLoading = signal(true);
  selectedPeriod = signal('month');
  selectedReportType = signal<'all' | 'project' | 'team' | 'meeting' | 'financial'>('all');
  
  // Chart data (placeholder for future implementation)
  projectProgressData = signal<any[]>([]);
  teamPerformanceData = signal<any[]>([]);
  meetingStatsData = signal<any[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.loadReportsData();
    this.loadAnalyticsData();
  }

  async loadReportsData(): Promise<void> {
    this.isLoading.set(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockReports: ReportData[] = [
      {
        id: 1,
        title: 'Báo Cáo Hiệu Suất Dự Án Q4 2023',
        type: 'project',
        period: 'Q4 2023',
        generatedDate: '2024-01-15',
        status: 'completed',
        downloadUrl: '/reports/q4-2023-project.pdf',
        size: '2.4 MB'
      },
      {
        id: 2,
        title: 'Phân Tích Hiệu Suất Nhóm',
        type: 'team',
        period: 'Tháng 12 2023',
        generatedDate: '2024-01-10',
        status: 'completed',
        downloadUrl: '/reports/team-performance-dec-2023.pdf',
        size: '1.8 MB'
      },
      {
        id: 3,
        title: 'Báo Cáo Hiệu Quả Cuộc Họp',
        type: 'meeting',
        period: 'Tháng 12 2023',
        generatedDate: '2024-01-08',
        status: 'completed',
        downloadUrl: '/reports/meeting-efficiency-dec-2023.pdf',
        size: '1.2 MB'
      },
      {
        id: 4,
        title: 'Hiệu Suất Tài Chính Q4 2023',
        type: 'financial',
        period: 'Q4 2023',
        generatedDate: '2024-01-05',
        status: 'completed',
        downloadUrl: '/reports/financial-q4-2023.pdf',
        size: '3.1 MB'
      },
      {
        id: 5,
        title: 'Trạng Thái Dự Án Tháng 1 2024',
        type: 'project',
        period: 'Tháng 1 2024',
        generatedDate: '2024-01-20',
        status: 'processing',
        size: 'Đang xử lý...'
      }
    ];
    
    this.reports.set(mockReports);
    this.filteredReports.set(mockReports);
    this.isLoading.set(false);
  }

  async loadAnalyticsData(): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockAnalytics: AnalyticsData = {
      totalProjects: 12,
      activeProjects: 8,
      completedProjects: 4,
      totalMeetings: 45,
      totalTeamMembers: 24,
      averageProjectDuration: 45,
      completionRate: 0.33,
      revenue: 125000,
      expenses: 85000
    };
    
    this.analytics.set(mockAnalytics);
  }

  onReportTypeChange(): void {
    const selectedType = this.selectedReportType();
    const allReports = this.reports();
    
    if (selectedType === 'all') {
      this.filteredReports.set(allReports);
    } else {
      const filtered = allReports.filter(report => report.type === selectedType);
      this.filteredReports.set(filtered);
    }
  }

  generateReport(type: 'project' | 'team' | 'meeting' | 'financial'): void {
    console.log(`Generating ${type} report...`);
    // Implementation for report generation would go here
  }

  downloadReport(report: ReportData): void {
    if (report.downloadUrl) {
      console.log(`Downloading report: ${report.title}`);
      // Implementation for download would go here
    }
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'project': '📁',
      'team': '👥',
      'meeting': '📅',
      'financial': '💰'
    };
    return icons[type] || '📊';
  }

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'completed': 'badge-success',
      'processing': 'badge-warning',
      'failed': 'badge-error'
    };
    return classes[status] || 'badge-default';
  }

  formatPercentage(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }
}
