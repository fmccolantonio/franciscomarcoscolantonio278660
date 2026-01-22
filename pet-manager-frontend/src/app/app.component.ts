import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // Importante para os links funcionarem
  template: `
    <nav class="bg-slate-800 text-white shadow-lg sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          
          <div class="flex items-center space-x-2">
            <span class="text-2xl">🐾</span>
            <span class="font-bold text-xl tracking-wide">Pet Manager</span>
          </div>

          <div class="flex space-x-8">
            <a routerLink="/pets" 
               routerLinkActive="text-blue-400 border-b-2 border-blue-400"
               class="hover:text-blue-300 transition cursor-pointer py-4 px-2 font-medium">
               🐶 Meus Pets
            </a>

            <a routerLink="/tutores" 
               routerLinkActive="text-purple-400 border-b-2 border-purple-400"
               class="hover:text-purple-300 transition cursor-pointer py-4 px-2 font-medium">
               👥 Tutores
            </a>
          </div>

        </div>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {}