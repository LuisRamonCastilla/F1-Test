import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface DriverStanding {
  position: number;
  driver: string;
  team: string;
  points: number;
  wins: number;
  podiums: number;
  country: string;
  countryCode: string;
}

interface ConstructorStanding {
  position: number;
  constructor: string;
  points: number;
  wins: number;
  podiums: number;
  country: string;
  countryCode: string;
  drivers: string[];
}

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './standings.html',
  styleUrl: './standings.scss'
})
export class StandingsComponent implements OnInit {
  currentView: 'drivers' | 'constructors' = 'drivers';
  loading = true;
  driverStandings: DriverStanding[] = [];
  constructorStandings: ConstructorStanding[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStandings();
  }

  loadStandings() {
    this.loading = true;
    this.http.get<DriverStanding[]>('/api/standings/drivers').subscribe({
      next: data => {
        this.driverStandings = data;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });

    this.http.get<ConstructorStanding[]>('/api/standings/constructors').subscribe({
      next: data => (this.constructorStandings = data)
    });
  }
}
