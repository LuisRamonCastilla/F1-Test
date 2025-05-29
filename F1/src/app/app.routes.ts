import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CalendarComponent } from './pages/calendar/calendar';
import { StandingsComponent } from './pages/standings/standings';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'calendar', component: CalendarComponent },
  { path: 'standings', component: StandingsComponent },
  { path: '**', redirectTo: '' }
];
