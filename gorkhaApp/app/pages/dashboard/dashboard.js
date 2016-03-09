import {Page,NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/dashboard/dashboard.html'
})
export class Dashboard {
   
    static get parameters(){
        return [[NavParams]];
    }
     
  constructor(navParams) {
         
  }
  
}
