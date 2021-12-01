import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentGatewayService } from 'app/modules/admin/payment/payment-gateway/payment-gateway.service';

interface Animal {
    name: string;
    sound: string;
}

@Component({
    selector: 'app-payment-gateway',
    templateUrl: './payment-gateway.component.html',
    styleUrls: ['./payment-gateway.component.scss'],
})
export class PaymentGatewayComponent implements OnInit {
    paymentGatewayForm: FormGroup;
    flashMessage: string;
    @ViewChild('shopForm') shopForm: NgForm;
    provider_type: string;

    constructor(
        private formBuilder: FormBuilder,
        private apiService: PaymentGatewayService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}
    providerType = [
        // { provider_name: 'Razorpay' },
        { provider_name: 'GooglePay' },
        { provider_name: 'Phonepe' },
        { provider_name: 'Paytm' },
    ];

    ngOnInit(): void {
        const user_id = localStorage.getItem('user_id');
        this.paymentGatewayForm = this.formBuilder.group({
            user_id: [user_id],
            provider_type: ['', Validators.required],
            payment_name: ['', Validators.required],
            payment_api_key: ['', Validators.required],
            payment_secret_key: ['', Validators.required],
            transaction_note: [''],
            merchant_code: [''],
            salt_index: [''],
        });
    }

    onSubmit() {
        const routeParams = this.routes.snapshot.params;
        console.log(this.paymentGatewayForm.value);
        if (this.paymentGatewayForm.invalid) {
            return;
        }
        if (routeParams.shopId) {
            this.apiService
                .savePaymentIntegration(this.paymentGatewayForm.value)
                .subscribe(
                    (data) => {
                        this._router.navigate(['/steps/' + routeParams.shopId]);
                    },
                    (response) => {
                        this.showFlashMessage('error');
                        this.ngOnInit();
                        // Reset the form
                        //this.shopForm.resetForm();
                    }
                );
        } else {
            this.apiService
                .savePaymentIntegration(this.paymentGatewayForm.value)
                .subscribe(
                    (data) => {
                        this._router.navigate(['/dashboard/']);
                    },
                    (response) => {
                        this.showFlashMessage('error');
                        this.ngOnInit();
                        // Reset the form
                        //this.shopForm.resetForm();
                    }
                );
        }
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

    // onTypeSelection() {
    //     console.log(this.provider_type);
    // }

    onChange(val) {
        console.log(val);
        var googlepayelement = document.getElementById('googlepay');
        if (val == 'GooglePay') googlepayelement.style.display = 'block';
        else googlepayelement.style.display = 'none';

        // var googlepayelement = document.getElementById('googlepay');
        // if (val == 'Googlepay') googlepayelement.style.display = 'block';
        // else googlepayelement.style.display = 'none';

        var paytmelement = document.getElementById('paytm');
        if (val == 'Paytm') paytmelement.style.display = 'block';
        else paytmelement.style.display = 'none';

        var phonepeelement = document.getElementById('phonepe');
        if (val == 'Phonepe') phonepeelement.style.display = 'block';
        else phonepeelement.style.display = 'none';
    }

    cancel(): void {
        const redirectto = localStorage.getItem('payment');
        if (redirectto == 'payment') {
            this._router.navigate(['/payment']).then(() => {
                localStorage.removeItem('payment');
            });
        } else {
            this._router.navigate(['/dashboard']);
        }
    }
}
