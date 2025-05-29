import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Driver {
  name: string;
  photo: string;
  nameEn?: string;
}

interface Team {
  name: string;
  nameEn?: string;
  logo: string;
  car: string;
  drivers: Driver[];
}

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-list.html',
  styleUrl: './team-list.scss'
})
export class TeamList {
  @Input() lang: 'es' | 'en' = 'es';
  expanded: number | null = null;
  backgroundCar: string | null = null;

  teams: Team[] = [
    {
      name: 'Red Bull Racing',
      nameEn: 'Red Bull Racing',
      logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png',
      car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/RedBull.jpg.transform/9col/image.jpg',
      drivers: [
        { name: 'Max Verstappen', nameEn: 'Max Verstappen', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/verstappen.jpg.transform/2col/image.jpg' },
        { name: 'Sergio Pérez', nameEn: 'Sergio Perez', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/perez.jpg.transform/2col/image.jpg' }
      ]
    },
    {
      name: 'Ferrari',
      nameEn: 'Ferrari',
      logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png',
      car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/Ferrari.jpg.transform/9col/image.jpg',
      drivers: [
        { name: 'Charles Leclerc', nameEn: 'Charles Leclerc', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/leclerc.jpg.transform/2col/image.jpg' },
        { name: 'Carlos Sainz', nameEn: 'Carlos Sainz', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/sainz.jpg.transform/2col/image.jpg' }
      ]
    },
    {
      name: 'Mercedes',
      nameEn: 'Mercedes',
      logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png',
      car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/Mercedes.jpg.transform/9col/image.jpg',
      drivers: [
        { name: 'Lewis Hamilton', nameEn: 'Lewis Hamilton', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/hamilton.jpg.transform/2col/image.jpg' },
        { name: 'George Russell', nameEn: 'George Russell', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/russell.jpg.transform/2col/image.jpg' }
      ]
    },
    {
      name: 'McLaren',
      nameEn: 'McLaren',
      logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png',
      car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/McLaren.jpg.transform/9col/image.jpg',
      drivers: [
        { name: 'Lando Norris', nameEn: 'Lando Norris', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/norris.jpg.transform/2col/image.jpg' },
        { name: 'Oscar Piastri', nameEn: 'Oscar Piastri', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/piastri.jpg.transform/2col/image.jpg' }
      ]
    },
    {
      name: 'Aston Martin',
      nameEn: 'Aston Martin',
      logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png',
      car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/AstonMartin.jpg.transform/9col/image.jpg',
      drivers: [
        { name: 'Fernando Alonso', nameEn: 'Fernando Alonso', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/alonso.jpg.transform/2col/image.jpg' },
        { name: 'Lance Stroll', nameEn: 'Lance Stroll', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/stroll.jpg.transform/2col/image.jpg' }
      ]
    },
    {
      name: 'RB (Visa Cash App RB)',
      nameEn: 'RB (Visa Cash App RB)',
      logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png',
      car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/RB.jpg.transform/9col/image.jpg',
      drivers: [
        { name: 'Daniel Ricciardo', nameEn: 'Daniel Ricciardo', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/ricciardo.jpg.transform/2col/image.jpg' },
        { name: 'Yuki Tsunoda', nameEn: 'Yuki Tsunoda', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/tsunoda.jpg.transform/2col/image.jpg' }
      ]
    },
    {
      name: 'Haas',
      nameEn: 'Haas',
      logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/haas-logo.png',
      car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/Haas.jpg.transform/9col/image.jpg',
      drivers: [
        { name: 'Kevin Magnussen', nameEn: 'Kevin Magnussen', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/magnussen.jpg.transform/2col/image.jpg' },
        { name: 'Nico Hülkenberg', nameEn: 'Nico Hulkenberg', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/hulkenberg.jpg.transform/2col/image.jpg' }
      ]
    },
    {
      name: 'Williams',
      nameEn: 'Williams',
      logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png',
      car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/Williams.jpg.transform/9col/image.jpg',
      drivers: [
        { name: 'Alexander Albon', nameEn: 'Alexander Albon', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/albon.jpg.transform/2col/image.jpg' },
        { name: 'Logan Sargeant', nameEn: 'Logan Sargeant', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/sargeant.jpg.transform/2col/image.jpg' }
      ]
    },
    {
      name: 'Alpine',
      nameEn: 'Alpine',
      logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png',
      car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/Alpine.jpg.transform/9col/image.jpg',
      drivers: [
        { name: 'Esteban Ocon', nameEn: 'Esteban Ocon', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/ocon.jpg.transform/2col/image.jpg' },
        { name: 'Pierre Gasly', nameEn: 'Pierre Gasly', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/gasly.jpg.transform/2col/image.jpg' }
      ]
    },
    {
      name: 'Kick Sauber',
      nameEn: 'Kick Sauber',
      logo: 'https://www.formula1.com/content/dam/fom-website/teams/2024/kick-sauber-logo.png',
      car: 'https://www.formula1.com/content/dam/fom-website/manual/Misc/2024manual/KickSauber.jpg.transform/9col/image.jpg',
      drivers: [
        { name: 'Valtteri Bottas', nameEn: 'Valtteri Bottas', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/bottas.jpg.transform/2col/image.jpg' },
        { name: 'Zhou Guanyu', nameEn: 'Zhou Guanyu', photo: 'https://www.formula1.com/content/dam/fom-website/drivers/2024Drivers/zhou.jpg.transform/2col/image.jpg' }
      ]
    }
  ];

  toggleTeam(idx: number) {
    this.expanded = this.expanded === idx ? null : idx;
    this.backgroundCar = this.expanded !== null ? this.teams[this.expanded].car : null;
  }
}
