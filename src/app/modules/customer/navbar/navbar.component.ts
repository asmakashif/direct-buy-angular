import { Component, OnInit } from '@angular/core';
import { faSearch, faUser, faHeart, faShoppingBag,faShoppingBasket } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isCollapsed = true;
  faSearch=faSearch;
  faUser=faUser;
  faHeart=faHeart;
  faShoppingBag=faShoppingBag;
  faShoppingBasket=faShoppingBasket;
  
  constructor() { }

  ngOnInit(): void {
  }

}
