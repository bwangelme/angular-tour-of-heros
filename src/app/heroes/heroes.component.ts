import { Component } from '@angular/core';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  standalone: true,
  styleUrl: './heroes.component.scss',
  imports: [
    HeroDetailComponent,
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    NgFor,
  ]
})
export class HeroesComponent {
  constructor(private heroService: HeroService, private messageService: MessageService) {}

  selectedHero?: Hero;
  heroes: Hero[] = [];

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    )
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }
}
