import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { PetsService } from '../services/pets.service';
import { Pet, PetRequest } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class PetsFacade {
  private petsSubject = new BehaviorSubject<Pet[]>([]);
  public pets$ = this.petsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private totalItemsSubject = new BehaviorSubject<number>(0);
  public totalItems$ = this.totalItemsSubject.asObservable();

  constructor(private petsService: PetsService) {}

  loadPets(page: number = 0, size: number = 10, nome?: string) {
    this.loadingSubject.next(true);
    this.petsService.list(page, size, nome)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: (response) => {
          this.petsSubject.next(response.content);
          // CORREÇÃO AQUI: Mudamos de totalElements para total
          this.totalItemsSubject.next(response.total);
        },
        error: (err) => console.error(err)
      });
  }

  createPet(pet: PetRequest, file?: File) {
    this.loadingSubject.next(true);
    this.petsService.create(pet).subscribe({
      next: (newPet) => {
        if (file && newPet.id) {
          this.uploadPhoto(newPet.id, file);
        } else {
          this.loadPets();
        }
      },
      error: (err) => {
        console.error(err);
        this.loadingSubject.next(false);
      }
    });
  }

  updatePet(id: number, pet: PetRequest) {
    this.loadingSubject.next(true);
    this.petsService.update(id, pet).subscribe({
      next: () => this.loadPets(),
      error: (err) => {
        console.error(err);
        this.loadingSubject.next(false);
      }
    });
  }

  deletePet(id: number) {
    this.loadingSubject.next(true);
    this.petsService.delete(id).subscribe({
      next: () => this.loadPets(),
      error: (err) => {
        console.error(err);
        this.loadingSubject.next(false);
      }
    });
  }

  private uploadPhoto(id: number, file: File) {
    this.petsService.uploadPhoto(id, file)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: () => this.loadPets(),
        error: (err) => console.error(err)
      });
  }
}