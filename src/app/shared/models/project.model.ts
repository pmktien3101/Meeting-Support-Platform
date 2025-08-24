export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  startDate: Date;
  endDate?: Date;
  businessOwnerId: number;
  projectManagerId: number;
  members: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: number;
  projectId: number;
  name: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  progress: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectWithMilestones extends Project {
  milestones: Milestone[];
  progress: number;
  totalTasks: number;
  completedTasks: number;
}
