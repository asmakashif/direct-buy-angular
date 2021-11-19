import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueOrdersService } from './unique-orders.service';

@Component({
    selector: 'app-unique-orders',
    templateUrl: './unique-orders.component.html',
    styleUrls: ['./unique-orders.component.scss'],
})
export class UniqueOrdersComponent implements OnInit {
    displayedColumns: string[] = [
        'order_code',
        'c_fname',
        'total',
        'order_placed_date',
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: any;
    constructor(
        private apiService: UniqueOrdersService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;

        this.apiService
            .getPendingOrdersByStoreCurMonth(routeParams.shopId)
            .subscribe((pendingOrdersByStr) => {
                this.dataSource = pendingOrdersByStr;
                console.log(this.dataSource);
            });
    }

    orderDetailsByCode(order_code): void {
        const routeParams = this.routes.snapshot.params;
        console.log(order_code);
        this._router.navigate([
            '/orders/order-details/' + order_code + '/' + routeParams.shopId,
        ]);
    }
}
