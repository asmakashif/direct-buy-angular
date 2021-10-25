import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopConfigurationService } from 'app/modules/admin/store/shop-configuration/shop-configuration.service';

@Component({
    selector: 'app-shop-configuration',
    templateUrl: './shop-configuration.component.html',
    // styleUrls: ['./shop-configuration.component.scss']
})
export class ShopConfigurationComponent implements OnInit {
    shopType: any;
    editForm: FormGroup;
    data: any;
    constructor(
        private formBuilder: FormBuilder,
        private apiService: ShopConfigurationService,
        private router: Router,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;

        this.editForm = this.formBuilder.group({
            shop_id: [],
            shopId: ['', Validators.required],
            shop_name: ['', Validators.required],
            shop_address: ['', Validators.required],
            shopType: this.formBuilder.array([], [Validators.required]),
        });
        //console.log(this.editForm);
        this.apiService
            .getShopDetailsById(routeParams.shopId)
            .subscribe((data: any) => {
                this.editForm.patchValue(data);
                this.data = data;
                console.log(this.data.shopType);
            });

        this.apiService.getShopTypes().subscribe((shopType) => {
            // Store the data
            this.shopType = shopType;
            console.log(this.shopType);
        });
    }
}
