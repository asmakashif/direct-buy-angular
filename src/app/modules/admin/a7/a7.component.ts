import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { InvoiceService} from '../invoice/invoice.service'
@Component({
  selector: 'app-A7',
  templateUrl: './A7.component.html',
  styleUrls: ['./A7.component.scss']
})
export class A7Component implements OnInit {
  orderData: any;
  orderItems: any;
  order_code:any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiservice:InvoiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.order_code = params.get('order_code');
     this.apiservice.getOrderReportsByOrderCode(this.order_code).subscribe((data)=>
     {
        this.orderData=data;
     })
     this.apiservice.getOrderItemsByOrderCode(this.order_code).subscribe((data)=>
     {
       this.orderItems=data;
     })
  });
  setTimeout(() => {
    window.print();
}, 1000);
  
  }
  

}
