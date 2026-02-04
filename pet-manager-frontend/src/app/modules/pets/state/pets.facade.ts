import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { PetsService } from '../services/pets.service';
import { Pet, PetRequest } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsFacade {
  private _pets = new BehaviorSubject<Pet[]>([]);
  pets$ = this._pets.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  constructor(private petsService: PetsService) {}

  loadPets(page: number = 0, size: number = 10, nome?: string) {
    this._loading.next(true);
    
    this.petsService.list(page, size, nome)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (response) => {
      
          const lista = (response as any).content || response; 
          this._pets.next(lista);
        },
        error: (err) => {
          console.error('Erro ao carregar pets:', err);
          this._pets.next([]);
        }
      });
  }

  createPet(pet: PetRequest) {
    this._loading.next(true);
    return this.petsService.create(pet).pipe(
      finalize(() => {
        this._loading.next(false);
        this.loadPets();
      })
    );
  }

  updatePet(id: number, pet: PetRequest) {
    this._loading.next(true);
    this.petsService.update(id, pet).subscribe({
      next: () => {
        this.loadPets();
      },
      error: (err) => console.error('Erro ao atualizar', err),
      complete: () => this._loading.next(false)
    });
  }

  deletePet(id: number) {
    this._loading.next(true);
    this.petsService.delete(id).subscribe({
      next: () => {
        this.loadPets();
      },
      error: (err) => console.error('Erro ao deletar', err),
      complete: () => this._loading.next(false)
    });
  }
}