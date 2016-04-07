import {Events,Page,NavParams,ViewController} from 'ionic-angular';
import {PasswordComponent} from './../../components/password.com';
import {ButtonComponent} from './../../components/button.com';
import {SelectComponent,SelectOptionComponent} from './../../components/select.com';
import {InputComponent} from './../../components/input.com';

import {AxelorFormComponent} from './../../components/form.com';

import {AxelorRestService} from './../../services/axelor.rest';

@Page({
  templateUrl: 'build/pages/edit/edit.html',
  directives:[AxelorFormComponent,PasswordComponent,ButtonComponent,SelectOptionComponent,SelectComponent,InputComponent],
  providers:[AxelorRestService]
})
export class FormEditor {
   
  static get parameters(){
      return [[NavParams],[ViewController],[AxelorRestService],[Events]];
  }
     
  constructor(navParams,view,rest,events) {
      this.events = events;
      this.axelor = rest;      
      this.navParams = navParams;
      this.view = view;
      this.editId = 0;
      this.version = 0;
  }
  
  ngOnInit(){
      this.editId = this.navParams.data.hdnId;
      this.data = this.navParams.data.formComponent;            
      this.entity = this.data.entity;    
      this.axelor.entity = this.entity;
      
      this.axelor.get(this.editId).map(res=>res.json()).subscribe((record)=>{
          let obj = record.data[0];
          this.version = obj.version;
          this.data.formControls.forEach((control)=>{
            //   console.log(control);
             control.value = obj[control.axelorControl];              
          });
      });
    //   console.log(this.navParams);
  }
  
  dismiss(){
      this.view.dismiss();
  }
  
  saveRecord(data){
      data["id"] = parseInt(this.editId);
      
      if( ! data.hasOwnProperty("version") )
        data["version"] = this.version;      
      
      this.axelor.post(this.editId,data).subscribe(()=>{
        this.events.publish(`refresh:${this.entity}:grid:com`);
        this.view.dismiss();    
      });
  }
}
