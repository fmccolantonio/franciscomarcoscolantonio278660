import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.models';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private readonly API = 'https://pet-manager-api.geia.vip/v1/pets';

  constructor(private http: HttpClient) {}

  list(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.API);
  }

  create(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.API, pet);
  }
}