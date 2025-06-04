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
    this.http.get<Driver[]>('/api/drivers').subscribe({
      next: data => {
        this.allDrivers = data;
        this.currentDrivers = this.allDrivers.filter(d => d.lastYear === 2025);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
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
