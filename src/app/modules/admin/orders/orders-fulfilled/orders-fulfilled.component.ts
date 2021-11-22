import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersFulfilledService } from './orders-fulfilled.service';

@Component({
    selector: 'app-orders-fulfilled',
    templateUrl: './orders-fulfilled.component.html',
    styleUrls: ['./orders-fulfilled.component.scss'],
})
export class OrdersFulfilledComponent implements OnInit {
    displayedColumns: string[] = [
        'order_code',
        'c_fname',
        'total',
        'order_placed_date',
    ];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: any;
    profileData: any;
    firstname: any;
    constructor(
        private apiService: OrdersFulfilledService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        this.apiService
            .getPrevMonthOrdersFulfilled(routeParams.shopId)
            .subscribe((completedOrdersByStr) => {
                this.dataSource = completedOrdersByStr;
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
