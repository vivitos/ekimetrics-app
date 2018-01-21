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

/**
 * Bar Chart Component
 * Generate bar chart representing comments number evolution for a given period
 */
export class BarChartComponent implements OnChanges {

    //Object array of days and comments for each of this days
    @Input() commentsAggregation: any[];

    private width: number; //SVG width
    private height: number; //SVG height
    private margin = { top: 20, right: 20, bottom: 100, left: 40 }; //SVG Margins

    private x: any; //D3 x axis
    private y: any; //D3 y axis
    private svg: any; //D3 svg
    private g: any; //SVG g element

    constructor() { }

    /**
     * If parent component changes commentsAggregation, renew the SVG
     * @param changes Input changes
     */
    ngOnChanges (changes: SimpleChanges) {
        this.commentsAggregation = changes['commentsAggregation'].currentValue;
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
    }

    /**
     * Initialize all element of SVG
     */
    private initSvg () {
        if (this.svg) this.svg.selectAll("*").remove(); //If SVG already exists, we remove all elements
        this.svg = d3.select("svg");
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    }

    /**
     * Initialize X and Y axis
     */
    private initAxis () {
        this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1); //X as a set of discrete values
        this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
        this.x.domain(this.commentsAggregation.map((d) => D3.isoParse(d.date)));
        this.y.domain([0, d3Array.max(this.commentsAggregation, (d) => d.value)]);
    }

    /**
     * Draw X and Y axis
     */
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
            .call(d3Axis.axisLeft(this.y).ticks(this.commentsAggregation[this.commentsAggregation.length - 1].value, "")) // Max y values is the last days comments number
            .append("text") // TODO : Fix not displayed
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Comments");
    }

    /**
     * Draw Bar Chart
     */
    private drawBars () {
        this.g.selectAll(".bar")
            .data(this.commentsAggregation) //Used Data
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => this.x(new Date(d.date))) //Convert comments date using x axis function
            .attr("y", (d) => this.y(d.value)) //Convert comments comment number using y axis function
            .attr("width", this.x.bandwidth()) //Set bar width as x axis bandwidth function
            .attr("height", (d) => this.height - this.y(d.value))
            .attr("fill", "#B640EC"); //Color bars
    }

}