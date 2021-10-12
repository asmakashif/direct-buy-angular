import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentGatewayService } from 'app/modules/admin/payment-gateway/payment-gateway.service';

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

    constructor(
        private formBuilder: FormBuilder,
        private apiService: PaymentGatewayService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}
    providerType = [{ provider_name: 'Razorpay' }, { provider_name: 'Paytm' }];

    ngOnInit(): void {
        this.paymentGatewayForm = this.formBuilder.group({
            user_id: [12],
            provider_type: ['', Validators.required],
            payment_name: ['', Validators.required],
            payment_api_key: ['', Validators.required],
            payment_secret_key: ['', Validators.required],
        });
    }

    onSubmit() {
        const routeParams = this.routes.snapshot.params;
        //console.log(this.paymentGatewayForm.value);
        if (this.paymentGatewayForm.invalid) {
            return;
        }
        this.apiService
            .savePaymentIntegration(this.paymentGatewayForm.value)
            .subscribe((data) => {
                this._router.navigate(['/steps/' + routeParams.shopId]);
            });
    }

    onChange(val) {
        console.log(val);
        var razorelement = document.getElementById('razorpay');
        if (val == 'Razorpay') razorelement.style.display = 'block';
        else razorelement.style.display = 'none';

        var paytmelement = document.getElementById('paytm');
        if (val == 'Paytm') paytmelement.style.display = 'block';
        else paytmelement.style.display = 'none';
    }
}
