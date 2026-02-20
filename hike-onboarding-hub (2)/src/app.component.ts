import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingService } from './services/onboarding.service';
import { ThemeService } from './services/theme.service';
import { SidebarComponent } from './components/sidebar.component';
import { TechnicalDetailComponent } from './components/technical-detail.component';
import { TechnicalContentComponent } from './components/technical-content.component';
import { ObjectivesComponent } from './components/objectives.component';
import { TimelineComponent } from './components/timeline.component';
import { ScopeComponent } from './components/scope.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TechnicalDetailComponent,
    TechnicalContentComponent,
    ObjectivesComponent,
    TimelineComponent,
    ScopeComponent
  ],
  template: `
    <div class="min-h-screen flex bg-hike-bg text-hike-text font-sans selection:bg-hike-primary selection:text-white transition-colors duration-300">
      
      <!-- Sidebar -->
      <app-sidebar />

      <!-- Main Layout -->
      <div class="flex-1 ml-64 min-h-screen flex flex-col">
        
        <!-- Header -->
        <header class="h-20 flex items-center justify-between px-10 border-b border-hike-border/50 sticky top-0 bg-hike-bg/80 backdrop-blur-xl z-10 transition-colors duration-300">
          <div class="text-sm text-hike-gray">
            Pax Assistance — Kick-Off <span class="mx-2">/</span> <span class="text-hike-text font-medium">{{ getTitle() }}</span>
          </div>
          <div class="flex items-center gap-4">
            
            <!-- Theme Toggle -->
            <button 
              (click)="themeService.toggle()" 
              class="w-10 h-10 rounded-full bg-white/5 border border-hike-border flex items-center justify-center text-hike-text hover:border-hike-primary/50 hover:bg-hike-primary/10 transition-all group">
              @if (themeService.theme() === 'dark') {
                <!-- Sun Icon for Dark Mode -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 group-hover:text-hike-primary transition-colors">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              } @else {
                <!-- Moon Icon for Light Mode -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-hike-primary group-hover:text-hike-primary transition-colors">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              }
            </button>

            <!-- Action Button using Dynamic Primary Color -->
            <button class="px-6 py-2.5 bg-gradient-to-r from-hike-primary to-hike-sunset text-white rounded-full text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-hike-primary/30 transition-all">
              Kick-Off
            </button>
          </div>
        </header>

        <!-- Dynamic Content -->
        <main class="flex-1 p-10 overflow-y-auto relative z-[1]">
          @switch (service.currentView()) {
            @case ('tecnico') {
              <!-- Technical View Logic -->
              @if (service.selectedTechnicalItem()) {
                <app-technical-content />
              } @else {
                <app-technical-detail />
              }
            }
            @case ('proposito') {
              <app-objectives />
            }
            @case ('alcance') {
              <app-scope />
            }
            @case ('dinamica') {
              <app-timeline />
            }
            @default {
              <app-technical-detail />
            }
          }
        </main>
      
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AppComponent {
  service = inject(OnboardingService);
  themeService = inject(ThemeService);

  getTitle() {
    switch (this.service.currentView()) {
      case 'tecnico':
        if (this.service.selectedTechnicalItem()) {
          return `Detalle Técnico / ${this.service.selectedTechnicalItem()?.name}`;
        }
        return 'Detalle Técnico';
      case 'proposito': return 'Propósito';
      case 'alcance': return 'Alcance';
      case 'dinamica': return 'Dinámica';
      default: return 'Dashboard';
    }
  }
}