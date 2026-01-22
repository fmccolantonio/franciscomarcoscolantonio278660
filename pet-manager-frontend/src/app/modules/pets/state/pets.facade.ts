import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetsService } from '../services/pets.service';
import { Pet } from '../models/pet.models';

@Injectable({
  providedIn: 'root'
})
export class PetsFacade {
  
  private petsSubject = new BehaviorSubject<Pet[]>([]);
  public pets$ = this.petsSubject.asObservable();

  constructor(private petsService: PetsService) {}

  loadPets() {
    this.petsService.list().subscribe({
      // AQUI: Adicionamos o tipo (dados: Pet[]) para corrigir o erro
      next: (dados: Pet[]) => {
        this.petsSubject.next(dados);
      },
      error: (erro: any) => console.error('Erro ao carregar pets:', erro)
    });
  }

  addPet(novoPet: Pet) {
    this.petsService.create(novoPet).subscribe({
      // AQUI: Adicionamos o tipo (petSalvo: Pet)
      next: (petSalvo: Pet) => {
        const listaAtual = this.petsSubject.value;
        this.petsSubject.next([...listaAtual, petSalvo]);
      },
      error: (erro: any) => console.error('Erro ao criar pet:', erro)
    });
  }
}