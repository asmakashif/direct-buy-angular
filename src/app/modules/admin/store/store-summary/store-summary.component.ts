import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    NgForm,
    FormArray,
    FormControl,
} from '@angular/forms';
import { StoreSummaryService } from 'app/modules/admin/store/store-summary/store-summary.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { DashboardService } from '../../dashboard/dashboard.service';
//import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-store-summary',
    templateUrl: './store-summary.component.html',
    styleUrls: ['./store-summary.component.scss'],
})
export class StoreSummaryComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    domainname: any;
    profileData: any;
    activeLink = 'StoreSummmary';
    data: any;
    countProduct: any;
    summaryForm: FormGroup;
    firstname: string;
    flashMessage: string;
    createDb: any;
    shop_name: any;
    shop_address: any;
    shopId: any;
    shopdata: any;
    dbcreation_status: any;
    shopCreationStatus: any;
    createShopDb: string;

    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private formBuilder: FormBuilder,
        private apiService: StoreSummaryService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef, //private cookieService: CookieService
        private _dashboardService: DashboardService
    ) { }

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.firstname = localStorage.getItem('firstname');
        const shopId = routeParams.shopId;
        this.apiService
            .getShopDetailsById(routeParams.shopId, user_id)
            .subscribe((data: any) => {
                this.data = data;
                this.shopId = this.data.shopId;
                this.shop_name = this.data.shop_name;
                this.shop_address = this.data.shop_address;
                this.dbcreation_status = this.data.dbcreation_status;
            });

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
            });

        this.apiService
            .countStrProducts(routeParams.shopId)
            .subscribe((data: any) => {
                this.countProduct = data;
            });

        this.summaryForm = this.formBuilder.group({
            shopId: [shopId],
            // productUpdate_status: ['', Validators.required],
            productUpdate_status: this.formBuilder.array(
                [],
                [Validators.required]
            ),
        });
    }

    // getCookie(key: string) {
    //     return this.cookieService.get(key);
    // }

    onProductUpdateSelect(e) {
        const productUpdate_status: FormArray = this.summaryForm.get(
            'productUpdate_status'
        ) as FormArray;

        if (e.target.checked) {
            productUpdate_status.push(new FormControl(e.target.value));
        } else {
            const index = productUpdate_status.controls.findIndex(
                (x) => x.value === e.target.value
            );
            productUpdate_status.removeAt(index);
        }
    }

    onSubmit() {
        const routeParams = this.routes.snapshot.params;
        console.log(this.summaryForm.value);
        if (this.summaryForm.invalid) {
            return;
        }
        this.apiService
            .saveProductUpdate(this.summaryForm.value)
            .subscribe((data) => {
                this._router.navigate(['/steps/' + routeParams.shopId]);
            });
    }

    prevStep(): void {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/steps/' + routeParams.shopId]);
    }

    nextStep(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        // alert('next');
        this.apiService
            .getShopDetailsById(routeParams.shopId, user_id)
            .subscribe((data: any) => {
                this.shopdata = data;
                if (this.shopdata.dbcreation_status == 3) {
                    const confirmation = this._fuseConfirmationService.open({
                        title: "Congratulations",
                        message:
                            'Your store is ready to be managed. Click Menu->Shop->Enter Shop to manage your shop',
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
                            cancel: {
                                "show": false,
                                "label": "Cancel"
                            }
                        },
                    });
                    // Subscribe to the confirmation dialog closed action
                    confirmation.afterClosed().subscribe((result) => {
                        // If the confirm button pressed...
                        if (result === 'confirmed') {
                            this._router
                                .navigate([
                                    '/store-activation/' + routeParams.shopId,
                                ])
                                .then(() => {
                                    localStorage.removeItem('createShopDb');
                                });
                        }
                    });
                } else {
                    const confirmation = this._fuseConfirmationService.open({
                        message:
                            'We are Sorry, there was a problem in creating the store. This will be reported to our technical team. Please wait to hear from us before you proceed.',
                        actions: {
                            confirm: {
                                label: 'Okay',
                            },
                        },
                    });
                    // Subscribe to the confirmation dialog closed action
                    confirmation.afterClosed().subscribe((result) => {
                        // If the confirm button pressed...
                        if (result === 'confirmed') {
                        }
                    });
                }
            });
    }

    createShopDB() {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        const createShopDb = 'createShopDb';
        localStorage.setItem('createShopDb', createShopDb);
        this.createShopDb = localStorage.getItem('createShopDb');
        this.apiService
            .createDB(routeParams.shopId, user_id)
            .subscribe((data) => {
                this.ngOnInit();
                this.apiService
                    .createtables(routeParams.shopId, user_id)
                    .subscribe((data) => {
                        this.ngOnInit();
                        this.apiService
                            .pushData(routeParams.shopId, user_id)
                            .subscribe((data) => {
                                this.ngOnInit();
                            });
                    });
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
