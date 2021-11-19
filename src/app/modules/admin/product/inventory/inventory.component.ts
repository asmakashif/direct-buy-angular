import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryProduct } from 'app/Model/inventory.types';
import { DashboardService } from '../../dashboard/dashboard.service';
import { InventoryService } from './inventory.service';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
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
        `
            .fixedheader {
                overflow-y: auto;
                height: 510px;
            }
        `,
    ],
})
export class InventoryComponent implements OnInit {
    products: any;
    selectedProduct: InventoryProduct | null = null;
    selectedProductForm: any;

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private _dashboardService: DashboardService,
        private _inventoryService: InventoryService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        // Create the selected product form
        this.selectedProductForm = this.formBuilder.group({
            id: [''],
            product_name: [''],
        });

        this._inventoryService.getProductsByStr().subscribe((products) => {
            this.products = products;
            console.log(this.products);
        });
    }

    /**
     * Toggle product details
     *
     * @param productId
     */
    toggleDetails(temp_str_config_id: string): void {
        alert(temp_str_config_id);
        // If the product is already selected...
        if (
            this.selectedProduct &&
            this.selectedProduct.temp_str_config_id === temp_str_config_id
        ) {
            // Close the details

            this.closeDetails();
            return;
        }

        // Get the product by id
        this._inventoryService
            .getProductById(temp_str_config_id)
            .subscribe((product) => {
                // Set the selected product
                this.selectedProduct = product;
                console.log(this.selectedProduct);
                // Fill the form
                this.selectedProductForm.patchValue(product);

                // Mark for check
                this.cd.markForCheck();
            });
    }

    /**
     * Close the details
     */
    closeDetails(): void {
        this.selectedProduct = null;
    }
}
