import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeDeliverySettingService } from './home-delivery-setting.service';
@Component({
  selector: 'app-home-delivery-setting',
  templateUrl: './home-delivery-setting.component.html',
  styleUrls: ['./home-delivery-setting.component.scss']
})
export class HomeDeliverySettingComponent implements OnInit {
  names:any;
  constructor(private router: Router, private route : ActivatedRoute,private fb: FormBuilder,private apiservice:HomeDeliverySettingService) {
    this.names = [
      { name: 'Monday', selected: false },
      { name: 'Tuesday', selected: false },
      { name: 'Wednesday', selected: false },
      { name: 'Thursday', selected: false },
      { name: 'Friday', selected: false },
      { name: 'Saturday', selected: false },
      { name: 'Sunday', selected: false },
      
    ]
   }
  value:any;
  selectedAll:any;
  shop_id:any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.shop_id=params.get('shop_id');
          console.log(this.shop_id);
      });
  }
  update(e:any,day:any)
  {
    if(e.target.checked){
      const days={
        day: day,
        shop_id:this.shop_id
      }
     
      this.apiservice.saveWorkingDays(days).subscribe((data)=>
      {
        
      })
      //alert('hi'+day);
      
    }
    else{
     // alert('bye'+day);
    }
  }
  selectAll() {
    for (var i = 0; i < this.names.length; i++) {
      this.names[i].selected = this.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.selectedAll = this.names.every(function(item:any) {
        return item.selected == true;
      })
  }
}
