import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { SolarPanelsComponent } from './components/solar-panels/solar-panels.component';
import { OwnedPanelsComponent } from './components/owned-panels/owned-panels.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'solar-panels', component: SolarPanelsComponent, canActivate: [AuthGuard] },
    { path: 'owned-panels', component: OwnedPanelsComponent, canActivate: [AuthGuard] },
    { path: 'rentals', component: RentalsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: '**', redirectTo: '/signin' } 

];
