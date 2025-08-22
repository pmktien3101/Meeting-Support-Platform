import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Register } from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register, FormsModule, RouterLink, CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.registerForm.firstName).toBe('');
    expect(component.registerForm.lastName).toBe('');
    expect(component.registerForm.email).toBe('');
    expect(component.registerForm.phone).toBe('');
    expect(component.registerForm.password).toBe('');
    expect(component.registerForm.confirmPassword).toBe('');
    expect(component.registerForm.agreeTerms).toBe(false);
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);
    component.togglePassword();
    expect(component.showPassword).toBe(true);
    component.togglePassword();
    expect(component.showPassword).toBe(false);
  });

  it('should toggle confirm password visibility', () => {
    expect(component.showConfirmPassword).toBe(false);
    component.toggleConfirmPassword();
    expect(component.showConfirmPassword).toBe(true);
    component.toggleConfirmPassword();
    expect(component.showConfirmPassword).toBe(false);
  });

  it('should validate password strength', () => {
    component.registerForm.password = 'weak';
    expect(component.getPasswordStrengthClass()).toBe('weak');
    expect(component.getPasswordStrengthText()).toBe('Weak password');

    component.registerForm.password = 'Medium123';
    expect(component.getPasswordStrengthClass()).toBe('medium');
    expect(component.getPasswordStrengthText()).toBe('Medium strength');

    component.registerForm.password = 'StrongPass123!';
    expect(component.getPasswordStrengthClass()).toBe('strong');
    expect(component.getPasswordStrengthText()).toBe('Strong password');
  });

  it('should validate form correctly', () => {
    expect(component.isFormValid()).toBe(false);
    
    component.registerForm.firstName = 'John';
    component.registerForm.lastName = 'Doe';
    component.registerForm.email = 'john@example.com';
    component.registerForm.phone = '1234567890';
    component.registerForm.password = 'password123';
    component.registerForm.confirmPassword = 'password123';
    component.registerForm.agreeTerms = true;
    
    expect(component.isFormValid()).toBe(true);
  });

  it('should handle register submission', () => {
    spyOn(console, 'log');
    component.registerForm.firstName = 'John';
    component.registerForm.lastName = 'Doe';
    component.registerForm.email = 'john@example.com';
    component.registerForm.phone = '1234567890';
    component.registerForm.password = 'password123';
    component.registerForm.confirmPassword = 'password123';
    component.registerForm.agreeTerms = true;
    
    component.onRegister();
    
    expect(component.isLoading).toBe(true);
    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith('Register attempt:', component.registerForm);
      expect(component.isLoading).toBe(false);
    }, 2100);
  });
});
