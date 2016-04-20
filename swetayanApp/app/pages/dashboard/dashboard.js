import {Page, NavParams} from 'ionic-angular';
import {LazyLoadImageDirective} from 'ng2-lazyload-image';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Page({
    templateUrl: 'build/pages/dashboard/dashboard.html',
    directives:[LazyLoadImageDirective]
})
export class Dashboard {

    static get parameters() {
        return [[NavParams]];
    }

    constructor(navParams) {
        this.slides = [
            {
                title: "Welcome to Swetayan",
                description: "It is much like an artist’s studio, but providing space to take, develop, print and duplicate photographs",
                image: "http://swetayan.com/Admin/media/slider/img_1455623876_5462.jpg",
            },
            {
                title: "Welcome to Swetayan",
                description: "It is much like an artist’s studio, but providing space to take, develop, print and duplicate photographs",
                image: "http://swetayan.com/Admin/media/slider/img_1455623876_5462.jpg",
            },
            {
                title: "Welcome to Swetayan",
                description: "It is much like an artist’s studio, but providing space to take, develop, print and duplicate photographs",
                image: "http://swetayan.com/Admin/media/slider/img_1455623876_5462.jpg",
            }
        ];
    }

}
