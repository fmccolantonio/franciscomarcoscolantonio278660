import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { PetsService } from '../services/pets.service';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsFacade {
  private petsSubject = new BehaviorSubject<Pet[]>([]);
  pets$ = this.petsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private petsService: PetsService) {}

  loadPets(page: number = 0, size: number = 10, nome?: string) {
    this.loadingSubject.next(true);
    this.petsService.list(page, size, nome)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: (response) => {
          this.petsSubject.next(response.content || []);
        },
        error: (err: any) => console.error('Erro ao carregar pets:', err)
      });
  }

  createPet(pet: any, foto?: File) {
    this.loadingSubject.next(true);
    this.petsService.create(pet)
      .subscribe({
        next: (novoPet) => {
          if (foto && novoPet.id) {
            this.uploadFoto(novoPet.id, foto);
          } else {
            this.loadPets();
            this.loadingSubject.next(false);
          }
        },
        error: (err: any) => {
          console.error('Erro ao criar pet:', err);
          this.loadingSubject.next(false);
        }
      });
  }

  updatePet(id: number, pet: any) {
    this.loadingSubject.next(true);
    this.petsService.update(id, pet)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: () => this.loadPets(),
        error: (err: any) => console.error('Erro ao atualizar pet:', err)
      });
  }

  deletePet(id: number) {
    this.loadingSubject.next(true);
    this.petsService.delete(id)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: () => this.loadPets(),
        error: (err: any) => console.error('Erro ao deletar pet:', err)
      });
  }

  // Corrigido de uploadPhoto para uploadFoto
  uploadFoto(id: number, file: File) {
    this.petsService.uploadFoto(id, file)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: () => this.loadPets(),
        error: (err: any) => console.error('Erro ao enviar foto:', err)
      });
  }

  setFilter(nome: string) {
    this.loadPets(0, 10, nome);
  }
}