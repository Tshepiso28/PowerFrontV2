import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(): void {
    fetch('http://localhost:5000/signout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        localStorage.removeItem('access_token');
        window.location.href = '/signin';
      })
      .catch(error => console.error('Error signing out:', error));
  }
}
