import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../product-hunt.service'

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})

/**
 * Post component
 * Panel displaying major informations in a panel for a given post
 */
export class PostComponent implements OnInit {
    @Input() post: Post;

    constructor() { }

    ngOnInit () {
    }
}