import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { GenericTableModule } from '@angular-generic-table/core';
import { ProductInfoComponent } from 'app/modules/admin/mobile/product-info/product-info.component';

const productInfoRoutes: Route[] = [
    {
        path: '',
        component: ProductInfoComponent,
    },
];

@NgModule({
    declarations: [ProductInfoComponent],
    imports: [
        RouterModule.forChild(productInfoRoutes),
        GenericTableModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
    ],
})
export class ProductInfoModule {}
