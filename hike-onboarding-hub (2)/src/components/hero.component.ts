import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative pt-32 pb-16 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-gradient-to-br from-hike-purple/10 to-hike-yellow/10 rounded-full blur-3xl -z-10"></div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="max-w-4xl">
          <!-- Tag -->
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hike-card border border-hike-border mb-6">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span class="text-xs font-bold text-hike-gray uppercase tracking-wider">Reunión de Kick-Off</span>
          </div>
          
          <!-- Title -->
          <h1 class="text-5xl lg:text-6xl font-extrabold text-hike-text leading-tight mb-8">
            Hike <span class="text-hike-purple mx-2">/</span> Onboarding
          </h1>
          
          <!-- Agenda Card -->
          <div class="bg-hike-card border-l-4 border-hike-primary p-8 rounded-r-xl shadow-2xl mb-10 max-w-2xl">
            <h3 class="text-xl font-bold text-hike-text mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-hike-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0h18M5 21h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" />
              </svg>
              Agenda del Día
            </h3>
            <ul class="space-y-3">
              @for (item of service.agendaItems(); track item) {
                <li class="flex items-center gap-3 text-hike-gray hover:text-hike-text transition-colors cursor-default">
                  <div class="w-1.5 h-1.5 rounded-full bg-hike-border"></div>
                  <span class="text-lg">{{ item }}</span>
                </li>
              }
            </ul>
          </div>

          <div class="flex gap-4">
            <button (click)="service.setView('proposito')" class="px-8 py-3 bg-hike-primary text-hike-primary-fg font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-hike-primary/20">
              Iniciar Revisión
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
             <a href="https://www.notion.so/abndigital/Instructivo-Accesos-29d432d5218280209dc4da825afd6715" target="_blank" class="px-8 py-3 border border-hike-border text-hike-gray font-bold rounded-lg hover:bg-hike-card transition-all flex items-center gap-2">
              Ver Instructivo Accesos
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  service = inject(OnboardingService);
}