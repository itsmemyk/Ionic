import {Page} from 'ionic-angular';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AxelorInput} from './../../components/input.com';
import {PasswordComponent} from './../../components/password.com';
import {AxelorRestService} from './../../services/axelor.rest';
import 'rxjs/Rx';

@Page({
  templateUrl: 'build/pages/page3/page3.html',
  directives: [AxelorInput,PasswordComponent],
  providers: [AxelorRestService]
})

export class Page3 {
    
    static get parameters(){
        return [[AxelorRestService]];    
    }
    
    constructor(axelor){
        this.axelor = axelor;
        this.username = "";
        this.password = "";
        //this.axelor.doLogin();
        
        // this.axelor.doLogin().subscribe(data=>{
        //     console.log(data);
        // },error=>{
        //     console.log(error);
        // });
    }
    
    changed(data){
        console.log(data);
    }
    
    submit(values){
        console.log(values);
    }
}
