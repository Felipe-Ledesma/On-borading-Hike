import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-technical-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in max-w-5xl mx-auto pb-20">
      
      <!-- Back Navigation -->
      <button 
        (click)="service.clearSelectedTechnicalItem()"
        class="mb-8 flex items-center gap-2 text-sm text-hike-gray hover:text-hike-primary transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Volver al Detalle Técnico
      </button>

      <!-- Content -->
      @if (item()) {
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
           @if (item()?.content) {
              <div class="technical-content-wrapper" [innerHTML]="item()?.content"></div>
           } @else {
             <div class="text-center py-20">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mx-auto text-hike-gray mb-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
               <h3 class="text-xl font-bold text-hike-text mb-2">Contenido en Desarrollo</h3>
               <p class="text-hike-gray">La documentación para {{ item()?.name }} estará disponible pronto.</p>
             </div>
           }

           <!-- Action Items for this step -->
           @if (item()?.tasks && item()!.tasks!.length > 0) {
             <div class="mt-8 pt-8 border-t border-white/10">
               <div class="flex items-center justify-between mb-5">
                 <h3 class="text-sm font-bold text-hike-gray uppercase tracking-widest flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-hike-primary">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   Action Items de este paso
                 </h3>
                 <span class="text-[10px] font-bold bg-hike-primary/10 text-hike-primary px-2.5 py-1 rounded-full">
                   {{ getTaskDone() }}/{{ item()!.tasks!.length }}
                 </span>
               </div>
               <div class="space-y-2">
                 @for (task of item()!.tasks!; track task.text; let i = $index) {
                   <div 
                     (click)="toggleTask(i)"
                     class="flex items-start gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all"
                     [class]="task.done 
                       ? 'bg-hike-primary/5 border border-hike-primary/20' 
                       : 'bg-white/5 border border-white/10 hover:border-hike-primary/20 hover:bg-white/[0.07]'">
                     <div class="mt-0.5 w-5 h-5 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all"
                          [class]="task.done 
                            ? 'bg-gradient-to-br from-hike-primary to-hike-sunset border-hike-primary' 
                            : 'border-white/20'">
                       @if (task.done) {
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 text-white">
                           <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                         </svg>
                       }
                     </div>
                     <span class="text-sm font-medium leading-relaxed transition-all"
                           [class]="task.done ? 'text-hike-gray/50 line-through' : 'text-hike-text'">
                       {{ task.text }}
                     </span>
                   </div>
                 }
               </div>
             </div>
           }
        </div>
      }
    </div>
  `,
  styles: [`
    /* Overrides for dynamic content injected via innerHTML */
    :host ::ng-deep .technical-content-wrapper .text-white {
      color: var(--hike-text) !important;
    }
    :host ::ng-deep .technical-content-wrapper .text-gray-300,
    :host ::ng-deep .technical-content-wrapper .text-gray-400,
    :host ::ng-deep .technical-content-wrapper .text-gray-500 {
      color: var(--hike-text-muted) !important;
    }
    :host ::ng-deep .technical-content-wrapper .bg-white\\/5 {
       background-color: rgba(212, 38, 126, 0.1) !important;
    }
    :host ::ng-deep .technical-content-wrapper .border-gray-800,
    :host ::ng-deep .technical-content-wrapper .border-gray-700 {
       border-color: var(--hike-border) !important;
    }
    :host ::ng-deep .technical-content-wrapper .bg-hike-card {
       background-color: var(--hike-bg) !important;
       border-color: var(--hike-border) !important;
    }
    :host ::ng-deep .technical-content-wrapper .bg-black {
       background-color: var(--hike-input) !important;
       color: var(--hike-text-muted) !important;
    }
    :host ::ng-deep .technical-content-wrapper .bg-black\\/20, 
    :host ::ng-deep .technical-content-wrapper .bg-black\\/40 {
      background-color: rgba(212, 38, 126, 0.1) !important;
    }
  `]
})
export class TechnicalContentComponent {
  service = inject(OnboardingService);
  item = this.service.selectedTechnicalItem;

  toggleTask(taskIndex: number) {
    const currentItem = this.item();
    if (!currentItem?.tasks) return;

    // Update the task in the technicalDetails signal
    this.service.technicalDetails.update(details =>
      details.map(d => ({
        ...d,
        items: d.items.map(item =>
          item === currentItem
            ? { ...item, tasks: item.tasks?.map((t, i) => i === taskIndex ? { ...t, done: !t.done } : t) }
            : item
        )
      }))
    );

    // Also update the selectedTechnicalItem reference
    this.service.selectedTechnicalItem.update(item =>
      item ? { ...item, tasks: item.tasks?.map((t, i) => i === taskIndex ? { ...t, done: !t.done } : t) } : null
    );
  }

  getTaskDone(): number {
    return this.item()?.tasks?.filter(t => t.done).length ?? 0;
  }
}