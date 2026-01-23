import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'https://pet-manager-api.geia.vip/autenticacao';

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, senha: string) {
    return this.http.post<any>(`${this.API}/login`, { login: usuario, senha }).pipe(
      tap(resposta => {
        if (resposta && resposta.token) {
          localStorage.setItem('token', resposta.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
