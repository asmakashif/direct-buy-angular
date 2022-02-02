import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenOrdersService } from './open-orders.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-open-orders',
    templateUrl: './open-orders.component.html',
    styleUrls: ['./open-orders.component.scss'],
})
export class OpenOrdersComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    displayedColumns: string[] = [
        'order_code',
        'c_fname',
        'total',
        'order_placed_date',
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: any;
    profileData: any;
    domainname: any;
    firstname: any;
    constructor(
        private apiService: OpenOrdersService,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.apiService
            .getOpenOrders(routeParams.shopId)
            .subscribe((pendingOrdersByStr) => {
                this.dataSource = pendingOrdersByStr;
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
        const open_orders = 'open_orders';
        localStorage.setItem('open_orders', open_orders);
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
