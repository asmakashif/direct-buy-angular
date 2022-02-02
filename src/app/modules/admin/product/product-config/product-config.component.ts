import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { ProductConfigService } from 'app/modules/admin/product/product-config/product-config.service';
import { MatStepper } from '@angular/material/stepper';
import { InventoryProduct } from 'app/Model/inventory.types';
import { DashboardService } from '../../dashboard/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';

declare var $: any;

@Component({
    selector: 'app-product-config',
    templateUrl: './product-config.component.html',
    styleUrls: ['./product-config.component.scss'],
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `,
    ],
})
export class ProductConfigComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    profileData: any;
    domainname: any;
    imagePath: string = '/api/products/uploads/';
    @ViewChild('stepper') stepper: MatStepper;
    shopType: any;
    isLinear = true;
    shopTypeGroup: FormGroup;
    categoryGroup: FormGroup;
    subCategoryGroup: FormGroup;
    brandGroup: FormGroup;
    productGroup: FormGroup;
    viewProductGroup: FormGroup;
    completeGroup: FormGroup;

    shopId: any;
    productSet: any;
    countProduct: any;
    data: any;
    dataset: any;
    categories: any;
    sub_category: any;
    brand: any;
    shop_type: any;
    category: any;
    subCategory: any;
    brands: any;
    dataFilteredGroup: FormGroup;

    products: any;
    selectedProduct: InventoryProduct;
    selectedProductForm: any;
    editCache: { [key: string]: any } = {};
    flashMessage: string;
    isLoading: boolean = false;
    searchText;
    firstname: any;

    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private apiService: ProductConfigService,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private _httpClient: HttpClient
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.apiService.getStoreTypes().subscribe((shopType) => {
            // Store the data
            this.shopType = shopType;
            console.log(this.shopType);
        });

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

        this.dataFilteredGroup = this.fb.group({
            user_id: [user_id],
            shopId: [routeParams.shopId],
            base_product_id: this.fb.array([], [Validators.required]),
        });

        // Create the selected product form
        this.selectedProductForm = this.fb.group({
            temp_str_config_id: [''],
            category: [''],
            sub_category: [''],
            brand: [''],
            product_name: [''],
            product_type: [''],
            product_sub_type: [''],
            product_weight: [''],
            product_weight_type: [''],
            product_qty: [''],
            product_price: [''],
            offer_price: [''],
            product_image: [''],
            product_status: this.fb.array([], [Validators.required]),
        });

        this._dashboardService
            .getProductsByStr(routeParams.shopId)
            .subscribe((products) => {
                this.products = products;
                this.cd.detectChanges();
                console.log(this.products);
            });

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
            });

        // if (this.isMobile()) {
        //     //alert('mobile');
        //     this._router.navigate([
        //         '/mobile/product-config/' + routeParams.shopId,
        //     ]);
        //     // this._router.resetConfig(this.mobileRoutes);
        // }

        // $(document).on('click', 'input[name="base_product_id"]', function () {
        //     $('input[name="base_product_id"]').not(this).prop('checked', false);
        // });
        // $('#checkBtn').click(function () {
        //     var checked = $('input[type=checkbox]:checked').length;

        //     if (!checked) {
        //         //alert('You must check at least one checkbox.');
        //         const confirmation = this._fuseConfirmationService.open({
        //             title: 'Select ShopType',
        //             message: 'You must check at least one checkbox.',
        //             actions: {
        //                 confirm: {
        //                     label: 'Delete',
        //                 },
        //             },
        //         });
        //     }
        // });
    }

    selectAllShopType(e) {
        const checked = e.target.checked;
        this.shopType.forEach((item) => (item.selected = checked));

        const shopType: FormArray = this.shopTypeGroup.get(
            'shopType'
        ) as FormArray;

        if (e.target.checked) {
            this.shopType.forEach((row) => {
                //console.log(row.shop_type_name);
                shopType.push(new FormControl(row.shop_type_name));
            });
        }
        // else {
        //     // console.log('checked false');
        //     this.shopType.length = 0;
        // }
    }

    onShopTypeChange(e) {
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
        const arr = this.shopTypeGroup.value;
        localStorage.setItem('dshop_type', JSON.stringify(arr.shopType));

        this.apiService
            .getCategoryByShopType(this.shopTypeGroup.value)
            .subscribe((categories) => {
                this.categories = categories;
                console.log(this.categories);
            });
    }

    selectAllCategory(e) {
        const checked = e.target.checked;
        this.categories.forEach((item) => (item.selected = checked));

        const categories: FormArray = this.categoryGroup.get(
            'categories'
        ) as FormArray;

        if (e.target.checked) {
            this.categories.forEach((row) => {
                //console.log(row.shop_type_name);
                categories.push(new FormControl(row.category));
            });
        }
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
        const arr = this.categoryGroup.value;
        localStorage.setItem('dcategory', JSON.stringify(arr.categories));
        this.apiService
            .getSubCatbyCategory(this.categoryGroup.value)
            .subscribe((subCategory) => {
                this.sub_category = subCategory;
                console.log(this.sub_category);
            });
    }

    selectAllSubCategory(e) {
        const checked = e.target.checked;
        this.sub_category.forEach((item) => (item.selected = checked));

        const sub_category: FormArray = this.subCategoryGroup.get(
            'sub_category'
        ) as FormArray;

        if (e.target.checked) {
            this.sub_category.forEach((row) => {
                //console.log(row.shop_type_name);
                sub_category.push(new FormControl(row.sub_category));
            });
        }
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
        const arr = this.subCategoryGroup.value;
        localStorage.setItem('dsubCategory', JSON.stringify(arr.sub_category));
        this.apiService
            .getBrandBySubCat(this.subCategoryGroup.value)
            .subscribe((brand) => {
                this.brand = brand;
                console.log(this.brand);
            });
    }

    selectAllBrand(e) {
        const checked = e.target.checked;
        this.brand.forEach((item) => (item.selected = checked));

        const brand: FormArray = this.brandGroup.get('brand') as FormArray;

        if (e.target.checked) {
            this.brand.forEach((row) => {
                //console.log(row.shop_type_name);
                brand.push(new FormControl(row.brand));
            });
        }
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
        // console.log(this.subCategoryGroup.value);
        console.log(this.brandGroup.value);
        const arr = this.brandGroup.value;
        //const sub_category = this.subCategoryGroup.value;
        localStorage.setItem('dbrands', JSON.stringify(arr.brand));

        this.apiService
            .getProductsByBrand(this.brandGroup.value)
            .subscribe((products) => {
                this.dataset = products;
                console.log(this.dataset);
                this.shop_type = JSON.parse(localStorage.getItem('dshop_type'));
                this.category = JSON.parse(localStorage.getItem('dcategory'));
                this.subCategory = JSON.parse(
                    localStorage.getItem('dsubCategory')
                );
                this.brands = JSON.parse(localStorage.getItem('dbrands'));
            });
    }

    onCheckboxChange(e) {
        const base_product_id: FormArray = this.dataFilteredGroup.get(
            'base_product_id'
        ) as FormArray;

        if (e.target.checked) {
            base_product_id.push(new FormControl(e.target.value));
        } else {
            const index = base_product_id.controls.findIndex(
                (x) => x.value === e.target.value
            );
            base_product_id.removeAt(index);
        }
    }

    selectAllProducts(e) {
        const checked = e.target.checked;
        this.dataset.forEach((item) => (item.selected = checked));

        const base_product_id: FormArray = this.dataFilteredGroup.get(
            'base_product_id'
        ) as FormArray;

        if (e.target.checked) {
            this.dataset.forEach((row) => {
                //console.log(row.shop_type_name);
                base_product_id.push(new FormControl(row.base_product_id));
            });
        }
    }

    onDataFilterSubmit() {
        const routeParams = this.routes.snapshot.params;
        console.log(this.dataFilteredGroup.value);
        //more code
        this.apiService
            .saveFilteredData(this.dataFilteredGroup.value)
            .subscribe((data) => {
                this.apiService
                    .pushProductsTOStrDb(routeParams.shopId)
                    .subscribe((data) => {});
            });
    }

    skipProductSetup() {
        const routeParams = this.routes.snapshot.params;
        this.apiService
            .skipProductSetup(routeParams.shopId)
            .subscribe((data) => {
                const confirmation = this._fuseConfirmationService.open({
                    message:
                        'Congratulations, Products are added to your store. To add more products, click Cancel. You may come back to this step from the menu Shops -> Manage Shop',
                    icon: {
                        show: true,
                        name: 'heroicons_outline:check',
                        color: 'primary',
                    },
                    actions: {
                        confirm: {
                            label: 'Okay',
                            color: 'primary',
                        },
                    },
                });

                // Subscribe to the confirmation dialog closed action
                confirmation.afterClosed().subscribe((result) => {
                    // If the confirm button pressed...
                    if (result === 'confirmed') {
                        this._router.navigate(['/steps/' + routeParams.shopId]);
                    }
                });
            });
    }

    gotToSteps() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/steps/' + routeParams.shopId]);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle product details
     *
     * @param productId
     */

    editDetails(productId: string): void {
        alert(productId);
        // If the product is already selected...
        this.editCache[productId] = true;

        // Get the product by id
        this._dashboardService
            .getProductById(productId)
            .subscribe((product) => {
                // Set the selected product
                this.selectedProduct = product;
                // Fill the form
                this.selectedProductForm.patchValue(product);

                // Mark for check
                this.cd.markForCheck();
            });
    }

    cancelDetails(productId: string): void {
        // If the product is already selected...
        this.editCache[productId] = false;
    }

    clearSearchField() {
        this.searchText = '';
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

    onFileUpload(event) {
        // this.selectedFile = event.target.files[0];
        const productId =
            this.selectedProductForm.get('temp_str_config_id').value;
        //console.log(productId);
        const file = event.target.files[0];
        console.log(file);
        this.selectedProductForm.get('product_image').setValue(file);
        const formData = new FormData();
        formData.append(
            'temp_str_config_id',
            this.selectedProductForm.get('temp_str_config_id').value
        );
        formData.append(
            'myFile',
            this.selectedProductForm.get('product_image').value
        );
        this._httpClient
            .post<any>('/api/products/upload.php', formData)
            .subscribe(() => {
                this.ngOnInit();
                this.editDetails(productId);
                //this.cd.detectChanges();
            });
    }

    productStatus(e) {
        //alert(e.target.value);
        const product_status: FormArray = this.selectedProductForm.get(
            'product_status'
        ) as FormArray;

        if (e.target.checked) {
            product_status.push(new FormControl(e.target.value));
            // this.ngOnInit();
        } else {
            const index = product_status.controls.findIndex(
                (x) => x.value === e.target.value
            );
            product_status.removeAt(index);
        }
    }
    /**
     * Update the selected product using the form data
     */
    updateSelectedProduct(): void {
        // Get the product object
        const product = this.selectedProductForm.getRawValue();
        console.log(product);
        this._dashboardService.updateProduct(product).subscribe(() => {
            // Show a success message
            this.showFlashMessage('success');
            //this.ngOnInit();
            //this.editDetails(product.productId);
            this.cd.markForCheck();
        });
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedProduct(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete product',
            message:
                'Are you sure you want to remove this product? This action cannot be undone!',
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
                const product = this.selectedProductForm.getRawValue();
                // Delete the product on the server
                this._dashboardService
                    .deleteProduct(product.temp_str_config_id)
                    .subscribe(() => {
                        // Close the details
                        this.closeDetails(product.temp_str_config_id);
                    });
            }
        });
    }

    /**
     * Close the details
     */
    closeDetails(productId: string): void {
        // If the product is already selected...
        this.editCache[productId] = false;
        // Detect changes
        this.ngOnInit();
        this.cd.detectChanges();
    }

    move(index: number) {
        this.stepper.selectedIndex = index;
    }

    done() {
        const routeParams = this.routes.snapshot.params;
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            message:
                'Congratulations, Products are added to your store. To add more products, click Cancel. You may come back to this step from the menu Shops -> Manage Shop',
            icon: {
                show: true,
                name: 'heroicons_outline:check',
                color: 'primary',
            },
            actions: {
                confirm: {
                    label: 'Okay',
                    color: 'primary',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                this._router.navigate(['/steps/' + routeParams.shopId]);
            }
        });
    }

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
