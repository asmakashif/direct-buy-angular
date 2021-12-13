import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenOrdersService } from './open-orders.service';

@Component({
    selector: 'app-open-orders',
    templateUrl: './open-orders.component.html',
    styleUrls: ['./open-orders.component.scss'],
})
export class OpenOrdersComponent implements OnInit {
    displayedColumns: string[] = [
        'order_code',
        'c_fname',
        'total',
        'order_placed_date',
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: any;
    constructor(
        private apiService: OpenOrdersService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;

        this.apiService
            .getOpenOrders(routeParams.shopId)
            .subscribe((pendingOrdersByStr) => {
                this.dataSource = pendingOrdersByStr;
                console.log(this.dataSource);
            });
    }

    orderDetailsByCode(order_code): void {
        const routeParams = this.routes.snapshot.params;
        console.log(order_code);
        this._router.navigate([
            '/order-details/' + order_code + '/' + routeParams.shopId,
        ]);
    }
}
