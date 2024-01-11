import { Component } from '@angular/core';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  standalone: true,
  styleUrl: './heroes.component.scss',
  imports: [
    HeroDetailComponent,
    RouterLink,
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    NgFor,
  ]
})
export class HeroesComponent {
  constructor(private heroService: HeroService, private messageService: MessageService) {}

  heroes: Hero[] = [];

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    )
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
