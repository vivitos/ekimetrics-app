import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import * as D3 from 'd3';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
    selector: 'bar-chart',
    template: `<svg width="900" height="500"></svg>`,
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {

    @Input() comments: any[];

    private width: number;
    private height: number;
    private margin = { top: 20, right: 20, bottom: 100, left: 40 };

    private x: any;
    private y: any;
    private svg: any;
    private g: any;

    constructor() { }

    ngOnChanges (changes: SimpleChanges) {
        this.comments = changes['comments'].currentValue;
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
    }

    private initSvg () {
        if (this.svg) this.svg.selectAll("*").remove();
        this.svg = d3.select("svg");
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    }

    private initAxis () {
        this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
        this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
        this.x.domain(this.comments.map((d) => D3.isoParse(d.date)));
        this.y.domain([0, d3Array.max(this.comments, (d) => d.value)]);
    }

    private drawAxis () {
        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3Axis.axisBottom(this.x).ticks().tickFormat(D3.timeFormat("%d-%m-%y")))
            .selectAll("text")
            .attr("y", 0)
            .attr("x", -8)
            .attr("dy", ".35em")
            .attr("transform", "rotate(-80)")
            .style("text-anchor", "end");
        this.g.append("g")
            .attr("class", "axis axis--y")
            .call(d3Axis.axisLeft(this.y).ticks(this.comments[this.comments.length - 1].value, ""))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Comments");
    }

    private drawBars () {
        this.g.selectAll(".bar")
            .data(this.comments)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => this.x(new Date(d.date)))
            .attr("y", (d) => this.y(d.value))
            .attr("width", this.x.bandwidth())
            .attr("height", (d) => this.height - this.y(d.value))
            .attr("fill", "#B640EC");
    }

}