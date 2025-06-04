import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Driver {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  nationality: string;
  countryCode: string;
  team: string;
  teamColor: string;
  dateOfBirth: string;
  age: number;
  firstYear: number;
  lastYear: number;
  championships: number;
  wins: number;
  podiums: number;
  fastestLaps: number;
  totalPoints: number;
  photo?: string;
  flag?: string;
}

interface GameGuess {
  driver: Driver;
  nameMatch: 'correct' | 'wrong';
  teamMatch: 'correct' | 'wrong';
  nationalityMatch: 'correct' | 'wrong';
  ageMatch: 'correct' | 'higher' | 'lower';
  firstYearMatch: 'correct' | 'higher' | 'lower';
  championshipsMatch: 'correct' | 'higher' | 'lower';
  winsMatch: 'correct' | 'higher' | 'lower';
}

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drivers.html',
  styleUrl: './drivers.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class DriversComponent implements OnInit {
  // Game state
  gameState: 'active' | 'won' | 'over' = 'active';
  targetDriver: Driver | null = null;
  guesses: GameGuess[] = [];
  maxGuesses = 6;
  searchTerm = '';
  filteredDrivers: Driver[] = [];
  loading = false;
  
  // Driver data
  allDrivers: Driver[] = [];
  currentDrivers: Driver[] = [];
  
  // Game mode
  gameMode: 'current' | 'alltime' = 'current';
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDriverData();
    this.newGame();
  }

  loadDriverData() {
    this.loading = true;
    
    // Mock data for F1 drivers with comprehensive information
    this.allDrivers = [
      // Current 2025 Grid
      {
        id: 1, name: 'Max Verstappen', firstName: 'Max', lastName: 'Verstappen',
        nationality: 'Dutch', countryCode: 'nl', team: 'Red Bull Racing', teamColor: '#0600EF',
        dateOfBirth: '1997-09-30', age: 27, firstYear: 2015, lastYear: 2025,
        championships: 3, wins: 57, podiums: 105, fastestLaps: 29, totalPoints: 2586,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png',
        flag: 'https://flagcdn.com/w40/nl.png'
      },
      {
        id: 2, name: 'Lando Norris', firstName: 'Lando', lastName: 'Norris',
        nationality: 'British', countryCode: 'gb', team: 'McLaren', teamColor: '#FF8700',
        dateOfBirth: '1999-11-13', age: 25, firstYear: 2019, lastYear: 2025,
        championships: 0, wins: 2, podiums: 13, fastestLaps: 6, totalPoints: 798,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png',
        flag: 'https://flagcdn.com/w40/gb.png'
      },
      {
        id: 3, name: 'Charles Leclerc', firstName: 'Charles', lastName: 'Leclerc',
        nationality: 'Monégasque', countryCode: 'mc', team: 'Ferrari', teamColor: '#DC143C',
        dateOfBirth: '1997-10-16', age: 27, firstYear: 2018, lastYear: 2025,
        championships: 0, wins: 5, podiums: 27, fastestLaps: 9, totalPoints: 1141,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png',
        flag: 'https://flagcdn.com/w40/mc.png'
      },
      {
        id: 4, name: 'Oscar Piastri', firstName: 'Oscar', lastName: 'Piastri',
        nationality: 'Australian', countryCode: 'au', team: 'McLaren', teamColor: '#FF8700',
        dateOfBirth: '2001-04-06', age: 23, firstYear: 2023, lastYear: 2025,
        championships: 0, wins: 2, podiums: 8, fastestLaps: 1, totalPoints: 217,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png',
        flag: 'https://flagcdn.com/w40/au.png'
      },
      {
        id: 5, name: 'Carlos Sainz', firstName: 'Carlos', lastName: 'Sainz',
        nationality: 'Spanish', countryCode: 'es', team: 'Ferrari', teamColor: '#DC143C',
        dateOfBirth: '1994-09-01', age: 30, firstYear: 2015, lastYear: 2025,
        championships: 0, wins: 3, podiums: 23, fastestLaps: 6, totalPoints: 1162,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png',
        flag: 'https://flagcdn.com/w40/es.png'
      },
      {
        id: 6, name: 'Sergio Pérez', firstName: 'Sergio', lastName: 'Pérez',
        nationality: 'Mexican', countryCode: 'mx', team: 'Red Bull Racing', teamColor: '#0600EF',
        dateOfBirth: '1990-01-26', age: 35, firstYear: 2011, lastYear: 2025,
        championships: 0, wins: 6, podiums: 35, fastestLaps: 11, totalPoints: 1425,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png',
        flag: 'https://flagcdn.com/w40/mx.png'
      },
      {
        id: 7, name: 'George Russell', firstName: 'George', lastName: 'Russell',
        nationality: 'British', countryCode: 'gb', team: 'Mercedes', teamColor: '#00D2BE',
        dateOfBirth: '1998-02-15', age: 27, firstYear: 2019, lastYear: 2025,
        championships: 0, wins: 2, podiums: 12, fastestLaps: 7, totalPoints: 477,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png',
        flag: 'https://flagcdn.com/w40/gb.png'
      },
      {
        id: 8, name: 'Lewis Hamilton', firstName: 'Lewis', lastName: 'Hamilton',
        nationality: 'British', countryCode: 'gb', team: 'Mercedes', teamColor: '#00D2BE',
        dateOfBirth: '1985-01-07', age: 40, firstYear: 2007, lastYear: 2025,
        championships: 7, wins: 105, podiums: 197, fastestLaps: 67, totalPoints: 4405,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png',
        flag: 'https://flagcdn.com/w40/gb.png'
      },
      {
        id: 9, name: 'Fernando Alonso', firstName: 'Fernando', lastName: 'Alonso',
        nationality: 'Spanish', countryCode: 'es', team: 'Aston Martin', teamColor: '#006F62',
        dateOfBirth: '1981-07-29', age: 43, firstYear: 2001, lastYear: 2025,
        championships: 2, wins: 32, podiums: 104, fastestLaps: 23, totalPoints: 2196,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png',
        flag: 'https://flagcdn.com/w40/es.png'
      },
      {
        id: 10, name: 'Lance Stroll', firstName: 'Lance', lastName: 'Stroll',
        nationality: 'Canadian', countryCode: 'ca', team: 'Aston Martin', teamColor: '#006F62',
        dateOfBirth: '1998-10-29', age: 26, firstYear: 2017, lastYear: 2025,
        championships: 0, wins: 0, podiums: 3, fastestLaps: 0, totalPoints: 242,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png',
        flag: 'https://flagcdn.com/w40/ca.png'
      },
      {
        id: 11, name: 'Pierre Gasly', firstName: 'Pierre', lastName: 'Gasly',
        nationality: 'French', countryCode: 'fr', team: 'Alpine', teamColor: '#0090FF',
        dateOfBirth: '1996-02-07', age: 29, firstYear: 2017, lastYear: 2025,
        championships: 0, wins: 1, podiums: 4, fastestLaps: 3, totalPoints: 373,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png',
        flag: 'https://flagcdn.com/w40/fr.png'
      },
      {
        id: 12, name: 'Esteban Ocon', firstName: 'Esteban', lastName: 'Ocon',
        nationality: 'French', countryCode: 'fr', team: 'Alpine', teamColor: '#0090FF',
        dateOfBirth: '1996-09-17', age: 28, firstYear: 2016, lastYear: 2025,
        championships: 0, wins: 1, podiums: 2, fastestLaps: 0, totalPoints: 395,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png',
        flag: 'https://flagcdn.com/w40/fr.png'
      },
      {
        id: 13, name: 'Alex Albon', firstName: 'Alex', lastName: 'Albon',
        nationality: 'Thai', countryCode: 'th', team: 'Williams', teamColor: '#005AFF',
        dateOfBirth: '1996-03-23', age: 28, firstYear: 2019, lastYear: 2025,
        championships: 0, wins: 0, podiums: 2, fastestLaps: 1, totalPoints: 212,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png',
        flag: 'https://flagcdn.com/w40/th.png'
      },
      {
        id: 14, name: 'Logan Sargeant', firstName: 'Logan', lastName: 'Sargeant',
        nationality: 'American', countryCode: 'us', team: 'Williams', teamColor: '#005AFF',
        dateOfBirth: '2000-12-31', age: 24, firstYear: 2023, lastYear: 2025,
        championships: 0, wins: 0, podiums: 0, fastestLaps: 0, totalPoints: 1,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LOGSAR01_Logan_Sargeant/logsar01.png',
        flag: 'https://flagcdn.com/w40/us.png'
      },
      {
        id: 15, name: 'Kevin Magnussen', firstName: 'Kevin', lastName: 'Magnussen',
        nationality: 'Danish', countryCode: 'dk', team: 'Haas', teamColor: '#FFFFFF',
        dateOfBirth: '1992-10-05', age: 32, firstYear: 2014, lastYear: 2025,
        championships: 0, wins: 0, podiums: 1, fastestLaps: 1, totalPoints: 185,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png',
        flag: 'https://flagcdn.com/w40/dk.png'
      },
      {
        id: 16, name: 'Nico Hülkenberg', firstName: 'Nico', lastName: 'Hülkenberg',
        nationality: 'German', countryCode: 'de', team: 'Haas', teamColor: '#FFFFFF',
        dateOfBirth: '1987-08-19', age: 37, firstYear: 2010, lastYear: 2025,
        championships: 0, wins: 0, podiums: 0, fastestLaps: 2, totalPoints: 530,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png',
        flag: 'https://flagcdn.com/w40/de.png'
      },
      {
        id: 17, name: 'Yuki Tsunoda', firstName: 'Yuki', lastName: 'Tsunoda',
        nationality: 'Japanese', countryCode: 'jp', team: 'AlphaTauri', teamColor: '#2B4562',
        dateOfBirth: '2000-05-11', age: 24, firstYear: 2021, lastYear: 2025,
        championships: 0, wins: 0, podiums: 0, fastestLaps: 0, totalPoints: 48,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png',
        flag: 'https://flagcdn.com/w40/jp.png'
      },
      {
        id: 18, name: 'Nyck de Vries', firstName: 'Nyck', lastName: 'de Vries',
        nationality: 'Dutch', countryCode: 'nl', team: 'AlphaTauri', teamColor: '#2B4562',
        dateOfBirth: '1995-02-06', age: 30, firstYear: 2022, lastYear: 2025,
        championships: 0, wins: 0, podiums: 0, fastestLaps: 0, totalPoints: 2,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NYCDEV01_Nyck_De_Vries/nycdev01.png',
        flag: 'https://flagcdn.com/w40/nl.png'
      },
      {
        id: 19, name: 'Valtteri Bottas', firstName: 'Valtteri', lastName: 'Bottas',
        nationality: 'Finnish', countryCode: 'fi', team: 'Alfa Romeo', teamColor: '#900000',
        dateOfBirth: '1989-08-28', age: 35, firstYear: 2013, lastYear: 2025,
        championships: 0, wins: 10, podiums: 67, fastestLaps: 20, totalPoints: 1797,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png',
        flag: 'https://flagcdn.com/w40/fi.png'
      },
      {
        id: 20, name: 'Zhou Guanyu', firstName: 'Guanyu', lastName: 'Zhou',
        nationality: 'Chinese', countryCode: 'cn', team: 'Alfa Romeo', teamColor: '#900000',
        dateOfBirth: '1999-05-30', age: 25, firstYear: 2022, lastYear: 2025,
        championships: 0, wins: 0, podiums: 0, fastestLaps: 0, totalPoints: 8,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GUAZHO01_Guanyu_Zhou/guazho01.png',
        flag: 'https://flagcdn.com/w40/cn.png'
      },
      
      // Some legendary drivers for all-time mode
      {
        id: 21, name: 'Michael Schumacher', firstName: 'Michael', lastName: 'Schumacher',
        nationality: 'German', countryCode: 'de', team: 'Ferrari', teamColor: '#DC143C',
        dateOfBirth: '1969-01-03', age: 56, firstYear: 1991, lastYear: 2012,
        championships: 7, wins: 91, podiums: 155, fastestLaps: 77, totalPoints: 1566,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MICSCH02_Michael_Schumacher/micsch02.png',
        flag: 'https://flagcdn.com/w40/de.png'
      },
      {
        id: 22, name: 'Ayrton Senna', firstName: 'Ayrton', lastName: 'Senna',
        nationality: 'Brazilian', countryCode: 'br', team: 'McLaren', teamColor: '#FF8700',
        dateOfBirth: '1960-03-21', age: 34, firstYear: 1984, lastYear: 1994,
        championships: 3, wins: 41, podiums: 80, fastestLaps: 19, totalPoints: 614,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/AYRSEN01_Ayrton_Senna/ayrsen01.png',
        flag: 'https://flagcdn.com/w40/br.png'
      },
      {
        id: 23, name: 'Sebastian Vettel', firstName: 'Sebastian', lastName: 'Vettel',
        nationality: 'German', countryCode: 'de', team: 'Aston Martin', teamColor: '#006F62',
        dateOfBirth: '1987-07-03', age: 37, firstYear: 2007, lastYear: 2022,
        championships: 4, wins: 53, podiums: 122, fastestLaps: 38, totalPoints: 3098,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SEBVET01_Sebastian_Vettel/sebvet01.png',
        flag: 'https://flagcdn.com/w40/de.png'
      },
      {
        id: 24, name: 'Kimi Räikkönen', firstName: 'Kimi', lastName: 'Räikkönen',
        nationality: 'Finnish', countryCode: 'fi', team: 'Alfa Romeo', teamColor: '#900000',
        dateOfBirth: '1979-10-17', age: 45, firstYear: 2001, lastYear: 2021,
        championships: 1, wins: 21, podiums: 103, fastestLaps: 46, totalPoints: 1873,
        photo: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KIMRAI01_Kimi_Raikkonen/kimrai01.png',
        flag: 'https://flagcdn.com/w40/fi.png'
      }
    ];

    this.currentDrivers = this.allDrivers.filter(d => d.lastYear === 2025);
    this.loading = false;
  }

  newGame() {
    this.gameState = 'active';
    this.guesses = [];
    this.searchTerm = '';
    this.filteredDrivers = [];
    
    // Select random target driver based on game mode
    const driverPool = this.gameMode === 'current' ? this.currentDrivers : this.allDrivers;
    const randomIndex = Math.floor(Math.random() * driverPool.length);
    this.targetDriver = driverPool[randomIndex];
    
    console.log('Target driver:', this.targetDriver?.name); // For debugging
  }

  setGameMode(mode: 'current' | 'alltime') {
    this.gameMode = mode;
    this.newGame();
  }

  filterDrivers() {
    if (this.searchTerm.length < 2) {
      this.filteredDrivers = [];
      return;
    }

    const searchTerm = this.searchTerm.toLowerCase();
    const driverPool = this.gameMode === 'current' ? this.currentDrivers : this.allDrivers;
    
    this.filteredDrivers = driverPool.filter(driver => 
      driver.name.toLowerCase().includes(searchTerm) ||
      driver.firstName.toLowerCase().includes(searchTerm) ||
      driver.lastName.toLowerCase().includes(searchTerm)
    ).slice(0, 8);
  }

  makeGuess(driver: Driver) {
    if (this.gameState !== 'active') return;
    
    // Check if driver already guessed
    if (this.guesses.some(g => g.driver.id === driver.id)) {
      return;
    }
    
    const guess = this.generateGuess(driver);
    this.guesses.push(guess);
    
    // Check if won
    if (driver.id === this.targetDriver?.id) {
      this.gameState = 'won';
    } else if (this.guesses.length >= this.maxGuesses) {
      this.gameState = 'over';
    }
    
    this.searchTerm = '';
    this.filteredDrivers = [];
  }

  generateGuess(guessedDriver: Driver): GameGuess {
    if (!this.targetDriver) {
      throw new Error('No target driver set');
    }

    return {
      driver: guessedDriver,
      nameMatch: guessedDriver.id === this.targetDriver.id ? 'correct' : 'wrong',
      teamMatch: guessedDriver.team === this.targetDriver.team ? 'correct' : 'wrong',
      nationalityMatch: guessedDriver.nationality === this.targetDriver.nationality ? 'correct' : 'wrong',
      ageMatch: this.compareNumbers(guessedDriver.age, this.targetDriver.age),
      firstYearMatch: this.compareNumbers(guessedDriver.firstYear, this.targetDriver.firstYear),
      championshipsMatch: this.compareNumbers(guessedDriver.championships, this.targetDriver.championships),
      winsMatch: this.compareNumbers(guessedDriver.wins, this.targetDriver.wins)
    };
  }

  compareNumbers(guess: number, target: number): 'correct' | 'higher' | 'lower' {
    if (guess === target) return 'correct';
    return guess < target ? 'higher' : 'lower';
  }

  getFeedbackIcon(feedback: string): string {
    switch (feedback) {
      case 'correct': return '✓';
      case 'higher': return '⬆';
      case 'lower': return '⬇';
      default: return '✗';
    }
  }

  trackByGuess(index: number, guess: GameGuess): number {
    return guess.driver.id;
  }

  shareResult() {
    if (this.gameState === 'active') return;
    
    const result = this.gameState === 'won' ? `✅ ${this.guesses.length}/${this.maxGuesses}` : `❌ ${this.maxGuesses}/${this.maxGuesses}`;
    const mode = this.gameMode === 'current' ? '🏎️ Pilotos 2025' : '🏆 Históricos';
    const shareText = `Wordle F1 ${mode}\n${result}\n\n${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Wordle F1',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText);
      // Could show a toast notification here
    }
  }
}
