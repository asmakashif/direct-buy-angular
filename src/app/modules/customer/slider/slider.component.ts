import { Component, OnInit,  HostListener, ViewChild, ElementRef, Input } from '@angular/core';
// import { NgxCarousel } from 'ngx-carousel';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor(config: NgbCarouselConfig) { 
    config.interval = 2000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false; 
  }

  ngOnInit(): void { 
  }

}




