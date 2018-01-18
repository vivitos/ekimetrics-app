import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import * as moment from 'moment';
import * as groupBy from 'lodash.groupby';
import * as filter from 'lodash.filter';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { Post, Comment } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() post: Post;
  lastWeekComments: Comment[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getPost(id)
      .subscribe(post => {
        this.post = post;
        this.getLastWeekComments();
      });
  }

  getLastWeekComments(): void {

    console.log(moment().subtract(7, 'days').format());
    console.log(filter(this.post.comments, (comment) => {
      return moment(comment.created_date).isSameOrAfter(moment().subtract(7, 'days').format());
    }))
    // console.log(groupBy([{ id: '1' }, { id: '1' }, { id: '2' }, { id: '4' }], 'id'))
    // console.log(moment().format());
  }

}
