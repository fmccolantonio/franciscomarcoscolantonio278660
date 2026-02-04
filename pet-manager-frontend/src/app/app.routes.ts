import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { PetListComponent } from './modules/pets/pages/pet-list/pet-list.component';
import { TutorListComponent } from './modules/tutors/pages/tutor-list/tutor-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  { 
    path: 'pets', 
    component: PetListComponent, 
    canActivate: [authGuard] 
  },

  { 
    path: 'tutors', 
    component: TutorListComponent, 
    canActivate: [authGuard] 
  },

  { path: '**', redirectTo: 'login' }
];