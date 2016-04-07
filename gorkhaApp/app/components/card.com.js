import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {AxelorFormComponent} from './form.com';

@Component({
    selector:'axelor-card',
    inputs:['heading','headingClass: heading-class'],
    template:`
        <ion-card>
            <ion-card-header [class]="headingClass">
                {{heading}}
            </ion-card-header>
            <ion-card-content>
                <ng-content></ng-content>
            </ion-card-content>            
        </ion-card>
    `,
    directives: [IONIC_DIRECTIVES]    
})
export class CardComponent{}