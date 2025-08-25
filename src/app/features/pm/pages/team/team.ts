import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

@Component({
  selector: 'app-pm-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrls: ['./team.scss']
})
export class Team {

  teamMembers = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      role: 'Project Manager',
      email: 'an.nguyen@company.com',
      avatar: '👨‍💼',
      status: 'active',
      projects: 5,
      completedTasks: 127,
      joinDate: '2023-01-15',
      skills: ['Leadership', 'Agile', 'Risk Management'],
      performance: 95
    },
    {
      id: '2',
      name: 'Trần Thị Bình',
      role: 'Frontend Developer',
      email: 'binh.tran@company.com',
      avatar: '👩‍💻',
      status: 'active',
      projects: 3,
      completedTasks: 89,
      joinDate: '2023-03-20',
      skills: ['React', 'TypeScript', 'UI/UX'],
      performance: 88
    },
    {
      id: '3',
      name: 'Lê Văn Cường',
      role: 'Backend Developer',
      email: 'cuong.le@company.com',
      avatar: '👨‍💻',
      status: 'busy',
      projects: 4,
      completedTasks: 156,
      joinDate: '2022-11-10',
      skills: ['Node.js', 'Python', 'Database'],
      performance: 92
    },
    {
      id: '4',
      name: 'Phạm Thị Dung',
      role: 'UI/UX Designer',
      email: 'dung.pham@company.com',
      avatar: '👩‍🎨',
      status: 'active',
      projects: 6,
      completedTasks: 78,
      joinDate: '2023-02-05',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      performance: 90
    },
    {
      id: '5',
      name: 'Hoàng Văn Em',
      role: 'QA Engineer',
      email: 'em.hoang@company.com',
      avatar: '👨‍🔬',
      status: 'active',
      projects: 4,
      completedTasks: 203,
      joinDate: '2022-09-15',
      skills: ['Testing', 'Automation', 'CI/CD'],
      performance: 87
    },
    {
      id: '6',
      name: 'Vũ Thị Phương',
      role: 'DevOps Engineer',
      email: 'phuong.vu@company.com',
      avatar: '👩‍💻',
      status: 'busy',
      projects: 7,
      completedTasks: 134,
      joinDate: '2022-07-20',
      skills: ['Docker', 'Kubernetes', 'AWS'],
      performance: 94
    }
  ];

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'Hoạt động',
      'busy': 'Bận',
      'away': 'Vắng mặt',
      'offline': 'Ngoại tuyến'
    };
    return statusMap[status] || status;
  }

  getRoleText(role: string): string {
    const roleMap: { [key: string]: string } = {
      'Project Manager': 'Quản lý dự án',
      'Frontend Developer': 'Lập trình viên Frontend',
      'Backend Developer': 'Lập trình viên Backend',
      'UI/UX Designer': 'Thiết kế UI/UX',
      'QA Engineer': 'Kỹ sư QA',
      'DevOps Engineer': 'Kỹ sư DevOps'
    };
    return roleMap[role] || role;
  }

  openInviteMember(): void {
    // TODO: Implement invite member functionality
    console.log('Open invite member modal');
  }

  getActiveMembersCount(): number {
    return this.teamMembers.filter(member => member.status === 'active').length;
  }

  getBusyMembersCount(): number {
    return this.teamMembers.filter(member => member.status === 'busy').length;
  }

  getAveragePerformance(): number {
    const total = this.teamMembers.reduce((sum, member) => sum + member.performance, 0);
    return Math.round(total / this.teamMembers.length);
  }

  getTotalProjects(): number {
    return this.teamMembers.reduce((sum, member) => sum + member.projects, 0);
  }

  getMainRolesCount(): number {
    const uniqueRoles = new Set(this.teamMembers.map(member => member.role));
    return uniqueRoles.size;
  }
}


