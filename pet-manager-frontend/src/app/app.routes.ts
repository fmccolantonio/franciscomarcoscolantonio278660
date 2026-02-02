import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Rota padrão: Se o endereço estiver vazio, redireciona para login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Lazy Loading do Módulo de Auth (Login)
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },

  // Lazy Loading do Módulo de Pets (Protegido pelo Guard)
  {
    path: 'pets',
    loadChildren: () => import('./modules/pets/pets.module').then(m => m.PetsModule),
    canActivate: [authGuard]
  },

  // Lazy Loading do Módulo de Tutores (Protegido pelo Guard)
  {
    path: 'tutores',
    loadChildren: () => import('./modules/tutors/tutors.module').then(m => m.TutorsModule),
    canActivate: [authGuard]
  }
];