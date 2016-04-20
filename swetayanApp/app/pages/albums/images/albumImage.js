import {Page} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/albums/images/albumImage.html'
})
export class AlbumImage {
    constructor() {
        this.items = [];

        for (let i = 0; i < 20; i++) {

            let item = {
                avatarUrl: 'http://swetayan.com/Admin/media/gallery/big/img_1459247898_8746.JPG'
            };

            this.items.push(item);
        }
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        setTimeout(() => {
            
            let item = {
                avatarUrl: 'http://swetayan.com/Admin/media/gallery/big/img_1459247898_8746.JPG'
            };

            this.items.push(item);
            infiniteScroll.complete();
        }, 500);
    }
}
