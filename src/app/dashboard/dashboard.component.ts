import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: any;
  page: number;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.page = this.getPage() || 1;
    this.getPosts(this.page);
  }

  getPosts(page): void {
    this.heroService.getPosts(page)
      .subscribe(posts => this.posts = posts);
  }

  getPage(): number {
    return parseInt(this.route.snapshot.queryParamMap.get('page'));
  }

  goNext(): void {
    let url = this.router.createUrlTree(['/dashboard'], { queryParams: { page: this.page++ } }).toString();
    this.location.go(url);
  }
}
