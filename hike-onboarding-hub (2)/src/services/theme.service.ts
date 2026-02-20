import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<'dark' | 'light'>('dark');

  constructor() {
    // Initialize from local storage or default to dark
    const stored = localStorage.getItem('hike-theme') as 'dark' | 'light';
    if (stored) {
      this.theme.set(stored);
    } else {
      this.theme.set('dark');
    }

    // Effect to apply class to html element
    effect(() => {
      const t = this.theme();
      const html = document.documentElement;
      
      if (t === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
      } else {
        html.classList.add('light');
        html.classList.remove('dark');
      }
      
      localStorage.setItem('hike-theme', t);
    });
  }

  toggle() {
    this.theme.update(current => current === 'dark' ? 'light' : 'dark');
  }
}