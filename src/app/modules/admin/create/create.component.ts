import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateShopService } from 'app/modules/admin/create-shop/create-shop.service';
import { ProductInfoService } from 'app/modules/admin/product-info/product-info.service';
import { StoreSummaryService } from 'app/modules/admin/store-summary/store-summary.service';

declare var $: any;

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
    shopType: any;
    isLinear = true;
    formNameGroup: FormGroup;
    formPasswordGroup: FormGroup;
    formEmailGroup: FormGroup;
    formPhoneGroup: FormGroup;
    formPaymentGroup: FormGroup;
    shopId: any;
    productSet: any;
    countProduct: any;
    data: any;
    dataset: any;

    constructor(
        private fb: FormBuilder,
        private apiService: CreateShopService,
        private productService: ProductInfoService,
        private summaryService: StoreSummaryService,
        private router: Router
    ) {}

    randomString(length) {
        var randomChars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(
                Math.floor(Math.random() * randomChars.length)
            );
        }
        return result;
    }

    ngOnInit(): void {
        this.apiService.getStoreTypes().subscribe((shopType) => {
            // Store the data
            this.shopType = shopType;
            console.log(this.shopType);
        });
        this.apiService.getBaseProducts().subscribe((dataset) => {
            this.dataset = dataset;
        });

        var shopId = this.randomString(6);
        this.formNameGroup = this.fb.group({
            shopId: [shopId],
            shop_name: ['', Validators.required],
            shop_address: ['', Validators.required],
            shopType: this.fb.array([], [Validators.required]),
        });
        //console.log(this.formNameGroup.value.shopId);

        // this.formPhoneGroup = this.fb.group({
        //     mobile: [
        //         '',
        //         Validators.compose([Validators.required, Validators.min(10)]),
        //     ],
        // });

        var shopId = localStorage.getItem('shopId');
        console.log(shopId);
        this.productService
            .getTempStrProducts(shopId)
            .subscribe((productSet) => {
                this.productSet = productSet;
            });
        this.summaryService
            .getShopDetailsById(shopId)
            .subscribe((data: any) => {
                this.data = data;
                console.log(this.data);
            });

        this.summaryService.countStrProducts(shopId).subscribe((data: any) => {
            this.countProduct = data;
            console.log(this.countProduct);
        });
    }

    onCheckboxChange(e) {
        const shopType: FormArray = this.formNameGroup.get(
            'shopType'
        ) as FormArray;

        if (e.target.checked) {
            shopType.push(new FormControl(e.target.value));
        } else {
            const index = shopType.controls.findIndex(
                (x) => x.value === e.target.value
            );
            shopType.removeAt(index);
        }
    }

    onSubmit() {
        //more code
        var shopId = this.formNameGroup.value.shopId;
        console.log(this.formNameGroup.value.shopId);
        //this.stepper.selected.editable = false;
        localStorage.setItem('shopId', shopId);
        this.apiService
            .createUser(this.formNameGroup.value)
            .subscribe((data) => {
                return true;
            });
    }

    afterChange = function (changes: any[]) {
        var storeId = localStorage.getItem('shopId');
        console.log(storeId);
        var rowThatHasBeenChanged = changes[0][0];
        var sourceRow = this.getSourceDataAtRow(rowThatHasBeenChanged),
            visualRow = this.getDataAtRow(rowThatHasBeenChanged);
        console.log(visualRow);
        var id = visualRow[1];
        console.log(id);
        $(document).ready(function () {
            $('#save_value').click(function () {
                if (id != '') {
                    $.ajax({
                        url: '/api/fetchBaseProductsById.php',
                        method: 'POST',
                        data: { id: id },
                        success: function (data) {
                            console.log(data);
                            var obj = JSON.parse(data);
                            var category = obj.category;
                            var sub_category = obj.sub_category;
                            var brand = obj.brand;
                            var product_name = obj.product_name;
                            var product_type = obj.product_type;
                            var product_sub_type = obj.product_sub_type;
                            // var product_description = obj.product_description;
                            // console.log(product_description);
                            var product_weight = obj.product_weight;
                            var product_weight_type = obj.product_weight_type;
                            var product_qty = obj.product_qty;
                            var product_price = obj.product_price;
                            var offer_price = obj.offer_price;
                            // var product_img = obj.product_img;
                            // console.log(product_img);

                            $.ajax({
                                url:
                                    '/api/checkBaseProductInTemp.php/' +
                                    storeId +
                                    '',
                                method: 'POST',
                                data: { storeId: storeId },
                                success: function (data) {
                                    const that = this;
                                    $.ajax({
                                        url: '/api/saveBaseProductsToTemp.php',
                                        method: 'POST',
                                        data: {
                                            storeId: storeId,
                                            category: category,
                                            sub_category: sub_category,
                                            brand: brand,
                                            product_name: product_name,
                                            product_type: product_type,
                                            product_sub_type: product_sub_type,
                                            // product_description:
                                            //     product_description,
                                            product_weight: product_weight,
                                            product_weight_type:
                                                product_weight_type,
                                            product_qty: product_qty,
                                            product_price: product_price,
                                            offer_price: offer_price,
                                            // product_img: product_img,
                                        },
                                        success: function (data) {
                                            console.log(data);
                                        },
                                    });
                                },
                            });
                        },
                    });
                }
            });
        });
    };

    beforeChange = function (changes: any[]) {
        var storeId = localStorage.getItem('shopId');
        console.log(storeId);
        var rowThatHasBeenChanged = changes[0][0];
        var sourceRow = this.getSourceDataAtRow(rowThatHasBeenChanged),
            visualRow = this.getDataAtRow(rowThatHasBeenChanged);
        console.log(sourceRow);
        console.log(visualRow);
        var id = visualRow[0];
        console.log(id);
        var category = visualRow[1];
        var sub_category = visualRow[2];
        var brand = visualRow[3];
        var product_name = visualRow[4];
        var product_type = visualRow[5];
        var product_sub_type = visualRow[6];
        var product_weight = visualRow[7];
        var product_weight_type = visualRow[8];
        var product_qty = visualRow[9];
        var product_price = visualRow[10];
        var offer_price = visualRow[11];
        $(document).ready(function () {
            $.ajax({
                url: '/api/updateTempStrProduct.php',
                method: 'POST',
                data: {
                    id: id,
                    category: category,
                    sub_category: sub_category,
                    brand: brand,
                    product_name: product_name,
                    product_type: product_type,
                    product_sub_type: product_sub_type,
                    product_weight: product_weight,
                    product_weight_type: product_weight_type,
                    product_qty: product_qty,
                    product_price: product_price,
                    offer_price: offer_price,
                },
                success: function (data) {
                    console.log(data);
                },
            });
        });
    };

    configColumnHeaders = [
        [
            'Select',
            'Id',
            'Category',
            'Sub-Category',
            'Brand',
            'Product Name',
            'Product Type',
            'Product Sub-Type',
            'Product Weight',
            'Product Weight-Type',
            'Product Qty',
            'Product Price',
            'Offer Price',
        ],
    ];
    columnHeaders = [
        [
            'Id',
            'Category',
            'Sub-Category',
            'Brand',
            'Product Name',
            'Product Type',
            'Product Sub-Type',
            'Product Weight',
            'Product Weight-Type',
            'Product Qty',
            'Product Price',
            'Offer Price',
        ],
    ];
    collapsibleColumnsConfig = [
        {
            row: -2,
            col: 0,
            collapsible: true,
        },
        {
            row: -2,
            col: 6,
            collapsible: true,
        },
    ];
    licenseKey = 'non-commercial-and-evaluation';
}
