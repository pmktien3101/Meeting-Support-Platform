import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class AdminDashboard {
  kpis = signal({
    revenue: 1250000000,
    companies: 1247,
    activeUsers: 15832,
    projects: 3456,
    liveMeetings: 89
  });

  recentRegs = signal([
    { company: 'TechCorp Inc.', contact: 'admin@techcorp.com', date: '15/01/2024', status: 'active' },
    { company: 'DataFlow Ltd.', contact: 'info@dataflow.com', date: '14/01/2024', status: 'pending' },
    { company: 'CloudSync Pro', contact: 'hello@cloudsync.com', date: '13/01/2024', status: 'active' },
    { company: 'InnovateTech', contact: 'contact@innovate.com', date: '12/01/2024', status: 'active' }
  ]);

  bars = signal([
    { label: 'TechCorp', value: 30 },
    { label: 'DataFlow', value: 28 },
    { label: 'CloudSync', value: 26 },
    { label: 'Innovate', value: 24 },
    { label: 'Khác', value: 60 }
  ]);

  linePoints(): string {
    const points = [
      { x: 10, y: 80 },
      { x: 60, y: 60 },
      { x: 110, y: 90 },
      { x: 160, y: 50 },
      { x: 210, y: 35 },
      { x: 260, y: 80 },
      { x: 300, y: 60 }
    ];
    return points.map(p => `${p.x},${p.y}`).join(' ');
  }
}
