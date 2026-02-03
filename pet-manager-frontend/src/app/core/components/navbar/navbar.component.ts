import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // <--- Importação necessária
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // <--- OBRIGATÓRIO: Sem isso, o routerLink não funciona!
  template: `
    <aside class="w-20 lg:w-72 h-screen sticky top-0 flex flex-col bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 transition-all duration-300"
           *ngIf="authService.isLogged()">
      
      <div class="h-24 flex items-center justify-center lg:justify-start lg:px-8 border-b border-slate-50">
        <div class="flex items-center gap-3 cursor-pointer group" routerLink="/pets">
          <div class="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white">
              <path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.684c1.248 0 2.25.864 2.25 1.93v2.793c0 2.375-3.326 4.091-8.25 4.091s-8.25-1.716-8.25-4.091v-2.793c0-1.066 1.002-1.93 2.25-1.93h.684a18.995 18.995 0 01-3.699-2.02.75.75 0 11.928-1.196A17.502 17.502 0 0012 13.5c.355 0 .707.013 1.056.04C10.79 11.19 9.69 8.7 9.315 7.584z" clip-rule="evenodd" />
            </svg>            
          </div>
          <span class="hidden lg:block text-xl font-bold text-slate-800 tracking-tight">Pet<span class="text-indigo-600">Manager</span></span>
        </div>
      </div>

      <nav class="flex-1 py-8 px-4 space-y-3">
        
        <a routerLink="/pets" routerLinkActive="bg-indigo-50 text-indigo-700" 
           class="group flex items-center gap-4 px-3 lg:px-4 py-3.5 rounded-xl text-slate-500 font-medium hover:bg-slate-50 hover:text-indigo-600 transition-all duration-200 border border-transparent justify-center lg:justify-start relative overflow-hidden">
           
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 transition-colors">
             <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
           </svg>
           <span class="hidden lg:block">Meus Pets</span>
           <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full opacity-0 group-[.bg-indigo-50]:opacity-100 transition-opacity"></div>
        </a>

        <a routerLink="/tutors" routerLinkActive="bg-indigo-50 text-indigo-700" 
           class="group flex items-center gap-4 px-3 lg:px-4 py-3.5 rounded-xl text-slate-500 font-medium hover:bg-slate-50 hover:text-indigo-600 transition-all duration-200 border border-transparent justify-center lg:justify-start relative overflow-hidden">
           
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 transition-colors">
             <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
           </svg>
           <span class="hidden lg:block">Tutores</span>
           <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full opacity-0 group-[.bg-indigo-50]:opacity-100 transition-opacity"></div>
        </a>

      </nav>

      <div class="p-4 border-t border-slate-100">
        <button (click)="logout()" class="w-full flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          <span class="hidden lg:block text-sm font-bold">Sair</span>
        </button>
      </div>

    </aside>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}