import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet, PetResponse } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private readonly API = 'https://pet-manager-api.geia.vip/v1/pets';

  constructor(private http: HttpClient) {}

  list(page: number = 0, size: number = 10, nome?: string): Observable<PetResponse> {
    let url = `${this.API}?page=${page}&size=${size}`;
    if (nome) {
      url += `&nome=${nome}`;
    }
    return this.http.get<PetResponse>(url);
  }

  getById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.API}/${id}`);
  }

  create(pet: Partial<Pet>): Observable<Pet> {
    return this.http.post<Pet>(this.API, pet);
  }

  update(id: number, pet: Partial<Pet>): Observable<Pet> {
    return this.http.put<Pet>(`${this.API}/${id}`, pet);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  uploadFoto(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file);
    return this.http.post(`${this.API}/${id}/fotos`, formData);
  }
}