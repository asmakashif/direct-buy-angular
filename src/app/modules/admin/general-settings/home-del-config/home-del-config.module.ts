import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { HomeDelConfigComponent } from './home-del-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
const MinOrderRoutes: Route[] = [
    {
        path: '',
        component: HomeDelConfigComponent,
    },
];

@NgModule({
    declarations: [HomeDelConfigComponent],
    imports: [
        RouterModule.forChild(MinOrderRoutes),
        FontAwesomeModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class HomeDelConfigModule {}
