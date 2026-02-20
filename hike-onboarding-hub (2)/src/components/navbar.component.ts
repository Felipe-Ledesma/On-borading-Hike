import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-hike-bg/90 backdrop-blur-md border-b border-hike-purple/10">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <!-- Logo Area -->
        <div class="flex items-center gap-3">
          <!-- Simplified CSS construction of the Hike logo 'h' based on brand manual -->
          <div class="relative w-10 h-10">
             <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                <path d="M40 90 L85 10 L65 10 L20 90 Z" fill="#7E6E94" />
                <path d="M55 55 L80 90 L60 90 L45 65 Z" fill="#7E6E94" />
                <circle cx="45" cy="85" r="10" fill="#D8D1E0" />
                <circle cx="55" cy="88" r="8" fill="#D8D1E0" />
             </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-2xl font-extrabold tracking-tighter text-hike-purple leading-none">hike</span>
            <span class="text-xs font-light tracking-widest text-hike-black">the cloud.</span>
          </div>
        </div>

        <div class="hidden md:flex items-center gap-8">
          <a href="#objetivo" class="text-sm font-semibold text-hike-gray hover:text-hike-purple transition-colors">Objetivo</a>
          <a href="#alcance" class="text-sm font-semibold text-hike-gray hover:text-hike-purple transition-colors">Alcance</a>
          <a href="#proceso" class="text-sm font-semibold text-hike-gray hover:text-hike-purple transition-colors">Proceso</a>
          <button class="bg-hike-yellow text-hike-black px-5 py-2 rounded-full font-bold text-sm hover:bg-yellow-300 transition-colors shadow-sm">
            Portal Cliente
          </button>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}