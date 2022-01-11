import {
    AfterViewInit,
    Component,
    ViewChild,
    OnInit,
    ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersFulfilledService } from './orders-fulfilled.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-orders-fulfilled',
    templateUrl: './orders-fulfilled.component.html',
    styleUrls: ['./orders-fulfilled.component.scss'],
})
export class OrdersFulfilledComponent implements OnInit {
    faStore = faStore;
    domainname: any;
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
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.apiService
            .getPrevMonthOrdersFulfilled(routeParams.shopId)
            .subscribe((completedOrdersByStr) => {
                this.dataSource = completedOrdersByStr;
                console.log(this.dataSource);
            });

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
            });
    }

    orderDetailsByCode(order_code): void {
        const routeParams = this.routes.snapshot.params;
        console.log(order_code);
        this._router.navigate([
            '/order-details/' +
                order_code +
                '/' +
                routeParams.shopId +
                '/' +
                routeParams.shop_name,
        ]);
    }

    storeDashboard() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/dashboard/' + routeParams.shopId + '/' + routeParams.shop_name,
        ]);
    }
}
