import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // CORREÇÃO: Removido o '/v1'. O endereço deve ser direto na raiz.
  private readonly API_URL = 'https://pet-manager-api.geia.vip/autenticacao/login';
  
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.API_URL, credentials).pipe(
      tap(response => {
        // O Swagger mostra que o retorno tem "access_token"
        const token = response.access_token || response.token;
        
        if (token) {
          this.setToken(token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  isLogged(): boolean {
    const token = this.getToken();
    return !!token;
  }
}