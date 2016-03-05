import {Page} from 'ionic-framework/ionic';
import {Today} from './../../components/date.com';
import {DBManager} from './../../services/db.service';
import {AxelorInput} from './../../components/input.com';
import {AxelorRate} from './../../components/rating.com';
import {RepeatPipe} from './../../pipes/repeat.pipe';
import {TitleCase} from './../../pipes/titlecase.pipe';

const URL= { FS :'./app/' };

@Page({
  templateUrl: 'build/pages/page3/page3.html',
  providers: [DBManager,Today],   
  directives: [Today , AxelorRate, AxelorInput],
  pipes: [RepeatPipe,TitleCase]  
})

export class Page3 {
  txt1: number;
  txt2: number;
  private input: string;
  private rate: number;
  
  result: number;
  
  welcome: string = "my custom calc";
  welcomeNo: number = 5;
  
  constructor(today: Today,db: DBManager) {
     //db.add('peoples',{name:'man'});
     //db.add('peoples',{name:'drashti'});
     db.update('peoples',{id:'id',value:1},{name:'mayank'});
     
     /*
     db.fetch('people').then((data)=>{
        console.log("Final " + JSON.stringify(data));    
     });
     
    
     console.log(URL);
    
     db.fetch('people').subscribe((data)=>{
        console.log("Final " + JSON.stringify(data));    
     });
     
    
    
    this.today = today;
    
    this.today.dateChange.subscribe((data)=>{
    //   console.log(data); 
    });
    */
    
  }
  
  dateChanging(event){
      console.log("changed",event);
  }
  
  setA(val){
      this.txt1 = parseFloat(val);
  }
  
  setB(val){
      this.txt2 = parseFloat(val);
  }
  
  calc(){
      let a = this.txt1 || 0;
      let b = this.txt2 || 0;
      console.log(this.input);
      this.result = parseFloat(a) + parseFloat(b);
  }
}
    