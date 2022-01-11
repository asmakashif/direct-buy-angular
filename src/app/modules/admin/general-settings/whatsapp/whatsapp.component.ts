import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-whatsapp',
    templateUrl: './whatsapp.component.html',
    styleUrls: ['./whatsapp.component.scss'],
})
export class WhatsappComponent implements OnInit {
    whatsappForm: FormGroup;
    faStore = faStore;
    profileData: any;
    domainname: any;
    rows: number = 5;
    firstname: any;
    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private _dashboardService: DashboardService
    ) {}

    ngOnInit(): void {
        const user_id = localStorage.getItem('user_id');
        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
            });
    }
}
