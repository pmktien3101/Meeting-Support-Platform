// Main app routes
export { routes } from './app.routes';

// Feature routes
export { ADMIN_ROUTES } from './features/admin/admin.routes';
export { PM_ROUTES } from './features/pm/pm.routes';
export { MEMBER_ROUTES } from './features/member/member.routes';

// Route constants for easy access
export const ROUTES = {
  // Public routes
  PUBLIC: {
    LANDING: '/public/landing',
    CONTACT: '/public/contact',
  },
  
  // Auth routes
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp',
  },
  
  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    PROJECTS: '/admin/projects',
    SETTINGS: '/admin/settings',
  },
  
  // PM routes
  PM: {
    DASHBOARD: '/pm/dashboard',
    PROJECTS: '/pm/projects',
    TEAM: '/pm/team',
    REPORTS: '/pm/reports',
  },
  
  // Member routes
  MEMBER: {
    DASHBOARD: '/member/dashboard',
    TASKS: '/member/tasks',
    PROFILE: '/member/profile',
  }
};

// Route guards configuration
export const ROUTE_GUARDS = {
  ADMIN_ONLY: ['admin'],
  PM_AND_ADMIN: ['pm', 'admin'],
  ALL_ROLES: ['member', 'pm', 'admin']
} as const;

