import {Page,IonicApp,NavController,Modal} from 'ionic-angular';
import {Component} from 'angular2/core';

import {AxelorFormComponent} from './../../components/form.com';

import {AxelorInput,InputComponent} from './../../components/input.com';
import {PasswordComponent} from './../../components/password.com';
import {SelectComponent,SelectOptionComponent} from './../../components/select.com';
import {ButtonComponent} from './../../components/button.com';

import {AxelorGrid} from './../../components/grid.com';
import {AxelorGridField} from './../../components/grid.field.com';

import {AxelorRestService} from './../../services/axelor.rest';
import {FormCreator} from './../create/create';

import 'rxjs/Rx';

@Page({
    templateUrl:'build/pages/code/code.html',
    directives:[AxelorFormComponent,InputComponent,ButtonComponent,AxelorGrid,AxelorGridField]    
})
export class CodePage {
    
}