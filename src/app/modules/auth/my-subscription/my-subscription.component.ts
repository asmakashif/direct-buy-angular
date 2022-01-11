import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../profile/profile.service';
import { MySubscriptionService } from './my-subscription.service';

@Component({
    selector: 'app-my-subscription',
    templateUrl: './my-subscription.component.html',
    styleUrls: ['./my-subscription.component.scss'],
})
export class MySubscriptionComponent implements OnInit {
    faStore = faStore;
    shops: any;
    curDate: string;
    dateObj: number = Date.now();
    profileData: any;
    firstname: any;
    domainname: any;

    constructor(
        private _accountService: MySubscriptionService,
        private apiService: ProfileService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        //this.curDate = formatDate(new Date(), 'Y-MM-d', 'en');
        const user_id = localStorage.getItem('user_id');
        this._accountService.getShops(user_id).subscribe((shops: any) => {
            this.shops = shops;
            console.log(this.shops);
        });

        this.apiService.getRetailerDetailsById(user_id).subscribe((data) => {
            this.profileData = data;
            this.firstname = this.profileData.firstname;
            this.domainname = this.profileData.domainname;
        });
    }
}
