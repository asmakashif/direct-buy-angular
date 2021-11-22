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

@Component({
    selector: 'app-store-payment',
    templateUrl: './store-payment.component.html',
    styleUrls: ['./store-payment.component.scss'],
})
export class StorePaymentComponent implements OnInit {
    payment: any;
    paymentForm: FormGroup;
    selection = [];
    isChecked: any;
    flashMessage: string;
    constructor(
        private formBuilder: FormBuilder,
        private apiService: StorePaymentService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const shopId = routeParams.shopId;
        const user_id = localStorage.getItem('user_id');
        this.apiService
            .getPaymentData(shopId, user_id)
            .subscribe((payment: any) => {
                this.payment = payment;
                console.log(this.payment);
            });

        // this.apiService
        //     .getStrPaymentData(routeParams.shopId, user_id)
        //     .subscribe((payment: any) => {
        //         this.paymentForm.patchValue(payment);
        //         this.payment = payment;
        //         console.log(this.payment);
        //     });
        // this.paymentForm = this.formBuilder.group({
        //     user_id: [user_id],
        //     shopId: [shopId],
        //     payment_name: this.formBuilder.array([], [Validators.required]),
        // });
    }

    strPayment(e) {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        const payment_name = e.target.value;
        const data = {
            payment_name: payment_name,
            user_id: user_id,
            shopId: routeParams.shopId,
        };
        if (e.target.checked) {
            //alert(data);
            this.apiService.saveStrPayments(data).subscribe((data) => {
                this.ngOnInit();
            });
        } else {
            //alert(payment_name);
            this.apiService.deleteStrPayments(data).subscribe((data) => {
                this.ngOnInit();
            });
        }
    }

    onDefaultSelect(e) {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        const shop_pInfo_id = e.target.value;
        const defaultData = {
            shop_pInfo_id: shop_pInfo_id,
            user_id: user_id,
            shopId: routeParams.shopId,
        };
        if (e.target.checked) {
            this.apiService
                .saveDefaultPayment(defaultData)
                .subscribe((data) => {
                    this.showFlashMessage('success');
                    this.ngOnInit();
                });
        }
        // const shop_pInfo_id: FormArray = this.paymentForm.get(
        //     'shop_pInfo_id'
        // ) as FormArray;

        // if (e.target.checked) {
        //     shop_pInfo_id.push(new FormControl(e.target.value));
        // } else {
        //     const index = shop_pInfo_id.controls.findIndex(
        //         (x) => x.value === e.target.value
        //     );
        //     shop_pInfo_id.removeAt(index);
        // }
    }

    // onPaymentSelect(e) {
    //     // alert(e.target.value);
    //     const routeParams = this.routes.snapshot.params;
    //     const user_id = localStorage.getItem('user_id');
    //     const payment_name: FormArray = this.paymentForm.get(
    //         'payment_name'
    //     ) as FormArray;

    //     if (e.target.checked) {
    //         alert(e.target.value);
    //         const data = {
    //             payment_name: payment_name,
    //             user_id: user_id,
    //             shopId: routeParams.shopId,
    //         };
    //         alert(data);
    //         this.apiService.saveStrPayments(data).subscribe((data) => {
    //             this._router.navigate([
    //                 '/store/store-payment/' + routeParams.shopId,
    //             ]);
    //         });
    //         payment_name.push(new FormControl(e.target.value));
    //     } else {
    //         alert(e.target.value);
    //         const data = {
    //             payment_name: e.target.value,
    //             user_id: user_id,
    //             shopId: routeParams.shopId,
    //         };
    //         alert(data);
    //         this.apiService.deleteStrPayments(data).subscribe((data) => {
    //             this._router.navigate([
    //                 '/store/store-payment/' + routeParams.shopId,
    //             ]);
    //         });
    //         const index = payment_name.controls.findIndex(
    //             (x) => x.value === e.target.value
    //         );
    //         payment_name.removeAt(index);
    //     }
    // }

    done() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/store/store-payment/' + routeParams.shopId]);
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

    // onSubmit() {
    //     //more code
    //     console.log(this.paymentForm.value.payment_name);
    //     const routeParams = this.routes.snapshot.params;
    //     if (this.paymentForm.invalid) {
    //         return;
    //     }
    //     if (localStorage.getItem('redirect') == 'shopdetails') {
    //         this.apiService
    //             .saveStrPayments(this.paymentForm.value)
    //             .subscribe((data) => {
    //                 this._router.navigate([
    //                     '/store/shop-details/' + routeParams.shopId,
    //                 ]);
    //             });
    //     } else {
    //         this.apiService
    //             .saveStrPayments(this.paymentForm.value)
    //             .subscribe((data) => {
    //                 this._router.navigate(['/steps/' + routeParams.shopId]);
    //             });
    //     }
    // }
}
