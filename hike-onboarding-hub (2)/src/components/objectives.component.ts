import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-objectives',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in max-w-6xl">
       <div class="mb-12">
        <h1 class="text-4xl font-bold text-hike-text mb-4">Alineación de Expectativas</h1>
        <p class="text-xl text-hike-gray font-light">¿Para qué estamos trabajando juntos? Definamos el éxito del proyecto.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 mb-16">
        @for (obj of onboardingService.objectives(); track obj.title) {
          <div class="group p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-hike-primary/40 transition-all hover:shadow-2xl hover:shadow-hike-primary/10 relative overflow-hidden">
            
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-hike-primary/20 to-hike-purple/20 text-hike-primary flex items-center justify-center mb-6 border border-hike-primary/20 transition-colors">
              @if (obj.icon === 'target') {
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              } @else if (obj.icon === 'flash') {
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              }
            </div>
            
            <h3 class="text-xl font-bold text-hike-text mb-3">{{ obj.title }}</h3>
            <p class="text-hike-gray leading-relaxed text-sm">
              {{ obj.description }}
            </p>
          </div>
        }
      </div>

    </div>
  `
})
export class ObjectivesComponent {
  onboardingService = inject(OnboardingService);
}