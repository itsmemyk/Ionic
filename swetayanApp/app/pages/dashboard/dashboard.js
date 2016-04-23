import {Page, NavParams} from 'ionic-angular';
import {LazyLoadImageDirective} from 'ng2-lazyload-image';
import {Observable} from 'rxjs/Observable';
import {WSService, WS_PROVIDERS} from './../../services/ws.service';
import 'rxjs/Rx';

@Page({
    templateUrl: 'build/pages/dashboard/dashboard.html',
    providers: [WS_PROVIDERS],
    directives:[LazyLoadImageDirective]
})
export class Dashboard {

    static get parameters() {
        return [[NavParams], [WSService]];
    }

    constructor(navParams, ws) {        
        this.slides = [];         
        this.slideOptions = {
            loop: true,
            autoplay: 2
        };
        
        ws.getSliders({}).map(res=>res.json()).subscribe((res) => {
            if(res.status == 1) {
                res.data.forEach((record) => {
                    record.image = "http://swetayan.com/Admin/media/slider/"+record.image;
                    record.title = record.title || "Welcome to Swetayan";
                    record.description = record.description || "It is much like an artist’s studio, but providing space to take, develop, print and duplicate photographs";
                })
            }            
            this.slides = res.data;
        });        
    }

}
