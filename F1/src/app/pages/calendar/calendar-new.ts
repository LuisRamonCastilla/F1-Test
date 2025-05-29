import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Calendar Component</h1>`,
  styles: ['h1 { color: blue; }']
})
export class CalendarComponent {
  constructor() {}
}
