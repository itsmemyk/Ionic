import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/expenses/list/list.html',
  directives:[]
})

export class ExpensesList {
  constructor() {      
      this.expenses = [];
      
      this.expenses.push({date:new Date(2015,10,24),type:'Type1',total:24000});
      this.expenses.push({date:new Date(2015,4,14),type:'Type2',total:5000});
      this.expenses.push({date:new Date(2015,3,24),type:'Type3',total:45000});
      this.expenses.push({date:new Date(2015,7,24),type:'Type4',total:12000});
  }
}
