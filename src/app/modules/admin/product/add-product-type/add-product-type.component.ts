import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { InventoryProduct } from '../../../../Model/inventory.types';
import { HttpClient } from '@angular/common/http';
import { AddProductService } from '../add-product/add-product.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-add-product-type',
    templateUrl: './add-product-type.component.html',
    styleUrls: ['./add-product-type.component.scss'],
})
export class AddProductTypeComponent implements OnInit {
    faStore = faStore;
    profileData: any;
    domainname: any;
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
    //category: category[] = [];
    deviceInfo: any;
    filters: any;
    myControl = new FormControl();
    product_type: any;
    firstname: any;

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
        //this.product_type = routeParams.product_type;
        this.routes.paramMap.subscribe((params) => {
            this.product_type = params.get('product_type');
            //this.selectedProductForm.patchValue(params);
        });
        // Create the selected product form
        this.selectedProductForm = this.formBuilder.group({
            user_id: [user_id],
            shopId: [routeParams.shopId],
            product_type: [''],
            product_sub_type: [''],
        });

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
            });
    }

    storeDashboard(): void {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/dashbaord/' + routeParams.shopId + '/' + routeParams.shop_name,
        ]);
    }

    gotToAddProduct(): void {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/add-product/' + routeParams.shopId + '/' + routeParams.shop_name,
        ]);
    }

    /**
     * Create a new tag
     *
     * @param title
     */
    addProductType(): void {
        const routeParams = this.routes.snapshot.params;
        // Create the product
        const productType = this.selectedProductForm.getRawValue();
        console.log(productType);
        this._addProductService
            .addProductType(productType)
            .subscribe((data) => {
                this.showFlashMessage('success');
                this._router.navigate([
                    '/add-product/' +
                        routeParams.shopId +
                        '/' +
                        routeParams.shop_name,
                ]);
            });
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
