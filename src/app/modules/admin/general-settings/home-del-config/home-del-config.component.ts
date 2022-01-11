import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeDelConfigService } from './home-del-config.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../dashboard/dashboard.service';
@Component({
    selector: 'app-home-del-config',
    templateUrl: './home-del-config.component.html',
    styleUrls: ['./home-del-config.component.scss'],
})
export class HomeDelConfigComponent implements OnInit {
    faStore = faStore;
    message: any;
    msg: any;
    flashMessage: string;
    profileData: any;
    domainname: any;
    firstname: any;

    constructor(
        private cd: ChangeDetectorRef,
        private _router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private apiservice: HomeDelConfigService,
        private _dashboardService: DashboardService
    ) {}
    shop_id: any;
    slots: any;
    shopSlots: any;
    signinForm: FormGroup;
    ngOnInit(): void {
        const routeParams = this.route.snapshot.params;
        this.signinForm = this.fb.group({
            slot: ['', Validators.required],
        });
        this.route.paramMap.subscribe((params) => {
            this.shop_id = params.get('shop_id');
            console.log(this.shop_id);
        });
        const user_id = localStorage.getItem('user_id');

        this.apiservice.getTimeSlotsByUSer(user_id).subscribe((data) => {
            this.slots = data;
        });
        this.apiservice
            .getTimeSlotsByShop(routeParams.shopId)
            .subscribe((data) => {
                this.shopSlots = data;
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
        const user_id = localStorage.getItem('user_id');
        const data = {
            slot: this.signinForm.controls.slot.value,
            id: user_id,
            shopId: routeParams.shopId,
        };
        this.apiservice.saveTimeSlotsByShop(data).subscribe((data) => {
            this.message = data;
            this.msg = this.message.message;
            //  alert(this.msg);
            this.ngOnInit();
            this.showFlashMessage('success'); // after submitting form
            this.apiservice
                .getTimeSlotsByShop(routeParams.shopId)
                .subscribe((data) => {
                    this.shopSlots = data;
                });
        });
    }
    delete(id: any) {
        this.apiservice.deleteTimeSlots(id).subscribe((data) => {
            this.message = data;
            this.msg = this.message.message;
            alert(this.msg);
            this.apiservice
                .getTimeSlotsByShop(this.shop_id)
                .subscribe((data) => {
                    this.shopSlots = data;
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
    } // add separately after ngOnInit();

    dashbaordConfiguration() {
        const routeParams = this.route.snapshot.params;
        this._router.navigate([
            '/dashboard/' + routeParams.shopId + '/' + routeParams.shop_name,
        ]);
    }
}
