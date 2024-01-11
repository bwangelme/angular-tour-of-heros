import { Component } from '@angular/core';
import { HEROS } from '../mock-heroes';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  standalone: true,
  styleUrl: './heroes.component.scss',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    NgFor,
  ]
})
export class HeroesComponent {
  heroes = HEROS

  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
