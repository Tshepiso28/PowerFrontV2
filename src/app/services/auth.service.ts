import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000';

  async signup(data: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    return { ...json, status: response.status };
  }

  async signin(data: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if (json.access_token) {
      localStorage.setItem('access_token', json.access_token);
    }
    return { ...json, status: response.status };
  }
}
