import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  test: any;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // this.getPosts();
  }

  getPosts(): void {
    this.heroService.getPosts()
      .subscribe(test => this.test = test);
  }

}
