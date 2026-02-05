import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './modules/auth/pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  { 
    path: 'pets', 
    loadChildren: () => import('./modules/pets/pets.module').then(m => m.PetsModule),
    canActivate: [authGuard] 
  },

  { 
    path: 'tutors', 
    loadChildren: () => import('./modules/tutors/tutors.module').then(m => m.TutorsModule),
    canActivate: [authGuard] 
  },

  { path: '**', redirectTo: 'login' }
];