import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SolarPanelService } from '../../services/solar-panel.service';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-solar-panels',
  imports: [CommonModule],
  templateUrl: './solar-panels.component.html',
  styleUrl: './solar-panels.component.scss'
})
export class SolarPanelsComponent implements OnInit {
  panels: any[] = [];
  errorMessage: string | null = null;

  constructor(private solarPanelService: SolarPanelService, private rentalService: RentalService) {}

  ngOnInit(): void {
    this.loadPanels();
  }

  loadPanels(): void {
    this.solarPanelService.getSolarPanels()
      .then(panels => {
        this.panels = panels;
      })
      .catch(error => {
        this.errorMessage = error.message || 'Failed to load solar panels';
      });
  }

  rentPanel(panelId: number): void {
    this.rentalService.rentSolarPanel(panelId)
      .then(response => {
        if (response.status === 201) {
          this.loadPanels();
          alert('Solar panel rented successfully!');
        } else {
          this.errorMessage = response.message || 'Failed to rent solar panel';
        }
      })
      .catch(error => {
        this.errorMessage = error.message || 'An error occurred';
      });
  }

}
