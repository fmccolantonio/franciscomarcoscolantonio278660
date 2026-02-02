import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet, PetRequest, PetResponse } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class PetsService {
  private readonly API_URL = 'https://pet-manager-api.geia.vip/v1/pets';

  constructor(private http: HttpClient) {}

  list(page: number = 0, size: number = 10, nome?: string, raca?: string): Observable<PetResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (nome) params = params.set('nome', nome);
    if (raca) params = params.set('raca', raca);

    return this.http.get<PetResponse>(this.API_URL, { params });
  }

  getById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.API_URL}/${id}`);
  }

  
  create(pet: PetRequest): Observable<Pet> {
    return this.http.post<Pet>(this.API_URL, pet);
  }

  
  update(id: number, pet: PetRequest): Observable<Pet> {
    return this.http.put<Pet>(`${this.API_URL}/${id}`, pet);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  uploadPhoto(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file);
    return this.http.post(`${this.API_URL}/${id}/fotos`, formData);
  }
}