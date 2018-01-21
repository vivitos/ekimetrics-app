import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../product-hunt.service'

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input() post: Post;

    constructor() { }

    ngOnInit () {
    }
}