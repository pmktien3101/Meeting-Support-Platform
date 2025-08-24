import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [],
  template: `
    <div class="admin-projects">
      <h2>Project Management</h2>
      <p>Overview and management of all system projects.</p>
      
      <div class="projects-grid">
        <div class="project-card">
          <h3>E-commerce Platform</h3>
          <p class="project-description">Modern e-commerce solution with advanced features</p>
          <div class="project-meta">
            <span class="status active">Active</span>
            <span class="team-size">8 members</span>
          </div>
          <div class="project-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 75%"></div>
            </div>
            <span class="progress-text">75% Complete</span>
          </div>
        </div>
        
        <div class="project-card">
          <h3>Mobile App</h3>
          <p class="project-description">Cross-platform mobile application</p>
          <div class="project-meta">
            <span class="status planning">Planning</span>
            <span class="team-size">5 members</span>
          </div>
          <div class="project-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 25%"></div>
            </div>
            <span class="progress-text">25% Complete</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-projects {
      padding: 2rem;
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .project-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .project-description {
      color: #666;
      margin: 0.5rem 0 1rem 0;
    }
    
    .project-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .status.active {
      background: #d4edda;
      color: #155724;
    }
    
    .status.planning {
      background: #fff3cd;
      color: #856404;
    }
    
    .team-size {
      color: #666;
      font-size: 0.875rem;
    }
    
    .project-progress {
      margin-top: 1rem;
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
      background: #007bff;
      transition: width 0.3s ease;
    }
    
    .progress-text {
      font-size: 0.875rem;
      color: #666;
    }
  `]
})
export class AdminProjects {}
