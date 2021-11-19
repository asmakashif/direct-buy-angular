import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MinOrderConfigService } from './min-order-config.service';
@Component({
  selector: 'app-min-order-config',
  templateUrl: './min-order-config.component.html',
  styleUrls: ['./min-order-config.component.scss']
})
export class MinOrderConfigComponent implements OnInit {
  days: any;
  shop_id: string;
  values:any;
  constructor(private router: Router, private route : ActivatedRoute,private fb: FormBuilder,private apiservice:MinOrderConfigService) { }
  signinForm: FormGroup;
  ngOnInit(): void {
    this.signinForm = this.fb.group({
      minOrder: ['', Validators.required]
     
    });
    const user_id = localStorage.getItem('user_id');
    this.route.paramMap.subscribe(
      params => {
        this.shop_id=params.get('shop_id');
          console.log(this.shop_id);
      });
      this.apiservice.getMinimumOrderValue(this.shop_id).subscribe((data)=>
      {
         this.values=data;
         
      })
    this.apiservice.getMinimumOrderValueForUser(user_id).subscribe((data)=>
      {
          this.days=data;
          
         
      }
      )
  }
  onSubmit()
  {
    if (this.signinForm.invalid) {
      return;
    }

    const data={
      minOrder:this.signinForm.controls.minOrder.value,
      id:this.shop_id,
      
      }
      this.apiservice.saveMinimumOrderValue(data).subscribe((data) => {
       
        alert("Successfully Updated")
        this.apiservice.getMinimumOrderValue(this.shop_id).subscribe((data)=>
        {
           this.values=data;
           
        })
      })
  }
}
