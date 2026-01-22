import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rota padrão: redireciona para /pets
  { path: '', redirectTo: 'pets', pathMatch: 'full' },
  
  // Lazy Loading: só baixa o código de Pets quando o usuário clicar
  {
    path: 'pets',
    loadChildren: () => import('./modules/pets/pets.module').then(m => m.PetsModule)
  },
  
  // Lazy Loading de Tutores
  {
    path: 'tutores',
    loadChildren: () => import('./modules/tutors/tutors.module').then(m => m.TutorsModule)
  }
];