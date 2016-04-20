import {Page} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/albums/albums.html'
})
export class Albums {
    constructor() {
        this.items = [];

        for (let i = 0; i < 10; i++) {

            let item = {
                title: 'Album'+i,
                description: 'Swetayan Studio - photo gallery albums<br/> Creator by Hetal Vaghela',
                avatarUrl: 'http://swetayan.com/Admin/media/gallery/big/img_1459247721_2080.JPG'
            };

            this.items.push(item);
        }
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        setTimeout(() => {
            
            let item = {
                title: 'Album Next',
                description: 'Swetayan Studio,<br/> Creator by Hetal Vaghela',
                avatarUrl: 'http://swetayan.com/Admin/media/gallery/big/img_1459249111_24338.JPG'
            };

            this.items.push(item);
            infiniteScroll.complete();
        }, 500);
    }
}
