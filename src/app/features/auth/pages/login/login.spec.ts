import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, FormsModule, RouterLink, CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.loginForm.email).toBe('');
    expect(component.loginForm.password).toBe('');
    expect(component.loginForm.rememberMe).toBe(false);
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);
    component.togglePassword();
    expect(component.showPassword).toBe(true);
    component.togglePassword();
    expect(component.showPassword).toBe(false);
  });

  it('should handle login submission', () => {
    spyOn(console, 'log');
    component.loginForm.email = 'test@example.com';
    component.loginForm.password = 'password123';
    
    component.onLogin();
    
    expect(component.isLoading).toBe(true);
    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith('Login attempt:', component.loginForm);
      expect(component.isLoading).toBe(false);
    }, 2100);
  });
});
