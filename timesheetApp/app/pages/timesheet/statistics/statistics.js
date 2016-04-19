import {Page} from 'ionic-angular';
import {Component, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';

import {CHART_DIRECTIVES} from './../../../components/charts';

@Page({
  template: 'build/pages/timesheet/statistics/statistics.html',
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class BarChartDemo {

  constructor() {
      
   this.barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    }   
    
    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartSeries = ['Series A', 'Series B'];
    this.barChartType = 'Bar';
    this.barChartLegend = true;

    this.barChartData = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    
  }

  // events
  chartClicked(e) {
    console.log(e);
  }
  chartHovered(e) {
    console.log(e);
  }

}

