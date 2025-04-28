import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolarPanelService {

  private apiUrl = 'http://localhost:5000';

  async getSolarPanels(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/solar-panels`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    if (response.status === 200) {
      return response.json();
    }
    throw new Error((await response.json()).message);
  }

  async getOwnedPanels(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/solar-panels/owned`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    if (response.status === 200) {
      return response.json();
    }
    throw new Error((await response.json()).message);
  }

  async addSolarPanel(data: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/solar-panels`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async updateSolarPanel(panelId: number, data: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/solar-panels/${panelId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async deleteSolarPanel(panelId: number): Promise<any> {
    const response = await fetch(`${this.apiUrl}/solar-panels/${panelId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return response.json();
  }
}
