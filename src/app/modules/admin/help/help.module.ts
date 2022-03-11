import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardComponent } from 'app/modules/admin/dashboard/dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelpComponent } from './help.component';


// import { Icon } from '@iconify/vue';

const helpRoutes: Route[] = [
    {
        path: '',
        component: HelpComponent,
    },
];

@NgModule({
    declarations: [HelpComponent],
    imports: [
        RouterModule.forChild(helpRoutes),
        FlashMessagesModule.forRoot(),
        NgbModule,
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
        TranslocoModule,
        SharedModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        Ng2SearchPipeModule,
        FontAwesomeModule,
        // Icon,
    ],
})
export class HelpModule {}
