import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  /** Load mock users từ file JSON */
  private loadUsers(): Observable<User[]> {
    if (this.users.length > 0) {
      return of(this.users);
    }
    return this.http.get<User[]>('/assets/mock-data/users.json').pipe(
      map(users => {
        this.users = users;
        return users;
      })
    );
  }

  /** Login bằng mock JSON */
  login(credentials: { email: string; password: string }): Observable<User> {
    return new Observable<User>(observer => {
      this.loadUsers().subscribe(users => {
        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          observer.error(new Error('Email hoặc mật khẩu không đúng'));
          return;
        }

        // fake tokens
        const tokens: AuthTokens = {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600
        };

        this.setTokens(tokens);
        this.setCurrentUser(user);

        observer.next(user);
        observer.complete();
      });
    });
  }

  /** Logout user and clear storage */
  logout(): void {
    this.clearAuth();
    this.router.navigate(['/login']);
  }

  /** Refresh access token (fake luôn) */
  refreshToken(): Observable<AuthTokens> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return throwError(() => new Error('No refresh token'));

    const newTokens: AuthTokens = {
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken,
      expiresIn: 3600
    };

    this.setTokens(newTokens);
    return of(newTokens);
  }

  /** Getters */
  getAccessToken(): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('accessToken');
  }
  return null;
}
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
  getUserRole(): string | null {
    return this.getCurrentUser()?.role ?? null;
  }
  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /** Setters */
  public setTokens(tokens: AuthTokens): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('tokenExpiresAt', (Date.now() + tokens.expiresIn * 1000).toString());
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private clearAuth(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiresAt');
    localStorage.removeItem('currentUser');
  }
}
