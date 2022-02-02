import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompletedOrderDetailsService } from 'app/modules/admin/orders/completed-order-details/completed-order-details.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-completed-order-details',
    templateUrl: './completed-order-details.component.html',
    styleUrls: ['./completed-order-details.component.scss'],
})
export class CompletedOrderDetailsComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    displayedColumns: string[] = [
        'product_name',
        'product_price',
        'product_qty',
        'product_subtotal',
    ];
    dataSource: any;
    orderDetailsById: any;
    profileData: any;
    firstname: any;
    order_code: any;
    c_fname: any;
    total: any;
    domainname: any;

    constructor(
        private apiService: CompletedOrderDetailsService,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        console.log(routeParams);
        this.apiService
            .getCompletedOrderById(routeParams.order_code)
            .subscribe((orderDetailsById) => {
                this.orderDetailsById = orderDetailsById;
                this.order_code = this.orderDetailsById.order_code;
                this.c_fname = this.orderDetailsById.c_fname;
                this.total = this.orderDetailsById.total;
                console.log(this.orderDetailsById);
            });

        this.apiService
            .getCompletedOrderDetails(
                routeParams.order_code,
                routeParams.shopId
            )
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
}
