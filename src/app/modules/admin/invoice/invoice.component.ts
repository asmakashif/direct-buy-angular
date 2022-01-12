import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { InvoiceService } from './invoice.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss'],
    //   styles: [
    //     /* language=SCSS */
    //     `
    //     .table>:not(caption)>*>* {
    //       border-bottom-width:0px;

    //   }
    //   @media print {
    //       .btn.btn-success {
    //         display: none
    //       }
    //       .col-md-3
    //       {
    //           width: 50%;
    //       }
    //   }
    //   @page {
    //       size:85mm 197mm;
    //       margin: 0;
    //     }
    //     `,
    // ],
})
export class InvoiceComponent implements OnInit {
    color = 'red';
    width = '45mm';

    height = '197mm';

    order_code: any;
    orderData: any;
    orderItems: any;
    constructor(
        private _detectChanges: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private apiservice: InvoiceService
    ) {}
    styleFromParent = { marginTop: '10px', marginLeft: '50px' };

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.order_code = params.get('order_code');
            this.apiservice
                .getOrderReportsByOrderCode(this.order_code)
                .subscribe((data) => {
                    this.orderData = data;
                });
            this.apiservice
                .getOrderItemsByOrderCode(this.order_code)
                .subscribe((data) => {
                    this.orderItems = data;
                });
        });
    }
    pageSelected(e: any) {
        const pageSelected = localStorage.setItem('page', e);
    }

    orderComplete(): void {
        const routeParams = this.route.snapshot.params;
        console.log(routeParams);
        this.apiservice
            .updateOrderStatus(routeParams.order_code, routeParams.shopId)
            .subscribe((data) => {
                this.router.navigate([
                    '/open-orders/' +
                        routeParams.shopId +
                        '/' +
                        routeParams.shop_name,
                ]);
            });
    }

    printPage() {
        const page = localStorage.getItem('page');
        if (page == 'A4') {
            window.print();
        } else if (page == 'A5') {
            this.router.navigate(['/A5/' + this.order_code]);
        } else if (page == 'A6') {
            this.router.navigate(['/A6/' + this.order_code]);
        } else if (page == 'A7') {
            this.router.navigate(['/A7/' + this.order_code]);
        } else if (page == 'A8') {
            this.router.navigate(['/A8/' + this.order_code]);
        }
    }
}
