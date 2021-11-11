import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-delivery-setting',
  templateUrl: './home-delivery-setting.component.html',
  styleUrls: ['./home-delivery-setting.component.scss']
})
export class HomeDeliverySettingComponent implements OnInit {

  constructor() { }
  value:any;
  ngOnInit(): void {
  }
  update(e:any,day:any)
  {
    if(e.target.checked){
      //alert('hi'+day);
    }
    else{
     // alert('bye'+day);
    }
  }
}
