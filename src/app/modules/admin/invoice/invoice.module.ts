import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { InvoiceComponent } from './invoice.component'; 
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
const InvoiceRoutes: Route[] = [
    {
        path: '',
        component: InvoiceComponent,
    },
];

@NgModule({
    declarations: [InvoiceComponent],
    imports: [
        RouterModule.forChild(InvoiceRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class InvoiceComponentModule {}
