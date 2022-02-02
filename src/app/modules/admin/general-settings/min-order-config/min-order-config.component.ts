import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MinOrderConfigService } from './min-order-config.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
@Component({
    selector: 'app-min-order-config',
    templateUrl: './min-order-config.component.html',
    styleUrls: ['./min-order-config.component.scss'],
})
export class MinOrderConfigComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    profileData: any;
    domainname: any;
    days: any;
    shop_id: string;
    values: any;
    flashMessage: string;
    firstname: any;

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private apiservice: MinOrderConfigService,
        private cd: ChangeDetectorRef,
        private _dashboardService: DashboardService
    ) {}
    signinForm: FormGroup;
    ngOnInit(): void {
        this.signinForm = this.fb.group({
            minOrder: ['', Validators.required],
        });
        const user_id = localStorage.getItem('user_id');
        this.route.paramMap.subscribe((params) => {
            this.shop_id = params.get('shop_id');
            console.log(this.shop_id);
        });
        this.apiservice.getMinimumOrderValue(this.shop_id).subscribe((data) => {
            this.values = data;
        });
        this.apiservice
            .getMinimumOrderValueForUser(user_id)
            .subscribe((data) => {
                this.days = data;
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
    onSubmit() {
        const routeParams = this.route.snapshot.params;
        if (this.signinForm.invalid) {
            return;
        }

        const data = {
            minOrder: this.signinForm.controls.minOrder.value,
            id: routeParams.shopId,
        };
        this.apiservice.saveMinimumOrderValue(data).subscribe((data) => {
            this.ngOnInit();
            this.showFlashMessage('success');
            this.apiservice
                .getMinimumOrderValue(routeParams.shopId)
                .subscribe((data) => {
                    this.values = data;
                });
        });
    }

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

    dashbaordConfiguration() {
        const routeParams = this.route.snapshot.params;
        this._router.navigate([
            '/dashboard/' + routeParams.shopId + '/' + routeParams.shop_name,
        ]);
    }
}
