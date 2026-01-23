import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // <--- Adicionamos FormsModule
import { PetsRoutingModule } from './pets-routing.module';
import { PetListComponent } from './pages/pet-list/pet-list.component';

@NgModule({
  declarations: [PetListComponent],
  imports: [
    CommonModule,
    PetsRoutingModule,
    ReactiveFormsModule,
    FormsModule // <--- Importante para o [(ngModel)] funcionar
  ]
})
export class PetsModule { }
