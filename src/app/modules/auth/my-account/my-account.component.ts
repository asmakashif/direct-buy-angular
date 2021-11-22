import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MyAccountService } from './my-account.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
    shops: any;
    curDate: string;
    dateObj: number = Date.now();

    constructor(
        private _accountService: MyAccountService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        //this.curDate = formatDate(new Date(), 'Y-MM-d', 'en');
        const user_id = localStorage.getItem('user_id');
        this._accountService.getShops(user_id).subscribe(
            (shops: any) => {
                this.shops = shops;
                this.cd.detectChanges();
            },
            (error) => {
                alert(error.message);
            }
        );
    }
}
