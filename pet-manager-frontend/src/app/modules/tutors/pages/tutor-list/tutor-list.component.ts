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
  isEditing = false;
  
  // Controle de Vínculo
  tutorSelecionadoParaVinculo: number | null = null;
  petIdParaVincular: number | null = null;

  constructor(public facade: TutorsFacade, private fb: FormBuilder) {
    this.tutorForm = this.fb.group({
      id: [null],
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
      const tutor = this.tutorForm.value;
      if (this.isEditing && tutor.id) {
        this.facade.updateTutor(tutor);
      } else {
        this.facade.addTutor(tutor);
      }
      this.cancelEdit();
    }
  }

  onEdit(tutor: Tutor) {
    this.isEditing = true;
    this.tutorForm.patchValue(tutor);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.isEditing = false;
    this.tutorForm.reset();
  }

  // Funções de Vínculo
  abrirVinculo(tutorId: number) {
    this.tutorSelecionadoParaVinculo = 
      this.tutorSelecionadoParaVinculo === tutorId ? null : tutorId;
  }

  vincularPet(tutorId: number) {
    if (this.petIdParaVincular) {
      this.facade.vincularPet(tutorId, this.petIdParaVincular);
      this.petIdParaVincular = null;
    }
  }

  removerPet(tutorId: number, petId: number) {
    if(confirm('Desvincular este pet?')) {
      this.facade.desvincularPet(tutorId, petId);
    }
  }
}
