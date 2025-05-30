import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CalendarComponent } from './pages/calendar/calendar';
import { StandingsComponent } from './pages/standings/standings';
import { DriversComponent } from './pages/drivers/drivers';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'calendar', component: CalendarComponent },
  { path: 'standings', component: StandingsComponent },
  { path: 'drivers', component: DriversComponent },
  { path: '**', redirectTo: '' }
];
