import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from './reports.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
    faStore = faStore;
    profileData: any;
    domainname: any;
    repots: any;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private apiservice: ReportsService,
        private _dashboardService: DashboardService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const user_id = localStorage.getItem('user_id');
        this.apiservice.getOrderReports(user_id).subscribe((data) => {
            this.repots = data;
        });

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
            });
    }
    printPage() {
        window.print();
    }
}
