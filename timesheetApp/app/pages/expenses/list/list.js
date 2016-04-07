import {Page} from 'ionic-angular';
import {Database} from './../../../services/db.sqlite';

@Page({
  templateUrl: 'build/pages/expenses/list/list.html',
  directives:[],
  providers:[Database]
})

export class ExpensesList {
    
  static get parameters(){
    return [[Database]];    
  }
  
  constructor(database) {
      this.db = database;
            
      this.expenses = [];
      
      this.db.fetch("select * from json_data where model='expenses'",true).subscribe((data)=>{
        if(data.length > 0 && data[0].records){
            let records = JSON.parse(data[0].records);
            records.forEach((rec)=>{
                rec.date = new Date(rec.date);
            });
            this.expenses = records; 
        }  
      });
  }
}
