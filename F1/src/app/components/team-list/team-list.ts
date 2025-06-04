import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Driver {
  name: string;
  photo: string;
  nameEn?: string;
}

interface Team {
  name: string;
  nameEn?: string;
  logo: string;
  car: string;
  drivers: Driver[];
}

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './team-list.html',
  styleUrl: './team-list.scss'
})
export class TeamList implements OnInit {
  @Input() lang: 'es' | 'en' = 'es';
  expanded: number | null = null;
  backgroundCar: string | null = null;

  teams: Team[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Team[]>('/api/teams').subscribe({
      next: (data) => (this.teams = data),
    });
  }

  toggleTeam(idx: number) {
    this.expanded = this.expanded === idx ? null : idx;
    this.backgroundCar = this.expanded !== null ? this.teams[this.expanded].car : null;
  }
}
