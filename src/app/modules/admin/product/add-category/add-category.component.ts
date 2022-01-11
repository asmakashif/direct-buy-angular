import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InventoryProduct } from '../../../../Model/inventory.types';
import { HttpClient } from '@angular/common/http';
import { AddProductService } from '../add-product/add-product.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { FuseConfirmationService } from '@fuse/services/confirmation';

declare var $: any;

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
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
    category: any = [];
    //category: category[] = [];
    sub_category: any = [];
    deviceInfo: any;
    filters: any;
    myControl = new FormControl();

    countries: Object = {
        Asia: ['India', 'Sri Lanka', 'Pakistan', 'Afganistan'],
        Europe: ['Hungary', 'Germany', 'France'],
        Americas: ['North America', 'Mexico'],
    };
    continent: string = 'Americas';
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

        // Create the selected product form
        this.selectedProductForm = this.formBuilder.group({
            user_id: [user_id],
            shopId: [routeParams.shopId],
            category: [''],
            sub_category: [''],
        });

        // this.selectedProductForm = new FormGroup({
        //     user_id: new FormControl(user_id),
        //     shopId: new FormControl(routeParams.shopId),
        //     category: new FormControl(''),
        //     sub_category: new FormControl(''),
        // });

        this._addProductService
            .getCategories()
            .subscribe((data) => (this.category = data));

        this._addProductService.getCategories().subscribe((category) => {
            this.category = category;
            console.log(this.category);
        });

        // this._addProductService.getSubCategory().subscribe((sub_category) => {
        //     this.sub_category = sub_category;

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

    // onChangeCategory(category) {
    //     this.sub_category = this._addProductService
    //         .getSubCategory()
    //         .filter((e) => e.category == category.target.value);
    // }

    storeDashboard(): void {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/dashboard/' + routeParams.shopId + '/' + routeParams.shop_name,
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
    addCategory(): void {
        const routeParams = this.routes.snapshot.params;
        // Create the product
        const category = this.selectedProductForm.getRawValue();
        console.log(category);
        this._addProductService.addCategory(category).subscribe((product) => {
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
