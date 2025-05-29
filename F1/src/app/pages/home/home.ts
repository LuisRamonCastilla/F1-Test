import { Component } from '@angular/core';
import { TeamList } from '../../components/team-list/team-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TeamList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  lang: 'es' | 'en' = 'es';

  // This will now be coordinated with app-level language settings
  // The language change is managed by the navbar component
}
