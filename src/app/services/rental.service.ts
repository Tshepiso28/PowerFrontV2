import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private apiUrl = 'http://localhost:5000';

  async rentSolarPanel(panelId: number): Promise<any> {
    const response = await fetch(`${this.apiUrl}/rentals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ solar_panel_id: panelId })
    });
    return response.json();
  }

  async getRentals(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/rentals`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    if (response.status === 200) {
      return response.json();
    }
    throw new Error((await response.json()).message);
  }

  async cancelRental(rentalId: number): Promise<any> {
    const response = await fetch(`${this.apiUrl}/rentals/${rentalId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return response.json();
  }
}
