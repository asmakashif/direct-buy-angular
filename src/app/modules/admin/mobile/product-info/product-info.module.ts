import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HotTableModule } from '@handsontable/angular';
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
        HotTableModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
    ],
})
export class ProductInfoModule {}
