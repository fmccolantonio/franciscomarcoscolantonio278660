import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor, TutorRequest, TutorResponse } from '../models/tutor.model';

@Injectable({
  providedIn: 'root'
})
export class TutorsService {
  private apiUrl = 'https://pet-manager-api.geia.vip/v1/tutores';

  constructor(private http: HttpClient) {}

  list(page: number, size: number, nome?: string): Observable<TutorResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,desc');

    if (nome) {
      params = params.set('nome', nome);
    }

    return this.http.get<TutorResponse>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.apiUrl}/${id}`);
  }

  create(tutor: TutorRequest): Observable<Tutor> {
    return this.http.post<Tutor>(this.apiUrl, tutor);
  }

  update(id: number, tutor: TutorRequest): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.apiUrl}/${id}`, tutor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadPhoto(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file);
    return this.http.post(`${this.apiUrl}/${id}/fotos`, formData);
  }

  linkPet(tutorId: number, petId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${tutorId}/pets/${petId}`, {});
  }

  unlinkPet(tutorId: number, petId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tutorId}/pets/${petId}`);
  }
}