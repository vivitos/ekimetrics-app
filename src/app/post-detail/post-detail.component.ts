import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { ActivatedRoute } from '@angular/router';

import { ProductHuntService } from '../product-hunt.service';
import { Post, Comment } from '../product-hunt.service';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  //Array with day by day comments count  
  aggregateComments = [];
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private productHuntService: ProductHuntService,
  ) { }

  ngOnInit () {
    this.getPost();
  }

  getPost (): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productHuntService.getPost(id)
      .subscribe(post => {
        this.post = post;
        this.getLastComments(7);
      });
  }

  getLastComments (days: number): void {
    //I generate an array with the desired number of days to generate my graph
    _.forEach(_.times(days, Number).reverse(), (day) => {

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

}
