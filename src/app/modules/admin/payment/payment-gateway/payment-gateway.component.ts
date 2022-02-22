import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { PaymentGatewayService } from 'app/modules/admin/payment/payment-gateway/payment-gateway.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

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
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    profileData: any;
    domainname: any;
    paymentGatewayForm: FormGroup;
    flashMessage: string;
    @ViewChild('shopForm') shopForm: NgForm;
    provider_type: string;
    firstname: any;

    constructor(
        private formBuilder: FormBuilder,
        private apiService: PaymentGatewayService,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }
    providerType = [
        { provider_name: 'CashOnDelivery' },
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
            payment_api_key: [''],
            payment_secret_key: [''],
            transaction_note: [''],
            merchant_code: [''],
            salt_index: [''],
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

    onSubmit() {
        const routeParams = this.routes.snapshot.params;
        //console.log(routeParams.shopId);
        const redirecttostrpayment = localStorage.getItem('strpayment');
        if (this.paymentGatewayForm.invalid) {
            return;
        }

        this.apiService
            .savePaymentIntegration(this.paymentGatewayForm.value)
            .subscribe(
                (data) => {
                    if (redirecttostrpayment) {
                        this._router.navigate(['/payment/']);
                    } else {
                        this._router.navigate(['/dashboard/']);
                    }
                },
                (response) => {
                    this.showFlashMessage('error');
                    this.ngOnInit();
                    // Reset the form
                    //this.shopForm.resetForm();
                }
            );
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
        const routeParams = this.routes.snapshot.params;
        const redirectto = localStorage.getItem('payment');
        const redirecttostrpayment = localStorage.getItem('strpayment');
        if (routeParams.shopId) {
            if (redirecttostrpayment == 'strpayment') {
                this._router
                    .navigate(['/store-payment/' + routeParams.shopId])
                    .then(() => {
                        localStorage.removeItem('strpayment');
                    });
            }
        } else {
            if (redirectto == 'payment') {
                this._router.navigate(['/payment']).then(() => {
                    localStorage.removeItem('payment');
                });
            } else {
                this._router.navigate(['/dashboard']);
            }
        }
    }

    comingsoon() {
        const confirmation = this._fuseConfirmationService.open({
            title: "",
            message:
                'Coming Soon',
            icon: {
                "show": false,
            },
            actions: {
                confirm: {
                    label: 'Okay',
                },
                cancel: {
                    "show": false
                }
            },
        });
    }
}
