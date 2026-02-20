import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-technical-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in">
      <div class="mb-12">
        <h1 class="text-5xl font-bold text-hike-text mb-4 tracking-tight">Detalle Técnico</h1>
        <p class="text-xl text-hike-gray font-light mb-4">Ecosistema técnico DART completo: Tracking, Data y Reporting.</p>
        <a href="https://www.notion.so/abndigital/Pax-Assistance-30d432d521828041817ef8cdd0db25aa" target="_blank"
           class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-hike-primary hover:border-hike-primary/40 hover:bg-hike-primary/10 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          Documentación
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 opacity-50">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        @for (item of service.technicalDetails(); track item.category) {
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-hike-primary/30 transition-all duration-300 group relative overflow-hidden">
            <!-- Header -->
            <div class="flex justify-between items-start mb-8">
              <h3 class="text-sm font-bold text-hike-primary uppercase tracking-widest transition-colors">{{ item.category }}</h3>
              
              <!-- Icon Logic -->
              <div class="text-hike-text opacity-50 group-hover:opacity-100 transition-opacity">
                @if (item.icon === 'layers') {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                  </svg>
                } @else if (item.icon === 'cube') {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                }
              </div>
            </div>

            <!-- List -->
            <ul class="space-y-4">
              @for (subItem of item.items; track subItem.name) {
                <li 
                  (click)="service.selectTechnicalItem(subItem)"
                  class="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all group/item border border-transparent hover:border-hike-primary/10">
                  <div class="flex items-center gap-3">
                    <span class="text-lg font-medium text-hike-gray group-hover/item:text-hike-text">{{ subItem.name }}</span>
                    @if (subItem.tasks && subItem.tasks.length > 0) {
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            [class]="getItemTaskDone(subItem) === subItem.tasks.length
                              ? 'bg-green-500/15 text-green-400'
                              : 'bg-hike-primary/10 text-hike-primary'">
                        {{ getItemTaskDone(subItem) }}/{{ subItem.tasks.length }}
                      </span>
                    }
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-gray-600 group-hover/item:text-hike-primary transition-colors transform -rotate-45 group-hover/item:rotate-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </li>
              }
            </ul>

            <!-- Decor -->
            <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-hike-primary/5 rounded-full blur-2xl group-hover:bg-hike-primary/10 transition-colors pointer-events-none"></div>
          </div>
        }
      </div>
    </div>
  `
})
export class TechnicalDetailComponent {
  service = inject(OnboardingService);

  getItemTaskDone(subItem: any): number {
    return subItem.tasks?.filter((t: any) => t.done).length ?? 0;
  }
}