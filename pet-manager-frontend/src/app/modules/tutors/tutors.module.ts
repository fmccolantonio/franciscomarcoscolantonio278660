import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TutorsRoutingModule } from './tutors-routing.module';
import { TutorListComponent } from './pages/tutor-list/tutor-list.component';

@NgModule({
  declarations: [TutorListComponent],
  imports: [
    CommonModule,
    TutorsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TutorsModule { }
