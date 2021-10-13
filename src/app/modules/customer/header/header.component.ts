import { Component, OnInit } from '@angular/core';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { faheadsetalt} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faHeadset=faHeadset;
  faSearch=faSearch;
  faUser=faUser;
  faHeart=faHeart;
  faShoppingBasket=faShoppingBasket;
  faBars=faBars;


  constructor() { }

  ngOnInit(): void {
  }

}
