import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PaymentGatewayComponent } from 'app/modules/admin/payment-gateway/payment-gateway.component';

const paymentGatewayRoutes: Route[] = [
    {
        path: '',
        component: PaymentGatewayComponent,
    },
];

@NgModule({
    declarations: [PaymentGatewayComponent],
    imports: [RouterModule.forChild(paymentGatewayRoutes)],
})
export class PaymentGatewayModule {}
