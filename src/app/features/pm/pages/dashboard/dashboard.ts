import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartConfiguration, ChartOptions } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pm-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class PmDashboard {

  // Line chart - Dự Án theo tháng
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan','Feb','Mar','Apr','May'],
    datasets: [
      { data: [2,4,3,5,6], label: 'Dự Án',
        borderColor: '#42A5F5', backgroundColor: 'rgba(66,165,245,0.2)',
        fill: true, tension: 0.3 }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = { responsive: true };

  // Bar chart - Nhân viên theo phòng ban
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['IT','HR','Finance','Marketing'],
    datasets: [
      { data: [12,8,15,10], label: 'Nhân Viên', backgroundColor: '#66BB6A' }
    ]
  };
  barChartOptions: ChartOptions<'bar'> = { responsive: true };

  // Pie chart - Tình trạng các cuộc họp
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Hoàn thành','Đang diễn ra','Trì hoãn'],
    datasets: [
      { data: [10,4,2], backgroundColor: ['#42A5F5','#FFCE56','#FF6384'] }
    ]
  };
  pieChartOptions: ChartOptions<'pie'> = { responsive: true, plugins: { legend: { position: 'right' } } };

  // Doughnut chart - Task cần triển khai
  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Hoàn thành','Đang làm','Chưa bắt đầu'],
    datasets: [
      { data: [30,12,8], backgroundColor: ['#36A2EB','#FFCE56','#FF6384'] }
    ]
  };
  doughnutChartOptions: ChartOptions<'doughnut'> = { responsive: true, cutout: '60%' };

}
