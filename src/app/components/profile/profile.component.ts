import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  user: any = {};
  editMode = false;
  selectedFile: File | null = null;
  message: string | null = null;
  error: string | null = null;
  isLoading = false;

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    this.isLoading = true;
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No access token found in localStorage');
        this.error = 'Please sign in to view your profile';
        return;
      }

      console.log('Fetching profile with token:', token.substring(0, 10) + '...');
      const response = await this.http
        .get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .toPromise();

      console.log('Profile response:', response);
      this.user = response || {};
      this.message = null;
      this.error = null;
    } catch (err: any) {
      console.error('Error loading profile:', err);
      this.error = err.error?.message || 'Failed to load profile. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.message = null;
    this.error = null;
    this.selectedFile = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile.name);
    }
  }

  async updateProfile() {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No access token for profile update');
        this.error = 'Please sign in to update your profile';
        return;
      }

      const formData = new FormData();
      formData.append('full_name', this.user.full_name || '');
      formData.append('email', this.user.email || '');
      if (this.user.contact_number) {
        formData.append('contact_number', this.user.contact_number);
      }
      if (this.selectedFile) {
        formData.append('profile_picture', this.selectedFile);
      }

      console.log('Updating profile with data:', {
        full_name: this.user.full_name,
        email: this.user.email,
        contact_number: this.user.contact_number,
        hasFile: !!this.selectedFile
      });

      const response = await this.http
        .put('http://localhost:5000/api/profile', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .toPromise();

      console.log('Update response:', response);
      this.user = (response as any).user || {};
      this.editMode = false;
      this.message = 'Profile updated successfully';
      this.error = null;
      this.selectedFile = null;
    } catch (err: any) {
      console.error('Error updating profile:', err);
      this.error = err.error?.message || 'Failed to update profile';
    }
  }

  async deleteProfilePicture() {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No access token for deleting profile picture');
        this.error = 'Please sign in to delete your profile picture';
        return;
      }

      console.log('Deleting profile picture');
      await this.http
        .delete('http://localhost:5000/api/profile/picture', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .toPromise();

      this.user.profile_picture = null;
      this.user.profile_picture_url = null;
      this.message = 'Profile picture deleted successfully';
      this.error = null;
      console.log('Profile picture deleted');
    } catch (err: any) {
      console.error('Error deleting profile picture:', err);
      this.error = err.error?.message || 'Failed to delete profile picture';
    }
  }
}