import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { InventoryProduct } from '../../../../Model/inventory.types';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from 'app/modules/admin/dashboard/dashboard.service';
import { AddProductService } from './add-product.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';

declare var $: any;

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
    faStore = faStore;
    profileData: any;
    domainname: any;
    products: any;
    selectedProduct: InventoryProduct;
    selectedProductForm: any;
    editCache: { [key: string]: any } = {};
    flashMessage: string;
    keyword = 'category';
    //tags: InventoryProduct[];
    filteredCategories: InventoryProduct[];
    filteredSubCategories: InventoryProduct[];
    // tagsEditMode: boolean = false;
    category: any[] = [];
    sub_category: any;
    brand: any;
    filteredBrand: any;
    product_sub_type: any;
    product_type: any;
    filteredProductType: any;
    filteredProductSubType: any;

    filteredList1: any;

    selectedCategory: string[] = this.category;
    firstname: any;
    //filteredDataToSearch: any[] = [];

    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private _addProductService: AddProductService,
        private _dashboardService: DashboardService,
        private formBuilder: FormBuilder,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private _httpClient: HttpClient
    ) {}

    ngOnInit(): void {
        const user_id = localStorage.getItem('user_id');
        const routeParams = this.routes.snapshot.params;
        // Create the selected product form
        this.selectedProductForm = this.formBuilder.group({
            user_id: [user_id],
            temp_shopId: [routeParams.shopId],
            temp_str_config_id: [''],
            category: [''],
            sub_category: [''],
            brand: [''],
            product_name: [''],
            product_type: [''],
            product_sub_type: [''],
            product_description: [''],
            product_weight: [''],
            product_weight_type: [''],
            product_qty: [''],
            product_price: [''],
            offer_price: [''],
            product_image: [''],
            product_status: this.formBuilder.array([], [Validators.required]),
        });

        this._addProductService.getCategories().subscribe((category) => {
            this.category = category;
            this.filteredList1 = this.category.slice();
        });

        // this._addProductService.getSubCategory().subscribe((sub_category) => {
        //     this.sub_category = sub_category;
        // });

        this._addProductService.getBrand().subscribe((brand) => {
            this.brand = brand;
        });

        this._addProductService.getProductType().subscribe((data) => {
            this.product_type = data;
        });

        // this._addProductService.getProductSubType().subscribe((data) => {
        //     this.product_sub_type = data;
        // });

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
            });
    }

    onChangeCategory(ob) {
        let category = ob.value;
        if (category) {
            this._httpClient
                .get('/api/mobileAPI/getSubCategory.php?category=' + category)
                .subscribe((data) => {
                    this.sub_category = data;
                });
        } else {
            this.sub_category = null;
        }
    }

    onChangeProductType(ob) {
        let product_type = ob.value;
        if (product_type) {
            this._httpClient
                .get(
                    '/api/mobileAPI/getProductSubType.php?product_type=' +
                        product_type
                )
                .subscribe((data) => {
                    this.product_sub_type = data;
                });
        } else {
            this.product_sub_type = null;
        }
    }

    // filterTags(event): void {
    //     // Get the value
    //     const value = event.target.value.toLowerCase();

    //     // Filter the tags
    //     this.filteredCategories = this.category.filter((tag) =>
    //         tag.category.toLowerCase().includes(value)
    //     );
    // }

    /**
     * Filter categories
     *
     * @param event
     */
    filterTags(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredCategories = this.category.filter((tag) =>
            tag.category.toLowerCase().includes(value)
        );

        this.filteredSubCategories = this.sub_category.filter((tag) =>
            tag.sub_category.toLowerCase().includes(value)
        );

        this.filteredBrand = this.brand.filter((tag) =>
            tag.brand.toLowerCase().includes(value)
        );

        this.filteredProductType = this.product_type.filter((tag) =>
            tag.product_type.toLowerCase().includes(value)
        );

        this.filteredProductSubType = this.product_sub_type.filter((tag) =>
            tag.product_sub_type.toLowerCase().includes(value)
        );
    }

    /**
     * Filter categories input key down event
     *
     * @param event
     */
    filterTagInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if (event.key !== 'Enter') {
            return;
        }
        // If there is no tag available...
        if (this.filteredCategories.length === 0) {
            // Clear the input
            event.target.value = '';
            // Return
            return;
        }
        if (this.filteredSubCategories.length === 0) {
            // Clear the input
            event.target.value = '';
            // Return
            return;
        }

        if (this.filteredBrand.length === 0) {
            // Clear the input
            event.target.value = '';
            // Return
            return;
        }

        if (this.filteredProductType.length === 0) {
            // Clear the input
            event.target.value = '';
            // Return
            return;
        }

        if (this.filteredProductSubType.length === 0) {
            // Clear the input
            event.target.value = '';
            // Return
            return;
        }
        // If there is a tag...
        const category = this.filteredCategories[0];
        const sub_category = this.filteredSubCategories[0];
        const brand = this.filteredBrand[0];
        const product_type = this.filteredProductType[0];
        const product_sub_type = this.filteredProductSubType[0];
        // const isTagApplied = this.selectedProduct.category.find(
        //     (base_product_id) => base_product_id === category.base_product_id
        // );
    }

    /**
     * Create a new category
     *
     * @param title
     */
    createCategory(): void {
        // Create tag on the server
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/add-category/' + routeParams.shopId + '/' + routeParams.shop_name,
        ]);
    }

    /**
     * Create a new tag
     *
     * @param title
     */
    createBrand(brand: string): void {
        const routeParams = this.routes.snapshot.params;
        const shopId = routeParams.shopId;
        const user_id = localStorage.getItem('user_id');
        const tag = {
            brand,
            shopId,
            user_id,
        };
        // Create tag on the server
        this._addProductService.createBrand(tag).subscribe((response) => {});
    }

    createProductType(newProductTypeInput): void {
        //alert(newProductTypeInput);
        // Create tag on the server
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/add-product-type/' +
                routeParams.shopId +
                '/' +
                routeParams.shop_name +
                '/' +
                newProductTypeInput,
        ]);
    }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateCategoryButton(inputValue: string): boolean {
        //alert(inputValue);
        return !!!(
            inputValue === '' ||
            this.category.findIndex(
                (cat) => cat.category.toLowerCase() === inputValue.toLowerCase()
            ) > -1
        );
    }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateSubCategoryButton(inputValue: string): boolean {
        //alert(inputValue);
        return !!!(
            inputValue === '' ||
            this.sub_category.findIndex(
                (cat) =>
                    cat.sub_category.toLowerCase() === inputValue.toLowerCase()
            ) > -1
        );
    }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateBrandButton(inputValue: string): boolean {
        //alert(inputValue);
        return !!!(
            inputValue === '' ||
            this.brand.findIndex(
                (cat) => cat.brand.toLowerCase() === inputValue.toLowerCase()
            ) > -1
        );
    }

    shouldShowCreateProductTypeButton(inputValue: string): boolean {
        //alert(inputValue);
        return !!!(
            inputValue === '' ||
            this.product_type.findIndex(
                (cat) =>
                    cat.product_type.toLowerCase() === inputValue.toLowerCase()
            ) > -1
        );
    }

    shouldShowCreateProductSubTypeButton(inputValue: string): boolean {
        //alert(inputValue);
        return !!!(
            inputValue === '' ||
            this.product_sub_type.findIndex(
                (cat) =>
                    cat.product_sub_type.toLowerCase() ===
                    inputValue.toLowerCase()
            ) > -1
        );
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

    onFileUpload(event) {
        // this.selectedFile = event.target.files[0];
        const file = event.target.files[0];
        console.log(file);
        this.selectedProductForm.get('product_image').setValue(file);

        const formData = new FormData();
        // formData.append(
        //     'temp_str_config_id',
        //     this.selectedProductForm.get('temp_str_config_id').value
        // );
        formData.append(
            'myFile',
            this.selectedProductForm.get('product_image').value
        );
        this._httpClient
            .post<any>('/api/products/uploadImage.php', formData)
            .subscribe(() => {
                this.selectedProductForm
                    .get('product_image')
                    .setValue(file['name']);
            });
    }

    selectEvent(item) {
        console.log(item);
        // do something with selected item
    }

    addProduct(): void {
        const routeParams = this.routes.snapshot.params;
        // Create the product
        const product = this.selectedProductForm.getRawValue();
        console.log(product);
        this._addProductService.addProduct(product).subscribe((product) => {
            this.showFlashMessage('success');
            this._router.navigate([
                '/dashboard/' +
                    routeParams.shopId +
                    '/' +
                    routeParams.shop_name,
            ]);
        });
        // const product = new FormData();
        // product.append(
        //     'user_id',
        //     this.selectedProductForm.get('user_id').value
        // );
        // product.append(
        //     'temp_shopId',
        //     this.selectedProductForm.get('temp_shopId').value
        // );
        // product.append(
        //     'category',
        //     this.selectedProductForm.get('category').value
        // );
        // product.append(
        //     'sub_category',
        //     this.selectedProductForm.get('sub_category').value
        // );
        // product.append('brand', this.selectedProductForm.get('brand').value);
        // product.append(
        //     'product_name',
        //     this.selectedProductForm.get('product_name').value
        // );
        // product.append(
        //     'product_type',
        //     this.selectedProductForm.get('product_type').value
        // );
        // product.append(
        //     'product_sub_type',
        //     this.selectedProductForm.get('product_sub_type').value
        // );
        // product.append(
        //     'product_description',
        //     this.selectedProductForm.get('product_description').value
        // );
        // product.append(
        //     'product_weight',
        //     this.selectedProductForm.get('product_weight').value
        // );
        // product.append(
        //     'product_weight_type',
        //     this.selectedProductForm.get('product_weight_type').value
        // );
        // product.append(
        //     'product_qty',
        //     this.selectedProductForm.get('product_qty').value
        // );
        // product.append(
        //     'product_price',
        //     this.selectedProductForm.get('product_price').value
        // );
        // product.append(
        //     'offer_price',
        //     this.selectedProductForm.get('offer_price').value
        // );
        // product.append(
        //     'product_status',
        //     this.selectedProductForm.get('product_status').value
        // );
        // product.append(
        //     'myFile',
        //     this.selectedProductForm.get('product_image').value
        // );

        // this._httpClient
        //     .post<any>('/api/products/addProduct.php', product)
        //     .subscribe(() => {
        //         // this._router.navigate([
        //         //     '/dashboard/' +
        //         //         routeParams.shopId +
        //         //         '/' +
        //         //         routeParams.shop_name,
        //         // ]);
        //     });
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

    storeDashboard(): void {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/dashboard/' + routeParams.shopId + '/' + routeParams.shop_name,
        ]);
    }
}
