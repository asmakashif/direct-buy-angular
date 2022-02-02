import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MinOrderValService } from './min-order-val.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { DashboardService } from '../../dashboard/dashboard.service';
@Component({
    selector: 'app-min-order-val',
    templateUrl: './min-order-val.component.html',
    styleUrls: ['./min-order-val.component.scss'],
})
export class MinOrderValComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    profileData: any;
    domainname: any;
    firstname: any;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private apiservice: MinOrderValService,
        private _dashboardService: DashboardService
    ) {}
    signinForm: FormGroup;
    shop_id: any;
    params: any;
    min_order: any;
    user_id: any;
    flashMessage: string;
    ngOnInit(): void {
        this.signinForm = this.fb.group({
            minOrder: ['', Validators.required],
        });

        const user_id = localStorage.getItem('user_id');
        this.apiservice.getMinimumOrderValue(user_id).subscribe((data) => {
            this.min_order = data;
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
        if (this.signinForm.invalid) {
            return;
        }
        const userId = localStorage.getItem('user_id');
        const data = {
            minOrder: this.signinForm.controls.minOrder.value,

            userId: userId,
        };
        this.apiservice.saveMinimumOrderValue(data).subscribe((data) => {
            this.showFlashMessage('success');
            this.ngOnInit();
            this.apiservice.getMinimumOrderValue(userId).subscribe((data) => {
                this.min_order = data;
            });
        });
    }
    delete(id: any) {
        const userId = localStorage.getItem('user_id');
        this.apiservice.deleteMinimumOrderValue(id).subscribe((data) => {
            this.apiservice.getMinimumOrderValue(userId).subscribe((data) => {
                this.min_order = data;
                this.showFlashMessage('success');
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
}
