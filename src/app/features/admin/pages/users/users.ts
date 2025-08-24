import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [],
  template: `
    <div class="admin-users">
      <h2>User Management</h2>
      <p>Manage system users, roles, and permissions.</p>
      
      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Admin</td>
              <td><span class="status active">Active</span></td>
              <td>
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>jane@example.com</td>
              <td>PM</td>
              <td><span class="status active">Active</span></td>
              <td>
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .admin-users {
      padding: 2rem;
    }
    
    .users-table {
      margin-top: 2rem;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    th {
      background: #f8f9fa;
      font-weight: 600;
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
    
    .btn-edit, .btn-delete {
      padding: 0.5rem 1rem;
      margin: 0 0.25rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn-edit {
      background: #007bff;
      color: white;
    }
    
    .btn-delete {
      background: #dc3545;
      color: white;
    }
  `]
})
export class Users {}


