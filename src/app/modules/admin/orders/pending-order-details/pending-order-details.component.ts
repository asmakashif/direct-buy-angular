import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PendingOrderDetailsService } from 'app/modules/admin/orders/pending-order-details/pending-order-details.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Data } from '../../../../Model/data';

@Component({
    selector: 'app-pending-order-details',
    templateUrl: './pending-order-details.component.html',
    styleUrls: ['./pending-order-details.component.scss'],
})
export class PendingOrderDetailsComponent implements OnInit {
    displayedColumns: string[] = [
        'product_name',
        'product_price',
        'product_qty',
        'product_subtotal',
    ];
    dataSource: any;
    orderDetailsById: any;
    constructor(
        private apiService: PendingOrderDetailsService,
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
                console.log(this.orderDetailsById);
            });

        this.apiService
            .getPendingOrderDetails(routeParams.order_code)
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
