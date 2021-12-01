import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ReportsComponent } from './reports.component'; 

const ReportsRoutes: Route[] = [
    {
        path: '',
        component: ReportsComponent,
    },
];

@NgModule({
    declarations: [ReportsComponent],
    imports: [
        RouterModule.forChild(ReportsRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
    ],
})
export class ReportsComponentModule {}
