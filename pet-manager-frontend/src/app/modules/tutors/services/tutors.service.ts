import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor, TutorRequest, TutorResponse } from '../models/tutor.model';

@Injectable({ providedIn: 'root' })
export class TutorsService {
  private readonly API_URL = 'https://pet-manager-api.geia.vip/v1/tutores';

  constructor(private http: HttpClient) {}

  list(page: number = 0, size: number = 10, nome?: string): Observable<TutorResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (nome) params = params.set('nome', nome);

    return this.http.get<TutorResponse>(this.API_URL, { params });
  }

  getById(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.API_URL}/${id}`);
  }

  create(tutor: TutorRequest): Observable<Tutor> {
    return this.http.post<Tutor>(this.API_URL, tutor);
  }

  update(id: number, tutor: TutorRequest): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.API_URL}/${id}`, tutor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // Métodos de Vínculo
  linkPet(tutorId: number, petId: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/${tutorId}/pets/${petId}`, {});
  }

  unlinkPet(tutorId: number, petId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${tutorId}/pets/${petId}`);
  }

  uploadPhoto(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file);
    return this.http.post(`${this.API_URL}/${id}/fotos`, formData);
  }
}