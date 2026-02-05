import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar falso se não houver token', () => {
    localStorage.removeItem('access_token');
    expect(service.isLoggedIn()).toBe(false);
  });

  it('deve retornar verdadeiro se houver token', () => {
    localStorage.setItem('access_token', 'token-teste');
    expect(service.isLoggedIn()).toBe(true);
  });
});