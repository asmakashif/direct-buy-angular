import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInfoService } from 'app/modules/admin/product/product-info/product-info.service';
import { DashboardService } from 'app/modules/admin/dashboard/dashboard.service';
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
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';

declare var $: any;

@Component({
    selector: 'app-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss'],
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
export class ProductInfoComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    profileData: any;
    domainname: any;
    imagePath: string = '/api/products/uploads/';
    countOrders: [];
    user_id: string;
    products: any;
    selectedProduct: InventoryProduct;
    selectedProductForm: any;
    editCache: { [key: string]: any } = {};
    flashMessage: string;
    isLoading: boolean = false;
    searchText;
    data: any;
    product_status: any;
    category: any;
    product_sub_type: any;
    sub_category: any;
    product_type: any;
    brand: any;
    firstname: any;

    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private formBuilder: FormBuilder,
        private _dashboardService: DashboardService,
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
            temp_str_config_id: [''],
            temp_shopId: [routeParams.shopId],
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
            product_status: this.formBuilder.array([], [Validators.required]),
        });

        this._dashboardService
            .getProductsByStr(routeParams.shopId)
            .subscribe((products) => {
                this.products = products;
                this.cd.detectChanges();
                console.log(this.products);
            });

        this._dashboardService
            .getShopDetailsById(routeParams.shopId, user_id)
            .subscribe((data: any) => {
                this.data = data;
                this.product_status = this.data.product_status;
            });

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
            });

        this._dashboardService.getCategories().subscribe((category) => {
            this.category = category;
        });

        this._dashboardService.getBrand().subscribe((brand) => {
            this.brand = brand;
        });

        this._dashboardService.getProductType().subscribe((data) => {
            this.product_type = data;
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

    prevStep(): void {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/steps/' + routeParams.shopId]);
    }

    nextStep(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        const confirmation = this._fuseConfirmationService.open({
            message:
                'Congratulations, Products are added to your store. To add more products, click Cancel. You may come back to this step from the menu Shops -> Manage Shop',
            icon: {
                show: true,
                name: 'heroicons_outline:check',
                color: 'accent',
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
        // If the product is already selected...
        const routeParams = this.routes.snapshot.params;
        const shopId = routeParams.shopId;
        this.editCache[productId] = true;

        // Get the product by id
        this._dashboardService
            .getProductByStrId(productId, shopId)
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
        const routeParams = this.routes.snapshot.params;
        // Get the product object
        const product = this.selectedProductForm.getRawValue();
        console.log(product);
        // Remove the currentImageIndex field
        //delete product.currentImageIndex;

        // Update the product on the server
        // this._httpClient
        //     .post<any>('/api/products/updateProduct.php', product)
        //     .subscribe(() => {
        //         this.showFlashMessage('success');
        //         this.ngOnInit();
        //     });
        this._dashboardService.updateProduct(product).subscribe(() => {
            this.showFlashMessage('success');
            this.cd.markForCheck();
            // this._dashboardService
            //     .pushProductsTOStrDb(routeParams.shopId)
            //     .subscribe((data) => {
            //         // Show a success message
            //         this.showFlashMessage('success');
            //         // this.ngOnInit();
            //         this.cd.markForCheck();
            //     });
        });
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedProduct(): void {
        // Open the confirmation dialog
        // const data = this.selectedProductForm.value;
        // alert(data.temp_str_config_id);
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

                //alert(product.temp_str_config_id);
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
}
