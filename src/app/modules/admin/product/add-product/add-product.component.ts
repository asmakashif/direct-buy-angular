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

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
    products: any;
    selectedProduct: InventoryProduct;
    selectedProductForm: any;
    editCache: { [key: string]: any } = {};
    flashMessage: string;
    keyword = 'category';
    tags: InventoryProduct[];
    filteredTags: InventoryProduct[];
    // tagsEditMode: boolean = false;
    category: any;
    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private _addProductService: AddProductService,
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
            console.log(this.category);
        });
    }

    /**
     * Filter tags
     *
     * @param event
     */
    filterTags(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredTags = this.category.filter((tag) =>
            tag.category.toLowerCase().includes(value)
        );
    }

    /**
     * Filter tags input key down event
     *
     * @param event
     */
    filterTagsInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if (event.key !== 'Enter') {
            return;
        }

        // If there is no tag available...
        if (this.filteredTags.length === 0) {
            // Create the tag
            this.createTag(event.target.value);

            // Clear the input
            event.target.value = '';

            // Return
            return;
        }

        // If there is a tag...
        const category = this.filteredTags[0];
        const isTagApplied = this.selectedProduct.category.find(
            (base_product_id) => base_product_id === category.base_product_id
        );

        // If the found tag is already applied to the product...
        if (isTagApplied) {
            // Remove the tag from the product
            this.removeTagFromProduct(category);
        } else {
            // Otherwise add the tag to the product
            this.addTagToProduct(category);
        }
    }

    /**
     * Add tag to the product
     *
     * @param tag
     */
    addTagToProduct(category: InventoryProduct): void {
        // Add the tag
        this.selectedProduct.category.unshift(category.base_product_id);

        // Update the selected product form
        this.selectedProductForm
            .get('category')
            .patchValue(this.selectedProduct.category);

        // Mark for check
        this.cd.markForCheck();
    }

    /**
     * Remove tag from the product
     *
     * @param tag
     */
    removeTagFromProduct(category: InventoryProduct): void {
        // Remove the tag
        this.selectedProduct.category.splice(
            this.selectedProduct.category.findIndex(
                (item) => item === category.base_product_id
            ),
            1
        );

        // Update the selected product form
        this.selectedProductForm
            .get('category')
            .patchValue(this.selectedProduct.category);

        // Mark for check
        this.cd.markForCheck();
    }

    /**
     * Create a new tag
     *
     * @param title
     */
    createTag(category: string): void {
        const cat = {
            category,
        };

        // Create tag on the server
        // this._inventoryService.createTag(tag).subscribe((response) => {
        //     // Add the tag to the product
        //     this.addTagToProduct(response);
        // });
    }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateTagButton(inputValue: string): boolean {
        //alert(inputValue);
        return !!!(
            inputValue === '' ||
            this.category.findIndex(
                (cat) => cat.category.toLowerCase() === inputValue.toLowerCase()
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
}
