import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolarPanelService } from '../../services/solar-panel.service';

@Component({
  selector: 'app-owned-panels',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './owned-panels.component.html',
  styleUrl: './owned-panels.component.scss'
})
export class OwnedPanelsComponent implements OnInit {
  panels: any[] = [];
  errorMessage: string | null = null;
  addPanelForm: FormGroup;
  editPanelForm: FormGroup;
  editingPanelId: number | null = null;

  constructor(private solarPanelService: SolarPanelService, private fb: FormBuilder) {
    this.addPanelForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      rental_price_per_day: ['', [Validators.required, Validators.min(0.01)]],
      product_type: ['', Validators.required],
      serial_number: ['', Validators.required],
      location: ['']
    });

    this.editPanelForm = this.fb.group({
      name: [''],
      description: [''],
      rental_price_per_day: ['', Validators.min(0.01)],
      is_available: [true],
      product_type: [''],
      serial_number: [''],
      location: ['']
    });
  }

  ngOnInit(): void {
    this.loadPanels();
  }

  loadPanels(): void {
    this.solarPanelService.getOwnedPanels()
      .then(panels => {
        this.panels = panels;
      })
      .catch(error => {
        this.errorMessage = error.message || 'Failed to load owned panels';
      });
  }

  onAddPanel(): void {
    if (this.addPanelForm.valid) {
      this.solarPanelService.addSolarPanel(this.addPanelForm.value)
        .then(response => {
          if (response.status === 201) {
            this.loadPanels();
            this.addPanelForm.reset();
            alert('Solar panel added successfully!');
          } else {
            this.errorMessage = response.message || 'Failed to add solar panel';
          }
        })
        .catch(error => {
          this.errorMessage = error.message || 'An error occurred';
        });
    }
  }

  startEdit(panel: any): void {
    this.editingPanelId = panel.id;
    this.editPanelForm.patchValue(panel);
  }

  onEditPanel(): void {
    if (this.editPanelForm.valid && this.editingPanelId) {
      this.solarPanelService.updateSolarPanel(this.editingPanelId, this.editPanelForm.value)
        .then(response => {
          if (response.status === 200) {
            this.loadPanels();
            this.editingPanelId = null;
            this.editPanelForm.reset();
            alert('Solar panel updated successfully!');
          } else {
            this.errorMessage = response.message || 'Failed to update solar panel';
          }
        })
        .catch(error => {
          this.errorMessage = error.message || 'An error occurred';
        });
    }
  }

  deletePanel(panelId: number): void {
    if (confirm('Are you sure you want to delete this panel?')) {
      this.solarPanelService.deleteSolarPanel(panelId)
        .then(response => {
          if (response.status === 200) {
            this.loadPanels();
            alert('Solar panel deleted successfully!');
          } else {
            this.errorMessage = response.message || 'Failed to delete solar panel';
          }
        })
        .catch(error => {
          this.errorMessage = error.message || 'An error occurred';
        });
    }
  }

}
