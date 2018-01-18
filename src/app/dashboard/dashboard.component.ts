import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: any;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.heroService.getPosts()
      .subscribe(posts => this.posts = posts);
  }
}
