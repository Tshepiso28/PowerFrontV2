import { Component } from '@angular/core';
import { SolarPanelService } from '../../services/solar-panel.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.scss'
})
export class ViewItemComponent {

  panelId: string | null = null;
  solarPanel: any = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solarPanelService: SolarPanelService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.panelId = params.get('id');
      
      if (!this.panelId || isNaN(+this.panelId)) {
        this.handleInvalidId();
        return;
      }
      
      this.loadSolarPanel();
    });
  }

  private async loadSolarPanel(): Promise<void> {
    try {
      if (!this.panelId) return;
      
      this.solarPanel = await this.solarPanelService.getSolarPanelById(+this.panelId);
      this.error = null;
    } catch (error: any) {
      this.error = error.message || 'Failed to load Power Source details';
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private handleInvalidId(): void {
    this.error = 'Invalid panel ID';
    this.isLoading = false;
    setTimeout(() => this.router.navigate(['/solar-panels']), 2000);
  }
  

  navigateBack(): void {
    this.router.navigate(['/solar-panels']);
  }

}
