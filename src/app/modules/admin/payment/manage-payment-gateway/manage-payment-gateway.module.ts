import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ManagePaymentGatewayComponent } from 'app/modules/admin/payment/manage-payment-gateway/manage-payment-gateway.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
        FontAwesomeModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        NgbModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        Ng2SearchPipeModule,
    ],
})
export class ManagePaymentGatewayModule {}
