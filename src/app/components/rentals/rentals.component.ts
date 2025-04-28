import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../services/rental.service';


@Component({
  selector: 'app-rentals',
  imports: [CommonModule],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss'
})
export class RentalsComponent implements OnInit {
  rentals: any[] = [];
  errorMessage: string | null = null;

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getRentals()
      .then(rentals => {
        this.rentals = rentals;
      })
      .catch(error => {
        this.errorMessage = error.message || 'Failed to load rentals';
      });
  }

  cancelRental(rentalId: number): void {
    if (confirm('Are you sure you want to cancel this rental?')) {
      this.rentalService.cancelRental(rentalId)
        .then(response => {
          if (response.status === 200) {
            this.loadRentals();
            alert('Rental canceled successfully!');
          } else {
            this.errorMessage = response.message || 'Failed to cancel rental';
          }
        })
        .catch(error => {
          this.errorMessage = error.message || 'An error occurred';
        });
    }
  }

}
