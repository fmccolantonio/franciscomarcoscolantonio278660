import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PetsRoutingModule } from './pets-routing.module';
import { PetListComponent } from './pages/pet-list/pet-list.component';

@NgModule({
  declarations: [PetListComponent],
  imports: [
    CommonModule,
    PetsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PetsModule { }
