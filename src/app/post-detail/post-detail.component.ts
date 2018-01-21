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
  aggregateComments = []; //Array with day by day comments count
  post: Post; // Post object containing all post information
  loading: boolean; // True if waiting for API response, false otherwise
  period: number; // Days from now to generate SVG

  constructor(
    private route: ActivatedRoute,
    private productHuntService: ProductHuntService,
  ) { }

  /**
   * Initialize period to 7 et get post informations
   */
  ngOnInit () {
    this.period = 7;
    this.getPost();
  }

  /**
   * Get post information with the given post id URL
   */
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

  /**
   * Assign last comments aggregation based on period (in days) to aggregateComments
   */
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

  /**
   * Update time period and get last comments for this period
   * @param period Object return by slider change event with the chosen value
   */
  updatePeriod (period: any): void {
    this.period = period.value;
    this.getLastComments();
  }

}
