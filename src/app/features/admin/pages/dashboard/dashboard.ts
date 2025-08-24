import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard. Here you can manage users, projects, and system settings.</p>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Users</h3>
          <p class="stat-number">1,234</p>
        </div>
        <div class="stat-card">
          <h3>Active Projects</h3>
          <p class="stat-number">56</p>
        </div>
        <div class="stat-card">
          <h3>System Status</h3>
          <p class="stat-status">Healthy</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 2rem;
    }
    
    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #0066cc;
      margin: 0;
    }
    
    .stat-status {
      font-size: 1.5rem;
      font-weight: bold;
      color: #28a745;
      margin: 0;
    }
  `]
})
export class AdminDashboard {}
