import { Component } from '@angular/core';
import { TeamList } from '../../components/team-list/team-list';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TeamList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  lang: 'es' | 'en' = 'es';

  constructor(private langService: LanguageService) {
    this.lang = this.langService.currentLang;
    this.langService.lang$.subscribe(l => (this.lang = l));
  }
}
