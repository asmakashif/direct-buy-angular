import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
// import { alignHeaders, afterChanges } from '../../../../utils/hooks-callbacks';
// import * as Handsontable from 'handsontable';
import { ProductConfigService } from 'app/modules/admin/product-config/product-config.service';

declare var $: any;

@Component({
    selector: 'app-product-config',
    templateUrl: './product-config.component.html',
    styleUrls: ['./product-config.component.scss'],
})
export class ProductConfigComponent implements OnInit {
    shopType: any;
    isLinear = true;
    shopTypeGroup: FormGroup;
    categoryGroup: FormGroup;
    subCategoryGroup: FormGroup;
    brandGroup: FormGroup;
    productGroup: FormGroup;
    completeGroup: FormGroup;

    shopId: any;
    productSet: any;
    countProduct: any;
    data: any;
    dataset: any;
    categories: any;
    sub_category: any;
    brand: any;

    constructor(
        private apiService: ProductConfigService,
        private _router: Router,
        private routes: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        this.apiService.getStoreTypes().subscribe((shopType) => {
            // Store the data
            this.shopType = shopType;
            console.log(this.shopType);
        });

        // this.apiService.getBaseProducts().subscribe((dataset) => {
        //     this.dataset = dataset;
        // });

        this.shopTypeGroup = this.fb.group({
            shopType: this.fb.array([], [Validators.required]),
        });

        this.categoryGroup = this.fb.group({
            categories: this.fb.array([], [Validators.required]),
        });

        this.subCategoryGroup = this.fb.group({
            sub_category: this.fb.array([], [Validators.required]),
        });

        this.brandGroup = this.fb.group({
            brand: this.fb.array([], [Validators.required]),
        });

        if (this.isMobile()) {
            alert('mobile');
            this._router.navigate([
                '/mobile/product-config/' + routeParams.shopId,
            ]);
            // this._router.resetConfig(this.mobileRoutes);
        }
    }

    onCheckboxChange(e) {
        const shopType: FormArray = this.shopTypeGroup.get(
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

    onTypeSubmit() {
        //more code
        this.apiService
            .getCategoryByShopType(this.shopTypeGroup.value)
            .subscribe((categories) => {
                this.categories = categories;
                console.log(this.categories);
            });
    }

    onCategoryChange(e) {
        const categories: FormArray = this.categoryGroup.get(
            'categories'
        ) as FormArray;

        if (e.target.checked) {
            categories.push(new FormControl(e.target.value));
        } else {
            const index = categories.controls.findIndex(
                (x) => x.value === e.target.value
            );
            categories.removeAt(index);
        }
    }

    onCategorySubmit() {
        //more code
        //console.log(this.categoryGroup.value);
        this.apiService
            .getSubCatbyCategory(this.categoryGroup.value)
            .subscribe((subCategory) => {
                this.sub_category = subCategory;
                console.log(this.sub_category);
            });
    }

    onSubCategoryChange(e) {
        const sub_category: FormArray = this.subCategoryGroup.get(
            'sub_category'
        ) as FormArray;

        if (e.target.checked) {
            sub_category.push(new FormControl(e.target.value));
        } else {
            const index = sub_category.controls.findIndex(
                (x) => x.value === e.target.value
            );
            sub_category.removeAt(index);
        }
    }

    onSubCategorySubmit() {
        //more code
        console.log(this.subCategoryGroup.value);
        this.apiService
            .getBrandBySubCat(this.subCategoryGroup.value)
            .subscribe((brand) => {
                this.brand = brand;
                console.log(this.brand);
            });
    }

    onBrandChange(e) {
        const brand: FormArray = this.brandGroup.get('brand') as FormArray;

        if (e.target.checked) {
            brand.push(new FormControl(e.target.value));
        } else {
            const index = brand.controls.findIndex(
                (x) => x.value === e.target.value
            );
            brand.removeAt(index);
        }
    }

    onBrandSubmit() {
        //more code
        console.log(this.brandGroup.value);
        this.apiService
            .getProductsByBrand(this.brandGroup.value)
            .subscribe((products) => {
                this.dataset = products;
                console.log(this.dataset);
            });
    }

    onComplete() {
        //more code
        const routeParams = this.routes.snapshot.params;

        this.apiService
            .updateProductStatus(routeParams.shopId)
            .subscribe((data) => {
                // this.router.navigate(['/product-config/' + shopId]);
                this._router.navigate(['/steps/' + routeParams.shopId]);
            });
    }

    // viewProduct() {
    //     alert('hi');
    //     const routeParams = this.routes.snapshot.params;
    //     this.apiService
    //         .getTempStrProducts(routeParams.shopId)
    //         .subscribe((productSet) => {
    //             this.productSet = productSet;
    //             console.log(this.productSet);
    //         });
    // }

    // checkAll() {
    //     var rows = this.countRows();
    //     for(var i = 0; i < rows; i++){
    //         this.setDataAtCell(i, 0, true);
    //     }
    // }

    // cells = function (row, col) {
    //     if (col === 0 && !this.getDataAtCell(row, col)) {
    //         this.setCellMeta(row, col, 'className', 'bad');
    //         console.log(row);
    //     }
    // };

    afterChange = function (changes: any[], source: boolean) {
        var URL = window.location.href;
        var arr = URL.split('/');
        //console.log(arr);
        var rowThatHasBeenChanged = changes[0][0];
        var sourceRow = this.getSourceDataAtRow(rowThatHasBeenChanged),
            visualRow = this.getDataAtRow(rowThatHasBeenChanged);

        var row = this.getSelectedLast()[0];
        console.log(row);
        console.log(visualRow);

        $(document).ready(function () {
            $('#save_value').click(function () {
                var id = visualRow[1];
                //alert(id);
                var storeId = arr[4];
                //alert(storeId);
                if (id != '') {
                    $.ajax({
                        url: '/api/fetchBaseProductsById.php',
                        method: 'POST',
                        data: { id: id },
                        success: function (data) {
                            //console.log(data);

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

                                            // $.ajax({
                                            //     url: '/api/countInsertedRow.php',
                                            //     type: 'POST',
                                            //     data: { storeId: storeId },
                                            //     success: function (data) {
                                            //         var res = JSON.parse(data);

                                            //         console.log(res);
                                            //         if (res == row) {
                                            //             var su = 'success';
                                            //             console.log('su');
                                            //             if (su) {
                                            //                 window.location.href =
                                            //                     'http://localhost:4200/product-info/' +
                                            //                     storeId;
                                            //             }
                                            //         }
                                            //     },
                                            // });
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

    done() {
        const routeParams = this.routes.snapshot.params;
        var storeId = routeParams.shopId;
        console.log(storeId);
        $(document).ready(function () {
            $('#complete').click(function () {
                $.ajax({
                    url: '/api/updateProductStatus.php',
                    type: 'POST',
                    data: { storeId: storeId },
                    success: function (data) {
                        var base_url = window.location.origin;
                        window.location.href = base_url + '/steps/' + storeId;
                        // window.location.href =
                        //     'http://localhost:4200/steps/' + storeId;
                    },
                });
            });
        });
        // const routeParams = this.routes.snapshot.params;
        // this._router.navigate(['/steps/' + routeParams.shopId]);
    }

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

    isMobile() {
        let check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk) |tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || (<any>window).opera);
        return check;
    }
}
