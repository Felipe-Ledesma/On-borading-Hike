import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingService } from '../services/onboarding.service';

interface QuestionCategory {
  title: string;
  icon: string;
  sections?: { title?: string; questions: string[] }[];
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
     <div class="animate-fade-in max-w-4xl">
       <div class="mb-12">
        <h1 class="text-4xl font-bold text-hike-text mb-4">Próximos Pasos</h1>
        <p class="text-xl text-hike-gray font-light">Así vamos a organizar el trabajo a partir de mañana.</p>
      </div>

      <div class="relative">

        @for (item of onboardingService.timelineSteps(); track item.step; let i = $index; let last = $last) {
          <div class="relative flex gap-8 mb-12 group last:mb-0">
            <!-- Curved connector to next step -->
            @if (!last) {
              <svg class="absolute left-0 top-12 w-12 pointer-events-none z-0" style="height: calc(100% + 0rem);" viewBox="0 0 48 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient [attr.id]="'curveGrad-' + i" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#D4267E" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#6B2FA0" stop-opacity="0.15"/>
                  </linearGradient>
                </defs>
                <path d="M 24 0 C 24 25, 32 35, 32 50 S 24 75, 24 100" 
                      fill="none" 
                      [attr.stroke]="'url(#curveGrad-' + i + ')'" 
                      stroke-width="1.5"
                      vector-effect="non-scaling-stroke"/>
              </svg>
            }

            <!-- Number circle — opaque bg to cover the line -->
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-hike-bg border border-white/10 flex items-center justify-center z-10 group-hover:border-hike-primary/50 group-hover:bg-hike-primary/10 transition-all shadow-lg shadow-black/20">
              <span class="font-mono text-sm text-hike-gray group-hover:text-hike-primary transition-colors">{{ item.step }}</span>
            </div>
            
            <div class="pt-1 pb-6 flex-1">
              <div class="flex items-center gap-4 mb-2">
                <h3 class="text-xl font-bold text-hike-text">{{ item.title }}</h3>
                @if (item.tag) {
                  <span class="px-3 py-1 bg-gradient-to-r from-hike-primary/20 to-hike-sunset/20 border border-hike-primary/20 text-hike-primary rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors">{{ item.tag }}</span>
                }
              </div>
              <p class="text-hike-gray leading-relaxed mb-4">
                {{ item.description }}
              </p>
              
              <!-- External Link Action -->
              @if (item.link) {
                 <a [href]="item.link" target="_blank" class="inline-flex items-center gap-2 text-sm font-bold text-hike-primary hover:text-hike-text transition-colors group/link">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                   </svg>
                   Revisar Instructivo
                 </a>
              }
            </div>
          </div>
        }
      </div>

      <!-- Kick-Off Modal -->
      @if (showKickOffModal()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" (click)="showKickOffModal.set(false)"></div>
          
          <!-- Modal Content -->
          <div class="relative w-full max-w-2xl bg-hike-sidebar backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl max-h-[85vh] flex flex-col animate-fade-in overflow-hidden">
            
            <!-- Header -->
            <div class="p-6 border-b border-white/10 flex justify-between items-center bg-hike-primary/5">
              <div>
                <h2 class="text-2xl font-bold text-hike-text">Revisión de Puntos Clave</h2>
                <p class="text-sm text-hike-gray">Necesitamos responder esto ahora para avanzar.</p>
              </div>
              <button (click)="showKickOffModal.set(false)" class="p-2 hover:bg-hike-border/50 rounded-full transition-colors text-hike-gray hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Scrollable Body -->
            <div class="flex-1 overflow-y-auto p-6 space-y-4">
              
              @for (cat of kickOffData; track cat.title) {
                <details class="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 open:border-hike-primary/30">
                  <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                    <div class="flex items-center gap-3">
                      <div class="p-2 rounded-xl bg-gradient-to-br from-hike-primary/15 to-hike-purple/15 text-hike-primary">
                        <!-- Icon logic -->
                         @if (cat.icon === 'tracking') {
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                           </svg>
                         } @else if (cat.icon === 'reporting') {
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                           </svg>
                         } @else {
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                           </svg>
                         }
                      </div>
                      <span class="font-bold text-hike-text">{{ cat.title }}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-hike-gray transition-transform group-open:rotate-180 group-open:text-hike-primary">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div class="p-4 pt-0 text-sm text-gray-300 border-t border-transparent group-open:border-white/5">
                    @for (sec of cat.sections; track sec) {
                      @if (sec.title) {
                        <h4 class="font-bold text-hike-primary mt-3 mb-2 uppercase text-xs tracking-wider">{{ sec.title }}</h4>
                      }
                      <ul class="space-y-2">
                        @for (q of sec.questions; track q) {
                          <li class="flex items-start gap-2 pl-2">
                            <span class="text-hike-primary mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0"></span>
                            <span class="leading-relaxed">{{ q }}</span>
                          </li>
                        }
                      </ul>
                    }
                  </div>
                </details>
              }

            </div>
            
            <!-- Footer -->
            <div class="p-4 bg-hike-bg border-t border-hike-border text-center">
              <p class="text-xs text-hike-gray">Siguiente paso: Nosotros procesamos estas respuestas y ajustamos el plan.</p>
            </div>
          </div>
        </div>
      }

    </div>
  `
})
export class TimelineComponent {
  onboardingService = inject(OnboardingService);
  showKickOffModal = signal(false);

  kickOffData: QuestionCategory[] = [
    {
      title: 'Tracking (Lo Técnico)',
      icon: 'tracking',
      sections: [
        {
          title: 'Configuración Actual',
          questions: [
            '¿Tienen GTM implementado? ¿Quién tiene acceso de publicación?',
            '¿El cotizador de asistencia empuja datos al dataLayer (destino, plan, precio)?',
            '¿Los eventos de GA4 están configurados? ¿Trackean el funnel cotización → compra?',
            '¿Qué plataformas de pauta usan? (Meta Ads, Google Ads, ¿otras?)',
            '¿Los pixels de conversión reportan correctamente las ventas?'
          ]
        },
        {
          title: 'Responsables',
          questions: [
            '¿Quién es el responsable técnico del sitio/cotizador? (Nombre y Email)',
            '¿Tienen entorno de Staging o todo va directo a Producción?',
            '¿Hay otras agencias o proveedores tocando el GTM o el sitio?'
          ]
        }
      ]
    },
    {
      title: 'Reporting & Dashboards',
      icon: 'reporting',
      sections: [
        {
          questions: [
            '¿Qué decisiones de negocio necesitan tomar cada semana?',
            '¿Tienen dashboards hoy? ¿Qué les falta o qué no les gusta?',
            '¿Cuáles son las 3-5 métricas clave que miran los directores?',
            '¿Necesitan ver data por destino, por producto de asistencia, por mercado?',
            '¿Fuente de la verdad para ventas: Google Analytics o su Backend/CRM?'
          ]
        }
      ]
    },
    {
      title: 'Budget & Agentes IA',
      icon: 'automation',
      sections: [
        {
          title: 'Control de Presupuesto',
          questions: [
            '¿Cómo controlan hoy la inversión publicitaria? ¿Excel, plataforma, a ojo?',
            '¿Tienen budgets definidos por canal o por campaña?',
            '¿Quién necesita visibilidad del gasto? ¿Marketing, Finanzas, Dirección?'
          ]
        },
        {
          title: 'Agentes & Alertas',
          questions: [
            '¿Qué tipo de alertas necesitan? (caída de conversiones, sobregasto, anomalías)',
            '¿Por dónde les llegan mejor las alertas? (Slack, Email, WhatsApp)',
            '¿Les interesa un resumen semanal automático con insights?'
          ]
        }
      ]
    }
  ];
}