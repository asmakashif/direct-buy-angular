import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    NgForm,
    FormArray,
    FormControl,
} from '@angular/forms';
import { StorePaymentService } from 'app/modules/admin/store-payment/store-payment.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-store-payment',
    templateUrl: './store-payment.component.html',
    styleUrls: ['./store-payment.component.scss'],
})
export class StorePaymentComponent implements OnInit {
    payment: any;
    paymentForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private apiService: StorePaymentService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const shopId = routeParams.shopId;
        this.apiService.getPaymentData(shopId).subscribe((payment: any) => {
            this.payment = payment;
            console.log(this.payment);
        });
        this.paymentForm = this.formBuilder.group({
            shopId: [shopId],
            //provider_type: this.formBuilder.array([], [Validators.required]),
            payment_name: this.formBuilder.array([], [Validators.required]),
        });
    }

    onPaymentSelect(e) {
        const payment_name: FormArray = this.paymentForm.get(
            'payment_name'
        ) as FormArray;

        if (e.target.checked) {
            payment_name.push(new FormControl(e.target.value));
        } else {
            const index = payment_name.controls.findIndex(
                (x) => x.value === e.target.value
            );
            payment_name.removeAt(index);
        }
    }

    onSubmit() {
        //more code
        console.log(this.paymentForm.value);
        const routeParams = this.routes.snapshot.params;
        console.log(this.paymentForm.value);
        if (this.paymentForm.invalid) {
            return;
        }
        if (localStorage.getItem('redirect') == 'shopdetails') {
            this.apiService
                .saveStrPayments(this.paymentForm.value)
                .subscribe((data) => {
                    this._router.navigate([
                        '/shop-details/' + routeParams.shopId,
                    ]);
                });
        } else {
            this.apiService
                .saveStrPayments(this.paymentForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/steps/' + routeParams.shopId]);
                });
        }
    }
}
