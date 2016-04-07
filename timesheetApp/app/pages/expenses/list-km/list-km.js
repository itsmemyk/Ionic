import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/expenses/list-km/list-km.html',
  directives:[]
})

export class ExpensesKMList {
  constructor() { 
      this.expenses = [];
      
      this.expenses.push({date:new Date(2015,10,24),type:"Comment\'",km:1200,total:24000});
      this.expenses.push({date:new Date(2015,4,14),type:'Comment2"',km:500,total:5000});
      this.expenses.push({date:new Date(2015,3,24),type:'Comment3',km:2200,total:45000});
      this.expenses.push({date:new Date(2015,7,24),type:'Comment4',km:5700,total:12000});
     
     console.log(JSON.parse(JSON.stringify(this.expenses)));
  }
}
