import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor.model';

@Injectable({ providedIn: 'root' })
export class TutorsService {
  private readonly API = 'https://pet-manager-api.geia.vip/v1/tutors';
  constructor(private http: HttpClient) {}

  list(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.API);
  }
  create(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(this.API, tutor);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
