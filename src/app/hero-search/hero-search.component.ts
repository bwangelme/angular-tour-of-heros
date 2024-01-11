import { NgFor, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [
    NgFor, AsyncPipe, RouterLink
  ],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss'
})
export class HeroSearchComponent implements OnInit {
    constructor(private heroService: HeroService) {}

    heroes$!: Observable<Hero[]>
    private searchTerms = new Subject<string>();

    search(term: string): void {
        this.searchTerms.next(term)
    }

    ngOnInit(): void {
        this.heroes$ = this.searchTerms.pipe(
          // 每隔 300ms 才检查一次 input.value 的值
          debounceTime(300),
          // 如果输入的值相同，则不进行操作
          distinctUntilChanged(),
          // 输入的值不同，调用 searchHeros, 并将老结果丢弃，使用新结果
          switchMap((term: string) => this.heroService.searchHeros(term))
        );
    }
}
