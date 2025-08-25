import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Business {
  id: string;
  name: string;
  email: string;
  industry: string;
  status: 'active' | 'pending' | 'inactive' | 'rejected';
  userCount: number;
  maxUsers: number;
  projectCount: number;
  maxProjects: number;
  storageUsed: string;
  maxStorage: string;
  createdAt: Date;
  ownerEmail: string;
  ownerName: string;
  registrationDate: Date;
  rejectionReason?: string;
}

interface BusinessStats {
  activeBusinesses: number;
  pendingApprovals: number;
  inactiveBusinesses: number;
  rejectedBusinesses: number;
  totalUsers: number;
  totalBusinessUsers: number;
  averageUsersPerBusiness: number;
  topBusinessByUsers: string;
  maxUsersInBusiness: number;
}

@Component({
  selector: 'app-business-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './business.html',
  styleUrls: ['./business.scss']
})
export class BusinessManagement implements OnInit {
  // Data
  businesses = signal<Business[]>([]);
  filteredBusinesses = signal<Business[]>([]);
  stats = signal<BusinessStats>({
    activeBusinesses: 0,
    pendingApprovals: 0,
    inactiveBusinesses: 0,
    rejectedBusinesses: 0,
    totalUsers: 0,
    totalBusinessUsers: 0,
    averageUsersPerBusiness: 0,
    topBusinessByUsers: '',
    maxUsersInBusiness: 0
  });

  // UI State
  searchTerm = signal('');
  statusFilter = signal('');
  sortBy = signal('registrationDate');
  currentPage = signal(1);
  itemsPerPage = 10;
  totalPages = signal(1);

  // Approval Modal
  showApprovalModal = signal(false);
  selectedBusiness = signal<Business | null>(null);
  approvalAction = signal<'approve' | 'reject'>('approve');
  rejectionReason = signal('');

  constructor() {}

  ngOnInit(): void {
    this.loadBusinesses();
    this.loadStats();
  }

  // Data Loading
  loadBusinesses(): void {
    // Mock data - replace with actual API call
    const mockBusinesses: Business[] = [
      {
        id: '1',
        name: 'TechCorp Solutions',
        email: 'contact@techcorp.com',
        industry: 'technology',
        status: 'active',
        userCount: 25,
        maxUsers: 50,
        projectCount: 8,
        maxProjects: 10,
        storageUsed: '2.5 GB',
        maxStorage: '10 GB',
        createdAt: new Date('2024-01-15'),
        ownerEmail: 'ceo@techcorp.com',
        ownerName: 'John Smith',
        registrationDate: new Date('2024-01-10')
      },
      {
        id: '2',
        name: 'FinanceHub Ltd',
        email: 'info@financehub.com',
        industry: 'finance',
        status: 'pending',
        userCount: 0,
        maxUsers: 20,
        projectCount: 0,
        maxProjects: 5,
        storageUsed: '0 GB',
        maxStorage: '5 GB',
        createdAt: new Date('2024-02-01'),
        ownerEmail: 'admin@financehub.com',
        ownerName: 'Sarah Johnson',
        registrationDate: new Date('2024-02-01')
      },
      {
        id: '3',
        name: 'HealthCare Plus',
        email: 'support@healthcareplus.com',
        industry: 'healthcare',
        status: 'active',
        userCount: 15,
        maxUsers: 30,
        projectCount: 3,
        maxProjects: 8,
        storageUsed: '1.8 GB',
        maxStorage: '15 GB',
        createdAt: new Date('2024-01-20'),
        ownerEmail: 'director@healthcareplus.com',
        ownerName: 'Dr. Michael Brown',
        registrationDate: new Date('2024-01-18')
      },
      {
        id: '4',
        name: 'EduTech Innovations',
        email: 'hello@edutech.com',
        industry: 'education',
        status: 'rejected',
        userCount: 0,
        maxUsers: 25,
        projectCount: 0,
        maxProjects: 6,
        storageUsed: '0 GB',
        maxStorage: '8 GB',
        createdAt: new Date('2024-01-10'),
        ownerEmail: 'founder@edutech.com',
        ownerName: 'Lisa Chen',
        registrationDate: new Date('2024-01-08'),
        rejectionReason: 'Thông tin doanh nghiệp không đầy đủ'
      },
      {
        id: '5',
        name: 'Manufacturing Pro',
        email: 'contact@manufacturingpro.com',
        industry: 'manufacturing',
        status: 'active',
        userCount: 40,
        maxUsers: 100,
        projectCount: 12,
        maxProjects: 20,
        storageUsed: '8.2 GB',
        maxStorage: '50 GB',
        createdAt: new Date('2024-01-05'),
        ownerEmail: 'manager@manufacturingpro.com',
        ownerName: 'Robert Wilson',
        registrationDate: new Date('2024-01-03')
      },
      {
        id: '6',
        name: 'StartupXYZ',
        email: 'hello@startupxyz.com',
        industry: 'technology',
        status: 'pending',
        userCount: 0,
        maxUsers: 15,
        projectCount: 0,
        maxProjects: 3,
        storageUsed: '0 GB',
        maxStorage: '5 GB',
        createdAt: new Date('2024-02-15'),
        ownerEmail: 'founder@startupxyz.com',
        ownerName: 'Alex Nguyen',
        registrationDate: new Date('2024-02-15')
      }
    ];

    this.businesses.set(mockBusinesses);
    this.applyFilters();
  }

  loadStats(): void {
    const businesses = this.businesses();
    const totalBusinessUsers = businesses.reduce((sum, b) => sum + b.userCount, 0);
    const activeBusinesses = businesses.filter(b => b.status === 'active');
    const averageUsersPerBusiness = activeBusinesses.length > 0 ? 
      Math.round(totalBusinessUsers / activeBusinesses.length) : 0;
    
    // Tìm business có nhiều user nhất
    const topBusiness = businesses.reduce((max, current) => 
      current.userCount > max.userCount ? current : max, businesses[0]);
    
    const stats: BusinessStats = {
      activeBusinesses: businesses.filter(b => b.status === 'active').length,
      pendingApprovals: businesses.filter(b => b.status === 'pending').length,
      inactiveBusinesses: businesses.filter(b => b.status === 'inactive').length,
      rejectedBusinesses: businesses.filter(b => b.status === 'rejected').length,
      totalUsers: totalBusinessUsers,
      totalBusinessUsers: totalBusinessUsers,
      averageUsersPerBusiness: averageUsersPerBusiness,
      topBusinessByUsers: topBusiness?.name || '',
      maxUsersInBusiness: topBusiness?.userCount || 0
    };
    this.stats.set(stats);
  }

  // Filtering and Sorting
  applyFilters(): void {
    let filtered = [...this.businesses()];

    // Search filter
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(term) ||
        business.email.toLowerCase().includes(term) ||
        business.industry.toLowerCase().includes(term) ||
        business.ownerName.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (this.statusFilter()) {
      filtered = filtered.filter(business => business.status === this.statusFilter());
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (this.sortBy()) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'registrationDate':
          return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
        case 'userCount':
          return b.userCount - a.userCount;
        default:
          return 0;
      }
    });

    // Pagination
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.totalPages.set(Math.ceil(filtered.length / this.itemsPerPage));
    
    this.filteredBusinesses.set(filtered.slice(startIndex, endIndex));
  }

  onSearch(): void {
    this.currentPage.set(1);
    this.applyFilters();
  }

  onFilterChange(): void {
    this.currentPage.set(1);
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  // Pagination
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.applyFilters();
    }
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(total);
      }
    }

    return pages;
  }

  // Approval Modal Management
  openApprovalModal(business: Business, action: 'approve' | 'reject'): void {
    this.selectedBusiness.set(business);
    this.approvalAction.set(action);
    this.rejectionReason.set('');
    this.showApprovalModal.set(true);
  }

  closeApprovalModal(): void {
    this.showApprovalModal.set(false);
    this.selectedBusiness.set(null);
    this.rejectionReason.set('');
  }

  // Business Operations
  approveBusiness(): void {
    const business = this.selectedBusiness();
    if (business) {
      this.businesses.update(businesses =>
        businesses.map(b =>
          b.id === business.id ? { ...b, status: 'active' } : b
        )
      );
      
      this.loadStats();
      this.applyFilters();
      this.closeApprovalModal();
    }
  }

  rejectBusiness(): void {
    const business = this.selectedBusiness();
    if (business && this.rejectionReason().trim()) {
      this.businesses.update(businesses =>
        businesses.map(b =>
          b.id === business.id ? { 
            ...b, 
            status: 'rejected',
            rejectionReason: this.rejectionReason()
          } : b
        )
      );
      
      this.loadStats();
      this.applyFilters();
      this.closeApprovalModal();
    }
  }

  viewBusiness(business: Business): void {
    console.log('View business:', business);
    // Implement view business details
  }

  editBusiness(business: Business): void {
    console.log('Edit business:', business);
    // Implement edit business functionality
  }

  manageQuota(business: Business): void {
    console.log('Manage quota for:', business);
    // Implement quota management
  }

  toggleBusinessStatus(business: Business): void {
    const newStatus = business.status === 'active' ? 'inactive' : 'active';
    
    this.businesses.update(businesses =>
      businesses.map(b =>
        b.id === business.id ? { ...b, status: newStatus } : b
      )
    );
    
    this.loadStats();
    this.applyFilters();
  }

  // Utility Methods
  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'pending':
        return 'Chờ phê duyệt';
      case 'inactive':
        return 'Đã khóa';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'inactive':
        return 'status-inactive';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  }
}
