import { DOCUMENT, Location } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    Inject,
    Injectable,
    OnInit,
} from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'app/modules/admin/dashboard/dashboard.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
    selector: 'app-configurations',
    templateUrl: './configurations.component.html',
    styleUrls: ['./configurations.component.scss'],
})
export class ConfigurationsComponent implements OnInit {
    selectedProject: string = 'Dashbaord';
    dateObj: number = Date.now();
    data: [];
    count: [];
    countOrders: [];
    queryParam: any;
    queryParamName: string;
    accessToken: string;
    user_id: string;
    firstname: string;
    prevMonthOrderCount: [];
    curMonthOrderCount: [];
    yestOpenOrderCount: [];
    openOrderCount: [];
    curFulfilledOrderCount: [];
    newCustomerCount: [];
    customerCount: [];
    payment: [];
    messageForm: any;
    shop_id: any;
    message: [];
    profileData: any;
    changeDetectRef: [];
    strPaymentCount: [];
    domain: string;
    validateSignIn: string;
    totalMinOrder: any;
    totalHomeDelOrder: any;
    usertotalHomeDel: any;
    products: any;
    selectedProductForm: any;
    editCache: { [key: string]: any } = {};
    flashMessage: string;
    allOrderCount: any;

    addProductForm: any;

    isLoading: boolean = false;

    addCache: { [key: string]: any } = {};
    searchText;
    thumbnail: any;

    constructor(
        @Inject(DOCUMENT)
        private _fuseConfirmationService: FuseConfirmationService,
        private formBuilder: FormBuilder,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.accessToken = localStorage.getItem('accessToken');
        this.validateSignIn = localStorage.getItem('validateSignIn');
        const user_id = localStorage.getItem('user_id');
        console.log(user_id);
        const routeParams = this.routes.snapshot.params;
        this.shop_id = routeParams.shopId;
        if (!this.accessToken) {
            if (this.validateSignIn == '0') {
                this._router.navigate(['sign-in']);
            }
        }

        this.routes.paramMap.subscribe((params) => {
            this.queryParam = params.get('shopId');
            this.queryParamName = params.get('shop_name');
            console.log(params);
        });

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.messageForm.patchValue(data);
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.cd.detectChanges();
            });

        this._dashboardService
            .getStrPaymentCount(routeParams.shopId)
            .subscribe((strPaymentCount) => {
                this.strPaymentCount = strPaymentCount;
            });

        this._dashboardService
            .getTotalMinOrderVal(user_id)
            .subscribe((data) => {
                this.totalMinOrder = data;
            });
        this._dashboardService
            .getTotalHomeDel(this.shop_id)
            .subscribe((data) => {
                this.totalHomeDelOrder = data;
            });
        this._dashboardService
            .getTotalHomeDelByUser(user_id)
            .subscribe((data) => {
                this.usertotalHomeDel = data;
            });
    }

    changeStore(stores): void {
        this._router
            .navigate(['dashboard/' + stores.shopId + '/' + stores.shop_name])
            .then(() => {
                this.ngOnInit();
                // window.location.reload();
            });
    }

    dashbaord(): void {
        this._router.navigate(['dashboard/']);
    }

    storePayment(): void {
        const routeParams = this.routes.snapshot.params;
        const configurations = 'configurations';
        localStorage.setItem('redirect', configurations);
        this._router.navigate(['/store/store-payment/' + routeParams.shopId]);
    }

    minimum_order(): void {
        const routeParams = this.routes.snapshot.params;
        console.log(routeParams.shopId);
        if (!this.isMobile()) {
            this._router.navigate(['/minOrderValue/' + routeParams.shopId]);
        } else {
            this._router.navigate(['/minOrderValue/' + routeParams.shopId]);
        }
    }
    home_delivery(stores): void {
        if (!this.isMobile()) {
            this._router.navigate(['/HomeDeliverySetting/' + stores.shopId]);
        } else {
            this._router.navigate(['//HomeDeliverySetting/' + stores.shopId]);
        }
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

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this.cd.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this.cd.markForCheck();
        }, 3000);
    }
}
