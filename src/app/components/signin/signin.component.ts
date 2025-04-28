import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signinForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      console.log('Submitting form with data:', this.signinForm.value);
      this.authService.signin(this.signinForm.value)
        .then(response => {
          console.log('API response:', response);
          if (response.status === 200 && response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            this.router.navigate(['/solar-panels']);
          } else {
            this.errorMessage = response.message || 'Signin failed';
            console.log('Signin failed with response:', response);
          }
        })
        .catch(error => {
          console.error('API error:', error);
          this.errorMessage = error.message || 'An error occurred';
        });
    }
  }
  
}