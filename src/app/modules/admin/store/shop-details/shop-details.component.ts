import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    NgForm,
    FormArray,
    FormControl,
} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ShopDetailsService } from 'app/modules/admin/store/shop-details/shop-details.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-shop-details',
    templateUrl: './shop-details.component.html',
    //styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent implements OnInit {
    editForm: FormGroup;
    formGroup: FormGroup;
    minOrderValGroup: FormGroup;
    data: any;
    payment: any;
    paymentForm: FormGroup;
    isChecked = true;
    constructor(
        private flashMessagesService: FlashMessagesService,
        // private ngFlashMessageService: NgFlashMessageService,
        private formBuilder: FormBuilder,
        private apiService: ShopDetailsService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        localStorage.removeItem('redirect');
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');

        this.editForm = this.formBuilder.group({
            shop_id: [],
            shopId: ['', Validators.required],
            shop_name: ['', Validators.required],
            shop_address: ['', Validators.required],
        });

        this.minOrderValGroup = this.formBuilder.group({
            shopId: [routeParams.shopId],
            min_order_val: ['', Validators.required],
        });
        //console.log(this.editForm);
        this.apiService
            .getShopDetailsById(routeParams.shopId, user_id)
            .subscribe((data: any) => {
                this.editForm.patchValue(data);
                this.minOrderValGroup.patchValue(data);
                this.data = data;
                console.log(this.data);
            });

        this.apiService
            .getStrPaymentData(routeParams.shopId, user_id)
            .subscribe((payment: any) => {
                this.paymentForm.patchValue(payment);
                this.payment = payment;
                console.log(this.payment);
            });

        this.paymentForm = this.formBuilder.group({
            shopId: [routeParams.shopId],
            shop_pInfo_id: this.formBuilder.array([], [Validators.required]),
        });

        this.formGroup = this.formBuilder.group({
            shopId: [routeParams.shopId],
            home_delivery: [false, Validators.requiredTrue],
        });
    }

    onFormSubmit(formValue: any) {
        //alert(JSON.stringify(formValue, null, 2));
        console.log(formValue);
        this.apiService.updateAdditionalSetting(formValue).subscribe((data) => {
            this.flashMessagesService.show(
                // Array of messages each will be displayed in new line
                'Updated Successfully',
                {
                    cssClass: 'alert-success', // Type of flash message, it defaults to info and success, warning, danger types can also be used
                    timeout: 4000, // Time after which the flash disappears defaults to 4000ms
                }
            );
            this.ngOnInit();
        });
    }

    onMinOrderValGroupSubmit() {
        console.log(this.minOrderValGroup.value);
        this.apiService
            .updateAdditionalSetting(this.minOrderValGroup.value)
            .subscribe((data) => {
                this.flashMessagesService.show(
                    // Array of messages each will be displayed in new line
                    'Updated Successfully',
                    {
                        cssClass: 'alert-success', // Type of flash message, it defaults to info and success, warning, danger types can also be used
                        timeout: 4000, // Time after which the flash disappears defaults to 4000ms
                    }
                );
                this.ngOnInit();
            });
    }

    setUpPayment(): void {
        const routeParams = this.routes.snapshot.params;
        const shopdetails = 'shopdetails';
        localStorage.setItem('redirect', shopdetails);
        this._router.navigate(['/store-payment/' + routeParams.shopId]);
    }

    onDefaultSelect(e) {
        const shop_pInfo_id: FormArray = this.paymentForm.get(
            'shop_pInfo_id'
        ) as FormArray;

        if (e.target.checked) {
            shop_pInfo_id.push(new FormControl(e.target.value));
        } else {
            const index = shop_pInfo_id.controls.findIndex(
                (x) => x.value === e.target.value
            );
            shop_pInfo_id.removeAt(index);
        }
    }

    onSubmit() {
        //more code
        const routeParams = this.routes.snapshot.params;
        console.log(this.paymentForm.value);
        if (this.paymentForm.invalid) {
            return;
        }

        this.apiService
            .saveDefaultPayment(this.paymentForm.value)
            .subscribe((data) => {
                // this._router.navigate([
                //     '/shop-details/' + routeParams.shopId,
                // ]);
                this.flashMessagesService.show(
                    // Array of messages each will be displayed in new line
                    'Default store added',
                    {
                        cssClass: 'alert-success', // Type of flash message, it defaults to info and success, warning, danger types can also be used
                        timeout: 4000, // Time after which the flash disappears defaults to 4000ms
                    }
                );
                this.ngOnInit();
            });
    }

    shopConfiguration(shopId): void {
        this._router.navigate(['/shop-configuration/' + shopId]);
    }

    onUpdate() {
        //more code
        console.log(this.editForm.value);
        if (this.editForm.invalid) {
            return;
        }

        this.apiService.updateUser(this.editForm.value).subscribe((data) => {
            //   this._router.navigate(['shop-details/' ]);
        });
    }

    step = 0;

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }
}
