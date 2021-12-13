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
            // Show a success message
            this.showFlashMessage('success');
            // this.ngOnInit();
            this.cd.markForCheck();
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
