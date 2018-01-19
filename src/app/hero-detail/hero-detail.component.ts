import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import * as moment from 'moment';
import * as _ from 'lodash';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { Post, Comment } from '../hero.service';
import { last } from '@angular/router/src/utils/collection';
import { leave } from '@angular/core/src/profile/wtf_impl';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //Array with day by day comments count  
  aggregateComments = [];
  post: Post;

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
        this.getLastComments(7);
      });
  }

  getLastComments(days: number): void {
    //I generate an array with the desired number of days to generate my graph
    _.forEach(_.times(days, Number), (day) => {

      //For each days, we calculate the number of comments after this date
      let commentsAfter = _.filter(this.post.comments, comment => {
        return moment(comment.created_at).isAfter(moment().endOf('day').subtract(day, 'days').format());
      })

      //The number of comments for a special day is the total number of comments minus all comments posted after this date
      this.aggregateComments.push({
        date: moment().startOf('day').subtract(day, 'days').format(),
        value: this.post.comments.length - commentsAfter.length
      })
    });

  }

}
