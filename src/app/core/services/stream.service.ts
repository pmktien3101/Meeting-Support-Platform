import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

interface StreamRegisterResponse {
  id: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(userId: string, name: string): Observable<StreamRegisterResponse> {
    const payload = {
      id: userId,
      role: 'user',
      name: name,
      image: 'https://i.pravatar.cc/150?u=' + userId
    };
    return this.http.post<StreamRegisterResponse>(`${this.baseUrl}/stream/register`, payload);
  }
}
