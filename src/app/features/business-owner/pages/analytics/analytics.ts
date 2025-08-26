import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AnalyticsSummary {
  overallProgress: number;
  milestoneByStatus: { status: string; count: number }[];
  workloadByPM: { pm: string; projects: number }[];
  meetingsByWeek: { week: string; count: number }[];
}

declare const Chart: any;

@Component({
  selector: 'app-business-owner-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.scss']
})
export class BusinessOwnerAnalytics implements OnInit {
  isLoading = signal(true);
  summary = signal<AnalyticsSummary | null>(null);

  private renderCharts(): void {
    const s = this.summary();
    if (!s) return;

    const progressCtx = (document.getElementById('overallProgressChart') as HTMLCanvasElement)?.getContext('2d');
    if (progressCtx) {
      new Chart(progressCtx, {
        type: 'doughnut',
        data: {
          labels: ['Hoàn thành', 'Còn lại'],
          datasets: [{
            data: [s.overallProgress, 100 - s.overallProgress],
            backgroundColor: ['#22c55e', '#e5e7eb']
          }]
        },
        options: { plugins: { legend: { position: 'bottom' } } }
      });
    }

    const milestoneCtx = (document.getElementById('milestoneStatusChart') as HTMLCanvasElement)?.getContext('2d');
    if (milestoneCtx) {
      new Chart(milestoneCtx, {
        type: 'bar',
        data: {
          labels: s.milestoneByStatus.map(m => m.status),
          datasets: [{
            label: 'Số lượng',
            data: s.milestoneByStatus.map(m => m.count),
            backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444']
          }]
        },
        options: { scales: { y: { beginAtZero: true } } }
      });
    }

    const workloadCtx = (document.getElementById('workloadByPmChart') as HTMLCanvasElement)?.getContext('2d');
    if (workloadCtx) {
      new Chart(workloadCtx, {
        type: 'bar',
        data: {
          labels: s.workloadByPM.map(w => w.pm),
          datasets: [{
            label: 'Dự án',
            data: s.workloadByPM.map(w => w.projects),
            backgroundColor: '#6366f1'
          }]
        },
        options: { scales: { y: { beginAtZero: true } } }
      });
    }

    const meetingsCtx = (document.getElementById('meetingsByWeekChart') as HTMLCanvasElement)?.getContext('2d');
    if (meetingsCtx) {
      new Chart(meetingsCtx, {
        type: 'line',
        data: {
          labels: s.meetingsByWeek.map(m => m.week),
          datasets: [{
            label: 'Cuộc họp',
            data: s.meetingsByWeek.map(m => m.count),
            fill: false,
            borderColor: '#06b6d4',
            tension: 0.3
          }]
        },
        options: { scales: { y: { beginAtZero: true } } }
      });
    }
  }

  async ngOnInit(): Promise<void> {
    this.isLoading.set(true);
    await new Promise(r => setTimeout(r, 600));
    this.summary.set({
      overallProgress: 62,
      milestoneByStatus: [
        { status: 'Hoàn thành', count: 12 },
        { status: 'Đang làm', count: 9 },
        { status: 'Chờ', count: 5 },
        { status: 'Quá hạn', count: 2 }
      ],
      workloadByPM: [
        { pm: 'Nguyễn Văn A', projects: 3 },
        { pm: 'Trần Thị B', projects: 2 },
        { pm: 'Lê Văn C', projects: 1 }
      ],
      meetingsByWeek: [
        { week: 'Tuần 1', count: 4 },
        { week: 'Tuần 2', count: 6 },
        { week: 'Tuần 3', count: 3 },
        { week: 'Tuần 4', count: 5 }
      ]
    });
    this.isLoading.set(false);
    this.renderCharts();
  }
}


