import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

interface HistoricalStandings {
  year: number;
  drivers: DriverStanding[];
  constructors: ConstructorStanding[];
}

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './standings.html',
  styleUrl: './standings.scss'
})
export class StandingsComponent implements OnInit {
  currentView: 'drivers' | 'constructors' = 'drivers';
  loading = true;
  driverStandings: DriverStanding[] = [];
  constructorStandings: ConstructorStanding[] = [];
  selectedYear: number = 2025;
  availableYears: number[] = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
  historicalStandings: { [year: number]: HistoricalStandings } = {};

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.loadStandings();
    this.loadHistoricalStandings();
  }

  loadStandings() {    // Mock data for 2025 season standings - Complete driver list
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
      },
      {
        position: 11,
        driver: 'Pierre Gasly',
        team: 'Alpine',
        points: 15,
        wins: 0,
        podiums: 0,
        country: 'France',
        countryCode: 'fr'
      },
      {
        position: 12,
        driver: 'Esteban Ocon',
        team: 'Alpine',
        points: 12,
        wins: 0,
        podiums: 0,
        country: 'France',
        countryCode: 'fr'
      },
      {
        position: 13,
        driver: 'Alex Albon',
        team: 'Williams',
        points: 10,
        wins: 0,
        podiums: 0,
        country: 'Thailand',
        countryCode: 'th'
      },
      {
        position: 14,
        driver: 'Nico Hülkenberg',
        team: 'Haas',
        points: 8,
        wins: 0,
        podiums: 0,
        country: 'Germany',
        countryCode: 'de'
      },
      {
        position: 15,
        driver: 'Yuki Tsunoda',
        team: 'AlphaTauri',
        points: 6,
        wins: 0,
        podiums: 0,
        country: 'Japan',
        countryCode: 'jp'
      },
      {
        position: 16,
        driver: 'Kevin Magnussen',
        team: 'Haas',
        points: 4,
        wins: 0,
        podiums: 0,
        country: 'Denmark',
        countryCode: 'dk'
      },
      {
        position: 17,
        driver: 'Valtteri Bottas',
        team: 'Alfa Romeo',
        points: 3,
        wins: 0,
        podiums: 0,
        country: 'Finland',
        countryCode: 'fi'
      },
      {
        position: 18,
        driver: 'Zhou Guanyu',
        team: 'Alfa Romeo',
        points: 2,
        wins: 0,
        podiums: 0,
        country: 'China',
        countryCode: 'cn'
      },
      {
        position: 19,
        driver: 'Logan Sargeant',
        team: 'Williams',
        points: 1,
        wins: 0,
        podiums: 0,
        country: 'United States',
        countryCode: 'us'
      },
      {
        position: 20,
        driver: 'Nyck de Vries',
        team: 'AlphaTauri',
        points: 0,
        wins: 0,
        podiums: 0,
        country: 'Netherlands',
        countryCode: 'nl'
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
  getTeamLogo(team: string): string {
    const teamLogos: { [key: string]: string } = {
      'Red Bull Racing': 'https://www.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png',
      'McLaren': 'https://www.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png',
      'Ferrari': 'https://www.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png',
      'Mercedes': 'https://www.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png',
      'Aston Martin': 'https://www.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png',
      'Alpine': 'https://www.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png',
      'Williams': 'https://www.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png',
      'Haas': 'https://www.formula1.com/content/dam/fom-website/teams/2024/haas-logo.png',
      'AlphaTauri': 'https://www.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png',
      'Alfa Romeo': 'https://www.formula1.com/content/dam/fom-website/teams/2024/kick-sauber-logo.png'
    };    return teamLogos[team] || '';
  }

  loadHistoricalStandings() {
    // Mock historical standings data for 2015-2024
    this.historicalStandings = {      2024: {
        year: 2024,
        drivers: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 575, wins: 9, podiums: 14, country: 'Netherlands', countryCode: 'nl' },
          { position: 2, driver: 'Lando Norris', team: 'McLaren', points: 374, wins: 3, podiums: 9, country: 'United Kingdom', countryCode: 'gb' },
          { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', points: 356, wins: 2, podiums: 8, country: 'Monaco', countryCode: 'mc' },
          { position: 4, driver: 'Oscar Piastri', team: 'McLaren', points: 292, wins: 2, podiums: 5, country: 'Australia', countryCode: 'au' },
          { position: 5, driver: 'Carlos Sainz', team: 'Ferrari', points: 272, wins: 2, podiums: 6, country: 'Spain', countryCode: 'es' },
          { position: 6, driver: 'George Russell', team: 'Mercedes', points: 245, wins: 1, podiums: 3, country: 'United Kingdom', countryCode: 'gb' },
          { position: 7, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 152, wins: 0, podiums: 1, country: 'Mexico', countryCode: 'mx' },
          { position: 8, driver: 'Lewis Hamilton', team: 'Mercedes', points: 154, wins: 2, podiums: 3, country: 'United Kingdom', countryCode: 'gb' },
          { position: 9, driver: 'Fernando Alonso', team: 'Aston Martin', points: 70, wins: 0, podiums: 0, country: 'Spain', countryCode: 'es' },
          { position: 10, driver: 'Lance Stroll', team: 'Aston Martin', points: 24, wins: 0, podiums: 0, country: 'Canada', countryCode: 'ca' },
          { position: 11, driver: 'Nico Hülkenberg', team: 'Haas', points: 37, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 12, driver: 'Yuki Tsunoda', team: 'AlphaTauri', points: 30, wins: 0, podiums: 0, country: 'Japan', countryCode: 'jp' },
          { position: 13, driver: 'Alexander Albon', team: 'Williams', points: 12, wins: 0, podiums: 0, country: 'Thailand', countryCode: 'th' },
          { position: 14, driver: 'Daniel Ricciardo', team: 'AlphaTauri', points: 12, wins: 0, podiums: 0, country: 'Australia', countryCode: 'au' },
          { position: 15, driver: 'Pierre Gasly', team: 'Alpine', points: 10, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 16, driver: 'Kevin Magnussen', team: 'Haas', points: 16, wins: 0, podiums: 0, country: 'Denmark', countryCode: 'dk' },
          { position: 17, driver: 'Esteban Ocon', team: 'Alpine', points: 5, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 18, driver: 'Franco Colapinto', team: 'Williams', points: 5, wins: 0, podiums: 0, country: 'Argentina', countryCode: 'ar' },
          { position: 19, driver: 'Zhou Guanyu', team: 'Kick Sauber', points: 4, wins: 0, podiums: 0, country: 'China', countryCode: 'cn' },
          { position: 20, driver: 'Valtteri Bottas', team: 'Kick Sauber', points: 0, wins: 0, podiums: 0, country: 'Finland', countryCode: 'fi' }
        ],
        constructors: [
          { position: 1, constructor: 'McLaren', points: 666, wins: 5, podiums: 14, country: 'United Kingdom', countryCode: 'gb', drivers: ['Lando Norris', 'Oscar Piastri'] },
          { position: 2, constructor: 'Ferrari', points: 628, wins: 4, podiums: 14, country: 'Italy', countryCode: 'it', drivers: ['Charles Leclerc', 'Carlos Sainz'] },
          { position: 3, constructor: 'Red Bull Racing', points: 589, wins: 9, podiums: 15, country: 'Austria', countryCode: 'at', drivers: ['Max Verstappen', 'Sergio Pérez'] },
          { position: 4, constructor: 'Mercedes', points: 446, wins: 3, podiums: 6, country: 'Germany', countryCode: 'de', drivers: ['Lewis Hamilton', 'George Russell'] },
          { position: 5, constructor: 'Aston Martin', points: 94, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Fernando Alonso', 'Lance Stroll'] },
          { position: 6, constructor: 'Haas', points: 54, wins: 0, podiums: 0, country: 'United States', countryCode: 'us', drivers: ['Nico Hülkenberg', 'Kevin Magnussen'] },
          { position: 7, constructor: 'AlphaTauri', points: 46, wins: 0, podiums: 0, country: 'Italy', countryCode: 'it', drivers: ['Yuki Tsunoda', 'Daniel Ricciardo'] },
          { position: 8, constructor: 'Williams', points: 17, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Alexander Albon', 'Franco Colapinto'] },
          { position: 9, constructor: 'Alpine', points: 13, wins: 0, podiums: 0, country: 'France', countryCode: 'fr', drivers: ['Pierre Gasly', 'Esteban Ocon'] },
          { position: 10, constructor: 'Kick Sauber', points: 4, wins: 0, podiums: 0, country: 'Switzerland', countryCode: 'ch', drivers: ['Zhou Guanyu', 'Valtteri Bottas'] }
        ]
      },      2023: {
        year: 2023,
        drivers: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 575, wins: 19, podiums: 21, country: 'Netherlands', countryCode: 'nl' },
          { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 285, wins: 2, podiums: 8, country: 'Mexico', countryCode: 'mx' },
          { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes', points: 234, wins: 1, podiums: 3, country: 'United Kingdom', countryCode: 'gb' },
          { position: 4, driver: 'Fernando Alonso', team: 'Aston Martin', points: 206, wins: 0, podiums: 8, country: 'Spain', countryCode: 'es' },
          { position: 5, driver: 'George Russell', team: 'Mercedes', points: 175, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb' },
          { position: 6, driver: 'Carlos Sainz', team: 'Ferrari', points: 200, wins: 1, podiums: 4, country: 'Spain', countryCode: 'es' },
          { position: 7, driver: 'Charles Leclerc', team: 'Ferrari', points: 206, wins: 1, podiums: 5, country: 'Monaco', countryCode: 'mc' },
          { position: 8, driver: 'Lando Norris', team: 'McLaren', points: 205, wins: 0, podiums: 7, country: 'United Kingdom', countryCode: 'gb' },
          { position: 9, driver: 'Lance Stroll', team: 'Aston Martin', points: 74, wins: 0, podiums: 1, country: 'Canada', countryCode: 'ca' },
          { position: 10, driver: 'Oscar Piastri', team: 'McLaren', points: 97, wins: 0, podiums: 1, country: 'Australia', countryCode: 'au' },
          { position: 11, driver: 'Pierre Gasly', team: 'Alpine', points: 62, wins: 0, podiums: 1, country: 'France', countryCode: 'fr' },
          { position: 12, driver: 'Esteban Ocon', team: 'Alpine', points: 58, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 13, driver: 'Alexander Albon', team: 'Williams', points: 27, wins: 0, podiums: 0, country: 'Thailand', countryCode: 'th' },
          { position: 14, driver: 'Yuki Tsunoda', team: 'AlphaTauri', points: 17, wins: 0, podiums: 0, country: 'Japan', countryCode: 'jp' },
          { position: 15, driver: 'Valtteri Bottas', team: 'Alfa Romeo', points: 10, wins: 0, podiums: 0, country: 'Finland', countryCode: 'fi' },
          { position: 16, driver: 'Nico Hülkenberg', team: 'Haas', points: 9, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 17, driver: 'Daniel Ricciardo', team: 'AlphaTauri', points: 6, wins: 0, podiums: 0, country: 'Australia', countryCode: 'au' },
          { position: 18, driver: 'Zhou Guanyu', team: 'Alfa Romeo', points: 6, wins: 0, podiums: 0, country: 'China', countryCode: 'cn' },
          { position: 19, driver: 'Kevin Magnussen', team: 'Haas', points: 3, wins: 0, podiums: 0, country: 'Denmark', countryCode: 'dk' },
          { position: 20, driver: 'Logan Sargeant', team: 'Williams', points: 1, wins: 0, podiums: 0, country: 'United States', countryCode: 'us' }
        ],
        constructors: [
          { position: 1, constructor: 'Red Bull Racing', points: 860, wins: 21, podiums: 29, country: 'Austria', countryCode: 'at', drivers: ['Max Verstappen', 'Sergio Pérez'] },
          { position: 2, constructor: 'Mercedes', points: 409, wins: 1, podiums: 4, country: 'Germany', countryCode: 'de', drivers: ['Lewis Hamilton', 'George Russell'] },
          { position: 3, constructor: 'Ferrari', points: 406, wins: 1, podiums: 6, country: 'Italy', countryCode: 'it', drivers: ['Charles Leclerc', 'Carlos Sainz'] },
          { position: 4, constructor: 'McLaren', points: 302, wins: 0, podiums: 8, country: 'United Kingdom', countryCode: 'gb', drivers: ['Lando Norris', 'Oscar Piastri'] },
          { position: 5, constructor: 'Aston Martin', points: 280, wins: 0, podiums: 9, country: 'United Kingdom', countryCode: 'gb', drivers: ['Fernando Alonso', 'Lance Stroll'] },
          { position: 6, constructor: 'Alpine', points: 120, wins: 0, podiums: 1, country: 'France', countryCode: 'fr', drivers: ['Pierre Gasly', 'Esteban Ocon'] },
          { position: 7, constructor: 'Williams', points: 28, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Alexander Albon', 'Logan Sargeant'] },
          { position: 8, constructor: 'AlphaTauri', points: 25, wins: 0, podiums: 0, country: 'Italy', countryCode: 'it', drivers: ['Yuki Tsunoda', 'Daniel Ricciardo'] },
          { position: 9, constructor: 'Alfa Romeo', points: 16, wins: 0, podiums: 0, country: 'Switzerland', countryCode: 'ch', drivers: ['Valtteri Bottas', 'Zhou Guanyu'] },
          { position: 10, constructor: 'Haas', points: 12, wins: 0, podiums: 0, country: 'United States', countryCode: 'us', drivers: ['Nico Hülkenberg', 'Kevin Magnussen'] }
        ]
      },      2022: {
        year: 2022,
        drivers: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 454, wins: 15, podiums: 17, country: 'Netherlands', countryCode: 'nl' },
          { position: 2, driver: 'Charles Leclerc', team: 'Ferrari', points: 308, wins: 3, podiums: 10, country: 'Monaco', countryCode: 'mc' },
          { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 305, wins: 3, podiums: 8, country: 'Mexico', countryCode: 'mx' },
          { position: 4, driver: 'George Russell', team: 'Mercedes', points: 275, wins: 1, podiums: 5, country: 'United Kingdom', countryCode: 'gb' },
          { position: 5, driver: 'Carlos Sainz', team: 'Ferrari', points: 246, wins: 1, podiums: 6, country: 'Spain', countryCode: 'es' },
          { position: 6, driver: 'Lewis Hamilton', team: 'Mercedes', points: 240, wins: 0, podiums: 2, country: 'United Kingdom', countryCode: 'gb' },
          { position: 7, driver: 'Lando Norris', team: 'McLaren', points: 122, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb' },
          { position: 8, driver: 'Esteban Ocon', team: 'Alpine', points: 92, wins: 0, podiums: 2, country: 'France', countryCode: 'fr' },
          { position: 9, driver: 'Fernando Alonso', team: 'Alpine', points: 81, wins: 0, podiums: 1, country: 'Spain', countryCode: 'es' },
          { position: 10, driver: 'Valtteri Bottas', team: 'Alfa Romeo', points: 49, wins: 0, podiums: 0, country: 'Finland', countryCode: 'fi' },
          { position: 11, driver: 'Daniel Ricciardo', team: 'McLaren', points: 37, wins: 0, podiums: 0, country: 'Australia', countryCode: 'au' },
          { position: 12, driver: 'Pierre Gasly', team: 'AlphaTauri', points: 23, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 13, driver: 'Kevin Magnussen', team: 'Haas', points: 25, wins: 0, podiums: 0, country: 'Denmark', countryCode: 'dk' },
          { position: 14, driver: 'Sebastian Vettel', team: 'Aston Martin', points: 37, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 15, driver: 'Yuki Tsunoda', team: 'AlphaTauri', points: 12, wins: 0, podiums: 0, country: 'Japan', countryCode: 'jp' },
          { position: 16, driver: 'Zhou Guanyu', team: 'Alfa Romeo', points: 6, wins: 0, podiums: 0, country: 'China', countryCode: 'cn' },
          { position: 17, driver: 'Mick Schumacher', team: 'Haas', points: 12, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 18, driver: 'Lance Stroll', team: 'Aston Martin', points: 18, wins: 0, podiums: 0, country: 'Canada', countryCode: 'ca' },
          { position: 19, driver: 'Alexander Albon', team: 'Williams', points: 4, wins: 0, podiums: 0, country: 'Thailand', countryCode: 'th' },
          { position: 20, driver: 'Nicholas Latifi', team: 'Williams', points: 2, wins: 0, podiums: 0, country: 'Canada', countryCode: 'ca' }
        ],
        constructors: [
          { position: 1, constructor: 'Red Bull Racing', points: 759, wins: 18, podiums: 25, country: 'Austria', countryCode: 'at', drivers: ['Max Verstappen', 'Sergio Pérez'] },
          { position: 2, constructor: 'Ferrari', points: 554, wins: 4, podiums: 16, country: 'Italy', countryCode: 'it', drivers: ['Charles Leclerc', 'Carlos Sainz'] },
          { position: 3, constructor: 'Mercedes', points: 515, wins: 1, podiums: 7, country: 'Germany', countryCode: 'de', drivers: ['Lewis Hamilton', 'George Russell'] },
          { position: 4, constructor: 'Alpine', points: 173, wins: 0, podiums: 3, country: 'France', countryCode: 'fr', drivers: ['Fernando Alonso', 'Esteban Ocon'] },
          { position: 5, constructor: 'McLaren', points: 159, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb', drivers: ['Lando Norris', 'Daniel Ricciardo'] },
          { position: 6, constructor: 'Alfa Romeo', points: 55, wins: 0, podiums: 0, country: 'Switzerland', countryCode: 'ch', drivers: ['Valtteri Bottas', 'Zhou Guanyu'] },
          { position: 7, constructor: 'Aston Martin', points: 55, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Sebastian Vettel', 'Lance Stroll'] },
          { position: 8, constructor: 'Haas', points: 37, wins: 0, podiums: 0, country: 'United States', countryCode: 'us', drivers: ['Kevin Magnussen', 'Mick Schumacher'] },
          { position: 9, constructor: 'AlphaTauri', points: 35, wins: 0, podiums: 0, country: 'Italy', countryCode: 'it', drivers: ['Pierre Gasly', 'Yuki Tsunoda'] },
          { position: 10, constructor: 'Williams', points: 8, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Alexander Albon', 'Nicholas Latifi'] }
        ]
      },      2021: {
        year: 2021,
        drivers: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 395, wins: 10, podiums: 18, country: 'Netherlands', countryCode: 'nl' },
          { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes', points: 387, wins: 8, podiums: 17, country: 'United Kingdom', countryCode: 'gb' },
          { position: 3, driver: 'Valtteri Bottas', team: 'Mercedes', points: 226, wins: 1, podiums: 11, country: 'Finland', countryCode: 'fi' },
          { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 190, wins: 1, podiums: 5, country: 'Mexico', countryCode: 'mx' },
          { position: 5, driver: 'Carlos Sainz', team: 'Ferrari', points: 164, wins: 0, podiums: 4, country: 'Spain', countryCode: 'es' },
          { position: 6, driver: 'Lando Norris', team: 'McLaren', points: 160, wins: 0, podiums: 4, country: 'United Kingdom', countryCode: 'gb' },
          { position: 7, driver: 'Charles Leclerc', team: 'Ferrari', points: 159, wins: 0, podiums: 2, country: 'Monaco', countryCode: 'mc' },
          { position: 8, driver: 'Daniel Ricciardo', team: 'McLaren', points: 115, wins: 1, podiums: 2, country: 'Australia', countryCode: 'au' },
          { position: 9, driver: 'Pierre Gasly', team: 'AlphaTauri', points: 110, wins: 0, podiums: 3, country: 'France', countryCode: 'fr' },
          { position: 10, driver: 'Fernando Alonso', team: 'Alpine', points: 81, wins: 0, podiums: 1, country: 'Spain', countryCode: 'es' },
          { position: 11, driver: 'Esteban Ocon', team: 'Alpine', points: 74, wins: 1, podiums: 1, country: 'France', countryCode: 'fr' },
          { position: 12, driver: 'Sebastian Vettel', team: 'Aston Martin', points: 43, wins: 0, podiums: 1, country: 'Germany', countryCode: 'de' },
          { position: 13, driver: 'Lance Stroll', team: 'Aston Martin', points: 34, wins: 0, podiums: 1, country: 'Canada', countryCode: 'ca' },
          { position: 14, driver: 'Yuki Tsunoda', team: 'AlphaTauri', points: 32, wins: 0, podiums: 0, country: 'Japan', countryCode: 'jp' },
          { position: 15, driver: 'George Russell', team: 'Williams', points: 16, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb' },
          { position: 16, driver: 'Kimi Räikkönen', team: 'Alfa Romeo', points: 10, wins: 0, podiums: 0, country: 'Finland', countryCode: 'fi' },
          { position: 17, driver: 'Nicholas Latifi', team: 'Williams', points: 7, wins: 0, podiums: 0, country: 'Canada', countryCode: 'ca' },
          { position: 18, driver: 'Antonio Giovinazzi', team: 'Alfa Romeo', points: 3, wins: 0, podiums: 0, country: 'Italy', countryCode: 'it' },
          { position: 19, driver: 'Mick Schumacher', team: 'Haas', points: 0, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 20, driver: 'Nikita Mazepin', team: 'Haas', points: 0, wins: 0, podiums: 0, country: 'Russia', countryCode: 'ru' }
        ],
        constructors: [
          { position: 1, constructor: 'Mercedes', points: 613, wins: 9, podiums: 28, country: 'Germany', countryCode: 'de', drivers: ['Lewis Hamilton', 'Valtteri Bottas'] },
          { position: 2, constructor: 'Red Bull Racing', points: 585, wins: 11, podiums: 23, country: 'Austria', countryCode: 'at', drivers: ['Max Verstappen', 'Sergio Pérez'] },
          { position: 3, constructor: 'Ferrari', points: 323, wins: 0, podiums: 8, country: 'Italy', countryCode: 'it', drivers: ['Charles Leclerc', 'Carlos Sainz'] },
          { position: 4, constructor: 'McLaren', points: 275, wins: 1, podiums: 6, country: 'United Kingdom', countryCode: 'gb', drivers: ['Lando Norris', 'Daniel Ricciardo'] },
          { position: 5, constructor: 'Alpine', points: 155, wins: 1, podiums: 2, country: 'France', countryCode: 'fr', drivers: ['Fernando Alonso', 'Esteban Ocon'] },
          { position: 6, constructor: 'AlphaTauri', points: 142, wins: 0, podiums: 3, country: 'Italy', countryCode: 'it', drivers: ['Pierre Gasly', 'Yuki Tsunoda'] },
          { position: 7, constructor: 'Aston Martin', points: 77, wins: 0, podiums: 2, country: 'United Kingdom', countryCode: 'gb', drivers: ['Sebastian Vettel', 'Lance Stroll'] },
          { position: 8, constructor: 'Williams', points: 23, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb', drivers: ['George Russell', 'Nicholas Latifi'] },
          { position: 9, constructor: 'Alfa Romeo', points: 13, wins: 0, podiums: 0, country: 'Switzerland', countryCode: 'ch', drivers: ['Kimi Räikkönen', 'Antonio Giovinazzi'] },
          { position: 10, constructor: 'Haas', points: 0, wins: 0, podiums: 0, country: 'United States', countryCode: 'us', drivers: ['Mick Schumacher', 'Nikita Mazepin'] }
        ]
      },      2020: {
        year: 2020,
        drivers: [
          { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes', points: 347, wins: 11, podiums: 14, country: 'United Kingdom', countryCode: 'gb' },
          { position: 2, driver: 'Valtteri Bottas', team: 'Mercedes', points: 223, wins: 2, podiums: 11, country: 'Finland', countryCode: 'fi' },
          { position: 3, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 214, wins: 2, podiums: 11, country: 'Netherlands', countryCode: 'nl' },
          { position: 4, driver: 'Sergio Pérez', team: 'Racing Point', points: 125, wins: 1, podiums: 3, country: 'Mexico', countryCode: 'mx' },
          { position: 5, driver: 'Daniel Ricciardo', team: 'Renault', points: 119, wins: 0, podiums: 2, country: 'Australia', countryCode: 'au' },
          { position: 6, driver: 'Carlos Sainz', team: 'McLaren', points: 105, wins: 0, podiums: 1, country: 'Spain', countryCode: 'es' },
          { position: 7, driver: 'Alexander Albon', team: 'Red Bull Racing', points: 105, wins: 0, podiums: 2, country: 'Thailand', countryCode: 'th' },
          { position: 8, driver: 'Charles Leclerc', team: 'Ferrari', points: 98, wins: 0, podiums: 2, country: 'Monaco', countryCode: 'mc' },
          { position: 9, driver: 'Lando Norris', team: 'McLaren', points: 97, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb' },
          { position: 10, driver: 'Pierre Gasly', team: 'AlphaTauri', points: 75, wins: 1, podiums: 1, country: 'France', countryCode: 'fr' },
          { position: 11, driver: 'Lance Stroll', team: 'Racing Point', points: 75, wins: 0, podiums: 1, country: 'Canada', countryCode: 'ca' },
          { position: 12, driver: 'Esteban Ocon', team: 'Renault', points: 62, wins: 0, podiums: 1, country: 'France', countryCode: 'fr' },
          { position: 13, driver: 'Sebastian Vettel', team: 'Ferrari', points: 33, wins: 0, podiums: 1, country: 'Germany', countryCode: 'de' },
          { position: 14, driver: 'Daniil Kvyat', team: 'AlphaTauri', points: 32, wins: 0, podiums: 1, country: 'Russia', countryCode: 'ru' },
          { position: 15, driver: 'Nico Hülkenberg', team: 'Racing Point', points: 10, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 16, driver: 'Kimi Räikkönen', team: 'Alfa Romeo', points: 4, wins: 0, podiums: 0, country: 'Finland', countryCode: 'fi' },
          { position: 17, driver: 'Antonio Giovinazzi', team: 'Alfa Romeo', points: 4, wins: 0, podiums: 0, country: 'Italy', countryCode: 'it' },
          { position: 18, driver: 'George Russell', team: 'Williams', points: 3, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb' },
          { position: 19, driver: 'Romain Grosjean', team: 'Haas', points: 2, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 20, driver: 'Kevin Magnussen', team: 'Haas', points: 1, wins: 0, podiums: 0, country: 'Denmark', countryCode: 'dk' }
        ],
        constructors: [
          { position: 1, constructor: 'Mercedes', points: 573, wins: 13, podiums: 25, country: 'Germany', countryCode: 'de', drivers: ['Lewis Hamilton', 'Valtteri Bottas'] },
          { position: 2, constructor: 'Red Bull Racing', points: 319, wins: 2, podiums: 12, country: 'Austria', countryCode: 'at', drivers: ['Max Verstappen', 'Alexander Albon'] },
          { position: 3, constructor: 'McLaren', points: 202, wins: 0, podiums: 4, country: 'United Kingdom', countryCode: 'gb', drivers: ['Lando Norris', 'Carlos Sainz'] },
          { position: 4, constructor: 'Racing Point', points: 195, wins: 1, podiums: 4, country: 'United Kingdom', countryCode: 'gb', drivers: ['Sergio Pérez', 'Lance Stroll'] },
          { position: 5, constructor: 'Renault', points: 181, wins: 0, podiums: 3, country: 'France', countryCode: 'fr', drivers: ['Daniel Ricciardo', 'Esteban Ocon'] },
          { position: 6, constructor: 'Ferrari', points: 131, wins: 0, podiums: 3, country: 'Italy', countryCode: 'it', drivers: ['Charles Leclerc', 'Sebastian Vettel'] },
          { position: 7, constructor: 'AlphaTauri', points: 107, wins: 1, podiums: 2, country: 'Italy', countryCode: 'it', drivers: ['Pierre Gasly', 'Daniil Kvyat'] },
          { position: 8, constructor: 'Alfa Romeo', points: 8, wins: 0, podiums: 0, country: 'Switzerland', countryCode: 'ch', drivers: ['Kimi Räikkönen', 'Antonio Giovinazzi'] },
          { position: 9, constructor: 'Haas', points: 3, wins: 0, podiums: 0, country: 'United States', countryCode: 'us', drivers: ['Romain Grosjean', 'Kevin Magnussen'] },
          { position: 10, constructor: 'Williams', points: 0, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['George Russell', 'Nicholas Latifi'] }
        ]
      },      2019: {
        year: 2019,
        drivers: [
          { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes', points: 413, wins: 11, podiums: 17, country: 'United Kingdom', countryCode: 'gb' },
          { position: 2, driver: 'Valtteri Bottas', team: 'Mercedes', points: 326, wins: 4, podiums: 13, country: 'Finland', countryCode: 'fi' },
          { position: 3, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 278, wins: 3, podiums: 9, country: 'Netherlands', countryCode: 'nl' },
          { position: 4, driver: 'Charles Leclerc', team: 'Ferrari', points: 264, wins: 2, podiums: 7, country: 'Monaco', countryCode: 'mc' },
          { position: 5, driver: 'Sebastian Vettel', team: 'Ferrari', points: 240, wins: 1, podiums: 9, country: 'Germany', countryCode: 'de' },
          { position: 6, driver: 'Carlos Sainz', team: 'McLaren', points: 96, wins: 0, podiums: 1, country: 'Spain', countryCode: 'es' },
          { position: 7, driver: 'Pierre Gasly', team: 'Red Bull Racing', points: 95, wins: 0, podiums: 2, country: 'France', countryCode: 'fr' },
          { position: 8, driver: 'Alexander Albon', team: 'Red Bull Racing', points: 92, wins: 0, podiums: 2, country: 'Thailand', countryCode: 'th' },
          { position: 9, driver: 'Lando Norris', team: 'McLaren', points: 49, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb' },
          { position: 10, driver: 'Sergio Pérez', team: 'Racing Point', points: 52, wins: 0, podiums: 0, country: 'Mexico', countryCode: 'mx' },
          { position: 11, driver: 'Nico Hülkenberg', team: 'Renault', points: 37, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 12, driver: 'Daniel Ricciardo', team: 'Renault', points: 54, wins: 0, podiums: 2, country: 'Australia', countryCode: 'au' },
          { position: 13, driver: 'Daniil Kvyat', team: 'Toro Rosso', points: 37, wins: 0, podiums: 1, country: 'Russia', countryCode: 'ru' },
          { position: 14, driver: 'Kimi Räikkönen', team: 'Alfa Romeo', points: 43, wins: 0, podiums: 0, country: 'Finland', countryCode: 'fi' },
          { position: 15, driver: 'Kevin Magnussen', team: 'Haas', points: 20, wins: 0, podiums: 0, country: 'Denmark', countryCode: 'dk' },
          { position: 16, driver: 'Lance Stroll', team: 'Racing Point', points: 21, wins: 0, podiums: 0, country: 'Canada', countryCode: 'ca' },
          { position: 17, driver: 'Romain Grosjean', team: 'Haas', points: 8, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 18, driver: 'Antonio Giovinazzi', team: 'Alfa Romeo', points: 14, wins: 0, podiums: 0, country: 'Italy', countryCode: 'it' },
          { position: 19, driver: 'George Russell', team: 'Williams', points: 0, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb' },
          { position: 20, driver: 'Robert Kubica', team: 'Williams', points: 1, wins: 0, podiums: 0, country: 'Poland', countryCode: 'pl' }
        ],
        constructors: [
          { position: 1, constructor: 'Mercedes', points: 739, wins: 15, podiums: 30, country: 'Germany', countryCode: 'de', drivers: ['Lewis Hamilton', 'Valtteri Bottas'] },
          { position: 2, constructor: 'Ferrari', points: 504, wins: 3, podiums: 16, country: 'Italy', countryCode: 'it', drivers: ['Charles Leclerc', 'Sebastian Vettel'] },
          { position: 3, constructor: 'Red Bull Racing', points: 417, wins: 3, podiums: 12, country: 'Austria', countryCode: 'at', drivers: ['Max Verstappen', 'Pierre Gasly'] },
          { position: 4, constructor: 'McLaren', points: 145, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb', drivers: ['Carlos Sainz', 'Lando Norris'] },
          { position: 5, constructor: 'Renault', points: 91, wins: 0, podiums: 2, country: 'France', countryCode: 'fr', drivers: ['Daniel Ricciardo', 'Nico Hülkenberg'] },
          { position: 6, constructor: 'Toro Rosso', points: 85, wins: 0, podiums: 1, country: 'Italy', countryCode: 'it', drivers: ['Daniil Kvyat', 'Alexander Albon'] },
          { position: 7, constructor: 'Racing Point', points: 73, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Sergio Pérez', 'Lance Stroll'] },
          { position: 8, constructor: 'Alfa Romeo', points: 57, wins: 0, podiums: 0, country: 'Switzerland', countryCode: 'ch', drivers: ['Kimi Räikkönen', 'Antonio Giovinazzi'] },
          { position: 9, constructor: 'Haas', points: 28, wins: 0, podiums: 0, country: 'United States', countryCode: 'us', drivers: ['Romain Grosjean', 'Kevin Magnussen'] },
          { position: 10, constructor: 'Williams', points: 1, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['George Russell', 'Robert Kubica'] }
        ]
      },      2018: {
        year: 2018,
        drivers: [
          { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes', points: 408, wins: 11, podiums: 17, country: 'United Kingdom', countryCode: 'gb' },
          { position: 2, driver: 'Sebastian Vettel', team: 'Ferrari', points: 320, wins: 5, podiums: 12, country: 'Germany', countryCode: 'de' },
          { position: 3, driver: 'Kimi Räikkönen', team: 'Ferrari', points: 251, wins: 1, podiums: 6, country: 'Finland', countryCode: 'fi' },
          { position: 4, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 249, wins: 2, podiums: 11, country: 'Netherlands', countryCode: 'nl' },
          { position: 5, driver: 'Valtteri Bottas', team: 'Mercedes', points: 247, wins: 0, podiums: 9, country: 'Finland', countryCode: 'fi' },
          { position: 6, driver: 'Daniel Ricciardo', team: 'Red Bull Racing', points: 170, wins: 2, podiums: 2, country: 'Australia', countryCode: 'au' },
          { position: 7, driver: 'Nico Hülkenberg', team: 'Renault', points: 69, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 8, driver: 'Fernando Alonso', team: 'McLaren', points: 50, wins: 0, podiums: 0, country: 'Spain', countryCode: 'es' },
          { position: 9, driver: 'Carlos Sainz', team: 'Renault', points: 53, wins: 0, podiums: 0, country: 'Spain', countryCode: 'es' },
          { position: 10, driver: 'Kevin Magnussen', team: 'Haas', points: 56, wins: 0, podiums: 0, country: 'Denmark', countryCode: 'dk' },
          { position: 11, driver: 'Sergio Pérez', team: 'Force India', points: 62, wins: 0, podiums: 0, country: 'Mexico', countryCode: 'mx' },
          { position: 12, driver: 'Pierre Gasly', team: 'Toro Rosso', points: 29, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 13, driver: 'Esteban Ocon', team: 'Force India', points: 49, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 14, driver: 'Charles Leclerc', team: 'Sauber', points: 39, wins: 0, podiums: 0, country: 'Monaco', countryCode: 'mc' },
          { position: 15, driver: 'Romain Grosjean', team: 'Haas', points: 37, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 16, driver: 'Stoffel Vandoorne', team: 'McLaren', points: 12, wins: 0, podiums: 0, country: 'Belgium', countryCode: 'be' },
          { position: 17, driver: 'Marcus Ericsson', team: 'Sauber', points: 9, wins: 0, podiums: 0, country: 'Sweden', countryCode: 'se' },
          { position: 18, driver: 'Lance Stroll', team: 'Williams', points: 6, wins: 0, podiums: 0, country: 'Canada', countryCode: 'ca' },
          { position: 19, driver: 'Brendon Hartley', team: 'Toro Rosso', points: 4, wins: 0, podiums: 0, country: 'New Zealand', countryCode: 'nz' },
          { position: 20, driver: 'Sergey Sirotkin', team: 'Williams', points: 1, wins: 0, podiums: 0, country: 'Russia', countryCode: 'ru' }
        ],
        constructors: [
          { position: 1, constructor: 'Mercedes', points: 655, wins: 11, podiums: 26, country: 'Germany', countryCode: 'de', drivers: ['Lewis Hamilton', 'Valtteri Bottas'] },
          { position: 2, constructor: 'Ferrari', points: 571, wins: 6, podiums: 18, country: 'Italy', countryCode: 'it', drivers: ['Sebastian Vettel', 'Kimi Räikkönen'] },
          { position: 3, constructor: 'Red Bull Racing', points: 419, wins: 4, podiums: 17, country: 'Austria', countryCode: 'at', drivers: ['Max Verstappen', 'Daniel Ricciardo'] },
          { position: 4, constructor: 'Renault', points: 122, wins: 0, podiums: 0, country: 'France', countryCode: 'fr', drivers: ['Nico Hülkenberg', 'Carlos Sainz'] },
          { position: 5, constructor: 'Haas', points: 93, wins: 0, podiums: 0, country: 'United States', countryCode: 'us', drivers: ['Romain Grosjean', 'Kevin Magnussen'] },
          { position: 6, constructor: 'McLaren', points: 62, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Fernando Alonso', 'Stoffel Vandoorne'] },
          { position: 7, constructor: 'Force India', points: 111, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Sergio Pérez', 'Esteban Ocon'] },
          { position: 8, constructor: 'Sauber', points: 48, wins: 0, podiums: 0, country: 'Switzerland', countryCode: 'ch', drivers: ['Charles Leclerc', 'Marcus Ericsson'] },
          { position: 9, constructor: 'Toro Rosso', points: 33, wins: 0, podiums: 0, country: 'Italy', countryCode: 'it', drivers: ['Pierre Gasly', 'Brendon Hartley'] },
          { position: 10, constructor: 'Williams', points: 7, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Lance Stroll', 'Sergey Sirotkin'] }
        ]
      },      2017: {
        year: 2017,
        drivers: [
          { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes', points: 363, wins: 9, podiums: 13, country: 'United Kingdom', countryCode: 'gb' },
          { position: 2, driver: 'Sebastian Vettel', team: 'Ferrari', points: 317, wins: 5, podiums: 13, country: 'Germany', countryCode: 'de' },
          { position: 3, driver: 'Valtteri Bottas', team: 'Mercedes', points: 305, wins: 3, podiums: 10, country: 'Finland', countryCode: 'fi' },
          { position: 4, driver: 'Kimi Räikkönen', team: 'Ferrari', points: 205, wins: 0, podiums: 5, country: 'Finland', countryCode: 'fi' },
          { position: 5, driver: 'Daniel Ricciardo', team: 'Red Bull Racing', points: 200, wins: 1, podiums: 5, country: 'Australia', countryCode: 'au' },
          { position: 6, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 168, wins: 2, podiums: 4, country: 'Netherlands', countryCode: 'nl' },
          { position: 7, driver: 'Sergio Pérez', team: 'Force India', points: 100, wins: 0, podiums: 1, country: 'Mexico', countryCode: 'mx' },
          { position: 8, driver: 'Esteban Ocon', team: 'Force India', points: 87, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 9, driver: 'Carlos Sainz', team: 'Toro Rosso', points: 54, wins: 0, podiums: 0, country: 'Spain', countryCode: 'es' },
          { position: 10, driver: 'Nico Hülkenberg', team: 'Renault', points: 43, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 11, driver: 'Felipe Massa', team: 'Williams', points: 43, wins: 0, podiums: 0, country: 'Brazil', countryCode: 'br' },
          { position: 12, driver: 'Lance Stroll', team: 'Williams', points: 40, wins: 0, podiums: 1, country: 'Canada', countryCode: 'ca' },
          { position: 13, driver: 'Romain Grosjean', team: 'Haas', points: 28, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 14, driver: 'Kevin Magnussen', team: 'Haas', points: 19, wins: 0, podiums: 0, country: 'Denmark', countryCode: 'dk' },
          { position: 15, driver: 'Fernando Alonso', team: 'McLaren', points: 17, wins: 0, podiums: 0, country: 'Spain', countryCode: 'es' },
          { position: 16, driver: 'Stoffel Vandoorne', team: 'McLaren', points: 13, wins: 0, podiums: 0, country: 'Belgium', countryCode: 'be' },
          { position: 17, driver: 'Jolyon Palmer', team: 'Renault', points: 8, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb' },
          { position: 18, driver: 'Pascal Wehrlein', team: 'Sauber', points: 5, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 19, driver: 'Daniil Kvyat', team: 'Toro Rosso', points: 5, wins: 0, podiums: 0, country: 'Russia', countryCode: 'ru' },
          { position: 20, driver: 'Marcus Ericsson', team: 'Sauber', points: 0, wins: 0, podiums: 0, country: 'Sweden', countryCode: 'se' }
        ],
        constructors: [
          { position: 1, constructor: 'Mercedes', points: 668, wins: 12, podiums: 23, country: 'Germany', countryCode: 'de', drivers: ['Lewis Hamilton', 'Valtteri Bottas'] },
          { position: 2, constructor: 'Ferrari', points: 522, wins: 5, podiums: 18, country: 'Italy', countryCode: 'it', drivers: ['Sebastian Vettel', 'Kimi Räikkönen'] },
          { position: 3, constructor: 'Red Bull Racing', points: 368, wins: 3, podiums: 10, country: 'Austria', countryCode: 'at', drivers: ['Daniel Ricciardo', 'Max Verstappen'] },
          { position: 4, constructor: 'Force India', points: 187, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb', drivers: ['Sergio Pérez', 'Esteban Ocon'] },
          { position: 5, constructor: 'Williams', points: 83, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb', drivers: ['Felipe Massa', 'Lance Stroll'] },
          { position: 6, constructor: 'Toro Rosso', points: 53, wins: 0, podiums: 0, country: 'Italy', countryCode: 'it', drivers: ['Carlos Sainz', 'Daniil Kvyat'] },
          { position: 7, constructor: 'Haas', points: 47, wins: 0, podiums: 0, country: 'United States', countryCode: 'us', drivers: ['Romain Grosjean', 'Kevin Magnussen'] },
          { position: 8, constructor: 'Renault', points: 57, wins: 0, podiums: 0, country: 'France', countryCode: 'fr', drivers: ['Nico Hülkenberg', 'Jolyon Palmer'] },
          { position: 9, constructor: 'McLaren', points: 30, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Fernando Alonso', 'Stoffel Vandoorne'] },
          { position: 10, constructor: 'Sauber', points: 5, wins: 0, podiums: 0, country: 'Switzerland', countryCode: 'ch', drivers: ['Pascal Wehrlein', 'Marcus Ericsson'] }
        ]
      },      2016: {
        year: 2016,
        drivers: [
          { position: 1, driver: 'Nico Rosberg', team: 'Mercedes', points: 385, wins: 9, podiums: 16, country: 'Germany', countryCode: 'de' },
          { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes', points: 380, wins: 10, podiums: 14, country: 'United Kingdom', countryCode: 'gb' },
          { position: 3, driver: 'Daniel Ricciardo', team: 'Red Bull Racing', points: 256, wins: 1, podiums: 8, country: 'Australia', countryCode: 'au' },
          { position: 4, driver: 'Sebastian Vettel', team: 'Ferrari', points: 212, wins: 0, podiums: 5, country: 'Germany', countryCode: 'de' },
          { position: 5, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 204, wins: 1, podiums: 7, country: 'Netherlands', countryCode: 'nl' },
          { position: 6, driver: 'Kimi Räikkönen', team: 'Ferrari', points: 186, wins: 0, podiums: 3, country: 'Finland', countryCode: 'fi' },
          { position: 7, driver: 'Sergio Pérez', team: 'Force India', points: 101, wins: 0, podiums: 0, country: 'Mexico', countryCode: 'mx' },
          { position: 8, driver: 'Valtteri Bottas', team: 'Williams', points: 85, wins: 0, podiums: 0, country: 'Finland', countryCode: 'fi' },
          { position: 9, driver: 'Nico Hülkenberg', team: 'Force India', points: 72, wins: 0, podiums: 1, country: 'Germany', countryCode: 'de' },
          { position: 10, driver: 'Fernando Alonso', team: 'McLaren', points: 54, wins: 0, podiums: 0, country: 'Spain', countryCode: 'es' },
          { position: 11, driver: 'Felipe Massa', team: 'Williams', points: 53, wins: 0, podiums: 1, country: 'Brazil', countryCode: 'br' },
          { position: 12, driver: 'Carlos Sainz', team: 'Toro Rosso', points: 46, wins: 0, podiums: 0, country: 'Spain', countryCode: 'es' },
          { position: 13, driver: 'Romain Grosjean', team: 'Haas', points: 29, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 14, driver: 'Daniil Kvyat', team: 'Toro Rosso', points: 25, wins: 0, podiums: 1, country: 'Russia', countryCode: 'ru' },
          { position: 15, driver: 'Jenson Button', team: 'McLaren', points: 21, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb' },
          { position: 16, driver: 'Kevin Magnussen', team: 'Renault', points: 7, wins: 0, podiums: 0, country: 'Denmark', countryCode: 'dk' },
          { position: 17, driver: 'Stoffel Vandoorne', team: 'McLaren', points: 1, wins: 0, podiums: 0, country: 'Belgium', countryCode: 'be' },
          { position: 18, driver: 'Jolyon Palmer', team: 'Renault', points: 1, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb' },
          { position: 19, driver: 'Pascal Wehrlein', team: 'Manor', points: 1, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 20, driver: 'Esteban Gutiérrez', team: 'Haas', points: 0, wins: 0, podiums: 0, country: 'Mexico', countryCode: 'mx' }
        ],
        constructors: [
          { position: 1, constructor: 'Mercedes', points: 765, wins: 19, podiums: 30, country: 'Germany', countryCode: 'de', drivers: ['Lewis Hamilton', 'Nico Rosberg'] },
          { position: 2, constructor: 'Red Bull Racing', points: 468, wins: 2, podiums: 15, country: 'Austria', countryCode: 'at', drivers: ['Daniel Ricciardo', 'Max Verstappen'] },
          { position: 3, constructor: 'Ferrari', points: 398, wins: 0, podiums: 9, country: 'Italy', countryCode: 'it', drivers: ['Sebastian Vettel', 'Kimi Räikkönen'] },
          { position: 4, constructor: 'Force India', points: 173, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb', drivers: ['Sergio Pérez', 'Nico Hülkenberg'] },
          { position: 5, constructor: 'Williams', points: 138, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb', drivers: ['Valtteri Bottas', 'Felipe Massa'] },
          { position: 6, constructor: 'McLaren', points: 76, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Fernando Alonso', 'Jenson Button'] },
          { position: 7, constructor: 'Toro Rosso', points: 63, wins: 0, podiums: 1, country: 'Italy', countryCode: 'it', drivers: ['Carlos Sainz', 'Daniil Kvyat'] },
          { position: 8, constructor: 'Haas', points: 29, wins: 0, podiums: 0, country: 'United States', countryCode: 'us', drivers: ['Romain Grosjean', 'Esteban Gutiérrez'] },
          { position: 9, constructor: 'Renault', points: 8, wins: 0, podiums: 0, country: 'France', countryCode: 'fr', drivers: ['Kevin Magnussen', 'Jolyon Palmer'] },
          { position: 10, constructor: 'Sauber', points: 2, wins: 0, podiums: 0, country: 'Switzerland', countryCode: 'ch', drivers: ['Marcus Ericsson', 'Felipe Nasr'] }
        ]
      },      2015: {
        year: 2015,
        drivers: [
          { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes', points: 381, wins: 10, podiums: 17, country: 'United Kingdom', countryCode: 'gb' },
          { position: 2, driver: 'Nico Rosberg', team: 'Mercedes', points: 322, wins: 6, podiums: 13, country: 'Germany', countryCode: 'de' },
          { position: 3, driver: 'Sebastian Vettel', team: 'Ferrari', points: 278, wins: 3, podiums: 13, country: 'Germany', countryCode: 'de' },
          { position: 4, driver: 'Kimi Räikkönen', team: 'Ferrari', points: 150, wins: 0, podiums: 4, country: 'Finland', countryCode: 'fi' },
          { position: 5, driver: 'Valtteri Bottas', team: 'Williams', points: 136, wins: 0, podiums: 2, country: 'Finland', countryCode: 'fi' },
          { position: 6, driver: 'Felipe Massa', team: 'Williams', points: 121, wins: 0, podiums: 2, country: 'Brazil', countryCode: 'br' },
          { position: 7, driver: 'Daniel Ricciardo', team: 'Red Bull Racing', points: 92, wins: 0, podiums: 2, country: 'Australia', countryCode: 'au' },
          { position: 8, driver: 'Daniil Kvyat', team: 'Red Bull Racing', points: 95, wins: 0, podiums: 1, country: 'Russia', countryCode: 'ru' },
          { position: 9, driver: 'Sergio Pérez', team: 'Force India', points: 78, wins: 0, podiums: 1, country: 'Mexico', countryCode: 'mx' },
          { position: 10, driver: 'Nico Hülkenberg', team: 'Force India', points: 58, wins: 0, podiums: 0, country: 'Germany', countryCode: 'de' },
          { position: 11, driver: 'Carlos Sainz', team: 'Toro Rosso', points: 18, wins: 0, podiums: 0, country: 'Spain', countryCode: 'es' },
          { position: 12, driver: 'Romain Grosjean', team: 'Lotus', points: 51, wins: 0, podiums: 1, country: 'France', countryCode: 'fr' },
          { position: 13, driver: 'Max Verstappen', team: 'Toro Rosso', points: 49, wins: 0, podiums: 0, country: 'Netherlands', countryCode: 'nl' },
          { position: 14, driver: 'Pastor Maldonado', team: 'Lotus', points: 27, wins: 0, podiums: 0, country: 'Venezuela', countryCode: 've' },
          { position: 15, driver: 'Fernando Alonso', team: 'McLaren', points: 11, wins: 0, podiums: 0, country: 'Spain', countryCode: 'es' },
          { position: 16, driver: 'Jenson Button', team: 'McLaren', points: 16, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb' },
          { position: 17, driver: 'Felipe Nasr', team: 'Sauber', points: 27, wins: 0, podiums: 0, country: 'Brazil', countryCode: 'br' },
          { position: 18, driver: 'Marcus Ericsson', team: 'Sauber', points: 9, wins: 0, podiums: 0, country: 'Sweden', countryCode: 'se' },
          { position: 19, driver: 'Jean-Éric Vergne', team: 'Toro Rosso', points: 0, wins: 0, podiums: 0, country: 'France', countryCode: 'fr' },
          { position: 20, driver: 'Will Stevens', team: 'Manor', points: 0, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb' }
        ],
        constructors: [
          { position: 1, constructor: 'Mercedes', points: 703, wins: 16, podiums: 30, country: 'Germany', countryCode: 'de', drivers: ['Lewis Hamilton', 'Nico Rosberg'] },
          { position: 2, constructor: 'Ferrari', points: 428, wins: 3, podiums: 17, country: 'Italy', countryCode: 'it', drivers: ['Sebastian Vettel', 'Kimi Räikkönen'] },
          { position: 3, constructor: 'Williams', points: 257, wins: 0, podiums: 4, country: 'United Kingdom', countryCode: 'gb', drivers: ['Valtteri Bottas', 'Felipe Massa'] },
          { position: 4, constructor: 'Red Bull Racing', points: 187, wins: 0, podiums: 3, country: 'Austria', countryCode: 'at', drivers: ['Daniel Ricciardo', 'Daniil Kvyat'] },
          { position: 5, constructor: 'Force India', points: 136, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb', drivers: ['Sergio Pérez', 'Nico Hülkenberg'] },
          { position: 6, constructor: 'Lotus', points: 78, wins: 0, podiums: 1, country: 'United Kingdom', countryCode: 'gb', drivers: ['Romain Grosjean', 'Pastor Maldonado'] },
          { position: 7, constructor: 'Toro Rosso', points: 67, wins: 0, podiums: 0, country: 'Italy', countryCode: 'it', drivers: ['Carlos Sainz', 'Max Verstappen'] },
          { position: 8, constructor: 'Sauber', points: 36, wins: 0, podiums: 0, country: 'Switzerland', countryCode: 'ch', drivers: ['Felipe Nasr', 'Marcus Ericsson'] },
          { position: 9, constructor: 'McLaren', points: 27, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Fernando Alonso', 'Jenson Button'] },
          { position: 10, constructor: 'Manor', points: 0, wins: 0, podiums: 0, country: 'United Kingdom', countryCode: 'gb', drivers: ['Will Stevens', 'Roberto Merhi'] }
        ]
      }
    };
  }
  selectYear(event: any) {
    const year = parseInt(event.target.value);
    this.selectedYear = year;
    if (year === 2025) {
      // Use current season data
      this.loadStandings();
    } else {
      // Use historical data
      const historical = this.historicalStandings[year];
      if (historical) {
        this.driverStandings = historical.drivers;
        this.constructorStandings = historical.constructors;
      }
    }
  }
}
