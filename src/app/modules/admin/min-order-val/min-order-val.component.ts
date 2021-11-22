import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MinOrderValService } from './min-order-val.service';
@Component({
    selector: 'app-min-order-val',
    templateUrl: './min-order-val.component.html',
    styleUrls: ['./min-order-val.component.scss'],
})
export class MinOrderValComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private apiservice: MinOrderValService
    ) {}
    signinForm: FormGroup;
    shop_id: any;
    params: any;
    min_order: any;
    user_id: any;
    ngOnInit(): void {
        this.signinForm = this.fb.group({
            minOrder: ['', Validators.required],
        });

        const user_id = localStorage.getItem('user_id');
        this.apiservice.getMinimumOrderValue(user_id).subscribe((data) => {
            this.min_order = data;
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
            alert('Successfully Updated');
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
            });
        });
    }
}
