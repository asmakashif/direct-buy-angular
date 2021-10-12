import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-steps',
    templateUrl: './steps.component.html',
    styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
    constructor(private _router: Router, private routes: ActivatedRoute) {}

    ngOnInit() {}

    viewProducts() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/product-info/' + routeParams.shopId]);
    }

    setUpPayment(): void {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/store-payment/' + routeParams.shopId]);
    }
}
