import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from './sales.service';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
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
        private apiService: SalesService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        this.apiService
            .getAllOrdersByStore(routeParams.shopId)
            .subscribe((allOrdersByStr) => {
                this.dataSource = allOrdersByStr;
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
