import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

interface RaceResult {
  position: number;
  driver: string;
  team: string;
  points?: number;
}

interface HistoricalResult {
  year: number;
  top5: RaceResult[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class CalendarComponent implements OnInit {
  today = new Date();
  loading = true;
  selectedGP: GrandPrix | null = null;
  sessions: Session[] = [];
  results: RaceResult[] = [];
  historicalResults: HistoricalResult[] = [];
  allHistoricalResults: HistoricalResult[] = [];
  grandPrixList: GrandPrix[] = [];
  selectedYear: number | null = null;
  availableYears: number[] = [2024, 2023, 2022, 2021];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGrandPrixData();
  }
  loadGrandPrixData() {
    this.grandPrixList = [
      {
        id: 1,
        name: 'Gran Premio de Bahrain',
        country: 'Bahrain',
        countryCode: 'bh',
        location: 'Sakhir',
        date: '2025-03-16',
        circuit: 'Circuito Internacional de Bahrain',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-03-14', time: '11:30' },
          { name: 'Práctica Libre 2', date: '2025-03-14', time: '15:00' },
          { name: 'Práctica Libre 3', date: '2025-03-15', time: '11:30' },
          { name: 'Clasificación', date: '2025-03-15', time: '15:00' },
          { name: 'Carrera', date: '2025-03-16', time: '15:00' }
        ],
        isPast: true,
        hasResults: true
      },
      {
        id: 2,
        name: 'Gran Premio de Arabia Saudí',
        country: 'Saudi Arabia',
        countryCode: 'sa',
        location: 'Jeddah',
        date: '2025-03-23',
        circuit: 'Circuito Urbano de Jeddah',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-03-21', time: '13:30' },
          { name: 'Práctica Libre 2', date: '2025-03-21', time: '17:00' },
          { name: 'Práctica Libre 3', date: '2025-03-22', time: '13:30' },
          { name: 'Clasificación', date: '2025-03-22', time: '17:00' },
          { name: 'Carrera', date: '2025-03-23', time: '17:00' }
        ],
        isPast: true,
        hasResults: true
      },
      {
        id: 3,
        name: 'Gran Premio de Australia',
        country: 'Australia',
        countryCode: 'au',
        location: 'Melbourne',
        date: '2025-04-06',
        circuit: 'Circuito de Albert Park',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-04-04', time: '01:30' },
          { name: 'Práctica Libre 2', date: '2025-04-04', time: '05:00' },
          { name: 'Práctica Libre 3', date: '2025-04-05', time: '01:30' },
          { name: 'Clasificación', date: '2025-04-05', time: '05:00' },
          { name: 'Carrera', date: '2025-04-06', time: '05:00' }
        ],
        isPast: true,
        hasResults: true
      },
      {
        id: 4,
        name: 'Gran Premio de China',
        country: 'China',
        countryCode: 'cn',
        location: 'Shanghai',
        date: '2025-04-20',
        circuit: 'Circuito Internacional de Shanghai',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-04-18', time: '03:30' },
          { name: 'Práctica Libre 2', date: '2025-04-18', time: '07:00' },
          { name: 'Práctica Libre 3', date: '2025-04-19', time: '03:30' },
          { name: 'Clasificación', date: '2025-04-19', time: '07:00' },
          { name: 'Carrera', date: '2025-04-20', time: '07:00' }
        ],
        isPast: true,
        hasResults: true
      },
      {
        id: 5,
        name: 'Gran Premio de Miami',
        country: 'United States',
        countryCode: 'us',
        location: 'Miami Gardens',
        date: '2025-05-04',
        circuit: 'Autodrome Internacional de Miami',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-05-02', time: '20:30' },
          { name: 'Práctica Libre 2', date: '2025-05-02', time: '00:00' },
          { name: 'Práctica Libre 3', date: '2025-05-03', time: '19:30' },
          { name: 'Clasificación', date: '2025-05-03', time: '23:00' },
          { name: 'Carrera', date: '2025-05-04', time: '21:30' }
        ],
        isPast: true,
        hasResults: true
      },
      {
        id: 6,
        name: 'Gran Premio de Emilia-Romaña',
        country: 'Italy',
        countryCode: 'it',
        location: 'Imola',
        date: '2025-05-18',
        circuit: 'Autodromo Enzo e Dino Ferrari',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-05-16', time: '13:30' },
          { name: 'Práctica Libre 2', date: '2025-05-16', time: '17:00' },
          { name: 'Práctica Libre 3', date: '2025-05-17', time: '12:30' },
          { name: 'Clasificación', date: '2025-05-17', time: '16:00' },
          { name: 'Carrera', date: '2025-05-18', time: '15:00' }
        ],
        isPast: true,
        hasResults: true
      },
      {        id: 7,
        name: 'Gran Premio de Mónaco',
        country: 'Monaco',
        countryCode: 'mc',
        location: 'Monte Carlo',
        date: '2025-05-25',
        circuit: 'Circuito de Monte Carlo',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-05-23', time: '13:30' },
          { name: 'Práctica Libre 2', date: '2025-05-23', time: '17:00' },
          { name: 'Práctica Libre 3', date: '2025-05-24', time: '12:30' },
          { name: 'Clasificación', date: '2025-05-24', time: '16:00' },
          { name: 'Carrera', date: '2025-05-25', time: '15:00' }
        ],
        isPast: true,
        hasResults: true
      },
      {
        id: 8,
        name: 'Gran Premio de Canadá',
        country: 'Canada',
        countryCode: 'ca',
        location: 'Montreal',
        date: '2025-06-08',
        circuit: 'Circuito Gilles Villeneuve',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-06-06', time: '19:30' },
          { name: 'Práctica Libre 2', date: '2025-06-06', time: '23:00' },
          { name: 'Práctica Libre 3', date: '2025-06-07', time: '18:30' },
          { name: 'Clasificación', date: '2025-06-07', time: '22:00' },
          { name: 'Carrera', date: '2025-06-08', time: '20:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 9,
        name: 'Gran Premio de España',
        country: 'Spain',
        countryCode: 'es',
        location: 'Barcelona',
        date: '2025-06-22',
        circuit: 'Circuito de Barcelona-Catalunya',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-06-20', time: '13:30' },
          { name: 'Práctica Libre 2', date: '2025-06-20', time: '17:00' },
          { name: 'Práctica Libre 3', date: '2025-06-21', time: '12:30' },
          { name: 'Clasificación', date: '2025-06-21', time: '16:00' },
          { name: 'Carrera', date: '2025-06-22', time: '15:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 10,
        name: 'Gran Premio de Austria',
        country: 'Austria',
        countryCode: 'at',
        location: 'Spielberg',
        date: '2025-06-29',
        circuit: 'Red Bull Ring',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-06-27', time: '13:30' },
          { name: 'Práctica Libre 2', date: '2025-06-27', time: '17:00' },
          { name: 'Práctica Libre 3', date: '2025-06-28', time: '12:30' },
          { name: 'Clasificación', date: '2025-06-28', time: '16:00' },
          { name: 'Carrera', date: '2025-06-29', time: '15:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {        id: 11,
        name: 'Gran Premio de Gran Bretaña',
        country: 'United Kingdom',
        countryCode: 'gb',
        location: 'Silverstone',
        date: '2025-07-13',
        circuit: 'Circuito de Silverstone',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-07-11', time: '13:30' },
          { name: 'Práctica Libre 2', date: '2025-07-11', time: '17:00' },
          { name: 'Práctica Libre 3', date: '2025-07-12', time: '12:30' },
          { name: 'Clasificación', date: '2025-07-12', time: '16:00' },
          { name: 'Carrera', date: '2025-07-13', time: '15:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 12,
        name: 'Gran Premio de Hungría',
        country: 'Hungary',
        countryCode: 'hu',
        location: 'Budapest',
        date: '2025-07-27',
        circuit: 'Hungaroring',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-07-25', time: '13:30' },
          { name: 'Práctica Libre 2', date: '2025-07-25', time: '17:00' },
          { name: 'Práctica Libre 3', date: '2025-07-26', time: '12:30' },
          { name: 'Clasificación', date: '2025-07-26', time: '16:00' },
          { name: 'Carrera', date: '2025-07-27', time: '15:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 13,
        name: 'Gran Premio de Bélgica',
        country: 'Belgium',
        countryCode: 'be',
        location: 'Spa-Francorchamps',
        date: '2025-08-31',
        circuit: 'Circuito de Spa-Francorchamps',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-08-29', time: '13:30' },
          { name: 'Práctica Libre 2', date: '2025-08-29', time: '17:00' },
          { name: 'Práctica Libre 3', date: '2025-08-30', time: '12:30' },
          { name: 'Clasificación', date: '2025-08-30', time: '16:00' },
          { name: 'Carrera', date: '2025-08-31', time: '15:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 14,
        name: 'Gran Premio de los Países Bajos',
        country: 'Netherlands',
        countryCode: 'nl',
        location: 'Zandvoort',
        date: '2025-09-07',
        circuit: 'Circuito de Zandvoort',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-09-05', time: '12:30' },
          { name: 'Práctica Libre 2', date: '2025-09-05', time: '16:00' },
          { name: 'Práctica Libre 3', date: '2025-09-06', time: '11:30' },
          { name: 'Clasificación', date: '2025-09-06', time: '15:00' },
          { name: 'Carrera', date: '2025-09-07', time: '15:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 15,
        name: 'Gran Premio de Italia',
        country: 'Italy',
        countryCode: 'it',
        location: 'Monza',
        date: '2025-09-14',
        circuit: 'Autodromo Nacional de Monza',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-09-12', time: '13:30' },
          { name: 'Práctica Libre 2', date: '2025-09-12', time: '17:00' },
          { name: 'Práctica Libre 3', date: '2025-09-13', time: '12:30' },
          { name: 'Clasificación', date: '2025-09-13', time: '16:00' },
          { name: 'Carrera', date: '2025-09-14', time: '15:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 16,
        name: 'Gran Premio de Azerbaiyán',
        country: 'Azerbaijan',
        countryCode: 'az',
        location: 'Bakú',
        date: '2025-09-21',
        circuit: 'Circuito Urbano de Bakú',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-09-19', time: '11:30' },
          { name: 'Práctica Libre 2', date: '2025-09-19', time: '15:00' },
          { name: 'Práctica Libre 3', date: '2025-09-20', time: '10:30' },
          { name: 'Clasificación', date: '2025-09-20', time: '14:00' },
          { name: 'Carrera', date: '2025-09-21', time: '13:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 17,
        name: 'Gran Premio de Singapur',
        country: 'Singapore',
        countryCode: 'sg',
        location: 'Marina Bay',
        date: '2025-10-05',
        circuit: 'Circuito Urbano de Marina Bay',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-10-03', time: '11:30' },
          { name: 'Práctica Libre 2', date: '2025-10-03', time: '15:00' },
          { name: 'Práctica Libre 3', date: '2025-10-04', time: '11:30' },
          { name: 'Clasificación', date: '2025-10-04', time: '15:00' },
          { name: 'Carrera', date: '2025-10-05', time: '14:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 18,
        name: 'Gran Premio de Japón',
        country: 'Japan',
        countryCode: 'jp',
        location: 'Suzuka',
        date: '2025-10-12',
        circuit: 'Circuito Internacional de Suzuka',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-10-10', time: '04:30' },
          { name: 'Práctica Libre 2', date: '2025-10-10', time: '08:00' },
          { name: 'Práctica Libre 3', date: '2025-10-11', time: '04:30' },
          { name: 'Clasificación', date: '2025-10-11', time: '08:00' },
          { name: 'Carrera', date: '2025-10-12', time: '07:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 19,
        name: 'Gran Premio de Qatar',
        country: 'Qatar',
        countryCode: 'qa',
        location: 'Lusail',
        date: '2025-10-19',
        circuit: 'Circuito Internacional de Lusail',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-10-17', time: '13:30' },
          { name: 'Práctica Libre 2', date: '2025-10-17', time: '17:00' },
          { name: 'Práctica Libre 3', date: '2025-10-18', time: '14:30' },
          { name: 'Clasificación', date: '2025-10-18', time: '18:00' },
          { name: 'Carrera', date: '2025-10-19', time: '17:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 20,
        name: 'Gran Premio de Estados Unidos',
        country: 'United States',
        countryCode: 'us',
        location: 'Austin',
        date: '2025-10-26',
        circuit: 'Circuito de las Américas',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-10-24', time: '19:30' },
          { name: 'Práctica Libre 2', date: '2025-10-24', time: '23:00' },
          { name: 'Práctica Libre 3', date: '2025-10-25', time: '19:30' },
          { name: 'Clasificación', date: '2025-10-25', time: '23:00' },
          { name: 'Carrera', date: '2025-10-26', time: '21:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 21,
        name: 'Gran Premio de México',
        country: 'Mexico',
        countryCode: 'mx',
        location: 'Ciudad de México',
        date: '2025-11-02',
        circuit: 'Autódromo Hermanos Rodríguez',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-10-31', time: '20:30' },
          { name: 'Práctica Libre 2', date: '2025-10-31', time: '00:00' },
          { name: 'Práctica Libre 3', date: '2025-11-01', time: '19:30' },
          { name: 'Clasificación', date: '2025-11-01', time: '23:00' },
          { name: 'Carrera', date: '2025-11-02', time: '21:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 22,
        name: 'Gran Premio de Brasil',
        country: 'Brazil',
        countryCode: 'br',
        location: 'São Paulo',
        date: '2025-11-09',
        circuit: 'Autódromo José Carlos Pace (Interlagos)',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-11-07', time: '15:30' },
          { name: 'Práctica Libre 2', date: '2025-11-07', time: '19:00' },
          { name: 'Práctica Libre 3', date: '2025-11-08', time: '15:30' },
          { name: 'Clasificación', date: '2025-11-08', time: '19:00' },
          { name: 'Carrera', date: '2025-11-09', time: '18:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 23,
        name: 'Gran Premio de Las Vegas',
        country: 'United States',
        countryCode: 'us',
        location: 'Las Vegas',
        date: '2025-11-23',
        circuit: 'Circuito Urbano de Las Vegas',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-11-21', time: '03:30' },
          { name: 'Práctica Libre 2', date: '2025-11-21', time: '07:00' },
          { name: 'Práctica Libre 3', date: '2025-11-22', time: '03:30' },
          { name: 'Clasificación', date: '2025-11-22', time: '07:00' },
          { name: 'Carrera', date: '2025-11-23', time: '06:00' }
        ],
        isPast: false,
        hasResults: false
      },
      {
        id: 24,
        name: 'Gran Premio de Abu Dhabi',
        country: 'United Arab Emirates',
        countryCode: 'ae',
        location: 'Abu Dhabi',
        date: '2025-12-07',
        circuit: 'Circuito Yas Marina',
        sessions: [
          { name: 'Práctica Libre 1', date: '2025-12-05', time: '09:30' },
          { name: 'Práctica Libre 2', date: '2025-12-05', time: '13:00' },
          { name: 'Práctica Libre 3', date: '2025-12-06', time: '10:30' },
          { name: 'Clasificación', date: '2025-12-06', time: '14:00' },
          { name: 'Carrera', date: '2025-12-07', time: '13:00' }
        ],
        isPast: false,
        hasResults: false
      }
    ];
    this.loading = false;
  }
  getFlagUrl(countryCode: string): string {
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  }
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Capitalize first letter of each word
    return formattedDate.replace(/\b\w/g, l => l.toUpperCase());
  }

  formatTime(timeStr: string): string {
    return timeStr;
  }

  formatSessionDate(dateStr: string): string {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Capitalize first letter of each word
    return formattedDate.replace(/\b\w/g, l => l.toUpperCase());
  }

  isPast(gp: GrandPrix): boolean {
    const gpDate = new Date(gp.date);
    return gpDate < this.today;
  }

  showGPDetails(gp: GrandPrix) {
    this.selectedGP = gp;
    this.sessions = gp.sessions;
    
    if (gp.hasResults && this.isPast(gp)) {
      this.loadRaceResults(gp.id);
    } else {
      this.loadHistoricalResults(gp.id);
    }
  }

  closeGPDetails() {
    this.selectedGP = null;
    this.sessions = [];
    this.results = [];
    this.historicalResults = [];
  }

  loadRaceResults(gpId: number) {
    // Simulamos resultados de carreras disputadas
    const mockResults: { [key: number]: RaceResult[] } = {
      1: [ // Bahrain
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 25 },
        { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 18 },
        { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', points: 15 },
        { position: 4, driver: 'Carlos Sainz', team: 'Ferrari', points: 12 },
        { position: 5, driver: 'Lando Norris', team: 'McLaren', points: 10 },
        { position: 6, driver: 'Oscar Piastri', team: 'McLaren', points: 8 },
        { position: 7, driver: 'George Russell', team: 'Mercedes', points: 6 },
        { position: 8, driver: 'Lewis Hamilton', team: 'Mercedes', points: 4 },
        { position: 9, driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
        { position: 10, driver: 'Lance Stroll', team: 'Aston Martin', points: 1 }
      ],
      2: [ // Saudi Arabia
        { position: 1, driver: 'Charles Leclerc', team: 'Ferrari', points: 25 },
        { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 18 },
        { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', points: 15 },
        { position: 4, driver: 'Lando Norris', team: 'McLaren', points: 12 },
        { position: 5, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 10 },
        { position: 6, driver: 'Oscar Piastri', team: 'McLaren', points: 8 },
        { position: 7, driver: 'Lewis Hamilton', team: 'Mercedes', points: 6 },
        { position: 8, driver: 'George Russell', team: 'Mercedes', points: 4 },
        { position: 9, driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
        { position: 10, driver: 'Yuki Tsunoda', team: 'AlphaTauri', points: 1 }
      ],
      3: [ // Australia
        { position: 1, driver: 'Lando Norris', team: 'McLaren', points: 25 },
        { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 18 },
        { position: 3, driver: 'Oscar Piastri', team: 'McLaren', points: 15 },
        { position: 4, driver: 'Charles Leclerc', team: 'Ferrari', points: 12 },
        { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes', points: 10 },
        { position: 6, driver: 'Carlos Sainz', team: 'Ferrari', points: 8 },
        { position: 7, driver: 'George Russell', team: 'Mercedes', points: 6 },
        { position: 8, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 4 },
        { position: 9, driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
        { position: 10, driver: 'Lance Stroll', team: 'Aston Martin', points: 1 }
      ],
      4: [ // China
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 25 },
        { position: 2, driver: 'Lando Norris', team: 'McLaren', points: 18 },
        { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 15 },
        { position: 4, driver: 'Charles Leclerc', team: 'Ferrari', points: 12 },
        { position: 5, driver: 'Oscar Piastri', team: 'McLaren', points: 10 },
        { position: 6, driver: 'Carlos Sainz', team: 'Ferrari', points: 8 },
        { position: 7, driver: 'Lewis Hamilton', team: 'Mercedes', points: 6 },
        { position: 8, driver: 'George Russell', team: 'Mercedes', points: 4 },
        { position: 9, driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
        { position: 10, driver: 'Yuki Tsunoda', team: 'AlphaTauri', points: 1 }
      ],
      5: [ // Miami
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 25 },
        { position: 2, driver: 'Charles Leclerc', team: 'Ferrari', points: 18 },
        { position: 3, driver: 'Lando Norris', team: 'McLaren', points: 15 },
        { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 12 },
        { position: 5, driver: 'Carlos Sainz', team: 'Ferrari', points: 10 },
        { position: 6, driver: 'Lewis Hamilton', team: 'Mercedes', points: 8 },
        { position: 7, driver: 'Oscar Piastri', team: 'McLaren', points: 6 },
        { position: 8, driver: 'George Russell', team: 'Mercedes', points: 4 },
        { position: 9, driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
        { position: 10, driver: 'Lance Stroll', team: 'Aston Martin', points: 1 }
      ],      6: [ // Imola
        { position: 1, driver: 'Charles Leclerc', team: 'Ferrari', points: 25 },
        { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 18 },
        { position: 3, driver: 'Lando Norris', team: 'McLaren', points: 15 },
        { position: 4, driver: 'Carlos Sainz', team: 'Ferrari', points: 12 },
        { position: 5, driver: 'Oscar Piastri', team: 'McLaren', points: 10 },
        { position: 6, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 8 },
        { position: 7, driver: 'Lewis Hamilton', team: 'Mercedes', points: 6 },
        { position: 8, driver: 'George Russell', team: 'Mercedes', points: 4 },
        { position: 9, driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
        { position: 10, driver: 'Yuki Tsunoda', team: 'AlphaTauri', points: 1 }
      ],
      7: [ // Monaco
        { position: 1, driver: 'Charles Leclerc', team: 'Ferrari', points: 25 },
        { position: 2, driver: 'Oscar Piastri', team: 'McLaren', points: 18 },
        { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', points: 15 },
        { position: 4, driver: 'Lando Norris', team: 'McLaren', points: 12 },
        { position: 5, driver: 'George Russell', team: 'Mercedes', points: 10 },
        { position: 6, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 8 },
        { position: 7, driver: 'Lewis Hamilton', team: 'Mercedes', points: 6 },
        { position: 8, driver: 'Sergio Pérez', team: 'Red Bull Racing', points: 4 },
        { position: 9, driver: 'Fernando Alonso', team: 'Aston Martin', points: 2 },
        { position: 10, driver: 'Esteban Ocon', team: 'Alpine', points: 1 }
      ]
    };

    this.results = mockResults[gpId] || [];  }

  loadHistoricalResults(gpId: number) {
    // Simulamos resultados históricos de los últimos 4 años
    const mockHistoricalResults: { [key: number]: HistoricalResult[] } = {
      1: [ // Bahrain
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Fernando Alonso', team: 'Aston Martin' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 2, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Kevin Magnussen', team: 'Haas' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 4, driver: 'Lando Norris', team: 'McLaren' },
            { position: 5, driver: 'Sergio Pérez', team: 'Red Bull Racing' }
          ]
        }
      ],
      2: [ // Saudi Arabia
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 5, driver: 'Fernando Alonso', team: 'Aston Martin' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Fernando Alonso', team: 'Aston Martin' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 4, driver: 'Esteban Ocon', team: 'Alpine' },
            { position: 5, driver: 'Lando Norris', team: 'McLaren' }
          ]
        }
      ],
      3: [ // Australia
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 5, driver: 'Sergio Pérez', team: 'Red Bull Racing' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Fernando Alonso', team: 'Aston Martin' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'Lance Stroll', team: 'Aston Martin' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'George Russell', team: 'Mercedes' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'Lando Norris', team: 'McLaren' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Lando Norris', team: 'McLaren' }
          ]
        }
      ],
      4: [ // China
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Fernando Alonso', team: 'Aston Martin' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'Lance Stroll', team: 'Aston Martin' },
            { position: 5, driver: 'Sergio Pérez', team: 'Red Bull Racing' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 4, driver: 'Lando Norris', team: 'McLaren' },
            { position: 5, driver: 'Charles Leclerc', team: 'Ferrari' }
          ]
        }
      ],
      5: [ // Miami
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Lando Norris', team: 'McLaren' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Fernando Alonso', team: 'Aston Martin' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes' }
          ]
        }
      ],
      6: [ // Emilia-Romagna (Imola)
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Valtteri Bottas', team: 'Alfa Romeo' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        }
      ],
      7: [ // Monaco
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 2, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Lando Norris', team: 'McLaren' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Fernando Alonso', team: 'Aston Martin' },
            { position: 3, driver: 'Esteban Ocon', team: 'Alpine' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 2, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 3, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'Sebastian Vettel', team: 'Aston Martin' }
          ]
        }      ],
      8: [ // Canada
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'George Russell', team: 'Mercedes' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'Oscar Piastri', team: 'McLaren' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Fernando Alonso', team: 'Aston Martin' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Charles Leclerc', team: 'Ferrari' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'Sebastian Vettel', team: 'Aston Martin' }
          ]        }
      ],
      12: [ // Hungary
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Max Verstappen', team: 'Red Bull Racing' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'Oscar Piastri', team: 'McLaren' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'George Russell', team: 'Mercedes' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'Sergio Pérez', team: 'Red Bull Racing' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Esteban Ocon', team: 'Alpine' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Fernando Alonso', team: 'Alpine' },
            { position: 5, driver: 'Pierre Gasly', team: 'AlphaTauri' }
          ]
        }
      ],
      15: [ // Italy (Monza)
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 2, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'George Russell', team: 'Mercedes' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Daniel Ricciardo', team: 'McLaren' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Sergio Pérez', team: 'Red Bull Racing' }
          ]
        }
      ],
      17: [ // Singapore
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Lando Norris', team: 'McLaren' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Charles Leclerc', team: 'Ferrari' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Pierre Gasly', team: 'Alpine' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Lando Norris', team: 'McLaren' },
            { position: 5, driver: 'Daniel Ricciardo', team: 'McLaren' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        }
      ],
      18: [ // Japan
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Lando Norris', team: 'McLaren' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Esteban Ocon', team: 'Alpine' },
            { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Fernando Alonso', team: 'Alpine' }
          ]
        }
      ],
      22: [ // Brazil
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Esteban Ocon', team: 'Alpine' },
            { position: 3, driver: 'Pierre Gasly', team: 'Alpine' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Charles Leclerc', team: 'Ferrari' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Fernando Alonso', team: 'Aston Martin' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'Charles Leclerc', team: 'Ferrari' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'George Russell', team: 'Mercedes' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Fernando Alonso', team: 'Alpine' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'Pierre Gasly', team: 'AlphaTauri' }
          ]
        }
      ],
      23: [ // Las Vegas
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'George Russell', team: 'Mercedes' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Max Verstappen', team: 'Red Bull Racing' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 3, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        }
      ],
      24: [ // Abu Dhabi
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Lando Norris', team: 'McLaren' },
            { position: 2, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'George Russell', team: 'Mercedes' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'Sergio Pérez', team: 'Red Bull Racing' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Yuki Tsunoda', team: 'AlphaTauri' },
            { position: 5, driver: 'Pierre Gasly', team: 'AlphaTauri' }
          ]        }
      ],
      9: [ // Spain
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Charles Leclerc', team: 'Ferrari' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Fernando Alonso', team: 'Aston Martin' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'George Russell', team: 'Mercedes' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes' }
          ]
        },        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Sergio Pérez', team: 'Red Bull Racing' }
          ]
        }
      ],
      10: [ // Austria
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'George Russell', team: 'Mercedes' },
            { position: 2, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'Max Verstappen', team: 'Red Bull Racing' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'Fernando Alonso', team: 'Aston Martin' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Esteban Ocon', team: 'Alpine' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        }
      ],
      11: [ // Great Britain
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Fernando Alonso', team: 'Alpine' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 4, driver: 'Lando Norris', team: 'McLaren' },
            { position: 5, driver: 'Daniel Ricciardo', team: 'McLaren' }
          ]
        }
      ],
      13: [ // Belgium
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 2, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'Fernando Alonso', team: 'Aston Martin' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Fernando Alonso', team: 'Alpine' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'George Russell', team: 'Williams' },
            { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 4, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 5, driver: 'Sergio Pérez', team: 'Red Bull Racing' }
          ]
        }
      ],
      14: [ // Netherlands
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Lando Norris', team: 'McLaren' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 5, driver: 'Fernando Alonso', team: 'Aston Martin' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'George Russell', team: 'Mercedes' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'Sergio Pérez', team: 'Red Bull Racing' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Valtteri Bottas', team: 'Mercedes' },
            { position: 4, driver: 'Pierre Gasly', team: 'AlphaTauri' },
            { position: 5, driver: 'Charles Leclerc', team: 'Ferrari' }
          ]
        }
      ],
      16: [ // Azerbaijan
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'George Russell', team: 'Mercedes' },
            { position: 4, driver: 'Lando Norris', team: 'McLaren' },
            { position: 5, driver: 'Max Verstappen', team: 'Red Bull Racing' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Fernando Alonso', team: 'Aston Martin' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 3, driver: 'George Russell', team: 'Mercedes' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'Pierre Gasly', team: 'AlphaTauri' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 2, driver: 'Sebastian Vettel', team: 'Aston Martin' },
            { position: 3, driver: 'Pierre Gasly', team: 'AlphaTauri' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Lando Norris', team: 'McLaren' }
          ]
        }
      ],
      19: [ // Qatar
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Pierre Gasly', team: 'Alpine' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Oscar Piastri', team: 'McLaren' },
            { position: 3, driver: 'Lando Norris', team: 'McLaren' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Lewis Hamilton', team: 'Mercedes' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 3, driver: 'Fernando Alonso', team: 'Alpine' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'Esteban Ocon', team: 'Alpine' }
          ]
        }
      ],
      20: [ // United States
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 2, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 3, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 4, driver: 'Lando Norris', team: 'McLaren' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Lando Norris', team: 'McLaren' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        }
      ],
      21: [ // Mexico
        {
          year: 2024,
          top5: [
            { position: 1, driver: 'Carlos Sainz', team: 'Ferrari' },
            { position: 2, driver: 'Lando Norris', team: 'McLaren' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2023,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari' },
            { position: 4, driver: 'Lando Norris', team: 'McLaren' },
            { position: 5, driver: 'George Russell', team: 'Mercedes' }
          ]
        },
        {
          year: 2022,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'George Russell', team: 'Mercedes' },
            { position: 5, driver: 'Carlos Sainz', team: 'Ferrari' }
          ]
        },
        {
          year: 2021,
          top5: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing' },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes' },
            { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing' },
            { position: 4, driver: 'Pierre Gasly', team: 'AlphaTauri' },            { position: 5, driver: 'Charles Leclerc', team: 'Ferrari' }          ]
        }
      ]
    };

    this.allHistoricalResults = mockHistoricalResults[gpId] || [];
    this.historicalResults = [...this.allHistoricalResults];
    this.selectedYear = null; // Reset year selection
  }

  selectYear(year: number | null) {
    this.selectedYear = year;
    if (year === null) {
      // Show all years
      this.historicalResults = [...this.allHistoricalResults];
    } else {
      // Show only selected year
      this.historicalResults = this.allHistoricalResults.filter(result => result.year === year);
    }
  }

  isYearSelected(year: number): boolean {
    return this.selectedYear === year;
  }

  isAllYearsSelected(): boolean {
    return this.selectedYear === null;
  }
}
