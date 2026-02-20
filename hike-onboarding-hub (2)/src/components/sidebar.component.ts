import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingService } from '../services/onboarding.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="w-64 bg-hike-sidebar backdrop-blur-xl h-screen fixed left-0 top-0 border-r border-hike-border flex flex-col z-20 transition-colors duration-300">
      <!-- Pax Logo -->
      <div class="h-20 flex items-center px-6 border-b border-hike-border/50">
        <div class="flex items-center gap-3">
           <img src="https://assets.paxassistance.com/website/logos/logo@2x-full.png" alt="Pax Assistance" class="h-8 w-auto" />
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-8 px-4 overflow-y-auto">
        
        <div class="mb-8">
          <h3 class="text-xs font-bold text-hike-gray uppercase tracking-widest mb-4 px-3">1. Alineación</h3>
          <ul class="space-y-1.5">
            <li>
              <button 
                (click)="service.setView('proposito')"
                [class]="service.currentView() === 'proposito' ? 'text-hike-primary bg-hike-primary/10 shadow-sm border-hike-primary/20' : 'text-hike-gray hover:text-hike-text hover:bg-white/5 border-transparent'"
                class="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all flex items-center gap-3 border">
                <span class="font-mono text-xs opacity-50">01</span>
                Propósito & KPIs
              </button>
            </li>
            <li>
              <button 
                (click)="service.setView('alcance')"
                [class]="service.currentView() === 'alcance' ? 'text-hike-primary bg-hike-primary/10 shadow-sm border-hike-primary/20' : 'text-hike-gray hover:text-hike-text hover:bg-white/5 border-transparent'"
                class="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all flex items-center gap-3 border">
                <span class="font-mono text-xs opacity-50">02</span>
                Scope
              </button>
            </li>
            <li>
               <button 
                (click)="service.setView('dinamica')"
                [class]="service.currentView() === 'dinamica' ? 'text-hike-primary bg-hike-primary/10 shadow-sm border-hike-primary/20' : 'text-hike-gray hover:text-hike-text hover:bg-white/5 border-transparent'"
                class="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all flex items-center gap-3 border">
                <span class="font-mono text-xs opacity-50">03</span>
                Roadmap
              </button>
            </li>
          </ul>
        </div>

        <div class="mb-8">
          <h3 class="text-xs font-bold text-hike-gray uppercase tracking-widest mb-4 px-3">2. Ejecución</h3>
          <ul class="space-y-1.5">
             <li>
              <button 
                (click)="service.setView('tecnico')"
                [class]="service.currentView() === 'tecnico' ? 'text-hike-primary bg-hike-primary/10 shadow-sm border-hike-primary/20' : 'text-hike-gray hover:text-hike-text hover:bg-white/5 border-transparent'"
                class="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all flex items-center gap-3 border">
                <span class="font-mono text-xs opacity-50">04</span>
                Detalle Técnico
              </button>
            </li>
          </ul>
        </div>

      </nav>

      <!-- PM + powered by -->
      <div class="p-4 border-t border-hike-border/50 space-y-3">
        <div class="flex items-center gap-3 p-2.5 rounded-2xl bg-hike-primary/5 border border-hike-border">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-hike-primary/30 to-hike-purple/30 flex items-center justify-center text-xs font-bold text-hike-primary">
            LE
          </div>
          <div class="flex flex-col">
             <span class="text-xs font-semibold text-hike-text">Lourdez Ezcurra</span>
             <span class="text-[10px] text-hike-gray">Líder de Proyecto</span>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <span class="text-[9px] text-hike-gray/40 uppercase tracking-widest">powered by hike the cloud</span>
        </div>
        <div class="text-center">
          <span class="text-[8px] text-hike-gray/25 tracking-wide">Kick-Off · 24 de febrero 2026</span>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  service = inject(OnboardingService);
  themeService = inject(ThemeService);
}