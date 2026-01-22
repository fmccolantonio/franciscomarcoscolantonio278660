import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TutorsRoutingModule } from './tutors-routing.module';
import { TutorListComponent } from './pages/tutor-list/tutor-list.component';

@NgModule({
  declarations: [TutorListComponent],
  imports: [
   CommonModule,
    TutorsRoutingModule,
    ReactiveFormsModule
  ]
})
export class TutorsModule { }