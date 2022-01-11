import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DashboardService } from '../../dashboard/dashboard.service';
import { ManagePaymentService } from './manage-payment.service';

@Component({
    selector: 'app-manage-payment-gateway',
    templateUrl: './manage-payment-gateway.component.html',
    styleUrls: ['./manage-payment-gateway.component.scss'],
})
export class ManagePaymentGatewayComponent implements OnInit {
    faStore = faStore;
    profileData: any;
    domainname: any;
    selectedPaymentForm: any;
    paymentData: any;
    provider_type: any;
    flashMessage: string;
    firstname: any;

    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private _dashboardService: DashboardService,
        private formBuilder: FormBuilder,
        private _paymentService: ManagePaymentService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private _httpClient: HttpClient
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.selectedPaymentForm = this.formBuilder.group({
            payment_id: [''],
            provider_type: [''],
            payment_name: [''],
            payment_api_key: [''],
            payment_secret_key: [''],
            transaction_note: [''],
            merchant_code: [''],
            salt_index: [''],
        });

        this._paymentService
            .getPaymentDataId(routeParams.payment_id, user_id)
            .subscribe((data: any) => {
                this.selectedPaymentForm.patchValue(data);
                this.paymentData = data;
                this.provider_type = this.paymentData.provider_type;
                console.log(this.provider_type);
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

    /**
     * Update the selected product using the form data
     */
    updateSelectedPayment(): void {
        // Get the product object
        const payment = this.selectedPaymentForm.getRawValue();
        console.log(payment);

        // Update the product on the server
        this._paymentService.updatePayment(payment).subscribe(() => {
            // Show a success message
            this.showFlashMessage('success');
            // this.ngOnInit();
            this.cd.markForCheck();
        });
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedPayment(): void {
        // Open the confirmation dialog
        // const data = this.selectedProductForm.value;
        // alert(data.temp_str_config_id);
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete payment',
            message:
                'Are you sure you want to remove this payment? This action cannot be undone!',
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
                // Get the product object
                const payment = this.selectedPaymentForm.getRawValue();

                // Delete the product on the server
                this._paymentService
                    .deletePayment(payment.payment_id)
                    .subscribe(() => {
                        const redirectto = localStorage.getItem('payment');
                        if (redirectto == 'payment') {
                            this._router.navigate(['/payment']).then(() => {
                                localStorage.removeItem('payment');
                            });
                        } else {
                            this._router.navigate(['/dashboard']);
                        }
                    });
            }
        });
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
