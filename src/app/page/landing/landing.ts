import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  features = [
    {
      icon: '🎯',
      title: 'Smart Meeting Management',
      description: 'Organize and manage your meetings efficiently with our intelligent scheduling system.'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Get insights into meeting productivity and team collaboration metrics.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security and privacy controls.'
    },
    {
      icon: '🚀',
      title: 'Lightning Fast',
      description: 'Built for speed with modern technology stack for seamless user experience.'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'TechCorp',
      content: 'This platform has revolutionized how we conduct meetings. The collaboration features are incredible!',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'Team Lead',
      company: 'InnovateLab',
      content: 'The analytics and reporting tools have given us valuable insights into our team productivity.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'CEO',
      company: 'StartupXYZ',
      content: 'Simple, powerful, and exactly what our growing team needed. Highly recommended!',
      avatar: '👩‍💼'
    }
  ];

  stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Meetings Hosted' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
