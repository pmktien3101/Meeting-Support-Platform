import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './team.html',
  styleUrls: ['./team.scss']
})
export class BusinessOwnerTeam implements OnInit, OnDestroy {
  // Team data
  teamMembers = signal<TeamMember[]>([]);
  filteredMembers = signal<TeamMember[]>([]);
  
  // UI state
  isLoading = signal(true);
  showCreateMenu = signal(false);
  showCreateModal = signal(false);
  showEditModal = signal(false);
  showAddMemberModal = signal<boolean>(false);
  showEditMemberModal = signal<boolean>(false);
  isSaving = signal(false);
  isSubmitting = signal(false);
  isEditing = signal(false);
  selectedMember = signal<TeamMember | null>(null);
  
  // Flag to prevent modal from showing on initial load
  private _isInitialized = false;
  
  get isInitialized(): boolean {
    return this._isInitialized;
  }
  
  // Form state for create/edit
  formId = signal<number | undefined>(undefined);
  formName = signal('');
  formEmail = signal('');
  formPhone = signal('');
  formPosition = signal('');
  formRoles = signal<Array<'member'|'project-manager'>>(['member']);
  formStatus = signal<'active'|'inactive'|'pending'>('active');
  
  // Add member form
  addMemberForm!: FormGroup;
  selectedRoles = { member: false, pm: false };
  
  // Edit member form
  editMemberForm!: FormGroup;
  editSelectedRoles = { member: false, pm: false };
  
  // Filters
  searchTerm = signal('');
  roleFilter = signal<'all' | 'member' | 'project-manager'>('all');
  statusFilter = signal<'all' | 'active' | 'inactive' | 'pending'>('all');

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    // Monitor modal state changes
    effect(() => {
      console.log('Modal state changed to:', this.showAddMemberModal());
    });
    
    // Ensure modal is closed on construction
    this.showAddMemberModal.set(false);
    this._isInitialized = false;
  }

  ngOnInit(): void {
    console.log('Team component initialized, showAddMemberModal:', this.showAddMemberModal());
    
    // Immediately close modal to prevent it from showing on load
    this.showAddMemberModal.set(false);
    this._isInitialized = false;
    
    this.resetAllModalStates();
    this.initAddMemberForm();
    this.initEditMemberForm();
    this.loadTeamData();
    
    // Add keyboard event listener for Escape key only in browser
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    
    // Double-check modal is closed after initialization
    setTimeout(() => {
      this.showAddMemberModal.set(false);
      this._isInitialized = true;
      console.log('Modal state after timeout:', this.showAddMemberModal());
    }, 100);
  }

  resetAllModalStates(): void {
    this.showCreateMenu.set(false);
    this.showCreateModal.set(false);
    this.showEditModal.set(false);
    this.showAddMemberModal.set(false);
    this.showEditMemberModal.set(false);
    this.isSaving.set(false);
    this.isSubmitting.set(false);
    this.isEditing.set(false);
    console.log('All modal states reset, showAddMemberModal:', this.showAddMemberModal());
  }

  initAddMemberForm(): void {
    this.addMemberForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      position: [''],
      department: [''],
      notes: ['']
    });
    
    // Reset roles
    this.selectedRoles = { member: true, pm: false };
    
    // Ensure modal is closed when form is initialized
    this.showAddMemberModal.set(false);
    console.log('Form initialized, showAddMemberModal set to:', this.showAddMemberModal());
  }

  initEditMemberForm(): void {
    this.editMemberForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      position: [''],
      status: ['active'],
      department: [''],
      notes: ['']
    });
    
    // Reset roles
    this.editSelectedRoles = { member: false, pm: false };
    
    // Ensure modal is closed when form is initialized
    this.showEditMemberModal.set(false);
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

  toggleCreateMenu(): void {
    this.showCreateMenu.set(!this.showCreateMenu());
  }

  async createPersonnel(role: 'member' | 'project-manager'): Promise<void> {
    this.showCreateMenu.set(false);
    // Navigate to register page with role as query param
    await this.router.navigate(['/auth/register'], { queryParams: { role } });
  }

  // Modal helpers
  openCreate(): void {
    this.formId.set(undefined);
    this.formName.set('');
    this.formEmail.set('');
    this.formPhone.set('');
    this.formPosition.set('');
    this.formRoles.set(['member']);
    this.formStatus.set('active');
    this.selectedMember.set(null);
    this.showCreateModal.set(true);
  }

  openAddMemberModal(): void {
    console.log('Opening add member modal');
    this.addMemberForm.reset();
    this.selectedRoles = { member: true, pm: false };
    this.showAddMemberModal.set(true);
    console.log('showAddMemberModal set to:', this.showAddMemberModal());
  }

  openEditMemberModal(member: TeamMember): void {
    console.log('Opening edit member modal for:', member);
    this.selectedMember.set(member);
    
    // Set form values
    this.editMemberForm.patchValue({
      fullName: member.name,
      email: member.email,
      phone: member.phone,
      position: member.position,
      status: member.status,
      department: '',
      notes: ''
    });
    
    // Set roles
    this.editSelectedRoles = {
      member: member.role === 'member',
      pm: member.role === 'project-manager'
    };
    
    this.showEditMemberModal.set(true);
    console.log('showEditMemberModal set to:', this.showEditMemberModal());
  }



  // Method to check if modal should be shown
  shouldShowModal(): boolean {
    return this.showAddMemberModal() && this.isInitialized;
  }

  shouldShowEditModal(): boolean {
    return this.showEditMemberModal() && this.isInitialized;
  }

  onRoleChange(role: 'member' | 'pm', event: any): void {
    const checked = event.target.checked;
    if (role === 'member') {
      this.selectedRoles.member = checked;
    } else if (role === 'pm') {
      this.selectedRoles.pm = checked;
    }
    console.log('Role changed:', role, checked, this.selectedRoles);
  }

  onEditRoleChange(role: 'member' | 'pm', event: any): void {
    const checked = event.target.checked;
    if (role === 'member') {
      this.editSelectedRoles.member = checked;
    } else if (role === 'pm') {
      this.editSelectedRoles.pm = checked;
    }
    console.log('Edit role changed:', role, checked, this.editSelectedRoles);
  }

  closeAddMemberModal(): void {
    console.log('Closing add member modal');
    this.showAddMemberModal.set(false);
    this.isSubmitting.set(false);
    console.log('showAddMemberModal set to:', this.showAddMemberModal());
  }

  closeEditMemberModal(): void {
    console.log('Closing edit member modal');
    this.showEditMemberModal.set(false);
    this.isEditing.set(false);
    this.selectedMember.set(null);
    console.log('showEditMemberModal set to:', this.showEditMemberModal());
  }

  // Method to force close modal in emergency
  forceCloseModal(): void {
    console.log('Force closing modal');
    this.showAddMemberModal.set(false);
    this.isSubmitting.set(false);
    this.isSaving.set(false);
    console.log('Modal force closed, state:', this.showAddMemberModal());
  }

  forceCloseEditModal(): void {
    console.log('Force closing edit modal');
    this.showEditMemberModal.set(false);
    this.isEditing.set(false);
    this.selectedMember.set(null);
    console.log('Edit modal force closed, state:', this.showEditMemberModal());
  }

  async onSubmitAddMember(): Promise<void> {
    if (this.addMemberForm.invalid || (!this.selectedRoles.member && !this.selectedRoles.pm)) {
      return;
    }

    this.isSubmitting.set(true);
    
    try {
      const formValue = this.addMemberForm.value;
      const primaryRole: 'member' | 'project-manager' = this.selectedRoles.pm ? 'project-manager' : 'member';
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const current = this.teamMembers();
      const nextId = current.length ? Math.max(...current.map(m => m.id)) + 1 : 1;
      
      const newMember: TeamMember = {
        id: nextId,
        name: formValue.fullName,
        email: formValue.email,
        phone: formValue.phone || '',
        position: formValue.position || '',
        role: primaryRole,
        status: 'active',
        joinDate: new Date().toISOString().slice(0, 10),
        lastActive: new Date().toISOString().slice(0, 10),
        avatar: this.generateInitials(formValue.fullName),
        projectsCount: 0,
        performance: 0
      };
      
      const updated = [newMember, ...current];
      this.teamMembers.set(updated);
      this.applyFilters();
      this.closeAddMemberModal();
      
      // Reset form
      this.addMemberForm.reset();
      this.selectedRoles = { member: true, pm: false };
      
    } catch (error) {
      console.error('Error adding member:', error);
      // Handle error - could show toast notification
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async onSubmitEditMember(): Promise<void> {
    if (this.editMemberForm.invalid || (!this.editSelectedRoles.member && !this.editSelectedRoles.pm) || !this.selectedMember()) {
      return;
    }

    this.isEditing.set(true);
    
    try {
      const formValue = this.editMemberForm.value;
      const primaryRole: 'member' | 'project-manager' = this.editSelectedRoles.pm ? 'project-manager' : 'member';
      const memberId = this.selectedMember()!.id;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updated = this.teamMembers().map(member => {
        if (member.id === memberId) {
          return {
            ...member,
            name: formValue.fullName,
            email: formValue.email,
            phone: formValue.phone || '',
            position: formValue.position || '',
            role: primaryRole,
            status: formValue.status,
            avatar: this.generateInitials(formValue.fullName),
            lastActive: new Date().toISOString().slice(0, 10)
          };
        }
        return member;
      });
      
      this.teamMembers.set(updated);
      this.applyFilters();
      this.closeEditMemberModal();
      
      // Reset form
      this.editMemberForm.reset();
      this.editSelectedRoles = { member: false, pm: false };
      
    } catch (error) {
      console.error('Error updating member:', error);
      // Handle error - could show toast notification
    } finally {
      this.isEditing.set(false);
    }
  }

  openEdit(member: TeamMember): void {
    const roles: Array<'member'|'project-manager'> = member.role === 'project-manager' ? ['project-manager'] : ['member'];
    this.formId.set(member.id);
    this.formName.set(member.name);
    this.formEmail.set(member.email);
    this.formPhone.set(member.phone);
    this.formPosition.set(member.position);
    this.formRoles.set(roles);
    this.formStatus.set(member.status);
    this.selectedMember.set(member);
    this.showEditModal.set(true);
  }

  closeModals(): void {
    this.showCreateModal.set(false);
    this.showEditModal.set(false);
    this.isSaving.set(false);
  }

  async saveCreate(): Promise<void> {
    this.isSaving.set(true);
    await new Promise(r => setTimeout(r, 500));
    const current = this.teamMembers();
    const nextId = current.length ? Math.max(...current.map(m => m.id)) + 1 : 1;
    const roles = this.formRoles();
    const primaryRole: 'member' | 'project-manager' = roles.includes('project-manager') ? 'project-manager' : 'member';
    const newMember: TeamMember = {
      id: nextId,
      name: this.formName(),
      email: this.formEmail(),
      phone: this.formPhone(),
      position: this.formPosition(),
      role: primaryRole,
      status: this.formStatus(),
      joinDate: new Date().toISOString().slice(0,10),
      lastActive: new Date().toISOString().slice(0,10),
      avatar: this.generateInitials(this.formName()),
      projectsCount: 0,
      performance: 0
    };
    const updated = [newMember, ...current];
    this.teamMembers.set(updated);
    this.applyFilters();
    this.closeModals();
  }

  async saveEdit(): Promise<void> {
    if (!this.selectedMember()) return;
    this.isSaving.set(true);
    await new Promise(r => setTimeout(r, 500));
    const roles = this.formRoles();
    const primaryRole: 'member' | 'project-manager' = roles.includes('project-manager') ? 'project-manager' : 'member';
    const updated = this.teamMembers().map(m => {
      if (m.id !== this.formId()) return m;
      return {
        ...m,
        name: this.formName(),
        email: this.formEmail(),
        phone: this.formPhone(),
        position: this.formPosition(),
        role: primaryRole,
        status: this.formStatus(),
        avatar: this.generateInitials(this.formName())
      };
    });
    this.teamMembers.set(updated);
    this.applyFilters();
    this.closeModals();
  }

  onRoleToggle(role: 'member' | 'project-manager', checked: boolean): void {
    const current = this.formRoles();
    let next = current;
    if (checked) {
      if (!current.includes(role)) {
        next = [...current, role];
      }
    } else {
      next = current.filter(r => r !== role);
    }
    if (next.length === 0) {
      next = ['member'];
    }
    this.formRoles.set(next);
  }

  private generateInitials(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase() || '').join('');
  }

  ngOnDestroy(): void {
    // Ensure modal is closed when component is destroyed
    this.showAddMemberModal.set(false);
    this.showEditMemberModal.set(false);
    this._isInitialized = false;
    console.log('Component destroyed, modal closed');
    
    // Remove event listener only in browser
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.showAddMemberModal()) {
        this.closeAddMemberModal();
      }
      if (this.showEditMemberModal()) {
        this.closeEditMemberModal();
      }
    }
  }
}
