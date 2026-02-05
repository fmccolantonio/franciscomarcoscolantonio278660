import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private readonly API = 'https://pet-manager-api.geia.vip/autenticacao';

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, senha: string): Observable<any> {
    const body = { username: usuario, password: senha };

    return this.http.post<any>(`${this.API}/login`, body).pipe(
      tap(resposta => {
        if (resposta && resposta.access_token) {
          localStorage.setItem('access_token', resposta.access_token);
          
          if (resposta.refresh_token) {
            localStorage.setItem('refresh_token', resposta.refresh_token);
          }
        }
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('Refresh token indisponível'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${refreshToken}`
    });

    return this.http.put<any>(`${this.API}/refresh`, {}, { headers }).pipe(
      tap(resposta => {
        if (resposta && resposta.access_token) {
          localStorage.setItem('access_token', resposta.access_token);
          if (resposta.refresh_token) {
            localStorage.setItem('refresh_token', resposta.refresh_token);
          }
        }
      }),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
}