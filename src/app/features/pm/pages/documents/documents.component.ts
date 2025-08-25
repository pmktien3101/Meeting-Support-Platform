import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmLayoutComponent } from '../../layout/pm-layout.component';

@Component({
  selector: 'app-pm-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documents.html',
  styleUrls: ['./documents.scss']
})
export class PmDocuments {

  documents = [
    {
      id: '1',
      name: 'Project Requirements Specification',
      description: 'Tài liệu mô tả chi tiết yêu cầu của dự án website e-commerce',
      type: 'pdf',
      projectId: '1',
      uploadedBy: 'Nguyễn Văn A',
      uploadDate: '2024-01-10',
      size: '2.5 MB'
    },
    {
      id: '2',
      name: 'UI/UX Design Mockups',
      description: 'Bộ mockup thiết kế giao diện người dùng cho các trang chính',
      type: 'figma',
      projectId: '1',
      uploadedBy: 'Lê Văn C',
      uploadDate: '2024-01-25',
      size: '15.2 MB'
    },
    {
      id: '3',
      name: 'Database Schema Design',
      description: 'Thiết kế cấu trúc cơ sở dữ liệu và ER diagram',
      type: 'drawio',
      projectId: '1',
      uploadedBy: 'Trần Thị B',
      uploadDate: '2024-02-05',
      size: '856 KB'
    },
    {
      id: '4',
      name: 'API Documentation',
      description: 'Tài liệu API endpoints và request/response examples',
      type: 'markdown',
      projectId: '1',
      uploadedBy: 'Trần Thị B',
      uploadDate: '2024-03-15',
      size: '1.8 MB'
    },
    {
      id: '5',
      name: 'Testing Plan & Test Cases',
      description: 'Kế hoạch kiểm thử và các test case chi tiết',
      type: 'excel',
      projectId: '1',
      uploadedBy: 'Phạm Thị D',
      uploadDate: '2024-03-20',
      size: '3.1 MB'
    },
    {
      id: '6',
      name: 'Deployment Guide',
      description: 'Hướng dẫn triển khai và cấu hình môi trường production',
      type: 'markdown',
      projectId: '1',
      uploadedBy: 'Nguyễn Văn A',
      uploadDate: '2024-04-01',
      size: '1.2 MB'
    },
    {
      id: '7',
      name: 'User Manual',
      description: 'Hướng dẫn sử dụng hệ thống cho người dùng cuối',
      type: 'pdf',
      projectId: '1',
      uploadedBy: 'Lê Văn C',
      uploadDate: '2024-04-10',
      size: '4.7 MB'
    },
    {
      id: '8',
      name: 'Project Timeline & Milestones',
      description: 'Lịch trình dự án và các milestone quan trọng',
      type: 'excel',
      projectId: '1',
      uploadedBy: 'Nguyễn Văn A',
      uploadDate: '2024-01-05',
      size: '2.3 MB'
    }
  ];

  projects = [
    { id: '1', name: 'Website E-commerce' },
    { id: '2', name: 'Mobile App' }
  ];

  getDocumentIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'pdf': '📄',
      'figma': '🎨',
      'drawio': '📊',
      'markdown': '📝',
      'excel': '📊',
      'word': '📝',
      'powerpoint': '📊',
      'image': '🖼️',
      'video': '🎥',
      'audio': '🎵',
      'archive': '📦',
      'code': '💻'
    };
    return iconMap[type] || '📄';
  }

  getProjectName(projectId: string): string {
    const project = this.projects.find(p => p.id === projectId);
    return project ? project.name : 'Không xác định';
  }

  downloadDocument(documentId: string): void {
    console.log('Downloading document:', documentId);
    // TODO: Implement document download logic
  }

  shareDocument(documentId: string): void {
    console.log('Sharing document:', documentId);
    // TODO: Implement document sharing logic
  }

  viewDocument(documentId: string): void {
    console.log('Viewing document:', documentId);
    // TODO: Implement document viewing logic
  }

  uploadDocument(): void {
    console.log('Opening upload document modal');
    // TODO: Implement document upload logic
  }

  getProjectsCount(): number {
    return this.projects.length;
  }

  getUploadersCount(): number {
    const uniqueUploaders = new Set(this.documents.map(doc => doc.uploadedBy));
    return uniqueUploaders.size;
  }

  getTotalSize(): string {
    // Simple size calculation - in real app, you'd parse actual file sizes
    const totalMB = this.documents.reduce((total, doc) => {
      const size = doc.size;
      if (size.includes('MB')) {
        return total + parseFloat(size.replace(' MB', ''));
      } else if (size.includes('KB')) {
        return total + (parseFloat(size.replace(' KB', '')) / 1024);
      }
      return total;
    }, 0);
    return `${totalMB.toFixed(1)} MB`;
  }
}
