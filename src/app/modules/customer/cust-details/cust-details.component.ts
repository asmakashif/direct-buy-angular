import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { CustomerService } from '../services/customer.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-cust-details',
  templateUrl: './cust-details.component.html',
  styleUrls: ['./cust-details.component.scss']
})
export class CustDetailsComponent implements OnInit {
  id: string;
  address: any;
  update_id1: any;
 
  delete_id1: any;
  details: any;

  constructor(private http:HttpClient,private apiService: CustomerService,
    private router: Router, private route : ActivatedRoute,private formBuilder: FormBuilder) { }
    angForm: FormGroup;
    pswForm:FormGroup;
  token=window.localStorage.getItem('token');
  params:any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.id=params.get('id');
        
      }
      
    );
    this.angForm = this.formBuilder.group({
      id: [],
       cust_id: this.token,
      houseName: ['', Validators.required],
      streetAddr :['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
    });
    this.pswForm = this.formBuilder.group({
      id: [],
      user_id: this.token,
      Cpassword: ['', Validators.required],
      Cnewpassword :['', Validators.required],
      newpassword: ['', Validators.required],
     
    });
    this.apiService.getCustAddress(this.id).subscribe((data:any) => {
      this.address = data;
      console.log(this.address);
     }) 
     this.apiService.getCustDetails(this.id)
    
    .subscribe((data:any) => {
    
       this.details = data;
      
    })
  }
  onSubmit() {
    //more code
    
    if (this.angForm.invalid) {
      return;
    }
  
    const logindata={
      cust_id:this.angForm.controls.cust_id.value,
       houseName: this.angForm.controls.houseName.value,
       streetAddr: this.angForm.controls.streetAddr.value,
        city: this.angForm.controls.city.value,
        pincode: this.angForm.controls.pincode.value,
      }
      
      this.apiService.addAddress(logindata).subscribe((data:any)=>
      {
       
        this.apiService.getCustAddress(this.id).subscribe((data:any) => {
          this.address = data;
         }) 
      });
    
    
     
  
  }
  changePswrd()
  {
    alert('ho');
    if (this.pswForm.invalid) {
      return;
    }
    const paswrd={
      user_id:this.pswForm.controls.user_id.value,
      Cpassword:this.pswForm.controls.Cpassword.value,
      newpassword: this.pswForm.controls.newpassword.value,
      Cnewpassword: this.pswForm.controls.Cnewpassword.value,
       
      }
  
      this.apiService.updatepswrd(paswrd).subscribe((data:any)=>
      {
       alert('Password Updated Successfully');
      });
  }
 delete(delete_id:any)
 {
  
   this.delete_id1=delete_id;
  this.apiService.getDeleteAddress(this.delete_id1).subscribe((data:any) => {
    this.address = data;
   })  
   this.apiService.getCustAddress(this.id).subscribe((data:any) => {
    this.address = data;
   }) 
 }
  update(update_id:any)
  {
    this.update_id1=update_id;
  //  alert(update_id);
   this.apiService.updateAddres(this.update_id1).subscribe((data:any) => {
    //this.address = data;
   })  
  //  this.apiService.getCustAddress(this.id).subscribe((data:any) => {
  //   this.address = data;
  //  }) 
  }

}
