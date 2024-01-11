import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { NgIf, UpperCasePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    FormsModule, NgIf, UpperCasePipe,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) {}

  hero?: Hero

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      id = ""
    }
    this.heroService.getHero(id).subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(
        () => this.goBack()
      );
    }
  }
}
