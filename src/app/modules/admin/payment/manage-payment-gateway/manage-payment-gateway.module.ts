import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ManagePaymentGatewayComponent } from 'app/modules/admin/payment/manage-payment-gateway/manage-payment-gateway.component';

const managepaymentGatewayRoutes: Route[] = [
    {
        path: '',
        component: ManagePaymentGatewayComponent,
    },
];

@NgModule({
    declarations: [ManagePaymentGatewayComponent],
    imports: [RouterModule.forChild(managepaymentGatewayRoutes)],
})
export class ManagePaymentGatewayModule {}
