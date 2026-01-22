import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorsFacade } from '../../state/tutors.facade';
import { Tutor } from '../../models/tutor.model';

@Component({
  selector: 'app-tutor-list',
  standalone: false,
  templateUrl: './tutor-list.component.html',
  styles: []
})
export class TutorListComponent implements OnInit {
  tutorForm: FormGroup;

  constructor(public facade: TutorsFacade, private fb: FormBuilder) {
    this.tutorForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.facade.loadTutors();
  }

  onSubmit() {
    if (this.tutorForm.valid) {
      this.facade.addTutor(this.tutorForm.value);
      this.tutorForm.reset();
    }
  }
}