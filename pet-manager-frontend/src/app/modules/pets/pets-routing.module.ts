import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetListComponent } from './pages/pet-list/pet-list.component';

const routes: Routes = [
  // Quando chegar em /pets, mostra a lista
  { path: '', component: PetListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
