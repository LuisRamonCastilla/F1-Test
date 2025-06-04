import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {  showMenu = false;
  lang: 'es' | 'en' = 'es';
  sidebarOpen = false;
  showFixedSidebar = true; // Always show sidebar by default
  teamsInfo: any[] = [];
  driversInfo: any[] = [];
  calendar: any[] = [];
  stats: any[] = [];
  completedRaces: number = 0;
  totalRaces: number = 24;
  today = new Date();
  openSidebarSection: string | null = null;  sidebarSections = [
    { key: 'home', label: 'Inicio', route: '/' },
    { key: 'calendar', label: 'Calendario', route: '/calendar' },
    { key: 'standings', label: 'Clasificación', route: '/standings' },
    { key: 'drivers', label: 'Pilotos', route: '/drivers' },
    { key: 'stats', label: 'Estadísticas', route: '/stats' }
  ];
  @Output() langChange = new EventEmitter<'es' | 'en'>();

  constructor(private http: HttpClient, private router: Router,
              private langService: LanguageService) {
    this.lang = this.langService.currentLang;
  }
  ngOnInit() {
    this.langService.lang$.subscribe(l => (this.lang = l));
    this.http.get('https://api.openf1.org/v1/teams').subscribe(data => this.teamsInfo = data as any[]);
    this.http.get('https://api.openf1.org/v1/drivers').subscribe(data => this.driversInfo = data as any[]);
    this.http.get('https://api.openf1.org/v1/sessions').subscribe(data => this.calendar = data as any[]);
    this.http.get('https://api.openf1.org/v1/standings').subscribe(data => this.stats = Array.isArray(data) ? data : []);
    
    // Calculate completed races for 2025 season
    this.calculateCompletedRaces();
  }
  calculateCompletedRaces() {
    // Formula 1 2025 season race dates
    const races2025 = [
      { name: 'Bahrain Grand Prix', date: '2025-03-02' },
      { name: 'Saudi Arabian Grand Prix', date: '2025-03-09' },
      { name: 'Australian Grand Prix', date: '2025-03-16' },
      { name: 'Japanese Grand Prix', date: '2025-04-06' },
      { name: 'Chinese Grand Prix', date: '2025-04-20' },
      { name: 'Miami Grand Prix', date: '2025-05-04' },
      { name: 'Emilia Romagna Grand Prix', date: '2025-05-18' },
      { name: 'Monaco Grand Prix', date: '2025-05-25' },
      { name: 'Spanish Grand Prix', date: '2025-06-01' },
      { name: 'Canadian Grand Prix', date: '2025-06-15' },
      { name: 'Austrian Grand Prix', date: '2025-06-29' },
      { name: 'British Grand Prix', date: '2025-07-13' },
      { name: 'Hungarian Grand Prix', date: '2025-07-27' },
      { name: 'Belgian Grand Prix', date: '2025-08-31' },
      { name: 'Dutch Grand Prix', date: '2025-09-07' },
      { name: 'Italian Grand Prix', date: '2025-09-14' },
      { name: 'Azerbaijan Grand Prix', date: '2025-09-21' },
      { name: 'Singapore Grand Prix', date: '2025-10-05' },
      { name: 'United States Grand Prix', date: '2025-10-19' },
      { name: 'Mexican Grand Prix', date: '2025-10-26' },
      { name: 'Brazilian Grand Prix', date: '2025-11-09' },
      { name: 'Las Vegas Grand Prix', date: '2025-11-23' },
      { name: 'Qatar Grand Prix', date: '2025-11-30' },
      { name: 'Abu Dhabi Grand Prix', date: '2025-12-07' }
    ];

    this.totalRaces = races2025.length;
    const today = new Date('2025-05-30'); // Current date is May 30, 2025
    this.completedRaces = races2025.filter(race => {
      const raceDate = new Date(race.date);
      return raceDate <= today;
    }).length;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  setLang(lang: 'es' | 'en') {
    this.langService.setLang(lang);
    this.langChange.emit(lang);
    this.showMenu = false;
  }

  openSidebar() {
    this.sidebarOpen = true;
  }
  
  closeSidebar() {
    this.sidebarOpen = false;
  }

  toggleFixedSidebar() {
    this.showFixedSidebar = !this.showFixedSidebar;
  }

  openSection(section: string) {
    this.openSidebarSection = this.openSidebarSection === section ? null : section;
  }

  // Cierra el menú si se hace clic fuera
  onBackdropClick() {
    this.showMenu = false;
  }

  goTo(route: string) {
    this.closeSidebar();
    this.router.navigate([route]);
    this.openSidebarSection = null;
    
    // For mobile, may hide sidebar after navigation
    if (window.innerWidth < 768) {
      this.showFixedSidebar = false;
    }
  }
}
