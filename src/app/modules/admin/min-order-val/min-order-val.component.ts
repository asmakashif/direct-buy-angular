import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MinOrderValService } from './min-order-val.service';
@Component({
  selector: 'app-min-order-val',
  templateUrl: './min-order-val.component.html',
  styleUrls: ['./min-order-val.component.scss']
})
export class MinOrderValComponent implements OnInit {
 
 
  constructor(private router: Router, private route : ActivatedRoute,private fb: FormBuilder,private apiservice:MinOrderValService) { }
  signinForm: FormGroup;
  shop_id:any;
  params:any;
  min_order:any
  ngOnInit(): void {
    this.signinForm = this.fb.group({
      minOrder: ['', Validators.required]
     
    });
    this.route.paramMap.subscribe(
      params => {
        this.shop_id=params.get('shop_id');
          console.log(this.shop_id);
      });
      this.apiservice.getMinimumOrderValue(this.shop_id).subscribe((data) => {
       
        this.min_order = data;
        console.log(data);
      });
  }
  onSubmit()
  {
    if (this.signinForm.invalid) {
      return;
    }
 
    const data={
      minOrder:this.signinForm.controls.minOrder.value,
      id:this.shop_id
      }
      this.apiservice.saveMinimumOrderValue(data).subscribe((data) => {
       
     
      });
      console.log(data);
  }
}
