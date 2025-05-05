import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { SolarPanelsComponent } from './components/solar-panels/solar-panels.component';
import { OwnedPanelsComponent } from './components/owned-panels/owned-panels.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { AuthGuard } from './guards/auth.guard';
import { SplashComponent } from './components/splash/splash.component';
import { ViewItemComponent } from './components/view-item/view-item.component';
import { ProfileComponent } from './components/profile/profile.component';


export const routes: Routes = [
    { path: 'splash', component: SplashComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path:  'solar-panels/:id', component: ViewItemComponent},
    { path: 'solar-panels', component: SolarPanelsComponent, canActivate: [AuthGuard] },
    { path: 'owned-panels', component: OwnedPanelsComponent, canActivate: [AuthGuard] },
    { path: 'rentals', component: RentalsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/splash', pathMatch: 'full' },
    { path: '**', redirectTo: '/splash' } 

];
