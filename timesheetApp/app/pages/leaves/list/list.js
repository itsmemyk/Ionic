import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/leaves/list/list.html',
  directives:[]
})

export class LeavesList {
  constructor() {   
      this.leaves = [];
      
      this.leaves.push({startDate:new Date(2015,10,24),endDate:new Date(2015,10,25),reason:'sick'});
      this.leaves.push({startDate:new Date(2015,4,14),endDate:new Date(2015,4,25),reason:'sick'});
      this.leaves.push({startDate:new Date(2015,3,24),endDate:new Date(2015,5,25),reason:'tour'});
      this.leaves.push({startDate:new Date(2015,7,24),endDate:new Date(2015,10,20),reason:'marriage'});   
  }
}
