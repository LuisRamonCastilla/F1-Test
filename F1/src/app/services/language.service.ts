import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private langSubject = new BehaviorSubject<'es' | 'en'>('es');
  readonly lang$ = this.langSubject.asObservable();

  setLang(lang: 'es' | 'en') {
    this.langSubject.next(lang);
  }

  get currentLang(): 'es' | 'en' {
    return this.langSubject.getValue();
  }
}
