import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailsService } from 'app/modules/admin/orders/order-details/order-details.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Data } from '../../../../Model/data';

@Component({
    selector: 'app-pending-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
    isScreenSmall: boolean;
    displayedColumns: string[] = [
        'product_name',
        'product_price',
        'product_qty',
        'product_subtotal',
    ];
    dataSource: any;
    orderDetailsById: any;
    order_code: any;
    c_fname: any;
    total: any;
    order_status: any;
    constructor(
        private apiService: OrderDetailsService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        console.log(routeParams);
        this.apiService
            .getPendingOrderById(routeParams.order_code)
            .subscribe((orderDetailsById) => {
                this.orderDetailsById = orderDetailsById;
                this.order_code = this.orderDetailsById.order_code;
                this.c_fname = this.orderDetailsById.c_fname;
                this.total = this.orderDetailsById.total;
                this.order_status = this.orderDetailsById.order_status;
                console.log(this.orderDetailsById);
            });

        this.apiService
            .getPendingOrderDetails(routeParams.order_code, routeParams.shopId)
            .subscribe((dataSource) => {
                this.dataSource = dataSource;
                console.log(this.dataSource);
            });
    }

    orderComplete(): void {
        const routeParams = this.routes.snapshot.params;
        console.log(routeParams);
        this.apiService
            .updateOrderStatus(routeParams.order_code, routeParams.shopId)
            .subscribe((data) => {
                this._router.navigate(['dashboard']);
            });
    }
}
