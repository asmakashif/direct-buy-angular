import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DashboardService } from '../../dashboard/dashboard.service';
import { AttachPaymentService } from './attach-payment.service';

@Component({
    selector: 'app-attach-payment',
    templateUrl: './attach-payment.component.html',
    styleUrls: ['./attach-payment.component.scss'],
})
export class AttachPaymentComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    profileData: any;
    domainname: any;
    payment: any;
    paymentForm: FormGroup;
    selection = [];
    isChecked: any;
    flashMessage: string;
    imagePath: string = '/assets/icons/';
    image: any;
    shopPayment: any;
    firstname: any;
    constructor(
        private formBuilder: FormBuilder,
        private _apiService: AttachPaymentService,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const shopId = routeParams.shopId;
        const user_id = localStorage.getItem('user_id');

        this._apiService
            .getShopsPaymentData(routeParams.payment_name, user_id)
            .subscribe(
                (shops: any) => {
                    this.shopPayment = shops;
                    this.cd.detectChanges();
                },
                (error) => {
                    //alert(error.message);
                }
            );
        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
            });
    }

    strPayment(e) {
        const routeParams = this.routes.snapshot.params;
        console.log(routeParams);
        const user_id = localStorage.getItem('user_id');
        const shopId = e.target.value;
        const data = {
            shopId: shopId,
            user_id: user_id,
            payment_name: routeParams.payment_name,
        };
        if (e.target.checked) {
            //alert(data);
            this._apiService.saveStrPayments(data).subscribe((data) => {
                this.ngOnInit();
            });
        } else {
            //alert(payment_name);
            this._apiService
                .deleteStrPaymentByShopId(data)
                .subscribe((data) => {
                    this.ngOnInit();
                });
        }
    }

    attachToStr(shops): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        const data = {
            shopId: shops.shopId,
            user_id: user_id,
            payment_name: routeParams.payment_name,
        };

        this._apiService.saveStrPayments(data).subscribe((data) => {
            this.ngOnInit();
        });
    }

    removeFromStr(shops): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        const data = {
            shopId: shops.shopId,
            user_id: user_id,
            payment_name: routeParams.payment_name,
        };

        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete payment',
            message:
                'Confirm, you wish to remove this payment gateway from' +
                shops.shop_name,
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                this._apiService
                    .deleteStrPaymentByShopId(data)
                    .subscribe((data) => {
                        this.ngOnInit();
                    });
            }
        });
    }

    done() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/store-payment/' + routeParams.shopId]);
        this.showFlashMessage('success');
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
