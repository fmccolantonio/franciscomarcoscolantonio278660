import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet, PetRequest, PetResponse } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private apiUrl = 'https://pet-manager-api.geia.vip/v1/pets';

  constructor(private http: HttpClient) {}

  list(page: number, size: number, nome?: string): Observable<PetResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,desc');

    if (nome) {
      params = params.set('nome', nome);
    }

    return this.http.get<PetResponse>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  create(pet: PetRequest): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  update(id: number, pet: PetRequest | any): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, pet);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadFoto(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file);
    return this.http.post(`${this.apiUrl}/${id}/fotos`, formData);
  }
}