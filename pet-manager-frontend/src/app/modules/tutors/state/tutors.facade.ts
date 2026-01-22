import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TutorsService } from '../services/tutors.service';
import { Tutor } from '../models/tutor.model';

@Injectable({ providedIn: 'root' })
export class TutorsFacade {
  private tutorsSubject = new BehaviorSubject<Tutor[]>([]);
  public tutors$ = this.tutorsSubject.asObservable();

  constructor(private service: TutorsService) {}

  loadTutors() {
    this.service.list().subscribe({
      next: (dados: Tutor[]) => this.tutorsSubject.next(dados),
      error: (err: any) => console.error('Erro loadTutors', err)
    });
  }

  addTutor(tutor: Tutor) {
    this.service.create(tutor).subscribe({
      next: (novo: Tutor) => {
        const atual = this.tutorsSubject.value;
        this.tutorsSubject.next([...atual, novo]);
      },
      error: (err: any) => console.error('Erro addTutor', err)
    });
  }
  
  removeTutor(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        const atual = this.tutorsSubject.value.filter(t => t.id !== id);
        this.tutorsSubject.next(atual);
      }
    });
  }
}
