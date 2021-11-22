import { DOCUMENT, Location } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    Inject,
    Injectable,
} from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'app/modules/admin/dashboard/dashboard.service';
import { Data } from '../../../Model/data';
import { InventoryProduct } from '../../../Model/inventory.types';
import { FormBuilder, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { InventoryService } from '../ecommerce/inventory/inventory.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
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
        `
            .search-hero {
                max-width: 500px;
                padding-bottom: 50px;
                margin: auto;
            }
        `,
        `
            .form-control {
                box-shadow: 0 10px 40px 0 #b0c1d9;
            }
        `,
        `
            .form-control::placeholder {
                font-family: FontAwesome;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
    selectedProject: string = 'Dashbaord';
    dateObj: number = Date.now();
    data: [];
    count: [];
    countOrders: [];
    queryParam: any;
    queryParamName: string;
    accessToken: string;
    user_id: string;
    firstname: string;
    prevMonthOrderCount: [];
    curMonthOrderCount: [];
    yestOpenOrderCount: [];
    openOrderCount: [];
    curFulfilledOrderCount: [];
    newCustomerCount: [];
    customerCount: [];
    payment: [];
    messageForm: any;
    shop_id: any;
    message: [];
    profileData: any;
    changeDetectRef: [];
    paymentCount: [];
    domain: string;
    validateSignIn: string;
    totalMinOrder: any;
    totalHomeDelOrder: any;
    usertotalHomeDel: any;
    products: any;
    selectedProduct: InventoryProduct;
    selectedProductForm: any;
    editCache: { [key: string]: any } = {};
    flashMessage: string;
    allOrderCount: any;

    addProductForm: any;

    isLoading: boolean = false;

    addCache: { [key: string]: any } = {};
    searchText;
    thumbnail: any;
    strPaymentCount: any;

    constructor(
        @Inject(DOCUMENT)
        private _document: Document,
        private _fuseConfirmationService: FuseConfirmationService,
        private flashMessagesService: FlashMessagesService,
        private formBuilder: FormBuilder,
        private _dashboardService: DashboardService,
        private _inventoryService: InventoryService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private Location: Location,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.accessToken = localStorage.getItem('accessToken');
        this.validateSignIn = localStorage.getItem('validateSignIn');
        const user_id = localStorage.getItem('user_id');
        console.log(user_id);
        const routeParams = this.routes.snapshot.params;
        this.shop_id = routeParams.shopId;
        if (!this.accessToken) {
            if (this.validateSignIn == '0') {
                this._router.navigate(['sign-in']);
            }
        }

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
            product_status: [''],
        });

        this.messageForm = this.formBuilder.group({
            id: [user_id],
            str_msg: ['', Validators.required],
        });
        this._dashboardService.getShops(user_id).subscribe(
            (data: any) => {
                this.data = data;
                this.cd.detectChanges();
            },
            (error) => {
                //alert(error.message);
            }
        );

        this._dashboardService.getNoOfShops(user_id).subscribe((count) => {
            this.count = count;
            this.cd.detectChanges();
        });

        this._dashboardService.getNoOfPayment(user_id).subscribe((count) => {
            this.paymentCount = count;
            this.cd.detectChanges();
        });

        this.routes.paramMap.subscribe((params) => {
            this.queryParam = params.get('shopId');
            this.queryParamName = params.get('shop_name');
            console.log(params);
        });

        this._dashboardService
            .getPrevMonthOrderCount(routeParams.shopId)
            .subscribe((prevMonthOrderCount) => {
                this.prevMonthOrderCount = prevMonthOrderCount;
                this.cd.detectChanges();
                console.log(this.prevMonthOrderCount);
            });

        this._dashboardService
            .getCurrentMonthOrderCount(routeParams.shopId)
            .subscribe((curMonthOrderCount) => {
                this.curMonthOrderCount = curMonthOrderCount;
                this.cd.detectChanges();
                console.log(this.curMonthOrderCount);
            });

        this._dashboardService
            .getYestOpenOrderCount(routeParams.shopId)
            .subscribe((yestOpenOrderCount) => {
                this.yestOpenOrderCount = yestOpenOrderCount;
                this.cd.detectChanges();
                console.log(this.yestOpenOrderCount);
            });
        this._dashboardService
            .getOpenOrderCount(routeParams.shopId)
            .subscribe((openOrderCount) => {
                this.openOrderCount = openOrderCount;
                this.cd.detectChanges();
                console.log(this.openOrderCount);
            });

        this._dashboardService
            .getCurFulfilledOrderCount(routeParams.shopId)
            .subscribe((curFulfilledOrderCount) => {
                this.curFulfilledOrderCount = curFulfilledOrderCount;
                this.cd.detectChanges();
                console.log(this.curFulfilledOrderCount);
            });

        this._dashboardService
            .getAllOrderCount(routeParams.shopId)
            .subscribe((allOrderCount) => {
                this.allOrderCount = allOrderCount;
                this.cd.detectChanges();
                console.log(this.allOrderCount);
            });

        this._dashboardService
            .getNewRegisteredCustomers(routeParams.shopId)
            .subscribe((newCustomerCount) => {
                this.newCustomerCount = newCustomerCount;
                this.cd.detectChanges();
                console.log(this.newCustomerCount);
            });

        this._dashboardService
            .getRegisteredCustomers(routeParams.shopId)
            .subscribe((customerCount) => {
                this.customerCount = customerCount;
                this.cd.detectChanges();
                console.log(this.customerCount);
            });

        this._dashboardService
            .getPaymentGateway(user_id)
            .subscribe((payment: any) => {
                this.payment = payment;
                this.cd.detectChanges();
                console.log(this.payment);
            });

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.messageForm.patchValue(data);
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.cd.detectChanges();
                //console.log(this.profileData);
            });

        this._dashboardService
            .getStrPaymentCount(routeParams.shopId)
            .subscribe((strPaymentCount) => {
                this.strPaymentCount = strPaymentCount;
            });
        this._dashboardService
            .getTotalMinOrderVal(user_id)
            .subscribe((data) => {
                this.totalMinOrder = data;
                console.log('data');
            });
        this._dashboardService
            .getTotalHomeDel(this.shop_id)
            .subscribe((data) => {
                this.totalHomeDelOrder = data;
            });
        this._dashboardService
            .getTotalHomeDelByUser(user_id)
            .subscribe((data) => {
                this.usertotalHomeDel = data;
            });
        //this.editMessage();

        this._dashboardService.getProductsByStr().subscribe((products) => {
            this.products = products;
            this.cd.detectChanges();
            // let objectURL = 'data:image/jpg;base64,' + products.image;
            // this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            console.log(this.products);
        });
    }

    changeStore(stores): void {
        this._router
            .navigate(['dashboard/' + stores.shopId + '/' + stores.shop_name])
            .then(() => {
                this.ngOnInit();
                // window.location.reload();
            });
    }

    dashbaord(): void {
        this._router.navigate(['dashboard/']);
    }

    // refresh(): void {
    //     this._document.defaultView.location.reload();
    // }

    storePayment(): void {
        const routeParams = this.routes.snapshot.params;
        const configurations = 'configurations';
        localStorage.setItem('redirect', configurations);
        this._router.navigate(['/store/store-payment/' + routeParams.shopId]);
    }

    shopDetails(data: Data): void {
        if (!this.isMobile()) {
            this._router.navigate(['/store/shop-details/' + data.shopId]);
        } else {
            this._router.navigate(['/store/shop-details/' + data.shopId]);
        }
    }
    configurations(data: Data): void {
        if (!this.isMobile()) {
            this._router.navigate([
                '/dashboard/' +
                    data.shopId +
                    '/' +
                    data.shop_name +
                    '/configurations/',
            ]);
        } else {
            this._router.navigate([
                '/dashboard/' +
                    data.shopId +
                    '/' +
                    data.shop_name +
                    '/configurations/',
            ]);
        }
    }

    minimum_order(): void {
        const routeParams = this.routes.snapshot.params;
        console.log(routeParams.shopId);
        if (!this.isMobile()) {
            this._router.navigate(['/minOrderValue/' + routeParams.shopId]);
        } else {
            this._router.navigate(['/minOrderValue/' + routeParams.shopId]);
        }
    }
    home_delivery(stores): void {
        if (!this.isMobile()) {
            this._router.navigate(['/HomeDeliverySetting/' + stores.shopId]);
        } else {
            this._router.navigate(['//HomeDeliverySetting/' + stores.shopId]);
        }
    }
    steps(data: Data): void {
        if (!this.isMobile()) {
            this._router.navigate(['/steps/' + data.shopId]);
        } else {
            this._router.navigate(['/mobile/steps/' + data.shopId]);
        }
    }

    completedOrders(data: Data): void {
        this._router.navigate(['/orders/completed-orders/' + data.shopId]);
    }

    pendingOrders(data: Data): void {
        this._router.navigate(['/orders/pending-orders/' + data.shopId]);
    }

    enableMessageField() {
        console.log('keyup');

        $(document).ready(function () {
            $('#str_msg').prop('readonly', false);
            $('#editMessage').prop('disabled', false);
        });
    }

    onMessageUpdate() {
        console.log(this.messageForm.value);
        this._dashboardService
            .updateRetailerDetails(this.messageForm.value)
            .subscribe((data) => {
                this.ngOnInit();
                this.showFlashMessage('success');
                this.cd.detectChanges();

                // this.flashMessagesService.show(
                //     // Array of messages each will be displayed in new line
                //     'Updated Successfully',
                //     {
                //         cssClass: 'alert-success', // Type of flash message, it defaults to info and success, warning, danger types can also be used
                //         timeout: 4000, // Time after which the flash disappears defaults to 4000ms
                //     }
                // );
            });
    }

    uniqueOrdersCurMonth(): void {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/orders/unique-orders/' + routeParams.shopId]);
    }

    ordersFulFilledPrevMonth() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/orders/orders-fulfilled/' + routeParams.shopId,
        ]);
    }

    openOrdersAllMonth() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/orders/open-orders/' + routeParams.shopId]);
    }

    allSales() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/orders/sales/' + routeParams.shopId]);
    }

    newRegistration() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate([
            '/orders/new-registration/' + routeParams.shopId,
        ]);
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

    // startEdit(temp_str_config_id: string): void {
    //     alert(temp_str_config_id);
    //     this.editCache[temp_str_config_id].edit = true;
    // }
    editDetails(productId: string): void {
        // If the product is already selected...
        // if ((this.editCache[productId] = true)) {

        //     this.closeDetails();
        //     return;
        // }
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

    /**
     * Create product
     */
    createProduct(): void {
        // Create the product
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        // this.addCache = true;
        this._dashboardService
            .createProduct(routeParams.shopId, user_id)
            .subscribe((product) => {
                //this.addCache[product.temp_str_config_id] = true;
                //this.editDetails[product.temp_str_config_id] = true;
                this.showFlashMessage('success');
                this.ngOnInit();
                // Set the selected product
                this.selectedProduct = product;
                // Fill the form
                this.selectedProductForm.patchValue(product);

                // Mark for check
                // this.cd.markForCheck();
                this.cd.detectChanges();
            });
    }

    // addDetails(): void {
    //     // If the product is already selected...
    //     this.addCache = true;
    //     // Detect changes
    //     this.ngOnInit();
    //     this.cd.detectChanges();
    // }

    /**
     * Update the selected product using the form data
     */
    updateSelectedProduct(): void {
        // Get the product object
        const product = this.selectedProductForm.getRawValue();

        // Remove the currentImageIndex field
        //delete product.currentImageIndex;

        // Update the product on the server
        this._dashboardService.updateProduct(product).subscribe(() => {
            // Show a success message
            this.showFlashMessage('success');
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

    inventory() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['product/inventory/' + routeParams.shopId]);
    }
}
