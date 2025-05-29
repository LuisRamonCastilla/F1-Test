import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

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
  today = new Date();
  openSidebarSection: string | null = null;  sidebarSections = [
    { key: 'home', label: 'Inicio', route: '/' },
    { key: 'calendar', label: 'Calendario', route: '/calendar' },
    { key: 'standings', label: 'Clasificación', route: '/standings' },
    { key: 'drivers', label: 'Pilotos', route: '/drivers' },
    { key: 'stats', label: 'Estadísticas', route: '/stats' }
  ];
  @Output() langChange = new EventEmitter<'es' | 'en'>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get('https://api.openf1.org/v1/teams').subscribe(data => this.teamsInfo = data as any[]);
    this.http.get('https://api.openf1.org/v1/drivers').subscribe(data => this.driversInfo = data as any[]);
    this.http.get('https://api.openf1.org/v1/sessions').subscribe(data => this.calendar = data as any[]);
    this.http.get('https://api.openf1.org/v1/standings').subscribe(data => this.stats = Array.isArray(data) ? data : []);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  setLang(lang: 'es' | 'en') {
    this.lang = lang;
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
