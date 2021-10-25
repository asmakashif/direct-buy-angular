import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreActivationService } from 'app/modules/admin/store-activation/store-activation.service';

@Component({
    selector: 'app-store-activation',
    templateUrl: './store-activation.component.html',
    styleUrls: ['./store-activation.component.scss'],
})
export class StoreActivationComponent implements OnInit {
    storeCheckoutForm: FormGroup;
    sub;
    params: any;
    data: any;

    constructor(
        private formBuilder: FormBuilder,
        private apiService: StoreActivationService,
        private routes: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.apiService
            .getShopDetailsById(routeParams.shopId, user_id)
            .subscribe((data: any) => {
                this.data = data;
                console.log(this.data.shopId);
            });
        // this.routes.paramMap.subscribe((params) => {
        //     this.storeCheckoutForm.patchValue(params);

        //     const shopId = params.get('shopId');
        //     console.log('Url shopId: ', shopId);
        // });
        // this.sub = this.routes.paramMap.subscribe((params) => {
        //     this.params = params;
        //     console.log(this.params);
        // });
        this.storeCheckoutForm = this.formBuilder.group({
            shop_name: ['', Validators.required],
            shop_price: ['', Validators.required],
        });
    }

    createRzpayOrder(data) {
        console.log(data);
        // call api to create order_id
        this.payWithRazor();
    }

    payWithRazor() {
        console.log(this.storeCheckoutForm.value);
        const shop_price = this.storeCheckoutForm.value.shop_price;
        const options: any = {
            key: 'rzp_test_xFaGl7So24RVzR',
            amount: shop_price, // amount should be in paise format to display Rs 1255 without decimal point
            currency: 'INR',
            name: 'ARSC Networks', // company name or product name
            description: '', // product description
            image: '/assets/images/logo/logo_new.png', // company logo or product image
            order_id: '', // order_id created by you in backend
            modal: {
                // We should prevent closing of the form when esc key is pressed.
                escape: false,
            },
            notes: {
                // include notes if any
            },
            theme: {
                color: '#0c238a',
            },
        };
        options.handler = (response, error) => {
            options.response = response;
            console.log(response);
            console.log(options);
            // call your backend api to verify payment signature & capture transaction
            this.apiService
                .updateUser(this.storeCheckoutForm.value)
                .subscribe((data) => {
                    //   this._router.navigate(['shop-details/' ]);
                });
        };
        options.modal.ondismiss = () => {
            // handle the case when user closes the form while transaction is in progress
            console.log('Transaction cancelled.');
        };
        const rzp = new this.apiService.nativeWindow.Razorpay(options);
        rzp.open();
    }

    activateTrial(): void {
        const routeParams = this.routes.snapshot.params;
        this.apiService
            .updateTrialStatus(routeParams.shopId)
            .subscribe((data) => {
                //window.location.reload();
                this._router.navigate(['/steps/' + routeParams.shopId]);
            });
    }
}
