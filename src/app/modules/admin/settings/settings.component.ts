import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DashboardService } from '../dashboard/dashboard.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';

declare var $: any;

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    selectedProject: string = 'Settings';
    imagePath: string = '/api/products/uploads/';
    profileForm: FormGroup;
    profileData: any;
    flashMessage: string;
    editShopForm: any;
    shop_id: any;
    editUserForm: any;
    shopData: any;
    shop_status: any;
    firstname: any;
    domainname: any;
    shop_logo: any;
    logoForm: FormGroup;
    logo: any;

    constructor(
        private formBuilder: FormBuilder,
        private _settingService: SettingsService,
        private _dashboardService: DashboardService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private _httpClient: HttpClient,
        private apiService: SettingsService
    ) {}

    ngOnInit(): void {
        const user_id = localStorage.getItem('user_id');
        const routeParams = this.routes.snapshot.params;
        this.shop_id = routeParams.shopId;

        this.profileForm = this.formBuilder.group({
            id: [user_id],
            firstname: ['', Validators.required],
            domainname: ['', Validators.required],
            contact: ['', Validators.required],
            email: ['', Validators.required],
            password: [''],
            address: [''],
            logo: [''],
            city: [''],
            state: [''],
        });

        // this.logoForm = this.formBuilder.group({
        //     user_id: [user_id],
        //     logo: [''],
        // });

        this._settingService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileForm.patchValue(data);
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.logo = this.profileData.logo;
                this.cd.detectChanges();
            });

        this.editShopForm = this.formBuilder.group({
            shopId: [''],
            shop_name: [''],
            shop_address: [''],
            shop_gst: [''],
        });

        this._settingService
            .getShopDetailsById(routeParams.shopId, user_id)
            .subscribe((data: any) => {
                this.editShopForm.patchValue(data);
                this.shopData = data;
                this.shop_logo = this.shopData.shop_logo;
                this.shop_status = this.shopData.shop_status;
            });
    }

    onLogoUpload(event) {
        alert(event.target.files[0]);
        // this.selectedFile = event.target.files[0];
        const file = event.target.files[0];
        console.log(file);
        this.profileForm.get('logo').setValue(file);

        const formData = new FormData();
        formData.append('id', this.profileForm.get('id').value);
        formData.append('myFile', this.profileForm.get('logo').value);
        this._httpClient
            .post<any>('/api/products/uploadLogo.php', formData)
            .subscribe((data) => {
                this.ngOnInit();
                //this.logoForm.get('shop_logo').setValue(file['name']);
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

    onProfileUpdate() {
        console.log(this.profileForm.value);
        // if (this.profileForm.invalid) {
        //     return;
        // }
        this.apiService
            .updateRetailerDetails(this.profileForm.value)
            .subscribe((data) => {
                this.showFlashMessage('success');
                // this.flashMessagesService.show(
                //     // Array of messages each will be displayed in new line
                //     'Updated Successfully',
                //     {
                //         cssClass: 'alert-success', // Type of flash message, it defaults to info and success, warning, danger types can also be used
                //         timeout: 4000, // Time after which the flash disappears defaults to 4000ms
                //     }
                // );
                this.ngOnInit();
                // this._router.navigate(['profile/']).then(() => {
                //     this.ngOnInit();
                // });
            });
    }
}
