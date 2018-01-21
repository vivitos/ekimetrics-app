import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { ActivatedRoute } from '@angular/router';

import { ProductHuntService } from '../product-hunt.service';
import { Post, Comment } from '../product-hunt.service';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  //Array with day by day comments count  
  aggregateComments = [];
  post: Post;
  loading: boolean;
  period: number;

  constructor(
    private route: ActivatedRoute,
    private productHuntService: ProductHuntService,
  ) { }

  ngOnInit () {
    this.period = 7;
    this.getPost();
  }

  getPost (): void {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.productHuntService.getPost(id)
      .subscribe(post => {
        this.loading = false
        this.post = post;
        this.getLastComments();
      });
  }

  getLastComments (): void {
    this.aggregateComments = [];

    //I generate an array with the desired number of days to generate my graph
    _.forEach(_.times(this.period, Number).reverse(), (day) => {

      //For each days, we calculate the number of comments after this date
      let commentsAfter = _.filter(this.post.comments, comment => {
        return moment(comment.created_at).isAfter(moment().endOf('day').subtract(day, 'days').format());
      })

      //The number of comments for a special day is the total number of comments minus all comments posted after this date
      this.aggregateComments.push({
        date: moment().startOf('day').subtract(day, 'days').format(),
        value: this.post.comments.length - commentsAfter.length
      });
    });
  }

  updatePeriod (period: any): void {
    this.period = period.value;
    this.getLastComments();
  }

}
