import { Component, OnInit } from '@angular/core';
import { ProductHuntService } from '../product-hunt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: any;
  page: number;
  loading: boolean;

  constructor(
    private productHuntService: ProductHuntService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit () {
    this.page = this.getPage() ? this.getPage() : 1;
    this.getPosts(this.page);
  }

  getPosts (page): void {
    this.loading = true;
    this.productHuntService.getPosts(page)
      .subscribe(posts => {
        this.loading = false;
        this.posts = posts;
      });
  }

  getPage (): number {
    return parseInt(this.route.snapshot.queryParamMap.get('page'));
  }

  goNext (): void {
    this.page++;
    this.router.navigate(['/dashboard'], { queryParams: { page: this.page } });
    this.getPosts(this.page);
  }

  goPrevious (): void {
    this.page--;
    this.router.navigate(['/dashboard'], { queryParams: { page: this.page } });
    this.getPosts(this.page);
  }
}
