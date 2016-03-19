import {Events,Page,NavParams,ViewController} from 'ionic-angular';
import {PasswordComponent} from './../../components/password.com';
import {ButtonComponent} from './../../components/button.com';
import {SelectComponent,SelectOptionComponent} from './../../components/select.com';
import {InputComponent} from './../../components/input.com';

import {AxelorFormComponent} from './../../components/form.com';

import {AxelorRestService} from './../../services/axelor.rest';

@Page({
  templateUrl: 'build/pages/create/create.html',
  directives:[AxelorFormComponent,PasswordComponent,ButtonComponent,SelectOptionComponent,SelectComponent,InputComponent],
  providers:[AxelorRestService]
})
export class FormCreator {
   
  static get parameters(){
      return [[NavParams],[ViewController],[AxelorRestService],[Events]];
  }
     
  constructor(navParams,view,rest,events) {
      this.events = events;
      this.axelor = rest;      
      this.navParams = navParams;
      this.view = view;
  }
  
  ngOnInit(){
      this.data = this.navParams.data;            
      this.entity = this.data.entity;    
      this.axelor.entity = this.entity;
    //   console.log(this.navParams);
  }
  
  dismiss(){
      this.view.dismiss();
  }
  
  saveRecord(data){
      this.axelor.put(data).subscribe(()=>{
        this.events.publish(`refresh:${this.entity}:grid:com`);
        this.view.dismiss();    
      });
  }
}
