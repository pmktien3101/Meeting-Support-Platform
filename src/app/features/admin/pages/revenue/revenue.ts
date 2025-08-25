import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface RevenueEntry {
  date: string; // dd/MM
  amount: number; // VND
}

@Component({
  selector: 'app-admin-revenue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './revenue.html',
  styleUrls: ['./revenue.scss']
})
export class AdminRevenue {
  total = signal(1250000000);
  monthly = signal(215000000);
  growth = signal(6.2); // %

  byCompany = signal([
    { label: 'TechCorp', value: 32 },
    { label: 'DataFlow', value: 24 },
    { label: 'CloudSync', value: 18 },
    { label: 'Innovate', value: 12 },
    { label: 'Khác', value: 14 }
  ]);

  last7Days = signal<RevenueEntry[]>([
    { date: 'T2', amount: 28 },
    { date: 'T3', amount: 35 },
    { date: 'T4', amount: 24 },
    { date: 'T5', amount: 38 },
    { date: 'T6', amount: 42 },
    { date: 'T7', amount: 30 },
    { date: 'CN', amount: 36 }
  ]);

  linePoints(): string {
    const width = 600;
    const height = 160;
    const step = width / (this.last7Days().length - 1);
    return this.last7Days()
      .map((d, i) => `${i * step},${height - d.amount * 3}`)
      .join(' ');
  }

  // Companies & plans
  planFilter = signal<string>('');
  searchTerm = signal<string>('');
  companies = signal(
    [
      { name: 'TechCorp Inc.', plan: 'Enterprise', seats: 120, price: 3000000, status: 'Đang hoạt động', renewal: '15/03/2024' },
      { name: 'DataFlow Ltd.', plan: 'Pro', seats: 60, price: 1800000, status: 'Đang hoạt động', renewal: '22/03/2024' },
      { name: 'CloudSync Pro', plan: 'Pro', seats: 45, price: 1500000, status: 'Đang hoạt động', renewal: '08/03/2024' },
      { name: 'InnovateTech', plan: 'Basic', seats: 15, price: 600000, status: 'Sắp hết hạn', renewal: '02/03/2024' },
      { name: 'FinVision', plan: 'Enterprise', seats: 200, price: 5000000, status: 'Đang hoạt động', renewal: '28/03/2024' },
      { name: 'EduNext', plan: 'Basic', seats: 25, price: 800000, status: 'Đang hoạt động', renewal: '11/03/2024' }
    ] as Array<{ name: string; plan: string; seats: number; price: number; status: string; renewal: string }>
  );

  filteredCompanies() {
    const term = this.searchTerm().toLowerCase();
    const plan = this.planFilter();
    return this.companies().filter(c =>
      (!term || c.name.toLowerCase().includes(term)) &&
      (!plan || c.plan === plan)
    );
  }
  totalMRR(): number {
    return this.filteredCompanies().reduce((s, c) => s + c.price, 0);
  }
}


