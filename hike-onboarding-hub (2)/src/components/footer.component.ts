import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-hike-black text-white pt-20 pb-10 border-t border-white/10">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-12 mb-16">
          <!-- Brand Column -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <div class="relative w-8 h-8">
                 <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                    <path d="M40 90 L85 10 L65 10 L20 90 Z" fill="#F4EB33" />
                    <path d="M55 55 L80 90 L60 90 L45 65 Z" fill="#F4EB33" />
                 </svg>
              </div>
              <span class="text-2xl font-extrabold tracking-tighter text-white">hike</span>
            </div>
            <p class="text-gray-400 max-w-sm leading-relaxed mb-6">
              Transformamos datos en decisiones. Tecnología, estrategia y crecimiento escalable para empresas modernas.
            </p>
            <div class="flex gap-4">
               <!-- Social placeholders -->
               <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hike-yellow hover:text-hike-black transition-colors cursor-pointer">
                 <span class="font-bold text-xs">LI</span>
               </div>
               <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hike-yellow hover:text-hike-black transition-colors cursor-pointer">
                 <span class="font-bold text-xs">TW</span>
               </div>
            </div>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-lg font-bold text-white mb-6">Contacto</h4>
            <ul class="space-y-4 text-gray-400">
              <li class="hover:text-hike-yellow transition-colors cursor-pointer">soporte@hike.com</li>
              <li class="hover:text-hike-yellow transition-colors cursor-pointer">onboarding@hike.com</li>
              <li class="hover:text-hike-yellow transition-colors cursor-pointer">+56 9 1234 5678</li>
            </ul>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-lg font-bold text-white mb-6">Recursos</h4>
            <ul class="space-y-4 text-gray-400">
              <li class="hover:text-hike-yellow transition-colors cursor-pointer">Portal de Clientes</li>
              <li class="hover:text-hike-yellow transition-colors cursor-pointer">Documentación</li>
              <li class="hover:text-hike-yellow transition-colors cursor-pointer">Estado del Sistema</li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2024 Hike Technology. Todos los derechos reservados.</p>
          <div class="flex gap-6">
            <span class="hover:text-white cursor-pointer">Privacidad</span>
            <span class="hover:text-white cursor-pointer">Términos</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}