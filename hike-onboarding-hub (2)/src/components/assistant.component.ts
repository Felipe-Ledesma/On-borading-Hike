import { Component } from '@angular/core';

@Component({
  selector: 'app-assistant',
  standalone: true,
  template: `
    <aside class="hidden xl:flex flex-col w-80 bg-hike-card border-l border-hike-border fixed right-0 top-20 bottom-0 z-10 transition-colors duration-300">
      <div class="p-6 border-b border-hike-border/50">
        <h3 class="text-xs font-bold text-hike-gray uppercase tracking-widest">Hike Assistant</h3>
      </div>

      <div class="flex-1 p-6 overflow-y-auto">
        <div class="flex gap-3 mb-6">
          <div class="w-8 h-8 rounded-full bg-hike-purple flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white">
              <path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436-1.118-1.02-2.258-2.161-3.28-3.28zM9.75 15.75c1.192-.66 2.302-1.42 3.322-2.274a17.222 17.222 0 002.654 2.654c-.854 1.02-1.614 2.13-2.274 3.322a.75.75 0 01-1.347.078 6.749 6.749 0 00-4.993-4.994.75.75 0 01.079-1.347 6.749 6.749 0 005.559 2.56zm1.144-8.895a15.736 15.736 0 00-2.31 3.555 6.75 6.75 0 00-4.885 4.885 15.737 15.737 0 003.554 2.31 15.755 15.755 0 012.275-3.321 15.753 15.753 0 013.322-2.275c-1.147-2.028-1.464-4.234-.956-6.154z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="bg-hike-bg border border-hike-border/50 p-4 rounded-xl rounded-tl-none text-sm text-hike-gray leading-relaxed">
            Bienvenido al ecosistema DART. He completado el desglose técnico de Reporting y Tracking. ¿Hay alguna fase específica que quieras revisar?
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-hike-border/50">
        <div class="relative">
          <input type="text" placeholder="Consultar proceso..." class="w-full bg-hike-input border border-hike-border rounded-lg pl-4 pr-10 py-3 text-sm text-hike-text focus:outline-none focus:border-hike-yellow placeholder-hike-gray transition-colors">
          <button class="absolute right-2 top-2 p-1 text-hike-gray hover:text-hike-text">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  `
})
export class AssistantComponent {}