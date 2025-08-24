export interface User {
  id: number;
  username: string;
  fullname: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'business-owner' | 'pm' | 'member';
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  department?: string;
  position?: string;
  bio?: string;
  timezone?: string;
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}
  