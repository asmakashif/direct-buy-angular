import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ManagePaymentGatewayComponent } from 'app/modules/admin/payment/manage-payment-gateway/manage-payment-gateway.component';

const managepaymentGatewayRoutes: Route[] = [
    {
        path: '',
        component: ManagePaymentGatewayComponent,
    },
];

@NgModule({
    declarations: [ManagePaymentGatewayComponent],
    imports: [
        RouterModule.forChild(managepaymentGatewayRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
    ],
})
export class ManagePaymentGatewayModule {}
