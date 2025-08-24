import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [],
  template: `
    <div class="admin-settings">
      <h2>System Settings</h2>
      <p>Configure system-wide settings and preferences.</p>
      
      <div class="settings-grid">
        <div class="setting-card">
          <h3>General Settings</h3>
          <div class="setting-item">
            <label>Site Name</label>
            <input type="text" value="MeetingPro" class="setting-input">
          </div>
          <div class="setting-item">
            <label>Default Language</label>
            <select class="setting-select">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
        
        <div class="setting-card">
          <h3>Security Settings</h3>
          <div class="setting-item">
            <label>Session Timeout (minutes)</label>
            <input type="number" value="30" class="setting-input">
          </div>
          <div class="setting-item">
            <label>Two-Factor Authentication</label>
            <div class="toggle-switch">
              <input type="checkbox" id="2fa" checked>
              <label for="2fa"></label>
            </div>
          </div>
        </div>
        
        <div class="setting-card">
          <h3>Email Settings</h3>
          <div class="setting-item">
            <label>SMTP Server</label>
            <input type="text" value="smtp.gmail.com" class="setting-input">
          </div>
          <div class="setting-item">
            <label>From Email</label>
            <input type="email" value="noreply@meetingpro.com" class="setting-input">
          </div>
        </div>
      </div>
      
      <div class="settings-actions">
        <button class="btn-save">Save Settings</button>
        <button class="btn-reset">Reset to Default</button>
      </div>
    </div>
  `,
  styles: [`
    .admin-settings {
      padding: 2rem;
    }
    
    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .setting-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .setting-item {
      margin-bottom: 1rem;
    }
    
    .setting-item label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .setting-input, .setting-select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    }
    
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .toggle-switch label {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 24px;
    }
    
    .toggle-switch label:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    
    .toggle-switch input:checked + label {
      background-color: #007bff;
    }
    
    .toggle-switch input:checked + label:before {
      transform: translateX(26px);
    }
    
    .settings-actions {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
    }
    
    .btn-save, .btn-reset {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .btn-save {
      background: #007bff;
      color: white;
    }
    
    .btn-reset {
      background: #6c757d;
      color: white;
    }
  `]
})
export class Settings {}


