import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeDeliverySettingService } from './home-delivery-setting.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { DashboardService } from '../../dashboard/dashboard.service';
@Component({
    selector: 'app-home-delivery-setting',
    templateUrl: './home-delivery-setting.component.html',
    styleUrls: ['./home-delivery-setting.component.scss'],
})
export class HomeDeliverySettingComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    profileData: any;
    domainname: any;
    names: any;
    slotForm: FormGroup;
    flashMessage: string;
    firstname: any;
    constructor(
        private router: Router,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private apiservice: HomeDeliverySettingService,
        private _dashboardService: DashboardService
    ) {}
    value: any;
    selectedAll: any;
    shop_id: any;
    days: any;
    time: any;
    savedtime: any;
    user_id: any;
    ngOnInit(): void {
        this.slotForm = this.fb.group({
            slot: ['', Validators.required],
            from_time: ['', Validators.required],
            to_time: ['', Validators.required],
        });
        this.route.paramMap.subscribe((params) => {
            this.shop_id = params.get('shop_id');
            console.log(this.shop_id);
        });
        const user_id = localStorage.getItem('user_id');
        const day = localStorage.getItem('day');

        this.apiservice.getWorkingDays(user_id).subscribe((data) => {
            this.days = data;
        });
        const timing = {
            userId: user_id,
        };
        this.apiservice.getWorkingTime(timing).subscribe((data) => {
            this.savedtime = data;
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
    update(e: any, day: any) {
        const user_id = localStorage.getItem('user_id');
        if (e.target.checked) {
            const savedays = {
                day: day,
                userId: user_id,
            };

            this.apiservice.saveWorkingDays(savedays).subscribe((data) => {
                this.apiservice.getWorkingDays(user_id).subscribe((data) => {
                    this.days = data;
                    console.log(this.days);
                });
            });
            //alert('hi'+day);
        } else {
            // alert('bye'+day);
            const save_days = {
                day: day,
                userId: user_id,
            };
            this.apiservice.uncheckWorkingDays(save_days).subscribe((data) => {
                this.apiservice.getWorkingDays(user_id).subscribe((data) => {
                    this.days = data;
                });
            });
        }
    }
    selectAll() {
        for (var i = 0; i < this.names.length; i++) {
            this.names[i].selected = this.selectedAll;
        }
    }
    checkIfAllSelected() {
        this.selectedAll = this.names.every(function (item: any) {
            return item.selected == true;
        });
    }
    updatetime(e: any, day: any, type: any) {
        //alert(e.target.value + type)
        const time = {
            time: e.target.value,
            day: day + '_' + type,
            type: type,
        };
        this.apiservice.saveWorkingTime(time).subscribe((data) => {});
    }
    daySelected(e: any) {
        const day = localStorage.setItem('day', e);
        const days = localStorage.getItem('day');

        const user_id = localStorage.getItem('user_id');
    }
    updateslot(e: any, from: any, to: any, id: any) {
        const user_id = localStorage.getItem('user_id');
        const days = localStorage.getItem('day');
        if (e.target.checked) {
            const slots = {
                from: from,
                to: to,
                userId: user_id,
                id: id,
                day: days,
            };

            this.apiservice.saveTimeSlots(slots).subscribe((data) => {
                const timing = {
                    userId: user_id,
                };
                this.apiservice.getWorkingTime(timing).subscribe((data) => {
                    this.savedtime = data;
                });
            });
        } else {
        }
    }
    delete(id: any) {
        const user_id = localStorage.getItem('user_id');
        const days = localStorage.getItem('day');
        this.apiservice.deleteTimeSlots(id).subscribe((data) => {
            this.showFlashMessage('success');
            const timing = {
                userId: user_id,
            };

            this.apiservice.getWorkingTime(timing).subscribe((data) => {
                this.savedtime = data;
            });
        });
    }
    onSubmit() {
        const user_id = localStorage.getItem('user_id');
        if (this.slotForm.invalid) {
            return;
        }
        const slots = {
            day: this.slotForm.controls.slot.value,
            from: this.slotForm.controls.from_time.value,
            to: this.slotForm.controls.to_time.value,
            userId: user_id,
        };
        this.apiservice.saveTimeSlots(slots).subscribe((data) => {
            this.ngOnInit();
            this.showFlashMessage('success');
            const days = localStorage.getItem('day');

            const user_id = localStorage.getItem('user_id');
            this.apiservice.getTimeSlots().subscribe((data) => {
                this.time = data;
            });
            const timing = {
                userId: user_id,
            };
            this.apiservice.getWorkingTime(timing).subscribe((data) => {
                this.savedtime = data;
                console.log(data);
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
    } // add separately after ngOnInit();
}
