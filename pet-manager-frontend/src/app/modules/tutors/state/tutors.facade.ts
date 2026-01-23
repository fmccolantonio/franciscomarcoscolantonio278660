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
      error: (err) => console.error('Erro loadTutors', err)
    });
  }

  addTutor(tutor: Tutor) {
    this.service.create(tutor).subscribe({
      next: () => this.loadTutors(),
      error: (err) => console.error('Erro addTutor', err)
    });
  }

  updateTutor(tutor: Tutor) {
    this.service.update(tutor).subscribe({
      next: () => this.loadTutors(),
      error: (err) => console.error('Erro updateTutor', err)
    });
  }
  
  removeTutor(id: number) {
    this.service.delete(id).subscribe({
      next: () => this.loadTutors(),
      error: (err) => console.error('Erro removeTutor', err)
    });
  }

  // Ações de Vínculo
  vincularPet(tutorId: number, petId: number) {
    this.service.linkPet(tutorId, petId).subscribe({
      next: () => {
        alert('Pet vinculado com sucesso!');
        this.loadTutors(); // Recarrega para atualizar a lista
      },
      error: (err) => alert('Erro ao vincular (verifique se o ID do Pet existe)')
    });
  }

  desvincularPet(tutorId: number, petId: number) {
    this.service.unlinkPet(tutorId, petId).subscribe({
      next: () => {
        alert('Pet removido do tutor!');
        this.loadTutors();
      }
    });
  }
}
