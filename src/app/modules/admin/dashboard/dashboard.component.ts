import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    Inject,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'app/modules/admin/dashboard/dashboard.service';
import { Data } from '../../../Model/data';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
    selectedProject: string = 'Dashbaord';
    dateObj: number = Date.now();
    data: any;
    count: any;
    countOrders: any;
    queryParam: any;
    queryParamName: string;
    accessToken: string;
    user_id: string;
    firstname: string;
    prevMonthOrderCount: any;
    curMonthOrderCount: any;
    yestOpenOrderCount: any;
    openOrderCount: any;
    curFulfilledOrderCount: any;
    newCustomerCount: any;
    customerCount: any;
    payment: any;

    constructor(
        @Inject(DOCUMENT)
        private _document: Document,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.accessToken = localStorage.getItem('accessToken');
        const user_id = localStorage.getItem('user_id');
        this.firstname = localStorage.getItem('firstname');
        if (!this.accessToken) {
            this._router.navigate(['sign-in']);
        }
        const routeParams = this.routes.snapshot.params;
        this._dashboardService.getShops(user_id).subscribe((data: any) => {
            this.data = data;
        });

        this._dashboardService.getNoOfShops(user_id).subscribe((count) => {
            this.count = count;
        });

        this.routes.paramMap.subscribe((params) => {
            this.queryParam = params.get('shopId');
            this.queryParamName = params.get('shop_name');
            console.log(params);
        });

        this._dashboardService
            .getPrevMonthOrders(routeParams.shopId)
            .subscribe((prevMonthOrderCount) => {
                this.prevMonthOrderCount = prevMonthOrderCount;
                console.log(this.prevMonthOrderCount);
            });

        this._dashboardService
            .getCurrentMonthOrders(routeParams.shopId)
            .subscribe((curMonthOrderCount) => {
                this.curMonthOrderCount = curMonthOrderCount;
                console.log(this.curMonthOrderCount);
            });

        this._dashboardService
            .getYestOpenOrders(routeParams.shopId)
            .subscribe((yestOpenOrderCount) => {
                this.yestOpenOrderCount = yestOpenOrderCount;
                console.log(this.yestOpenOrderCount);
            });
        this._dashboardService
            .getOpenOrders(routeParams.shopId)
            .subscribe((openOrderCount) => {
                this.openOrderCount = openOrderCount;
                console.log(this.openOrderCount);
            });

        this._dashboardService
            .getCurFulfilledOrders(routeParams.shopId)
            .subscribe((curFulfilledOrderCount) => {
                this.curFulfilledOrderCount = curFulfilledOrderCount;
                console.log(this.curFulfilledOrderCount);
            });

        this._dashboardService
            .getNewRegisteredCustomers(routeParams.shopId)
            .subscribe((newCustomerCount) => {
                this.newCustomerCount = newCustomerCount;
                console.log(this.newCustomerCount);
            });

        this._dashboardService
            .getRegisteredCustomers(routeParams.shopId)
            .subscribe((customerCount) => {
                this.customerCount = customerCount;
                console.log(this.customerCount);
            });

        this._dashboardService
            .getPaymentGateway(user_id)
            .subscribe((payment: any) => {
                this.payment = payment;
                console.log(this.payment);
            });
    }

    changeStore(stores): void {
        // const success = this._router.navigate([
        //     'dashboard/' + stores.shopId + '/' + stores.shop_name,]);
        // if (success) {
        //     this.ngOnInit();
        // }
        this._router
            .navigate(['dashboard/' + stores.shopId + '/' + stores.shop_name])
            .then(() => {
                window.location.reload();
            });
    }

    dashbaord(): void {
        //this.refresh();
        this._router.navigate(['dashboard/']);
    }

    // refresh(): void {
    //     this._document.defaultView.location.reload();
    // }

    shopDetails(data: Data): void {
        if (!this.isMobile()) {
            this._router.navigate(['/store/shop-details/' + data.shopId]);
        } else {
            this._router.navigate(['/store/shop-details/' + data.shopId]);
        }
    }

    steps(data: Data): void {
        if (!this.isMobile()) {
            this._router.navigate(['/steps/' + data.shopId]);
        } else {
            this._router.navigate(['/mobile/steps/' + data.shopId]);
        }
    }

    completedOrders(data: Data): void {
        this._router.navigate(['/orders/completed-orders/' + data.shopId]);
    }

    pendingOrders(data: Data): void {
        this._router.navigate(['/orders/pending-orders/' + data.shopId]);
    }

    isMobile() {
        let check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk) |tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || (<any>window).opera);
        return check;
    }
}
