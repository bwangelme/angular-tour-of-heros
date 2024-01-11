import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private baseURL = `http://localhost:3000`
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  getHeroes(): Observable<Hero[]> {
    const url = `${this.baseURL}/heroes`
    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getHero(id: string): Observable<Hero> {
    const url = `${this.baseURL}/heroes/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHeroid=${id}`))
    )
  }

  updateHero(hero: Hero): Observable<any> {
    const url = `${this.baseURL}/heroes/${hero.id}`
    return this.http.put(url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    const url = `${this.baseURL}/heroes`
    return this.http.post<Hero>(url, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/id=${newHero.id}`)),
      catchError(this.handleError<Hero>(`addHero`))
    )
  }

  deleteHero(heroID: string): Observable<any> {
    const url = `${this.baseURL}/heroes/${heroID}`
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${heroID}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  searchHeros(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    const url = `${this.baseURL}/heroes?name=${term}`

    return this.http.get<Hero[]>(url).pipe(
        tap(x => x.length ?
            this.log(`found heroes matching "${term}"`) :
            this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<Hero[]>(`searchHeroes`, []))
    );
  }

  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

}
