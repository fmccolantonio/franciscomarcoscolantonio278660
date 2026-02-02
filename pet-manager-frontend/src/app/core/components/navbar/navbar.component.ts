import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50" *ngIf="authService.isLogged()">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          
          <div class="flex items-center gap-8">
            <a routerLink="/pets" class="flex items-center gap-2 group">
              <div class="bg-indigo-600 text-white p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path d="M19.006 3.705a.75.75 0 10-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6Z" />
                  <path fill-rule="evenodd" d="M3.019 11.114L18 5.667v3.421l4.006 1.457a.75.75 0 11-.512 1.41l-16.5-6a.75.75 0 01-1.975 5.16zm3.731.975L18 6.64v8.61l-11.25 4.091v-7.25zM3 13.25a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-4.522l11.25-4.091V19.5a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75v-6.078l4.006-1.456a.75.75 0 00-.512-1.41l-2.618-.952-12.376 4.5z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-bold text-xl tracking-tight text-slate-800">Pet<span class="text-indigo-600">Manager</span></span>
            </a>

            <div class="hidden md:flex items-center gap-1">
              <a routerLink="/pets" routerLinkActive="bg-indigo-50 text-indigo-700" class="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all">
                Pets
              </a>
              <a routerLink="/tutores" routerLinkActive="bg-indigo-50 text-indigo-700" class="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all">
                Tutores
              </a>
            </div>
          </div>

          <div class="flex items-center">
            <button (click)="logout()" class="text-slate-500 hover:text-red-600 text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
              <span>Sair</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m3 3H9" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}