import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeDelConfigService } from './home-del-config.service';
@Component({
    selector: 'app-home-del-config',
    templateUrl: './home-del-config.component.html',
    styleUrls: ['./home-del-config.component.scss'],
})
export class HomeDelConfigComponent implements OnInit {
    message: any;
    msg: any;
    flashMessage: string;

    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private apiservice: HomeDelConfigService
    ) {}
    shop_id: any;
    slots: any;
    shopSlots: any;
    signinForm: FormGroup;
    ngOnInit(): void {
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
        this.apiservice.getTimeSlotsByShop(this.shop_id).subscribe((data) => {
            this.shopSlots = data;
        });
    }
    onSubmit() {
        if (this.signinForm.invalid) {
            return;
        }
        const user_id = localStorage.getItem('user_id');
        const data = {
            slot: this.signinForm.controls.slot.value,
            id: user_id,
            shopId: this.shop_id,
        };
        this.apiservice.saveTimeSlotsByShop(data).subscribe((data) => {
            this.message = data;
            this.msg = this.message.message;
            //  alert(this.msg);
            this.showFlashMessage('success'); // after submitting form
            this.apiservice
                .getTimeSlotsByShop(this.shop_id)
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
}
