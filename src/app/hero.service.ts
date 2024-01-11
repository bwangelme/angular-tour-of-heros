import { Injectable } from '@angular/core';
import { HEROS } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private heroesUrl = `http://localhost:3000/heroes`
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HelloService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHero(id: number): Observable<Hero | undefined> {
    const hero = HEROS.find(h => h.id === id)
    this.log(`HelloService: fetched hero id=${id}`)
    return of(hero);
  }
}
