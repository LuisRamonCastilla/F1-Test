import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  imports: [CommonModule],
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
    // Mock data for 2025 season standings
    this.driverStandings = [
      {
        position: 1,
        driver: 'Max Verstappen',
        team: 'Red Bull Racing',
        points: 156,
        wins: 4,
        podiums: 6,
        country: 'Netherlands',
        countryCode: 'nl'
      },
      {
        position: 2,
        driver: 'Lando Norris',
        team: 'McLaren',
        points: 128,
        wins: 2,
        podiums: 5,
        country: 'United Kingdom',
        countryCode: 'gb'
      },
      {
        position: 3,
        driver: 'Charles Leclerc',
        team: 'Ferrari',
        points: 115,
        wins: 1,
        podiums: 4,
        country: 'Monaco',
        countryCode: 'mc'
      },
      {
        position: 4,
        driver: 'Oscar Piastri',
        team: 'McLaren',
        points: 98,
        wins: 0,
        podiums: 3,
        country: 'Australia',
        countryCode: 'au'
      },
      {
        position: 5,
        driver: 'Carlos Sainz',
        team: 'Ferrari',
        points: 86,
        wins: 0,
        podiums: 2,
        country: 'Spain',
        countryCode: 'es'
      },
      {
        position: 6,
        driver: 'Sergio Pérez',
        team: 'Red Bull Racing',
        points: 75,
        wins: 0,
        podiums: 2,
        country: 'Mexico',
        countryCode: 'mx'
      },
      {
        position: 7,
        driver: 'George Russell',
        team: 'Mercedes',
        points: 64,
        wins: 0,
        podiums: 1,
        country: 'United Kingdom',
        countryCode: 'gb'
      },
      {
        position: 8,
        driver: 'Lewis Hamilton',
        team: 'Mercedes',
        points: 52,
        wins: 0,
        podiums: 1,
        country: 'United Kingdom',
        countryCode: 'gb'
      },
      {
        position: 9,
        driver: 'Fernando Alonso',
        team: 'Aston Martin',
        points: 28,
        wins: 0,
        podiums: 0,
        country: 'Spain',
        countryCode: 'es'
      },
      {
        position: 10,
        driver: 'Lance Stroll',
        team: 'Aston Martin',
        points: 18,
        wins: 0,
        podiums: 0,
        country: 'Canada',
        countryCode: 'ca'
      }
    ];

    this.constructorStandings = [
      {
        position: 1,
        constructor: 'Red Bull Racing',
        points: 231,
        wins: 4,
        podiums: 8,
        country: 'Austria',
        countryCode: 'at',
        drivers: ['Max Verstappen', 'Sergio Pérez']
      },
      {
        position: 2,
        constructor: 'McLaren',
        points: 226,
        wins: 2,
        podiums: 8,
        country: 'United Kingdom',
        countryCode: 'gb',
        drivers: ['Lando Norris', 'Oscar Piastri']
      },
      {
        position: 3,
        constructor: 'Ferrari',
        points: 201,
        wins: 1,
        podiums: 6,
        country: 'Italy',
        countryCode: 'it',
        drivers: ['Charles Leclerc', 'Carlos Sainz']
      },
      {
        position: 4,
        constructor: 'Mercedes',
        points: 116,
        wins: 0,
        podiums: 2,
        country: 'Germany',
        countryCode: 'de',
        drivers: ['Lewis Hamilton', 'George Russell']
      },
      {
        position: 5,
        constructor: 'Aston Martin',
        points: 46,
        wins: 0,
        podiums: 0,
        country: 'United Kingdom',
        countryCode: 'gb',
        drivers: ['Fernando Alonso', 'Lance Stroll']
      },
      {
        position: 6,
        constructor: 'Alpine',
        points: 12,
        wins: 0,
        podiums: 0,
        country: 'France',
        countryCode: 'fr',
        drivers: ['Pierre Gasly', 'Esteban Ocon']
      },
      {
        position: 7,
        constructor: 'Williams',
        points: 8,
        wins: 0,
        podiums: 0,
        country: 'United Kingdom',
        countryCode: 'gb',
        drivers: ['Alex Albon', 'Logan Sargeant']
      },
      {
        position: 8,
        constructor: 'Haas',
        points: 6,
        wins: 0,
        podiums: 0,
        country: 'United States',
        countryCode: 'us',
        drivers: ['Kevin Magnussen', 'Nico Hülkenberg']
      },
      {
        position: 9,
        constructor: 'AlphaTauri',
        points: 4,
        wins: 0,
        podiums: 0,
        country: 'Italy',
        countryCode: 'it',
        drivers: ['Yuki Tsunoda', 'Nyck de Vries']
      },
      {
        position: 10,
        constructor: 'Alfa Romeo',
        points: 2,
        wins: 0,
        podiums: 0,
        country: 'Switzerland',
        countryCode: 'ch',
        drivers: ['Valtteri Bottas', 'Zhou Guanyu']
      }
    ];

    this.loading = false;
  }

  switchView(view: 'drivers' | 'constructors') {
    this.currentView = view;
  }

  getFlagUrl(countryCode: string): string {
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  }

  getTeamColor(team: string): string {
    const teamColors: { [key: string]: string } = {
      'Red Bull Racing': '#0600EF',
      'McLaren': '#FF8700',
      'Ferrari': '#DC143C',
      'Mercedes': '#00D2BE',
      'Aston Martin': '#006F62',
      'Alpine': '#0090FF',
      'Williams': '#005AFF',
      'Haas': '#FFFFFF',
      'AlphaTauri': '#2B4562',
      'Alfa Romeo': '#900000'
    };
    return teamColors[team] || '#CCCCCC';
  }
}
