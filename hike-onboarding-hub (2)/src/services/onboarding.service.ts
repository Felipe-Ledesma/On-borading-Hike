import { Injectable, signal } from '@angular/core';

export interface Objective {
  title: string;
  description: string;
  validationQuestion: string;
  icon: string;
}

export interface ScopeItem {
  area: string;
  detail: string;
  type: 'in-scope' | 'out-of-scope';
}

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  tag?: string;
  link?: string;
}

export interface TechnicalDetailItem {
  name: string;
  id?: string;
  content?: string;
  tasks?: { text: string; done: boolean }[];
}

export interface TechnicalDetail {
  category: string;
  icon: string;
  items: TechnicalDetailItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  currentView = signal<'proposito' | 'alcance' | 'dinamica' | 'tecnico'>('proposito');
  selectedTechnicalItem = signal<TechnicalDetailItem | null>(null);

  // Agenda del Kick-Off
  agendaItems = signal<string[]>([
    '1. Validar Objetivos de Negocio (10 min)',
    '2. Definir Fronteras del Alcance (10 min)',
    '3. Roadmap y Hitos de Validación (10 min)',
    '4. Desbloqueo de Accesos (Técnico)'
  ]);

  objectives = signal<Objective[]>([
    {
      title: 'Visibilidad Real del Funnel',
      description: 'Hoy no sabemos qué pasa entre que un viajero llega al sitio y compra una asistencia. Vamos a mapear el recorrido completo: cotización, comparación de planes, compra y post-venta.',
      validationQuestion: '¿Hoy pueden ver cuántos usuarios cotizan vs. cuántos compran? ¿Confían en ese dato?',
      icon: 'target'
    },
    {
      title: 'Control de Inversión Publicitaria',
      description: 'Cada dólar invertido en pauta tiene que justificarse. Vamos a conectar el gasto real con las ventas reales, por canal y por campaña, para saber dónde escalar y dónde cortar.',
      validationQuestion: '¿Hoy pueden atribuir una venta a una campaña específica con confianza?',
      icon: 'flash'
    },
    {
      title: 'Inteligencia Automatizada',
      description: 'Dejar de depender de reportes manuales. Vamos a crear agentes que detecten anomalías, alerten sobre presupuesto y generen insights accionables sin que nadie tenga que pedirlo.',
      validationQuestion: '¿Cuántas horas por semana dedica el equipo a armar reportes o monitorear campañas manualmente?',
      icon: 'chart'
    }
  ]);

  focusPoints = signal<string[]>([]);

  scopeItems = signal<ScopeItem[]>([
    {
      area: 'Auditoría & Tracking',
      detail: 'Revisión completa de GTM, GA4 y pixels de medios (Meta/Google). Documento de Tagging Plan con eventos clave del funnel de asistencia al viajero: cotización, selección de plan, purchase.',
      type: 'in-scope'
    },
    {
      area: 'Dashboarding',
      detail: 'Desarrollo de Dashboards operativos: Vista Ejecutiva (KPIs de negocio) + Vista de Performance (campañas y canales) + Vista de Funnel (conversión por producto/destino).',
      type: 'in-scope'
    },
    {
      area: 'Agentes IA',
      detail: 'Desarrollo de agentes inteligentes para alertas automáticas, detección de anomalías en campañas y generación de insights sobre comportamiento del viajero.',
      type: 'in-scope'
    },
    {
      area: 'Budget Control',
      detail: 'Sistema de control y visibilidad de inversión publicitaria por canal, campaña y producto. Alertas de sobre/sub-ejecución de presupuesto.',
      type: 'in-scope'
    }
  ]);

  technicalDetails = signal<TechnicalDetail[]>([
    {
      category: 'TRACKING & MEDICIÓN',
      icon: 'layers',
      items: [
        {
          name: 'Auditoría: Diagnóstico',
          id: 'audit-tracking',
          content: `
            <div class="space-y-8">
              <div class="border-l-4 border-hike-magenta pl-6 py-2 bg-white/5 rounded-r-lg">
                <h2 class="text-2xl font-bold text-white mb-2">Paso 1: Diagnóstico del Tracking Actual</h2>
                <p class="text-gray-300 italic">Validar qué se mide hoy y qué falta para tener un funnel completo.</p>
              </div>
            </div>
          `,
          tasks: [
            { text: '¿En qué plataformas de analytics operan hoy? (GA4, HubSpot, Shopify, etc.)', done: false },
            { text: '¿Qué plataformas de medios usan actualmente y cuáles planean incorporar?', done: false },
            { text: '¿Cuáles son los eventos de conversión por los que optimizan campañas en cada plataforma?', done: false },
            { text: 'Verificar que los pixels de cada plataforma estén correctamente configurados (Meta, Google Ads)', done: false },
            { text: '¿Utilizan GTM como herramienta central de medición? ¿Tienen contenedor propio y permisos de publicación?', done: false },
            { text: '¿El sitio o cotizador empuja datos al dataLayer? ¿Se trackea el funnel cotización → compra?', done: false },
            { text: '¿Necesitan medir interacciones adicionales en la web además de conversiones de campaña? (clics en botones, flujos específicos)', done: false },
            { text: '¿Tienen contacto directo con el developer o responsable técnico del sitio web?', done: false }
          ]
        },
        {
          name: 'Tagging Plan: Eventos Clave',
          id: 'tagging-plan',
          content: `
            <div class="space-y-8">
              <div class="border-l-4 border-hike-magenta pl-6 py-2 bg-white/5 rounded-r-lg">
                <h2 class="text-2xl font-bold text-white mb-2">Paso 2: Definición del Tagging Plan</h2>
              </div>
            </div>
          `,
          tasks: [
            { text: 'Revisar y validar la estructura de UTMs junto con el equipo de Paid', done: false },
            { text: 'Definir la implementación a nivel dataLayer para una medición más robusta y escalable', done: false },
            { text: 'Documentar la tabla completa de eventos a medir, con columnas por plataforma de destino', done: false }
          ]
        },
        {
          name: 'QA: Validación de Datos',
          id: 'qa-tracking',
          content: `
             <div class="space-y-8">
              <div class="border-l-4 border-hike-magenta pl-6 py-2 bg-white/5 rounded-r-lg">
                <h2 class="text-2xl font-bold text-white mb-2">Paso 3: QA y Aprobación</h2>
              </div>
              <section>
                <p class="text-gray-300">Ustedes validan que los números en el Dashboard coincidan con su Backend de ventas (margen error <5%).</p>
                <ul class="list-disc pl-5 text-gray-300 space-y-2 mt-4">
                  <li>Cruzamos transacciones GA4 vs Backend</li>
                  <li>Validamos atribución por canal</li>
                  <li>Verificamos que cada pixel reporte correctamente</li>
                </ul>
              </section>
             </div>
          `,
          tasks: [
            { text: 'Compilar auditoría completa: estado actual, hallazgos detectados y correcciones recomendadas → presentar al cliente', done: false },
            { text: 'Coordinar con el equipo de Pax para comunicar los cambios que se van a implementar', done: false }
          ]
        }
      ]
    },
    {
      category: 'DATA & DASHBOARDS',
      icon: 'cube',
      items: [
        {
          name: 'Arquitectura de Dashboards',
          id: 'dash-architecture',
          content: `
            <div class="space-y-8">
              <div class="border-l-4 border-hike-magenta pl-6 py-2 bg-white/5 rounded-r-lg">
                <h2 class="text-2xl font-bold text-white mb-2">Set de Dashboards</h2>
                <p class="text-gray-300 italic">Tres vistas diseñadas para distintos roles y decisiones.</p>
              </div>
              <section>
                <h3 class="text-xl font-bold text-hike-sunset mb-4">Vistas</h3>
                <ul class="list-disc pl-5 text-gray-300 space-y-2">
                  <li><strong>Ejecutiva:</strong> Revenue, ROAS general, costo por venta, tendencias mensuales</li>
                  <li><strong>Performance:</strong> Métricas por canal (Meta, Google, Orgánico) con CPA y conversión</li>
                  <li><strong>Funnel:</strong> Tasas de conversión por etapa — cotización a compra, por destino y producto</li>
                </ul>
              </section>
            </div>
          `,
          tasks: [
            { text: 'Reunirse con el equipo de Paid para definir la estructura del dashboard', done: false },
            { text: 'Presentar esqueleto/wireframe del dashboard al cliente para validación', done: false }
          ]
        },
        {
          name: 'Budget Control',
          id: 'budget-control',
          content: `
            <div class="space-y-8">
              <div class="border-l-4 border-hike-magenta pl-6 py-2 bg-white/5 rounded-r-lg">
                <h2 class="text-2xl font-bold text-white mb-2">Control de Presupuesto</h2>
              </div>
              <section>
                <h3 class="text-xl font-bold text-hike-sunset mb-4">Funcionalidades</h3>
                <ul class="list-disc pl-5 text-gray-300 space-y-2">
                  <li>Pacing diario: ¿vamos on track con el budget mensual?</li>
                  <li>Alertas de sobre-ejecución por canal</li>
                  <li>Vista de inversión real vs. planificada</li>
                  <li>Distribución de budget por campaña/producto</li>
                </ul>
              </section>
            </div>
          `,
          tasks: [
            { text: 'Avanzar con el desarrollo del dashboard final', done: false }
          ]
        }
      ]
    },
    {
      category: 'INTELIGENCIA & AGENTES',
      icon: 'bolt',
      items: [
        {
          name: 'Agentes IA: Visión General',
          id: 'agents-overview',
          content: `
            <div class="space-y-8">
              <div class="border-l-4 border-hike-magenta pl-6 py-2 bg-white/5 rounded-r-lg">
                <h2 class="text-2xl font-bold text-white mb-2">Agente de Chat Inteligente</h2>
                <p class="text-gray-300 italic">Un asistente conversacional de IA especializado en Paid Media.</p>
              </div>
              <section>
                <h3 class="text-xl font-bold text-hike-sunset mb-4">¿Qué hace?</h3>
                <p class="text-gray-300 leading-relaxed mb-4">Un agente de chat al que le podés preguntar lo que necesites sobre la performance de tus campañas de Paid Media y te responde en lenguaje natural, con datos actualizados y recomendaciones accionables.</p>
                <ul class="list-disc pl-5 text-gray-300 space-y-2">
                  <li><strong>"¿Cómo está performando Google Ads esta semana?"</strong> — Te devuelve métricas clave: inversión, CPA, ROAS, conversiones.</li>
                  <li><strong>"¿Cuánto llevamos gastado del budget de Meta este mes?"</strong> — Muestra el pacing actual vs. lo planificado.</li>
                  <li><strong>"¿Qué campaña tiene el CPA más bajo?"</strong> — Analiza y compara resultados entre campañas activas.</li>
                  <li><strong>"Dame un resumen de la semana"</strong> — Genera un overview con los highlights y las acciones recomendadas.</li>
                </ul>
              </section>
            </div>
          `
        },
        {
          name: 'Configuración & Canales',
          id: 'agents-config',
          content: `
            <div class="space-y-8">
              <div class="border-l-4 border-hike-magenta pl-6 py-2 bg-white/5 rounded-r-lg">
                <h2 class="text-2xl font-bold text-white mb-2">Configuración de Agentes</h2>
              </div>
              <section>
                <ul class="list-disc pl-5 text-gray-300 space-y-2">
                  <li>Canales de notificación: Slack, Email o ambos</li>
                  <li>Frecuencia: Real-time (anomalías) + Semanal (insights)</li>
                  <li>Umbrales personalizados por métrica</li>
                </ul>
              </section>
            </div>
          `
        }
      ]
    }
  ]);

  timelineSteps = signal<TimelineStep[]>([
    {
      step: '01',
      title: 'Kick-Off (Hoy)',
      description: 'Alineación de objetivos, definición de alcance y desbloqueo de accesos.',
      tag: 'Estamos aquí',
      link: 'https://www.notion.so/abndigital/Instructivo-Accesos-29d432d5218280209dc4da825afd6715'
    },
    {
      step: '02',
      title: 'Auditoría & Tagging Plan (Semana 1-2)',
      description: 'Diagnóstico completo del tracking actual. Entregable: Documento de Auditoría + Tagging Plan con los eventos del funnel de Pax. Ustedes aprueban qué se mide.',
      tag: 'Validación Pax'
    },
    {
      step: '03',
      title: 'Implementación Tracking (Semana 3-4)',
      description: 'Configuración de GTM, eventos GA4, pixels de Meta/Google. Implementación del dataLayer con su equipo técnico.',
      tag: 'Ejecución'
    },
    {
      step: '04',
      title: 'Dashboards & Budget Control (Semana 5-6)',
      description: 'Construcción del set de dashboards (Ejecutivo + Performance + Funnel) y del módulo de control de presupuesto.',
      tag: 'Construcción'
    },
    {
      step: '05',
      title: 'Agentes IA & QA (Semana 7-8)',
      description: 'Desarrollo de agentes inteligentes, validación cruzada de datos y entrega final.',
      tag: 'Cierre & Entrega'
    }
  ]);

  setView(view: 'proposito' | 'alcance' | 'dinamica' | 'tecnico') {
    this.currentView.set(view);
    if (view !== 'tecnico') {
      this.selectedTechnicalItem.set(null);
    }
  }

  selectTechnicalItem(item: TechnicalDetailItem) {
    this.selectedTechnicalItem.set(item);
  }

  clearSelectedTechnicalItem() {
    this.selectedTechnicalItem.set(null);
  }
}