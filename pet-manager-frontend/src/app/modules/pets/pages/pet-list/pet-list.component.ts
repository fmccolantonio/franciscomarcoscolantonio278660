import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetsFacade } from '../../state/pets.facade';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-pet-list',
  standalone: false,
  templateUrl: './pet-list.component.html',
  styles: []
})
export class PetListComponent implements OnInit {
  
  petForm: FormGroup;
  isEditing = false; // Para saber se é cadastro ou edição
  selectedFile: File | null = null;
  filtroNome: string = '';

  constructor(
    public facade: PetsFacade,
    private fb: FormBuilder
  ) {
    this.petForm = this.fb.group({
      id: [null], // Campo oculto para o ID
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      idade: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.facade.loadPets(); // Carrega a primeira página
  }

  // Ação de Pesquisar
  onSearch() {
    this.facade.loadPets(0, this.filtroNome);
  }

  // Ação de Paginação
  mudarPagina(direcao: number) {
    const novaPagina = this.facade.currentPage + direcao;
    if (novaPagina >= 0) {
      this.facade.loadPets(novaPagina, this.filtroNome);
    }
  }

  // Prepara o formulário para Edição
  onEdit(pet: Pet) {
    this.isEditing = true;
    this.petForm.patchValue(pet); // Preenche os campos com os dados do pet
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sobe a tela
  }

  // Cancela a edição
  onCancelEdit() {
    this.isEditing = false;
    this.petForm.reset();
    this.selectedFile = null;
  }

  // Captura o arquivo de foto
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Salvar (Criar ou Editar)
  onSubmit() {
    if (this.petForm.valid) {
      const petDados: Pet = this.petForm.value;

      if (this.isEditing && petDados.id) {
        // MODO EDIÇÃO
        this.facade.updatePet(petDados);
        
        // Se tiver foto, faz o upload separado
        if (this.selectedFile) {
          this.facade.uploadPhoto(petDados.id, this.selectedFile);
        }

      } else {
        // MODO CRIAÇÃO
        // Nota: No modo criação, a API geralmente retorna o ID. 
        // O ideal seria criar, pegar o ID e depois enviar a foto.
        // Por simplificação aqui, criamos primeiro. A foto vai no próximo update.
        this.facade.addPet(petDados);
      }

      this.onCancelEdit(); // Limpa tudo
    } else {
      alert('Verifique os campos obrigatórios.');
    }
  }
}
