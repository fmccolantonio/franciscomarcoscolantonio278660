import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor.model';

@Injectable({ providedIn: 'root' })
export class TutorsService {
  private readonly API = 'https://pet-manager-api.geia.vip/v1/tutores';

  constructor(private http: HttpClient) {}

  list(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.API);
  }

  create(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(this.API, tutor);
  }

  update(tutor: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.API}/${tutor.id}`, tutor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  // --- Métodos de Vinculação (Senior) ---

  // Buscar pets de um tutor
  getPetsDoTutor(tutorId: number): Observable<any[]> {
    // A API não tem um endpoint direto "GET /tutores/{id}/pets" documentado no Swagger padrão,
    // mas geralmente vem junto no GET /tutores/{id} ou filtramos.
    // Pelo padrão REST do edital, vamos assumir que vem no detalhe ou gerenciamos via estado.
    // Para simplificar: Vamos buscar o detalhe do tutor que deve trazer a lista.
    return this.http.get<any>(`${this.API}/${tutorId}`);
  }

  // Vincular Pet ao Tutor
  linkPet(tutorId: number, petId: number): Observable<void> {
    return this.http.post<void>(`${this.API}/${tutorId}/pets/${petId}`, {});
  }

  // Remover Vínculo
  unlinkPet(tutorId: number, petId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${tutorId}/pets/${petId}`);
  }
}
