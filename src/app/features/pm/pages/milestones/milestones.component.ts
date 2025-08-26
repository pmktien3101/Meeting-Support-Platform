import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  manager: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  progress: number;
  members: ProjectMember[];
}

@Component({
  selector: 'app-pm-milestones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './milestones.html',
  styleUrls: ['./milestones.scss']
})
export class PmMilestones implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projectId: string | null = null;
  currentProject: Project | null = null;
  isProjectSpecific = false;

  // Available team members for adding to projects
  availableMembers: ProjectMember[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@company.com',
      role: 'Frontend Developer',
      avatar: 'NA'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@company.com',
      role: 'Backend Developer',
      avatar: 'TB'
    },
    {
      id: '3',
      name: 'Lê Văn C',
      email: 'levanc@company.com',
      role: 'UI/UX Designer',
      avatar: 'LC'
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      email: 'phamthid@company.com',
      role: 'QA Engineer',
      avatar: 'PD'
    },
    {
      id: '5',
      name: 'Hoàng Văn E',
      email: 'hoangvane@company.com',
      role: 'DevOps Engineer',
      avatar: 'HE'
    },
    {
      id: '6',
      name: 'Vũ Thị F',
      email: 'vuthif@company.com',
      role: 'Business Analyst',
      avatar: 'VF'
    }
  ];

  // Mock data for projects with members
  projects: Project[] = [
    {
      id: '1',
      name: 'Website E-commerce',
      description: 'Phát triển website bán hàng trực tuyến với đầy đủ tính năng',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      manager: 'PM001',
      status: 'active',
      progress: 65,
      members: [
        {
          id: '1',
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@company.com',
          role: 'Frontend Developer',
          avatar: 'NA'
        },
        {
          id: '2',
          name: 'Trần Thị B',
          email: 'tranthib@company.com',
          role: 'Backend Developer',
          avatar: 'TB'
        },
        {
          id: '3',
          name: 'Lê Văn C',
          email: 'levanc@company.com',
          role: 'UI/UX Designer',
          avatar: 'LC'
        }
      ]
    },
    {
      id: '2',
      name: 'Mobile App',
      description: 'Ứng dụng di động đa nền tảng cho khách hàng',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      manager: 'PM002',
      status: 'planning',
      progress: 15,
      members: [
        {
          id: '1',
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@company.com',
          role: 'Frontend Developer',
          avatar: 'NA'
        },
        {
          id: '4',
          name: 'Phạm Thị D',
          email: 'phamthid@company.com',
          role: 'QA Engineer',
          avatar: 'PD'
        }
      ]
    },
    {
      id: '3',
      name: 'CRM System',
      description: 'Hệ thống quản lý quan hệ khách hàng tích hợp',
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      manager: 'PM003',
      status: 'active',
      progress: 45,
      members: [
        {
          id: '2',
          name: 'Trần Thị B',
          email: 'tranthib@company.com',
          role: 'Backend Developer',
          avatar: 'TB'
        },
        {
          id: '5',
          name: 'Hoàng Văn E',
          email: 'hoangvane@company.com',
          role: 'DevOps Engineer',
          avatar: 'HE'
        },
        {
          id: '6',
          name: 'Vũ Thị F',
          email: 'vuthif@company.com',
          role: 'Business Analyst',
          avatar: 'VF'
        }
      ]
    }
  ];

  // Mock data for milestones by project
  projectMilestones: { [key: string]: any[] } = {
    '1': [
      {
        id: '1',
        name: 'Thiết Kế UI/UX',
        description: 'Thiết kế giao diện người dùng và trải nghiệm người dùng',
        startDate: '2024-01-01',
        endDate: '2024-02-15',
        status: 'completed',
        progress: 100,
        projectId: '1'
      },
      {
        id: '2',
        name: 'Phát Triển Frontend',
        description: 'Xây dựng giao diện người dùng với React/Angular',
        startDate: '2024-02-16',
        endDate: '2024-04-30',
        status: 'in-progress',
        progress: 75,
        projectId: '1'
      },
      {
        id: '3',
        name: 'Phát Triển Backend',
        description: 'Xây dựng hệ thống backend và API',
        startDate: '2024-03-01',
        endDate: '2024-05-31',
        status: 'in-progress',
        progress: 60,
        projectId: '1'
      },
      {
        id: '4',
        name: 'Testing & QA',
        description: 'Kiểm thử và đảm bảo chất lượng',
        startDate: '2024-05-01',
        endDate: '2024-06-15',
        status: 'pending',
        progress: 0,
        projectId: '1'
      }
    ],
    '2': [
      {
        id: '5',
        name: 'Thiết Kế App',
        description: 'Thiết kế giao diện ứng dụng di động',
        startDate: '2024-03-01',
        endDate: '2024-04-15',
        status: 'in-progress',
        progress: 30,
        projectId: '2'
      },
      {
        id: '6',
        name: 'Phát Triển iOS',
        description: 'Xây dựng phiên bản iOS',
        startDate: '2024-04-16',
        endDate: '2024-06-30',
        status: 'pending',
        progress: 0,
        projectId: '2'
      },
      {
        id: '7',
        name: 'Phát Triển Android',
        description: 'Xây dựng phiên bản Android',
        startDate: '2024-04-16',
        endDate: '2024-06-30',
        status: 'pending',
        progress: 0,
        projectId: '2'
      }
    ],
    '3': [
      {
        id: '8',
        name: 'Phân Tích Yêu Cầu',
        description: 'Phân tích và thu thập yêu cầu từ khách hàng',
        startDate: '2024-02-01',
        endDate: '2024-03-15',
        status: 'completed',
        progress: 100,
        projectId: '3'
      },
      {
        id: '9',
        name: 'Thiết Kế Hệ Thống',
        description: 'Thiết kế kiến trúc hệ thống CRM',
        startDate: '2024-03-16',
        endDate: '2024-04-30',
        status: 'in-progress',
        progress: 80,
        projectId: '3'
      },
      {
        id: '10',
        name: 'Phát Triển Module',
        description: 'Phát triển các module chính của CRM',
        startDate: '2024-05-01',
        endDate: '2024-07-31',
        status: 'pending',
        progress: 0,
        projectId: '3'
      }
    ]
  };

  // All milestones for overview page
  allMilestones = [
    {
      id: '1',
      name: 'Thiết Kế UI/UX',
      description: 'Thiết kế giao diện người dùng và trải nghiệm người dùng',
      startDate: '2024-01-01',
      endDate: '2024-02-15',
      status: 'completed',
      progress: 100,
      projectId: '1',
      projectName: 'Website E-commerce'
    },
    {
      id: '2',
      name: 'Phát Triển Frontend',
      description: 'Xây dựng giao diện người dùng với React/Angular',
      startDate: '2024-02-16',
      endDate: '2024-04-30',
      status: 'in-progress',
      progress: 75,
      projectId: '1',
      projectName: 'Website E-commerce'
    },
    {
      id: '3',
      name: 'Phát Triển Backend',
      description: 'Xây dựng hệ thống backend và API',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      status: 'in-progress',
      progress: 60,
      projectId: '1',
      projectName: 'Website E-commerce'
    },
    {
      id: '4',
      name: 'Testing & QA',
      description: 'Kiểm thử và đảm bảo chất lượng',
      startDate: '2024-05-01',
      endDate: '2024-06-15',
      status: 'pending',
      progress: 0,
      projectId: '1',
      projectName: 'Website E-commerce'
    },
    {
      id: '5',
      name: 'Thiết Kế App',
      description: 'Thiết kế giao diện ứng dụng di động',
      startDate: '2024-03-01',
      endDate: '2024-04-15',
      status: 'in-progress',
      progress: 30,
      projectId: '2',
      projectName: 'Mobile App'
    },
    {
      id: '6',
      name: 'Phát Triển iOS',
      description: 'Xây dựng phiên bản iOS',
      startDate: '2024-04-16',
      endDate: '2024-06-30',
      status: 'pending',
      progress: 0,
      projectId: '2',
      projectName: 'Mobile App'
    },
    {
      id: '7',
      name: 'Phát Triển Android',
      description: 'Xây dựng phiên bản Android',
      startDate: '2024-04-16',
      endDate: '2024-06-30',
      status: 'pending',
      progress: 0,
      projectId: '2',
      projectName: 'Mobile App'
    },
    {
      id: '8',
      name: 'Phân Tích Yêu Cầu',
      description: 'Phân tích và thu thập yêu cầu từ khách hàng',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      status: 'completed',
      progress: 100,
      projectId: '3',
      projectName: 'CRM System'
    },
    {
      id: '9',
      name: 'Thiết Kế Hệ Thống',
      description: 'Thiết kế kiến trúc hệ thống CRM',
      startDate: '2024-03-16',
      endDate: '2024-04-30',
      status: 'in-progress',
      progress: 80,
      projectId: '3',
      projectName: 'CRM System'
    },
    {
      id: '10',
      name: 'Phát Triển Module',
      description: 'Phát triển các module chính của CRM',
      startDate: '2024-05-01',
      endDate: '2024-07-31',
      status: 'pending',
      progress: 0,
      projectId: '3',
      projectName: 'CRM System'
    }
  ];

  milestones: any[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'] || null;
      this.isProjectSpecific = !!this.projectId;
      
      if (this.projectId) {
        this.currentProject = this.projects.find(p => p.id === this.projectId) || null;
        this.milestones = this.projectMilestones[this.projectId] || [];
      } else {
        this.milestones = this.allMilestones;
      }
    });
  }

  // Member management methods
  getAvailableMembersForProject(project: Project): ProjectMember[] {
    const projectMemberIds = project.members.map(m => m.id);
    return this.availableMembers.filter(member => !projectMemberIds.includes(member.id));
  }

  addMemberToProject(project: Project, member: ProjectMember) {
    if (!project.members.find(m => m.id === member.id)) {
      project.members.push(member);
      console.log(`Added ${member.name} to project ${project.name}`);
    }
  }

  onMemberSelect(project: Project, event: any) {
    const memberId = event.target.value;
    if (memberId) {
      const member = this.availableMembers.find(m => m.id === memberId);
      if (member) {
        this.addMemberToProject(project, member);
        // Reset select to default option
        event.target.value = '';
      }
    }
  }

  removeMemberFromProject(project: Project, memberId: string) {
    const index = project.members.findIndex(m => m.id === memberId);
    if (index > -1) {
      const removedMember = project.members.splice(index, 1)[0];
      console.log(`Removed ${removedMember.name} from project ${project.name}`);
    }
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Chờ thực hiện',
      'in-progress': 'Đang thực hiện',
      'completed': 'Hoàn thành',
      'delayed': 'Bị trễ'
    };
    return statusMap[status] || status;
  }

  openCreateMilestone(): void {
    console.log('Opening create milestone modal...');
    // TODO: Implement create milestone modal
  }

  getInProgressCount(): number {
    return this.milestones.filter(m => m.status === 'in-progress').length;
  }

  getCompletedCount(): number {
    return this.milestones.filter(m => m.status === 'completed').length;
  }

  getAverageProgress(): number {
    const totalProgress = this.milestones.reduce((sum, m) => sum + m.progress, 0);
    return Math.round(totalProgress / this.milestones.length);
  }

  backToProjects(): void {
    this.router.navigate(['/pm/projects']);
  }
}
