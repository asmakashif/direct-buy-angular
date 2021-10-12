import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PendingOrdersService } from 'app/modules/admin/orders/pending-orders/pending-orders.service';

@Component({
    selector: 'app-pending-orders',
    templateUrl: './pending-orders.component.html',
    styleUrls: ['./pending-orders.component.scss'],
})
export class PendingOrdersComponent implements OnInit {
    displayedColumns: string[] = [
        'order_code',
        'c_fname',
        'total',
        'order_placed_date',
    ];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    dataSource: [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private apiService: PendingOrdersService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.apiService.getPendingOrders().subscribe((dataSource) => {
            // Store the data
            this.dataSource = dataSource;
            console.log(this.dataSource);
        });
    }

    pendingOrderByCode(order_code): void {
        const routeParams = this.routes.snapshot.params;
        console.log(order_code);
        this._router.navigate([
            '/orders/pending-order-details/' +
                order_code +
                '/' +
                routeParams.shopId,
        ]);
    }
}
