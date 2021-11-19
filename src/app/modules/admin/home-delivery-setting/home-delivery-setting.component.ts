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
  days:any;
  time:any;
  savedtime:any;
  user_id:any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.shop_id=params.get('shop_id');
          console.log(this.shop_id);
      });
      const user_id = localStorage.getItem('user_id');
      const day = localStorage.getItem('day');
      
      this.apiservice.getWorkingDays(user_id).subscribe((data)=>
      {
          this.days=data;
         
      }
      )
    
    
    
  }
  update(e:any,day:any)
  {
    const user_id = localStorage.getItem('user_id');
    if(e.target.checked){
      const days={
        day: day,
        userId:user_id
      }
      
      this.apiservice.saveWorkingDays(days).subscribe((data)=>
      {
        
      })
      //alert('hi'+day);
      
    }
    else{
     // alert('bye'+day);
     const days={
      day: day,
      userId:user_id
    }
     this.apiservice.uncheckWorkingDays(days).subscribe((data)=>
     {
       
     })
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
  updatetime(e:any,day:any,type:any)
  {
 //alert(e.target.value + type)
 const time={
  time: e.target.value,
  day:day+'_'+type,
  type:type
}
     this.apiservice.saveWorkingTime(time).subscribe((data)=>
     {

     })
  }
  daySelected(e:any)
  {
    const day=localStorage.setItem('day',e);
    const days=localStorage.getItem('day');
    const user_id = localStorage.getItem('user_id');
    this.apiservice.getTimeSlots().subscribe((data)=>
    {
            this.time=data;
           
    })
    const timing={
      day:days,
      userId:user_id
    }
      this.apiservice.getWorkingTime(timing).subscribe((data)=>
      {
       this.savedtime=data;
          console.log(data);
      }) 
    
  }
  updateslot(e:any,from:any,to:any,id:any)
  {
    const user_id = localStorage.getItem('user_id');
    const days=localStorage.getItem('day');
    if(e.target.checked){
     
    const slots={
      from:from,
      to:to,
      userId:user_id,
      id:id,
      day:days

    }
  
    this.apiservice.saveTimeSlots(slots).subscribe((data)=>
    {
      const timing={
        day:days,
        userId:user_id
      }
        this.apiservice.getWorkingTime(timing).subscribe((data)=>
        {
         this.savedtime=data;
            
        })    
    })    
  }
    else{

    }
  }
  delete(id:any)
  {
    const user_id = localStorage.getItem('user_id');
    const days=localStorage.getItem('day');
    this.apiservice.deleteTimeSlots(id).subscribe((data)=>
    {

   const timing={
      day:days,
      userId:user_id
    }
      this.apiservice.getWorkingTime(timing).subscribe((data)=>
      {
       this.savedtime=data;
          
      }) 
    })
  }
}
