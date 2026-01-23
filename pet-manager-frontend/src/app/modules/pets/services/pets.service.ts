import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private readonly API = 'https://pet-manager-api.geia.vip/v1/pets';

  constructor(private http: HttpClient) {}

  // Listar com Paginação e Busca (Filtro)
  list(page: number = 0, size: number = 10, nome?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (nome) {
      params = params.set('nome', nome);
    }

    return this.http.get<any>(this.API, { params });
  }

  // Buscar um (Detalhes)
  getById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.API}/${id}`);
  }

  // Criar
  create(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.API, pet);
  }

  // Atualizar (PUT)
  update(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.API}/${pet.id}`, pet);
  }

  // Deletar
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  // Upload de Foto
  uploadPhoto(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file);
    return this.http.post(`${this.API}/${id}/fotos`, formData);
  }
}
