import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // <--- Adicionado FormsModule
import { TutorsRoutingModule } from './tutors-routing.module';
import { TutorListComponent } from './pages/tutor-list/tutor-list.component';

@NgModule({
  declarations: [TutorListComponent],
  imports: [
    CommonModule,
    TutorsRoutingModule,
    ReactiveFormsModule,
    FormsModule // <--- Importante para o input de vínculo funcionar
  ]
})
export class TutorsModule { }
