import {Page} from 'ionic-angular';

import {ExpensesAdd} from './../add/add';
import {ExpensesKMAdd} from './../add-km/add-km';
import {ExpensesList} from './../list/list';
import {ExpensesKMList} from './../list-km/list-km';


import {TimesheetMenuComponent} from './../../../components/menu.com';


@Page({
  templateUrl: 'build/pages/expenses/menu/menu.html',
  directives:[TimesheetMenuComponent]
})

export class ExpensesMenu {
  constructor() {
      this.menuItems = [];
        
      this.menuItems.push({title:'Add expense',component:ExpensesAdd});
      this.menuItems.push({title:'Add KM expense',component:ExpensesKMAdd});
      this.menuItems.push({title:'See expense',component:ExpensesList});
      this.menuItems.push({title:'See KM expense',component:ExpensesKMList});
  }
}
