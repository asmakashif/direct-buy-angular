import {
    AfterViewInit,
    Component,
    ViewChild,
    OnInit,
    ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CompletedOrdersService } from 'app/modules/admin/orders/completed-orders/completed-orders.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-completed-orders',
    templateUrl: './completed-orders.component.html',
    //styleUrls: ['./completed-orders.component.scss'],
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: auto 40px;

                @screen sm {
                    grid-template-columns: auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 112px auto 112px 96px 96px 72px;
                }
            }
        `,
        `
            .fixedheader {
                overflow-y: auto;
                height: 510px;
            }
        `,
    ],
})
export class CompletedOrdersComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    selectedProject: string = 'Dashbaord';
    displayedColumns: string[] = [
        'order_code',
        'c_fname',
        'total',
        'order_placed_date',
    ];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: any;
    shopdata: any;
    profileData: any;
    firstname: any;
    queryParam: string;
    shop_name: any;
    data: any;
    completedOrders: any;
    pendingOrders: any;
    allOrders: any;
    domainname: any;

    constructor(
        private apiService: CompletedOrdersService,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.routes.paramMap.subscribe((params) => {
            this.queryParam = params.get('shopId');
            console.log(params);
        });

        this.apiService.getShops(user_id).subscribe(
            (data: any) => {
                this.data = data;
                this.cd.detectChanges();
            },
            (error) => {
                //alert(error.message);
            }
        );

        this.apiService
            .getShopDetailsById(routeParams.shopId, user_id)
            .subscribe((data: any) => {
                this.shopdata = data;
                this.shop_name = this.shopdata.shop_name;
                console.log(this.shop_name);
            });

        this.apiService
            .getAllOrdersByStore(routeParams.shopId)
            .subscribe((allOrdersByStr) => {
                this.allOrders = allOrdersByStr;
                console.log(this.allOrders);
            });

        this.apiService
            .getPendingOrdersByStore(routeParams.shopId)
            .subscribe((pendingOrdersByStr) => {
                this.pendingOrders = pendingOrdersByStr;
                console.log(this.pendingOrders);
            });

        this.apiService
            .getCompletedOrdersByStore(routeParams.shopId)
            .subscribe((completedOrdersByStr) => {
                this.completedOrders = completedOrdersByStr;
                console.log(this.completedOrders);
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

    dashbaord(): void {
        this._router.navigate(['dashboard/']);
    }

    changeStore(stores): void {
        //alert(stores.shop_name);
        this._router
            .navigate(['dashboard/' + stores.shopId + '/' + stores.shop_name])
            .then(() => {
                this.ngOnInit();
                // window.location.reload();
            });
    }
}
