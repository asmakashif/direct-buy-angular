import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailsService } from 'app/modules/admin/orders/order-details/order-details.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Data } from '../../../../Model/data';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-pending-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
    faStore = faStore;
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
    profileData: any;
    domainname: any;
    firstname: any;

    constructor(
        private apiService: OrderDetailsService,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
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

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
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

    storeDashboard() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/dashboard/' + routeParams.shopId + '/' + routeParams.shop_name,
        ]);
    }

    openOrdersAllMonth() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/open-orders/' + routeParams.shopId + '/' + routeParams.shop_name,
        ]);
    }
}
