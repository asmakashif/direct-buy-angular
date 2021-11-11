import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CompletedOrdersService } from 'app/modules/admin/orders/completed-orders/completed-orders.service';

@Component({
    selector: 'app-completed-orders',
    templateUrl: './completed-orders.component.html',
    styleUrls: ['./completed-orders.component.scss'],
})
export class CompletedOrdersComponent implements OnInit {
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
        private apiService: CompletedOrdersService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        this.apiService
            .getCompletedOrdersByStore(routeParams.shopId)
            .subscribe((completedOrdersByStr) => {
                this.dataSource = completedOrdersByStr;
                console.log(this.dataSource);
            });
    }

    completedOrderByCode(order_code): void {
        const routeParams = this.routes.snapshot.params;
        console.log(order_code);
        this._router.navigate([
            '/orders/completed-order-details/' +
                order_code +
                '/' +
                routeParams.shopId,
        ]);
    }
}
