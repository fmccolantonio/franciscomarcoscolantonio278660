import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { TutorsService } from '../services/tutors.service';
import { Tutor, TutorRequest } from '../models/tutor.model';

@Injectable({ providedIn: 'root' })
export class TutorsFacade {
  private tutorsSubject = new BehaviorSubject<Tutor[]>([]);
  public tutors$ = this.tutorsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private totalItemsSubject = new BehaviorSubject<number>(0);
  public totalItems$ = this.totalItemsSubject.asObservable();

  constructor(private tutorsService: TutorsService) {}

  loadTutors(page: number = 0, size: number = 10, nome?: string) {
    this.loadingSubject.next(true);
    this.tutorsService.list(page, size, nome)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: (response) => {
          this.tutorsSubject.next(response.content);
          this.totalItemsSubject.next(response.total);
        },
        error: (err) => console.error('Erro ao carregar tutores', err)
      });
  }

  createTutor(tutor: TutorRequest) {
    this.loadingSubject.next(true);
    this.tutorsService.create(tutor).subscribe({
      next: () => this.loadTutors(),
      error: (err) => {
        console.error(err);
        this.loadingSubject.next(false);
      }
    });
  }

  
  updateTutor(id: number, tutor: TutorRequest) {
    this.loadingSubject.next(true);
    this.tutorsService.update(id, tutor).subscribe({
      next: () => this.loadTutors(),
      error: (err) => {
        console.error(err);
        this.loadingSubject.next(false);
      }
    });
  }

  deleteTutor(id: number) {
    this.loadingSubject.next(true);
    this.tutorsService.delete(id).subscribe({
      next: () => this.loadTutors(),
      error: (err) => {
        console.error(err);
        this.loadingSubject.next(false);
      }
    });
  }

  
  linkPet(tutorId: number, petId: number) {
    this.loadingSubject.next(true);
    this.tutorsService.linkPet(tutorId, petId).subscribe({
      next: () => {
        alert('Pet vinculado com sucesso!');
        this.loadingSubject.next(false);
        
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao vincular pet');
        this.loadingSubject.next(false);
      }
    });
  }

  unlinkPet(tutorId: number, petId: number) {
    this.loadingSubject.next(true);
    this.tutorsService.unlinkPet(tutorId, petId).subscribe({
      next: () => {
        alert('Vínculo removido!');
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error(err);
        this.loadingSubject.next(false);
      }
    });
  }
}