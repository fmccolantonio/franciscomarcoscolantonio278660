import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorsFacade } from '../../state/tutors.facade';
import { TutorRequest } from '../../models/tutor.model';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.scss'],
  standalone: false // <--- SOLUÇÃO DO PROBLEMA
})
export class TutorListComponent implements OnInit {
  tutorForm: FormGroup;
  showForm = false;
  isEditing = false;
  editingId: number | null = null;
  selectedTutorId: number | null = null;

  constructor(
    public facade: TutorsFacade,
    private fb: FormBuilder
  ) {
    this.tutorForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.facade.loadTutors();
  }

  onNewTutor() {
    this.isEditing = false;
    this.editingId = null;
    this.tutorForm.reset();
    this.showForm = true;
  }

  onEdit(tutor: any) {
    this.isEditing = true;
    this.editingId = tutor.id;
    this.tutorForm.patchValue(tutor);
    this.showForm = true;
  }

  onSubmit() {
    if (this.tutorForm.valid) {
      const formValue = this.tutorForm.value;
      const payload: TutorRequest = {
        ...formValue,
        cpf: Number(formValue.cpf.toString().replace(/\D/g, ''))
      };

      if (this.isEditing && this.editingId) {
        this.facade.updateTutor(this.editingId, payload);
      } else {
        this.facade.createTutor(payload);
      }
      this.showForm = false;
      this.tutorForm.reset();
    }
  }

  onDelete(id: number) {
    if(confirm('Excluir tutor?')) {
      this.facade.deleteTutor(id);
    }
  }

  onUnlinkPet(tutorId: number, petId: number) {
    if(confirm('Desvincular pet?')) {
      this.facade.unlinkPet(tutorId, petId);
    }
  }

  openLinkModal(tutorId: number) {
    this.selectedTutorId = tutorId;
    const petIdStr = prompt("Digite o ID do Pet para vincular:");
    if (petIdStr) {
      this.facade.linkPet(tutorId, Number(petIdStr));
    }
  }

  onCancel() {
    this.showForm = false;
  }
}