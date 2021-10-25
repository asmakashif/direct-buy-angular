import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentGatewayComponent } from 'app/modules/admin/payment/payment-gateway/payment-gateway.component';

const paymentGatewayRoutes: Route[] = [
    {
        path: '',
        component: PaymentGatewayComponent,
    },
];

@NgModule({
    declarations: [PaymentGatewayComponent],
    imports: [
        RouterModule.forChild(paymentGatewayRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
    ],
})
export class PaymentGatewayModule {}
