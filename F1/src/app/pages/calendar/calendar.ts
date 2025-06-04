import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Session {
  name: string;
  date: string;
  time: string;
}

interface GrandPrix {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  location: string;
  date: string;
  circuit: string;
  sessions: Session[];
  isPast: boolean;
  hasResults: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class CalendarComponent implements OnInit {
  loading = true;
  grandPrixList: GrandPrix[] = [];
  selectedGP: GrandPrix | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGrandPrixData();
  }

  loadGrandPrixData() {
    this.http.get<GrandPrix[]>('/api/calendar').subscribe({
      next: data => {
        this.grandPrixList = data;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  selectGP(gp: GrandPrix) {
    this.selectedGP = gp;
  }
}
