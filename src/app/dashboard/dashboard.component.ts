import { Component, OnInit } from '@angular/core';
import { ProductHuntService, Post } from '../product-hunt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Dashboard Component with all posts list
 */
export class DashboardComponent implements OnInit {
  posts: Post[]; //All posts for page
  page: number; //Page number
  loading: boolean; //True if waiting for API response, false otherwise

  constructor(
    private productHuntService: ProductHuntService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  /**
   * Initialize page and posts
   */
  ngOnInit () {
    this.page = this.getPage() ? this.getPage() : 1;
    this.getPosts(this.page);
  }

  /**
   * Get all posts for a given page
   * @param page Page number
   */
  getPosts (page: number): void {
    this.loading = true;
    this.productHuntService.getPosts({ page })
      .subscribe(posts => {
        this.loading = false;
        this.posts = posts;
      });
  }

  /**
   * Return page query params
   */
  getPage (): number {
    return parseInt(this.route.snapshot.queryParamMap.get('page'));
  }

  /**
   * Change page: get posts for the new page and refresh query param page
   * @param pagination Pagination object output return by ngx-bootstrap PaginationModule
   */
  changePage (pagination: any): void {
    this.page = pagination.page;
    this.router.navigate(['/dashboard'], { queryParams: { page: this.page } });
    this.getPosts(this.page);
  }
}
