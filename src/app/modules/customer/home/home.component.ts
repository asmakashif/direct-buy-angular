import { Component, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    // itemsPerSlide = [3];
    // singleSlideOffset = false;
    // noWrap = false;

    // slidesChangeMessage = '';

    // slides = [
    //   {image: 'assets/images/nature/1.jpg'},
    //   {image: 'assets/images/nature/2.jpg'},
    //   {image: 'assets/images/nature/3.jpg'},
    //   {image: 'assets/images/nature/4.jpg'},
    //   {image: 'assets/images/nature/5.jpg'},
    //   {image: 'assets/images/nature/6.jpg'},
    //   {image: 'assets/images/nature/7.jpg'},
    //   {image: 'assets/images/nature/8.jpg'},
    //   {image: 'assets/images/nature/1.jpg'},
    //   {image: 'assets/images/nature/2.jpg'}
    // ];

    // onSlideRangeChange(indexes: number[]|void): void {
    //   this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
    // }
    // }

    // games= [{"title_id":1,"title_name":"MIssion Impossible","title_img":"https://media.services.cinergy.ch/media/box1600/f1323e57a2c4ea79dde779a89d561f85bfbe6bf5.jpg","genres":[{"id":1,"name":"Action"},{"id":2,"name":"Adventure"}]},{"title_id":2,"title_name":"Matrix","title_img":"https://www.sideshowtoy.com/assets/products/903302-neo/lg/the-matrix-neo-sixth-scale-figure-hot-toys-903302-01.jpg","genres":[{"id":1,"name":"Action"},{"id":2,"name":"Adventure"},{"id":6,"name":"Fantasy"}]},{"title_id":3,"title_name":"Avengers","title_img":"http://media.comicbook.com/2018/03/avengers-infinity-war-poster-all-iron-man-version-1096449.jpeg","genres":[{"id":1,"name":"Action"},{"id":2,"name":"Adventure"},{"id":6,"name":"Fantasy"}]},{"title_id":4,"title_name":"Stargate SG-1","title_img":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/rst5xc4f7v1KiDiQjzDiZqLtBpl.jpg","genres":[{"id":1,"name":"Action"},{"id":5,"name":"Drama"},{"id":2,"name":"Adventure"},{"id":9,"name":"Sci Fi"}]},{"title_id":5,"title_name":"Scooby Doo","title_img":"https://images-na.ssl-images-amazon.com/images/G/01/aplusautomation/vendorimages/1cdd3ea2-f14f-416b-9aaa-644a9a01ad8c.jpg._CB321085566_.jpg","genres":[{"id":1,"name":"Action"},{"id":10,"name":"Thriller"},{"id":6,"name":"Fantasy"}]}];

    // images = [1, 2, 3].map(() => https://picsum.photos/900/500?random&t=${Math.random()});,
    faArrowRight = faArrowRight;
    faCircle = faCircle;
    faCaretRight = faCaretRight;
    faAngleRight = faAngleRight;

    // this.games = ["a", "b", "c", "d", "e"];
    // this.gamesFormatted = [];
    // var j = -1;

    // for (var i = 0; i < this.games.length; i++) {
    //     if (i % 3 == 0) {
    //         j++;
    //         this.gamesFormatted[j] = [];
    //         this.gamesFormatted[j].push(this.games[i]);
    //     }
    //     else {
    //         this.gamesFormatted[j].push(this.games[i]);
    //     }
    // }

    constructor() {}

    ngOnInit(): void {}
}
