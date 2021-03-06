import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { StoreActivationComponent } from 'app/modules/admin/store/store-activation/store-activation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { projectRoutes } from 'app/modules/admin/dashboards/project/project.routing';

const storeActivationRoutes: Route[] = [
    {
        path: '',
        component: StoreActivationComponent,
    },
];

@NgModule({
    declarations: [StoreActivationComponent],
    imports: [
        RouterModule.forChild(storeActivationRoutes),
        FlashMessagesModule.forRoot(),
        FontAwesomeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        NgApexchartsModule,
        SharedModule,
    ],
})
export class StoreActivationModule {}
