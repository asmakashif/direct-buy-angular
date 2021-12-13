import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    NgForm,
    FormArray,
    FormControl,
} from '@angular/forms';
import { StorePaymentService } from 'app/modules/admin/store/store-payment/store-payment.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AttachPaymentService } from './attach-payment.service';

@Component({
    selector: 'app-attach-payment',
    templateUrl: './attach-payment.component.html',
    styleUrls: ['./attach-payment.component.scss'],
})
export class AttachPaymentComponent implements OnInit {
    payment: any;
    paymentForm: FormGroup;
    selection = [];
    isChecked: any;
    flashMessage: string;
    imagePath: string = '/assets/icons/';
    image: any;
    shopPayment: any;
    constructor(
        private formBuilder: FormBuilder,
        private _apiService: AttachPaymentService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
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
