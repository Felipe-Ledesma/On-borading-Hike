import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-scope',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in max-w-6xl">
       <div class="mb-12">
        <h1 class="text-4xl font-bold text-hike-text mb-4">Alcance del Proyecto</h1>
        <p class="text-xl text-hike-gray font-light">Qué vamos a construir juntos en este proyecto.</p>
      </div>

      <div class="mb-16">
        <h2 class="text-lg font-bold text-hike-primary uppercase tracking-widest mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Incluido en el Proyecto
        </h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (item of inScopeItems(); track item.area) {
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-hike-primary/30 transition-all group hover:shadow-lg hover:shadow-hike-primary/5">
              <h3 class="text-xl font-bold text-hike-text mb-3">{{ item.area }}</h3>
              <p class="text-hike-gray leading-relaxed text-sm">
                {{ item.detail }}
              </p>
            </div>
          }
        </div>
      </div>

    </div>
  `
})
export class ScopeComponent {
  service = inject(OnboardingService);

  // Computed signals to filter items
  inScopeItems = computed(() => this.service.scopeItems().filter(i => i.type === 'in-scope'));
}