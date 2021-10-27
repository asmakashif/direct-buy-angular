import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    NgForm,
    FormArray,
    FormControl,
} from '@angular/forms';
import { ShopDetailsService } from 'app/modules/admin/store/shop-details/shop-details.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-shop-details',
    templateUrl: './shop-details.component.html',
    //styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent implements OnInit {
    editForm: FormGroup;
    data: any;
    payment: any;
    paymentForm: FormGroup;
    constructor(
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
        //console.log(this.editForm);
        this.apiService
            .getShopDetailsById(routeParams.shopId, user_id)
            .subscribe((data: any) => {
                this.editForm.patchValue(data);
                this.data = data;
                console.log(this.data.shopId);
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
    }

    setUpPayment(): void {
        const routeParams = this.routes.snapshot.params;
        const shopdetails = 'shopdetails';
        localStorage.setItem('redirect', shopdetails);
        this._router.navigate(['/store/store-payment/' + routeParams.shopId]);
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
                this._router.navigate([
                    '/store/shop-details/' + routeParams.shopId,
                ]);
            });
        this.ngOnInit();
    }

    shopConfiguration(shopId): void {
        this._router.navigate(['/store/shop-configuration/' + shopId]);
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
