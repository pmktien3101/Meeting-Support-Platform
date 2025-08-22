import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Landing } from './landing';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing, RouterLink, CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have features data', () => {
    expect(component.features.length).toBe(4);
    expect(component.features[0].title).toBe('Smart Meeting Management');
  });

  it('should have testimonials data', () => {
    expect(component.testimonials.length).toBe(3);
    expect(component.testimonials[0].name).toBe('Sarah Johnson');
  });

  it('should have stats data', () => {
    expect(component.stats.length).toBe(4);
    expect(component.stats[0].number).toBe('10K+');
  });

  it('should scroll to section when called', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    document.body.appendChild(mockElement);
    
    spyOn(mockElement, 'scrollIntoView');
    component.scrollToSection('test-section');
    
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    
    document.body.removeChild(mockElement);
  });
});
