import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'loader',
    templateUrl: `./loader.component.html`,
    styleUrls: ['./loader.component.scss']
})

/**
 * Loader animation component
 * CSS loading Spinner
 */
export class LoaderComponent implements OnInit {
    constructor() { }

    ngOnInit () {
    }
}