import {
    AfterViewInit,
    Component,
    ViewChild,
    OnInit,
    ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { DashboardService } from '../../dashboard/dashboard.service';
import { SalesService } from './sales.service';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    profileData: any;
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
    firstname: any;
    constructor(
        private apiService: SalesService,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.apiService
            .getAllOrdersByStore(routeParams.shopId)
            .subscribe((allOrdersByStr) => {
                this.dataSource = allOrdersByStr;
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
        const sales = 'sales';
        localStorage.setItem('sales', sales);
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
