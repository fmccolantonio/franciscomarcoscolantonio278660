import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Rota de Login (Pública)
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  
  // Rotas Protegidas (Precisam de Login)
  {
    path: 'pets',
    loadChildren: () => import('./modules/pets/pets.module').then(m => m.PetsModule),
    canActivate: [authGuard] // <--- O Guardião está aqui
  },
  {
    path: 'tutores',
    loadChildren: () => import('./modules/tutors/tutors.module').then(m => m.TutorsModule),
    canActivate: [authGuard]
  },

  // Redirecionamentos
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
