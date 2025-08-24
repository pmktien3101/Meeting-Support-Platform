import { Component } from '@angular/core';

@Component({
  selector: 'app-member-tasks',
  standalone: true,
  imports: [],
  template: `
    <div class="member-tasks">
      <h2>My Tasks</h2>
      <p>Manage and track your assigned tasks.</p>
      
      <div class="tasks-grid">
        <div class="task-card">
          <div class="task-header">
            <h3>Design Homepage Layout</h3>
            <span class="priority high">High</span>
          </div>
          <p class="task-description">Create responsive design for the main homepage with modern UI elements</p>
          <div class="task-meta">
            <span class="project">E-commerce Platform</span>
            <span class="due-date">Due: Tomorrow</span>
          </div>
          <div class="task-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 60%"></div>
            </div>
            <span class="progress-text">60% Complete</span>
          </div>
          <div class="task-actions">
            <button class="btn-update">Update Progress</button>
            <button class="btn-complete">Mark Complete</button>
          </div>
        </div>
        
        <div class="task-card">
          <div class="task-header">
            <h3>Implement User Authentication</h3>
            <span class="priority medium">Medium</span>
          </div>
          <p class="task-description">Set up login and registration system with JWT tokens</p>
          <div class="task-meta">
            <span class="project">Mobile App</span>
            <span class="due-date">Due: Friday</span>
          </div>
          <div class="task-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 30%"></div>
            </div>
            <span class="progress-text">30% Complete</span>
          </div>
          <div class="task-actions">
            <button class="btn-update">Update Progress</button>
            <button class="btn-complete">Mark Complete</button>
          </div>
        </div>
        
        <div class="task-card">
          <div class="task-header">
            <h3>Write API Documentation</h3>
            <span class="priority low">Low</span>
          </div>
          <p class="task-description">Create comprehensive API documentation for the backend services</p>
          <div class="task-meta">
            <span class="project">E-commerce Platform</span>
            <span class="due-date">Due: Next Week</span>
          </div>
          <div class="task-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 10%"></div>
            </div>
            <span class="progress-text">10% Complete</span>
          </div>
          <div class="task-actions">
            <button class="btn-update">Update Progress</button>
            <button class="btn-complete">Mark Complete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .member-tasks {
      padding: 2rem;
    }
    
    .tasks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .task-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .task-header h3 {
      margin: 0;
      color: #333;
    }
    
    .priority {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .priority.high {
      background: #f8d7da;
      color: #721c24;
    }
    
    .priority.medium {
      background: #fff3cd;
      color: #856404;
    }
    
    .priority.low {
      background: #d1ecf1;
      color: #0c5460;
    }
    
    .task-description {
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    
    .task-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }
    
    .project {
      color: #0066cc;
      font-weight: 500;
    }
    
    .due-date {
      color: #666;
    }
    
    .task-progress {
      margin-bottom: 1rem;
    }
    
    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }
    
    .progress-fill {
      height: 100%;
      background: #28a745;
      transition: width 0.3s ease;
    }
    
    .progress-text {
      font-size: 0.875rem;
      color: #666;
    }
    
    .task-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .btn-update, .btn-complete {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .btn-update {
      background: #007bff;
      color: white;
    }
    
    .btn-complete {
      background: #28a745;
      color: white;
    }
  `]
})
export class Tasks {}


