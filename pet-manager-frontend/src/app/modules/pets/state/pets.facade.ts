import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetsService } from '../services/pets.service';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsFacade {
  
  // Estado da Lista de Pets
  private petsSubject = new BehaviorSubject<Pet[]>([]);
  public pets$ = this.petsSubject.asObservable();

  // Controle de Paginação (Total de páginas para saber se esconde o botão "Próximo")
  private totalPagesSubject = new BehaviorSubject<number>(0);
  public totalPages$ = this.totalPagesSubject.asObservable();

  // Página atual (começa na 0)
  public currentPage = 0;
  public currentFilter = '';

  constructor(private petsService: PetsService) {}

  // Carregar Pets (com paginação e filtro)
  loadPets(page: number = 0, nome: string = '') {
    this.currentPage = page;
    this.currentFilter = nome;

    this.petsService.list(page, 10, nome).subscribe({
      next: (response: any) => {
        // A API pode retornar um array direto ou um objeto paginado (content). 
        // Vou assumir o padrão Spring Pageable comum (response.content).
        // Se a API retornar array direto, ajustamos aqui.
        const lista = response.content ? response.content : response;
        const total = response.totalPages ? response.totalPages : 1;
        
        this.petsSubject.next(lista);
        this.totalPagesSubject.next(total);
      },
      error: (erro: any) => console.error('Erro ao carregar pets:', erro)
    });
  }

  addPet(novoPet: Pet) {
    this.petsService.create(novoPet).subscribe({
      next: () => this.loadPets(0, ''), // Recarrega a lista do zero
      error: (err: any) => console.error('Erro ao criar:', err)
    });
  }

  updatePet(pet: Pet) {
    this.petsService.update(pet).subscribe({
      next: () => this.loadPets(this.currentPage, this.currentFilter), // Recarrega a página atual
      error: (err: any) => console.error('Erro ao atualizar:', err)
    });
  }

  uploadPhoto(id: number, file: File) {
    this.petsService.uploadPhoto(id, file).subscribe({
      next: () => this.loadPets(this.currentPage, this.currentFilter), // Atualiza para mostrar a foto nova
      error: (err: any) => console.error('Erro no upload:', err)
    });
  }
}
