import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompletedOrderDetailsService } from 'app/modules/admin/orders/completed-order-details/completed-order-details.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Data } from '../../../../Model/data';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-completed-order-details',
    templateUrl: './completed-order-details.component.html',
    styleUrls: ['./completed-order-details.component.css'],
})
export class CompletedOrderDetailsComponent implements OnInit {
    displayedColumns: string[] = [
        'product_name',
        'product_price',
        'product_qty',
        'product_subtotal',
    ];
    dataSource: any;
    orderDetailsById: any;
    profileData: any;
    firstname: any;
    order_code: any;
    c_fname: any;
    total: any;

    constructor(
        private apiService: CompletedOrderDetailsService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        console.log(routeParams);
        this.apiService
            .getCompletedOrderById(routeParams.order_code)
            .subscribe((orderDetailsById) => {
                this.orderDetailsById = orderDetailsById;
                this.order_code = this.orderDetailsById.order_code;
                this.c_fname = this.orderDetailsById.c_fname;
                this.total = this.orderDetailsById.total;
                console.log(this.orderDetailsById);
            });

        this.apiService
            .getCompletedOrderDetails(
                routeParams.order_code,
                routeParams.shopId
            )
            .subscribe((dataSource) => {
                this.dataSource = dataSource;
                console.log(this.dataSource);
            });
    }
}
