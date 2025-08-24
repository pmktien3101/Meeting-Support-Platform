export interface Task {
  id: number;
  projectId: number;
  meetingId?: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: number;
  assignedBy: number;
  dueDate: Date;
  completedAt?: Date;
  tags: string[];
  attachments: string[];
  comments: TaskComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskComment {
  id: number;
  taskId: number;
  userId: number;
  content: string;
  createdAt: Date;
}

export interface TaskWithAssignee extends Task {
  assigneeName: string;
  assigneeAvatar?: string;
  assignerName: string;
  projectName: string;
  meetingTitle?: string;
}
