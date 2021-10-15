import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    NgForm,
    FormArray,
    FormControl,
} from '@angular/forms';
import { StoreSummaryService } from 'app/modules/admin/store-summary/store-summary.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Data } from '../../../Model/data';

@Component({
    selector: 'app-store-summary',
    templateUrl: './store-summary.component.html',
})
export class StoreSummaryComponent implements OnInit {
    activeLink = 'StoreSummmary';
    data: any;
    countProduct: any;
    summaryForm: FormGroup;
    firstname: string;

    constructor(
        private formBuilder: FormBuilder,
        private apiService: StoreSummaryService,
        private _router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.firstname = localStorage.getItem('firstname');
        const shopId = routeParams.shopId;
        this.apiService
            .getShopDetailsById(routeParams.shopId, user_id)
            .subscribe((data: any) => {
                this.data = data;
                console.log(this.data.shopId);
            });

        this.apiService
            .countStrProducts(routeParams.shopId)
            .subscribe((data: any) => {
                this.countProduct = data;
            });

        this.summaryForm = this.formBuilder.group({
            shopId: [shopId],
            // productUpdate_status: ['', Validators.required],
            productUpdate_status: this.formBuilder.array(
                [],
                [Validators.required]
            ),
        });
    }

    onProductUpdateSelect(e) {
        const productUpdate_status: FormArray = this.summaryForm.get(
            'productUpdate_status'
        ) as FormArray;

        if (e.target.checked) {
            productUpdate_status.push(new FormControl(e.target.value));
        } else {
            const index = productUpdate_status.controls.findIndex(
                (x) => x.value === e.target.value
            );
            productUpdate_status.removeAt(index);
        }
    }

    onSubmit() {
        const routeParams = this.routes.snapshot.params;
        console.log(this.summaryForm.value);
        if (this.summaryForm.invalid) {
            return;
        }
        this.apiService
            .saveProductUpdate(this.summaryForm.value)
            .subscribe((data) => {
                this._router.navigate(['/steps/' + routeParams.shopId]);
            });
    }
}
