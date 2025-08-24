import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  role: 'member' | 'project-manager' | 'business-owner';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  avatar: string;
  projectsCount: number;
  performance: number;
}



@Component({
  selector: 'app-business-owner-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team.html',
  styleUrls: ['./team.scss']
})
export class BusinessOwnerTeam implements OnInit {
  // Team data
  teamMembers = signal<TeamMember[]>([]);
  filteredMembers = signal<TeamMember[]>([]);
  
  // UI state
  isLoading = signal(true);
  
  // Filters
  searchTerm = signal('');
  roleFilter = signal<'all' | 'member' | 'project-manager'>('all');
  statusFilter = signal<'all' | 'active' | 'inactive' | 'pending'>('all');

  constructor() {}

  ngOnInit(): void {
    this.loadTeamData();
  }

  async loadTeamData(): Promise<void> {
    this.isLoading.set(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockTeamMembers: TeamMember[] = [
      {
        id: 1,
        name: 'Nguyễn Văn An',
        email: 'nguyen.van.an@company.com',
        phone: '+84 (555) 123-4567',
        position: 'Lập Trình Viên Cao Cấp',
        role: 'project-manager',
        status: 'active',
        joinDate: '2023-01-15',
        lastActive: '2024-01-20',
        avatar: 'NVA',
        projectsCount: 3,
        performance: 92
      },
      {
        id: 2,
        name: 'Trần Thị Bình',
        email: 'tran.thi.binh@company.com',
        phone: '+84 (555) 234-5678',
        position: 'Thiết Kế UI/UX',
        role: 'member',
        status: 'active',
        joinDate: '2023-03-20',
        lastActive: '2024-01-19',
        avatar: 'TTB',
        projectsCount: 2,
        performance: 88
      },
      {
        id: 3,
        name: 'Lê Văn Cường',
        email: 'le.van.cuong@company.com',
        phone: '+84 (555) 345-6789',
        position: 'Quản Lý Sản Phẩm',
        role: 'project-manager',
        status: 'active',
        joinDate: '2022-11-10',
        lastActive: '2024-01-21',
        avatar: 'LVC',
        projectsCount: 4,
        performance: 95
      },
      {
        id: 4,
        name: 'Phạm Thị Dung',
        email: 'pham.thi.dung@company.com',
        phone: '+84 (555) 456-7890',
        position: 'Chuyên Gia Marketing',
        role: 'member',
        status: 'active',
        joinDate: '2023-06-15',
        lastActive: '2024-01-18',
        avatar: 'PTD',
        projectsCount: 1,
        performance: 85
      }
    ];
    
    this.teamMembers.set(mockTeamMembers);
    this.filteredMembers.set(mockTeamMembers);
    this.isLoading.set(false);
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onRoleFilterChange(): void {
    this.applyFilters();
  }

  onStatusFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.teamMembers();
    const search = this.searchTerm().toLowerCase();
    const role = this.roleFilter();
    const status = this.statusFilter();

    if (search) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(search) ||
        member.email.toLowerCase().includes(search) ||
        member.position.toLowerCase().includes(search)
      );
    }

    if (role !== 'all') {
      filtered = filtered.filter(member => member.role === role);
    }

    if (status !== 'all') {
      filtered = filtered.filter(member => member.status === status);
    }

    this.filteredMembers.set(filtered);
  }



  getRoleBadgeClass(role: string): string {
    const classes: { [key: string]: string } = {
      'member': 'badge-member',
      'project-manager': 'badge-pm',
      'business-owner': 'badge-owner'
    };
    return classes[role] || 'badge-default';
  }

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'active': 'badge-active',
      'inactive': 'badge-inactive',
      'pending': 'badge-pending'
    };
    return classes[status] || 'badge-default';
  }

  getPerformanceColor(performance: number): string {
    if (performance >= 90) return 'text-success';
    if (performance >= 80) return 'text-warning';
    return 'text-danger';
  }
}
