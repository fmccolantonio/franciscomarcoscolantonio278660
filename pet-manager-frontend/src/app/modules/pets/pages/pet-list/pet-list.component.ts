import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetsFacade } from '../../state/pets.facade';
import { PetRequest } from '../../models/pet.model';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.scss'],
  standalone: false // <--- OBRIGATÓRIO PARA USAR MODULES NO ANGULAR NOVO
})
export class PetListComponent implements OnInit {
  petForm: FormGroup;
  showForm = false;
  isEditing = false;
  selectedFile: File | null = null;
  editingId: number | null = null;

  constructor(
    public facade: PetsFacade,
    private fb: FormBuilder
  ) {
    this.petForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      raca: ['', [Validators.required, Validators.maxLength(100)]],
      idade: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.facade.loadPets();
  }

  onSearch(event: any) {
    const termo = event.target.value;
    this.facade.loadPets(0, 10, termo);
  }

  onNewPet() {
    this.isEditing = false;
    this.editingId = null;
    this.petForm.reset();
    this.showForm = true;
    this.selectedFile = null;
  }

  onEdit(pet: any) {
    this.isEditing = true;
    this.editingId = pet.id;
    this.petForm.patchValue({
      nome: pet.nome,
      raca: pet.raca,
      idade: pet.idade
    });
    this.showForm = true;
    this.selectedFile = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir este pet?')) {
      this.facade.deletePet(id);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files?.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.petForm.valid) {
      const dados: PetRequest = this.petForm.value;

      if (this.isEditing && this.editingId) {
        this.facade.updatePet(this.editingId, dados);
      } else {
        this.facade.createPet(dados, this.selectedFile || undefined);
      }
      this.showForm = false;
      this.petForm.reset();
    }
  }

  onCancel() {
    this.showForm = false;
    this.petForm.reset();
  }
}