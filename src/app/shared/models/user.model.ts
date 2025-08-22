export interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
    phone: string;
    role: 'admin' | 'own-manager' | 'member' | 'guest';
  }
  